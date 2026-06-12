import { z } from "zod";
import type { ExtractedCandidate } from "./extract.js";
import type { LlmClient } from "./llm.js";
import { Category, Evidence, Rule, Specificity, type ReviewThread } from "./types.js";

const MergeResponse = z.object({
  groups: z.array(
    z.object({
      rule: z.string().min(1),
      specificity: Specificity,
      members: z.array(z.number().int().min(1)),
    }),
  ),
});

function buildMergePrompt(category: string, candidates: ExtractedCandidate[]): string {
  const list = candidates
    .map((c, i) => `${i + 1}. (${c.specificity}) ${c.rule}`)
    .join("\n");
  return `These candidate engineering rules were extracted from code review threads of ONE
repository. All are in the category "${category}".

${list}

Merge duplicates and near-duplicates into groups. Two candidates belong in the same
group when they teach the same underlying lesson, even with different wording, different
emphasis, or different examples — e.g. three rules that all ask for consistent naming of
the same kind of variable are ONE group. Prefer fewer, broader groups over many
near-identical ones. For each group write one canonical rule statement (one sentence,
imperative voice) and pick the specificity label that best fits the group.

Every input number must appear in exactly one group. Rules that are genuinely distinct
stay in their own group of one.

Respond with ONLY this JSON (no other text):
{"groups": [{"rule": "canonical statement", "specificity": "generic" | "conventional" | "team_specific", "members": [1, 4]}]}`;
}

/** MVP confidence heuristic: grows with occurrences, small bonus for reviewer diversity. */
function confidence(occurrences: number, reviewerCount: number): number {
  const base = occurrences / (occurrences + 2);
  const bonus = Math.min(0.15, 0.05 * (reviewerCount - 1));
  return Math.min(1, Number((base + bonus).toFixed(2)));
}

function toEvidence(candidate: ExtractedCandidate, thread: ReviewThread): Evidence {
  const first = thread.comments[0];
  if (!first) throw new Error(`thread ${thread.id} has no comments`);
  return {
    threadId: thread.id,
    prNumber: thread.prNumber,
    commentUrl: first.url,
    author: first.author,
    quote: candidate.quote.slice(0, 300),
    createdAt: first.createdAt,
  };
}

export async function mergeCandidates(
  client: LlmClient,
  candidates: ExtractedCandidate[],
  threads: ReviewThread[],
  onProgress?: (category: string) => void,
): Promise<Rule[]> {
  const threadById = new Map(threads.map((t) => [t.id, t]));
  const reusable = candidates.filter(
    (c) => c.isReusableLesson && threadById.has(c.threadId),
  );

  const byCategory = new Map<Category, ExtractedCandidate[]>();
  for (const c of reusable) {
    byCategory.set(c.category, [...(byCategory.get(c.category) ?? []), c]);
  }

  const rules: Rule[] = [];
  for (const [category, members] of byCategory) {
    onProgress?.(category);

    let groups: { rule: string; specificity: Specificity; members: number[] }[];
    if (members.length === 1) {
      const only = members[0]!;
      groups = [{ rule: only.rule, specificity: only.specificity, members: [1] }];
    } else {
      const response = await client.callWithSchema(
        buildMergePrompt(category, members),
        MergeResponse,
      );
      // Fallback on LLM failure: every candidate is its own group.
      groups =
        response?.groups ??
        members.map((c, i) => ({
          rule: c.rule,
          specificity: c.specificity,
          members: [i + 1],
        }));
    }

    for (const [i, group] of groups.entries()) {
      const groupCandidates = group.members
        .map((n) => members[n - 1])
        .filter((c): c is ExtractedCandidate => c !== undefined);
      if (groupCandidates.length === 0) continue;

      const evidence = groupCandidates.map((c) => toEvidence(c, threadById.get(c.threadId)!));
      const dates = evidence.map((e) => e.createdAt).sort();
      const reviewers = new Set(evidence.map((e) => e.author));
      // Weight by distinct PRs, not raw comments — one long conversation in a single
      // PR must not inflate a rule (commander.js finding: 26 comments, 1 PR).
      const prCount = new Set(evidence.map((e) => e.prNumber)).size;

      rules.push(
        Rule.parse({
          id: `${category}-${i + 1}`,
          rule: group.rule,
          category,
          specificity: group.specificity,
          occurrences: prCount,
          reviewerCount: reviewers.size,
          firstSeen: dates[0],
          lastSeen: dates[dates.length - 1],
          confidence: confidence(prCount, reviewers.size),
          evidence,
          status: "candidate",
        }),
      );
    }
  }

  return rules.sort(
    (a, b) => b.occurrences - a.occurrences || b.confidence - a.confidence,
  );
}
