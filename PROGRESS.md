# RepoMind — Progress

> Maintained by every working session (human or AI). When you complete a unit of work:
> tick the item, and add a dated line to the Log. When you start something new that
> isn't listed, add it first. Keep "Current focus" pointing at exactly one thing.

**Current focus:** Extraction prompt v2 — fix over-extraction (isReusableLesson passes everything), quote-grounding to stop hallucinated rules, bot-author filtering, per-PR occurrence weighting

## Phase 0 — Validation (prove the core thesis)

Goal: run the pipeline on 2–3 large OSS repos and measure what fraction of extracted
rules are **team-specific, correct, and current**. If that ratio is low, stop and rethink.

- [x] Project scaffold — npm workspaces, strict TS, core/cli packages build
- [x] Core schemas (`packages/core/src/types.ts`) — vocabulary, CandidateRule, Rule + Evidence
- [x] CLI stub — `repomind analyze`, `repomind export`
- [x] AI setup — CLAUDE.md, skills (extraction-prompts, llm-providers, exporters), docs
### MVP slice (end-to-end `analyze` → markdown report)

- [x] **Ingest** — GraphQL queries for PRs + review threads (resolution status, diff hunks)
- [x] **LLM layer** — AI SDK wrapper, BYOK config (DeepSeek default), Zod-validated calls, bounded queue
- [x] **Extract** — extraction prompt v1 (per extraction-prompts skill), per-thread cache
- [x] **Merge-lite** — per-category LLM dedup (stand-in for embeddings clustering)
- [x] **Report** — `repomind-report.md` with specificity ratio + evidence links
- [x] **Live test** — tj/commander.js, 30 PRs / 56 threads / 24 rules in 37s, 0 LLM failures

### Remaining Phase 0 (post-MVP)

- [ ] **Ingest** — SQLite persistence via Drizzle (replaces JSON cache)
- [ ] **Extract** — fixture threads in `packages/core/test/fixtures/` + prompt tests
- [ ] **Cluster** — local embeddings (fastembed) + similarity grouping (replaces merge-lite at scale)
- [ ] **Score** — proper specificity / consensus / recency formula (MVP uses a simple heuristic)
- [x] **Export (Claude skill)** — `repomind export` renders a `.claude/skills/<repo>-review-conventions/` folder
- [ ] **Export (rest)** — CLAUDE.md managed section, .cursor/rules, copilot-instructions, AGENTS.md renderers
- [ ] **Benchmark** — run on 2–3 OSS repos (incl. ≥1 non-PHP), measure specificity ratio
- [ ] **Decision gate** — write up Phase 0 results; go / pivot / stop

## Phase 1 — Product (only after Phase 0 passes)

- [ ] Git-native knowledge base — `.repomind/` rules committed via `repomind propose` PR
- [ ] Approval workflow — PR review = rule approval; status sync back to DB
- [ ] GitHub Action — containerized run for any-stack repos
- [ ] Incremental ingestion — only new PRs since last run
- [ ] Drift detection — flag rules not enforced recently
- [ ] npm publish — `npx repomind` works cold

## Phase 2+ — Later (parking lot)

- GitHub App + webhooks, hosted dashboard, Postgres + pgvector migration,
  handbook generation, Engineering DNA, multi-source ingestion (ADRs, postmortems)

## Log

- **2026-06-12** — Refined pitch into README. Chose TypeScript monorepo (over PHP/Laravel)
  for ecosystem fit + distribution; BYOK via Vercel AI SDK; git-native knowledge base.
  Scaffolded workspaces, core Zod schemas, CLI stub; build + smoke test pass.
- **2026-06-12** — AI setup: CLAUDE.md, extraction-prompts / llm-providers / exporters
  skills, docs/DECISIONS.md, this tracker.
- **2026-06-12** — MVP built end-to-end: ingest (GraphQL + JSON cache), BYOK LLM layer
  (DeepSeek default), extraction prompt v1, per-category LLM merge, markdown report.
  Builds clean; CLI validation paths tested. Live run pending API keys.
- **2026-06-12** — First live run (tj/commander.js, DeepSeek): mechanics solid (37s, 59
  calls, 0 failures, merge correctly clustered a 26× pattern). Quality findings:
  specificity ratio only 2% team-specific / 70% generic; isReusableLesson filtered
  nothing (50/50 passed); one hallucinated rule ("triple dashes") not supported by its
  own quote; one PR (#2465 docs rewrite) generated ~14 rules — single-conversation
  over-weighting; 26× "unused variables" all from one reviewer in one PR (likely lint
  bot). Repo choice also poor proxy: single-maintainer repo has few team conventions.
  → extraction prompt v2 + bot filtering + per-PR weighting; retest on a team repo.
- **2026-06-12** — Prompt v2 + bot filter + per-PR weighting shipped and regression-tested
  on commander.js (same cached threads): rules 24→14, reusability filter now rejects 25%
  (was 0%), hallucinated "triple dashes" rule gone, team-specific 2%→7%, occurrence
  inflation fixed (26×→1 PR). Next live target: private team repo.
- **2026-06-12** — Made it a real CLI: `npm link` → global `repomind` command; config
  resolves cwd `.env` → `~/.config/repomind/env` → shell vars; cache moved to
  `~/.cache/repomind/` (never pollutes the analyzed project); threads cache keyed by
  maxPrs (small scan no longer short-circuits a larger one). Verified from /tmp.
- **2026-06-12** — First exporter shipped: `repomind export <repo>` reads persisted rules
  (analyze now caches them) and writes `.claude/skills/<repo>-review-conventions/SKILL.md`
  with frontmatter + evidence links. Generic rules excluded by default (--all to keep);
  human review of the file before commit stands in for the approval workflow. Tested on
  commander.js: 10 rules in, 4 generic excluded.
