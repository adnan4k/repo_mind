import type { ExtractedCandidate } from "./extract.js";
import type { RepoContext, Rule } from "./types.js";

export interface ReportInput {
  context: RepoContext;
  prsScanned: number;
  threadCount: number;
  candidates: ExtractedCandidate[];
  rules: Rule[];
}

const CATEGORY_ORDER = [
  "security",
  "architecture",
  "performance",
  "testing",
  "process",
  "style",
  "other",
] as const;

function pct(part: number, whole: number): string {
  return whole === 0 ? "0%" : `${Math.round((part / whole) * 100)}%`;
}

function month(iso: string): string {
  return iso.slice(0, 7);
}

export function renderReport(input: ReportInput): string {
  const { context, rules } = input;
  const reusable = input.candidates.filter((c) => c.isReusableLesson);
  const bySpec = (s: string) => reusable.filter((c) => c.specificity === s).length;
  const teamSpecific = bySpec("team_specific");

  const lines: string[] = [
    `# RepoMind report — ${context.owner}/${context.name}`,
    "",
    `Primary language: ${context.primaryLanguage ?? "unknown"}`,
    "",
    "## Summary",
    "",
    `| Metric | Value |`,
    `|---|---|`,
    `| PRs scanned | ${input.prsScanned} |`,
    `| Review threads | ${input.threadCount} |`,
    `| Reusable lessons extracted | ${reusable.length} (of ${input.candidates.length} candidates) |`,
    `| Merged rules | ${rules.length} |`,
    `| Specificity — team_specific | ${teamSpecific} (${pct(teamSpecific, reusable.length)}) |`,
    `| Specificity — conventional | ${bySpec("conventional")} (${pct(bySpec("conventional"), reusable.length)}) |`,
    `| Specificity — generic | ${bySpec("generic")} (${pct(bySpec("generic"), reusable.length)}) |`,
    "",
    `> **Phase 0 metric:** ${pct(teamSpecific, reusable.length)} of reusable lessons are team-specific.`,
    "",
  ];

  for (const category of CATEGORY_ORDER) {
    const categoryRules = rules.filter((r) => r.category === category);
    if (categoryRules.length === 0) continue;
    lines.push(`## ${category[0]?.toUpperCase()}${category.slice(1)}`, "");

    for (const rule of categoryRules) {
      const span =
        month(rule.firstSeen) === month(rule.lastSeen)
          ? month(rule.lastSeen)
          : `${month(rule.firstSeen)} → ${month(rule.lastSeen)}`;
      const links = rule.evidence
        .slice(0, 3)
        .map((e) => `[PR #${e.prNumber}](${e.commentUrl})`)
        .join(", ");
      lines.push(
        `### ${rule.rule}`,
        "",
        `- Specificity: **${rule.specificity}** · Confidence: ${Math.round(rule.confidence * 100)}%`,
        `- Seen in ${rule.occurrences} PR(s) from ${rule.reviewerCount} reviewer(s) (${span})`,
        `- Evidence: ${links}`,
        `- > "${rule.evidence[0]?.quote ?? ""}"`,
        "",
      );
    }
  }

  return lines.join("\n");
}
