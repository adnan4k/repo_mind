# RepoMind

Mines a repository's pull-request review history into an evidence-backed, team-approved
engineering knowledge base, and exports it as AI-ready context files (`CLAUDE.md`,
`.cursor/rules/`, `.github/copilot-instructions.md`, `AGENTS.md`). See `README.md` for the
full pitch. **Phase 0 goal:** prove that a meaningful fraction of extracted rules are
team-specific (not generic best practices any LLM already knows), correct, and current.

## Stack

- TypeScript, npm workspaces monorepo, Node >= 24
- LLM access: **Vercel AI SDK** (`ai` package) — BYOK, provider chosen by the user
- GitHub ingestion: Octokit **GraphQL** (review threads + resolution status)
- Storage: SQLite via `better-sqlite3` + Drizzle ORM (one DB file per analyzed repo);
  Postgres + pgvector is the future SaaS path — keep schemas portable
- Embeddings: local via `fastembed` (no second API key required)
- Concurrency: `p-queue` bounded against provider rate limits

## Layout

```
packages/core   # the entire pipeline: ingest → extract → cluster → score → export
packages/cli    # thin commander wrapper around core (`repomind analyze`, `repomind export`)
```

`core` must stay runtime-agnostic: no CLI/process assumptions, no opinion about where it
runs. The CLI today and SaaS workers later call the same functions.

## Pipeline stages (core)

1. **ingest** — fetch PRs, review threads, comments, diff hunks via GraphQL; persist raw
2. **extract** — LLM turns each comment thread into candidate lessons (structured output)
3. **cluster** — embed candidates, group similar ones across the repo's history
4. **score** — specificity (team-specific vs generic), consensus, recency
5. **export** — render approved rules into each target format

## Design rules (load-bearing — do not violate)

- **BYOK lowest common denominator.** The portable baseline is plain completions + JSON
  schema in the prompt + Zod validation + one retry. Provider-specific features (batch
  APIs, prompt caching, strict structured outputs) live behind a capability map, never in
  pipeline logic.
- **API keys never leave the user's machine.** Keys come from env/config; never log them,
  never send them anywhere but the user's chosen provider.
- **Prompts are ecosystem-neutral.** No Laravel/PHP-flavored few-shot examples or
  categories baked in. Detect the repo's language and inject it as context instead. See
  the `extraction-prompts` skill before touching any prompt.
- **Every rule carries provenance.** A rule without linked PR evidence (comment URLs,
  occurrence count, reviewer count, last-seen date) is a bug. Provenance is the product.
- **Git-native knowledge base.** Approved rules live as files under `.repomind/` in the
  *target* repo; the approval workflow is a pull request, not a dashboard.

## Project tracking & docs (keep these current)

- **`PROGRESS.md`** — the single source of truth for project status. After completing a
  unit of work: tick the item, add a dated Log line, and update "Current focus". If you
  start work that isn't listed, add it first.
- **`docs/DECISIONS.md`** — append-only decision log. When a significant choice is made
  or reversed in a session, append an entry with the reasoning.
- **Skills** (auto-load by topic — read before touching their area):
  - `extraction-prompts` — any pipeline prompt, few-shot example, or LLM output schema
  - `llm-providers` — provider adapters, capability map, key handling, LLM-call code
  - `exporters` — export formats, templates, managed-section markers

## Commands

```
npm install          # install all workspaces
npm run build        # tsc -b across workspaces
npm run dev -w packages/cli -- analyze <owner/repo>   # run the CLI from source
```

## Conventions

- Strict TypeScript (`strict: true`); no `any` in `core`'s public API
- Zod schemas are the source of truth for all LLM I/O and the rule format —
  defined in `packages/core/src/types.ts`
- Keep the pipeline as plain async functions; no orchestration frameworks
