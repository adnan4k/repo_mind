import { z } from "zod";

// Shared vocabulary — keep in sync with .claude/skills/extraction-prompts/SKILL.md.
// Changing these requires updating every pipeline prompt in the same commit.

export const Category = z.enum([
  "security",
  "performance",
  "architecture",
  "testing",
  "style",
  "process",
  "other",
]);
export type Category = z.infer<typeof Category>;

export const Resolution = z.enum(["accepted", "disputed", "ignored", "unknown"]);
export type Resolution = z.infer<typeof Resolution>;

export const Specificity = z.enum(["generic", "conventional", "team_specific"]);
export type Specificity = z.infer<typeof Specificity>;

// ── Ingest: raw material fetched from GitHub ────────────────────────────────

export const ReviewComment = z.object({
  id: z.string(),
  author: z.string(),
  body: z.string(),
  url: z.string().url(),
  createdAt: z.string().datetime(),
});
export type ReviewComment = z.infer<typeof ReviewComment>;

export const ReviewThread = z.object({
  id: z.string(),
  prNumber: z.number().int(),
  prTitle: z.string(),
  path: z.string().nullable(),
  diffHunk: z.string().nullable(),
  isResolved: z.boolean(),
  comments: z.array(ReviewComment).min(1),
});
export type ReviewThread = z.infer<typeof ReviewThread>;

// ── Extract: LLM output for one review thread ───────────────────────────────
// This schema is described verbatim inside the extraction prompt and validated
// on the way back. Plain JSON only — no provider-native structured outputs.

export const CandidateRule = z.object({
  /** The generalized lesson, not the literal comment. Imperative voice. */
  rule: z.string().min(1),
  category: Category,
  resolution: Resolution,
  /** Would a frontier LLM give this advice unprompted? */
  specificity: Specificity,
  /** Short quote from the thread that best evidences the rule. */
  quote: z.string(),
  /** False when the thread is a nit/question/discussion with no reusable lesson. */
  isReusableLesson: z.boolean(),
});
export type CandidateRule = z.infer<typeof CandidateRule>;

export const ExtractionResult = z.object({
  threadId: z.string(),
  candidates: z.array(CandidateRule),
});
export type ExtractionResult = z.infer<typeof ExtractionResult>;

// ── Cluster + score: a rule with receipts ───────────────────────────────────

export const Evidence = z.object({
  threadId: z.string(),
  prNumber: z.number().int(),
  commentUrl: z.string().url(),
  author: z.string(),
  quote: z.string(),
  createdAt: z.string().datetime(),
});
export type Evidence = z.infer<typeof Evidence>;

export const Rule = z.object({
  id: z.string(),
  /** Canonical statement synthesized from the cluster. */
  rule: z.string(),
  category: Category,
  specificity: Specificity,
  occurrences: z.number().int().min(1),
  reviewerCount: z.number().int().min(1),
  firstSeen: z.string().datetime(),
  lastSeen: z.string().datetime(),
  /** Share of clustered comments consistent with the rule, weighted by recency
   *  and reviewer diversity. 0–1. */
  confidence: z.number().min(0).max(1),
  /** Provenance is the product — a Rule without evidence is a bug. */
  evidence: z.array(Evidence).min(1),
  status: z.enum(["candidate", "approved", "rejected", "retired"]),
});
export type Rule = z.infer<typeof Rule>;

// ── Repo context injected into prompts (keeps prompts ecosystem-neutral) ────

export const RepoContext = z.object({
  owner: z.string(),
  name: z.string(),
  primaryLanguage: z.string().nullable(),
  description: z.string().nullable(),
});
export type RepoContext = z.infer<typeof RepoContext>;
