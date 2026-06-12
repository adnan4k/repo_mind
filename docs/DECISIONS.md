# Decisions

Append-only log of project decisions and the reasoning behind them. One entry per
decision; add a new entry (don't edit the old one) if a decision is reversed.

## 2026-06-12 — TypeScript over PHP/Laravel
Builder knows Laravel better, but: the hard 80% (LLM pipeline, embeddings, clustering)
has first-class TS tooling; `npx repomind` reaches every developer regardless of stack;
the open-source/portfolio audience is larger; Laravel's advantages (Filament, Horizon,
Cashier) only pay off at a SaaS stage a personal project may never reach. Laravel-teams
angle kept as *marketing* wedge, not runtime.

## 2026-06-12 — BYOK (bring your own key/model)
Users supply provider + key + model. Kills the data-privacy objection (their data goes
to their chosen provider, never through us), shifts compute cost off us, and makes the
provider question an A/B test. Consequence: build to lowest-common-denominator LLM
features; capability map for optimizations. See `llm-providers` skill.

## 2026-06-12 — Vercel AI SDK as the only LLM dependency
One interface over Anthropic/OpenAI/Google/DeepSeek/Mistral + OpenAI-compatible
(Ollama/vLLM). Avoids maintaining N SDK integrations. No LangChain/orchestration
frameworks — the pipeline is a linear flow of plain async functions.

## 2026-06-12 — GitHub GraphQL (not REST) for ingestion
Review threads with resolution status + diff hunks come in far fewer requests; matters
when backfilling years of history under rate limits.

## 2026-06-12 — SQLite first, Postgres+pgvector later
One DB file per analyzed repo, zero setup for CLI users. Drizzle ORM keeps schemas
portable for the eventual SaaS migration. Brute-force cosine similarity is fine at
Phase-0 scale; a vector index is a SaaS-stage problem.

## 2026-06-12 — Local embeddings (fastembed)
Requiring a second API key (embeddings) doubles setup friction. A small local model on
CPU is sufficient for "are these two comments the same lesson," costs nothing, and keeps
comment text off another wire.

## 2026-06-12 — Git-native knowledge base
Approved rules live as files in `.repomind/` in the target repo; `repomind propose`
opens a PR; approval = PR review. Defers building a dashboard entirely, audit trail is
git history, and it's on-brand (the PR-mining tool gets reviewed in PRs).

## 2026-06-12 — Ecosystem-neutral core, Laravel-first marketing
No framework-specific prompts/categories in code. Repo language detected and injected at
runtime. Phase-0 benchmark must include ≥1 non-PHP repo to verify.

## 2026-06-12 — Phase 0 gate before any product work
The killer risk: extracted rules are 90% generic advice LLMs already know. Phase 0
measures the team-specific ratio on real OSS repos; product work only starts if the
ratio justifies it. Specificity labels (`generic|conventional|team_specific`) are kept
on every candidate — never dropped — so the denominator is measurable.
