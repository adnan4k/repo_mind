import { z } from "zod";
import type { JsonCache } from "./cache.js";
import type { LlmClient } from "./llm.js";
import { CandidateRule, type RepoContext, type ReviewThread } from "./types.js";

const ExtractionResponse = z.object({
  candidates: z.array(CandidateRule),
});

/** A candidate tied back to the thread it came from. */
export interface ExtractedCandidate extends CandidateRule {
  threadId: string;
}

export interface ExtractStats {
  threadsProcessed: number;
  threadsFromCache: number;
  threadsFailed: number;
}

// Ecosystem-neutral by design — the repo's language arrives via RepoContext.
// See .claude/skills/extraction-prompts/SKILL.md before editing.
function buildPrompt(thread: ReviewThread, ctx: RepoContext): string {
  const language = ctx.primaryLanguage ?? "unknown";
  const comments = thread.comments
    .map((c) => `  [${c.author}] ${c.body.slice(0, 1200)}`)
    .join("\n");

  return `You analyze code review discussions and extract reusable engineering lessons.

Repository: ${ctx.owner}/${ctx.name} (primary language: ${language})
Pull request #${thread.prNumber}: ${thread.prTitle}
File: ${thread.path ?? "n/a"}
Thread resolved on GitHub: ${thread.isResolved}
${thread.diffHunk ? `Diff under discussion:\n${thread.diffHunk}\n` : ""}
Review thread:
${comments}

Extract the reusable engineering lesson(s) from this thread, if any.

Rules:
- Extract the GENERALIZED lesson, not the literal comment. "Please wrap these two writes
  in a transaction" becomes "Wrap related writes in a transaction when they must succeed
  or fail together." Imperative voice.
- The bar for isReusableLesson=true is HIGH: the lesson must plausibly change how a
  future, unrelated pull request is written. Mark isReusableLesson=false for: typo and
  wording fixes, one-off phrasing preferences in a single document, questions and
  answers, praise, an author explaining their own code, anything tied to one specific
  line that teaches nothing beyond that line. When in doubt, false.
- GROUNDING: the rule must be directly supported by what was actually written in the
  thread — the quote you select must entail the rule. Never infer a convention the
  reviewers did not state.
- Most threads contain NO reusable lesson; an empty candidates array is the most common
  correct answer.
- Judge from the WHOLE thread: did the author accept the feedback, push back, or ignore it?

Respond with ONLY this JSON (no other text):
{"candidates": [{
  "rule": "the generalized lesson, one sentence, imperative",
  "category": "security" | "performance" | "architecture" | "testing" | "style" | "process" | "other",
  "resolution": "accepted" | "disputed" | "ignored" | "unknown",
  "specificity": "generic" | "conventional" | "team_specific",
  "quote": "short verbatim quote from the thread that best evidences the rule",
  "isReusableLesson": true | false
}]}

specificity meanings:
- "generic": advice that applies verbatim to ANY codebase in ANY language ("remove
  unused variables", "extract magic numbers")
- "conventional": standard practice within this language/ecosystem that a competent
  developer in it would usually follow anyway
- "team_specific": a choice particular to THIS team or codebase that an outsider could
  not guess. Label team_specific when the rule involves ANY of: a project-specific
  class/trait/pattern by name, this product's domain entities or business concepts, a
  domain security/access invariant ("X must never see Y's data"), or a convention the
  reviewer asserts as established here ("we use…", "for consistency with…", "it needs
  to be in the … trait"). Domain-specific rules are team_specific even when the
  underlying principle (authorization, consistency) is universal.`;
}

export async function extractAll(
  client: LlmClient,
  threads: ReviewThread[],
  ctx: RepoContext,
  cache: JsonCache,
  onProgress?: (done: number, total: number) => void,
): Promise<{ candidates: ExtractedCandidate[]; stats: ExtractStats }> {
  type CacheEntry = { candidates: CandidateRule[] } | { failed: true };
  const cached = (await cache.read<Record<string, CacheEntry>>("extractions")) ?? {};
  const stats: ExtractStats = { threadsProcessed: 0, threadsFromCache: 0, threadsFailed: 0 };
  let done = 0;

  const results = await Promise.all(
    threads.map(async (thread): Promise<ExtractedCandidate[]> => {
      let entry = cached[thread.id];
      if (entry) {
        stats.threadsFromCache++;
      } else {
        const response = await client.callWithSchema(
          buildPrompt(thread, ctx),
          ExtractionResponse,
        );
        entry = response ?? { failed: true };
        cached[thread.id] = entry;
        stats.threadsProcessed++;
      }
      onProgress?.(++done, threads.length);
      if ("failed" in entry) {
        stats.threadsFailed++;
        return [];
      }
      return entry.candidates.map((c) => ({ ...c, threadId: thread.id }));
    }),
  );

  await cache.write("extractions", cached);
  return { candidates: results.flat(), stats };
}
