# RepoMind — Progress

> Maintained by every working session (human or AI). When you complete a unit of work:
> tick the item, and add a dated line to the Log. When you start something new that
> isn't listed, add it first. Keep "Current focus" pointing at exactly one thing.

**Current focus:** Ingest module (Octokit GraphQL → SQLite)

## Phase 0 — Validation (prove the core thesis)

Goal: run the pipeline on 2–3 large OSS repos and measure what fraction of extracted
rules are **team-specific, correct, and current**. If that ratio is low, stop and rethink.

- [x] Project scaffold — npm workspaces, strict TS, core/cli packages build
- [x] Core schemas (`packages/core/src/types.ts`) — vocabulary, CandidateRule, Rule + Evidence
- [x] CLI stub — `repomind analyze`, `repomind export`
- [x] AI setup — CLAUDE.md, skills (extraction-prompts, llm-providers, exporters), docs
- [ ] **Ingest** — GraphQL queries for PRs + review threads (resolution status, diff hunks)
- [ ] **Ingest** — SQLite persistence via Drizzle (one DB file per repo)
- [ ] **LLM layer** — AI SDK wrapper, BYOK config, capability map, Zod-validated calls
- [ ] **Extract** — extraction prompt v1 + fixture threads in `packages/core/test/fixtures/`
- [ ] **Cluster** — local embeddings (fastembed) + similarity grouping + cluster naming
- [ ] **Score** — specificity / consensus / recency → confidence
- [ ] **Export** — CLAUDE.md, .cursor/rules, copilot-instructions, AGENTS.md renderers
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
