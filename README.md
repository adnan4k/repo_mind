# RepoMind (working name)

**Turn a repository's pull request review history into AI-ready team knowledge — with receipts.**

---

## What It Does

RepoMind analyzes a repo's pull request history and produces a **team knowledge base** where every rule is backed by evidence:

```yaml
Rule: Use events for cross-domain communication
Evidence: flagged 17 times by 4 reviewers over 2 years
Last seen: 3 weeks ago
Status: approved by team lead
```

It then exports that knowledge as a **Claude Code skill** — a `.claude/skills/<repo>-review-conventions/SKILL.md` your assistant loads automatically when working in the repo. Generic rules any LLM already knows are dropped; only the team-specific conventions ship.

> Today RepoMind targets Claude Code. Cursor (`.cursor/rules/`), Copilot (`.github/copilot-instructions.md`), tool-agnostic `AGENTS.md`, and a human handbook are on the roadmap — same mined rules, more renderers.

Every rule carries provenance: it links to the PR threads it came from, weighted by recency and reviewer diversity. A rule without linked evidence is treated as a bug.

---

## How It Works

Most review comments aren't reusable knowledge — they're nitpicks, generic advice any LLM knows, stale conventions, or contradictions. The value is in the minority that encode **team-specific, non-obvious decisions**, so the pipeline filters as much as it extracts:

1. **Ingest** — fetch PRs, review threads, comments, and diff hunks via the GitHub GraphQL API; persist the raw data.
2. **Extract** — AI reads each review thread for candidate lessons, including how it was resolved (accepted? pushed back on?).
3. **Cluster** — similar feedback across years of PRs is grouped (`"avoid N+1"`, `"missing with()"`, `"please eager load"` → one rule, 63 occurrences, 5 reviewers).
4. **Score** — on **specificity** (does it differ from what a frontier LLM says by default?), **consensus** (reviewers, contradiction rate), and **recency** (still enforced?).
5. **Approve** — a human signs off before anything ships. RepoMind proposes; the team lead disposes.
6. **Export** — approved rules render into a Claude Code skill the assistant auto-loads in the repo (more formats on the roadmap).

"Confidence: 92%" means the share of clustered comments consistent with the rule, weighted by recency and reviewer diversity — not a vibe.

---

## Stack

- TypeScript, npm workspaces monorepo, Node >= 24
- LLM access via the **Vercel AI SDK** (`ai` package) — BYOK, provider chosen by the user
- GitHub ingestion via Octokit **GraphQL** (review threads + resolution status)
- Storage: SQLite via `better-sqlite3` + Drizzle ORM (one DB file per analyzed repo)
- Embeddings: local via `fastembed` (no second API key required)
- Concurrency: `p-queue` bounded against provider rate limits

```
packages/core   # the entire pipeline: ingest → extract → cluster → score → export
packages/cli    # thin commander wrapper around core (`repomind analyze`, `repomind export`)
```

---

## Quickstart

RepoMind is a CLI. It runs from source today (npm package coming).

```bash
git clone <this-repo> && cd repomind
npm install && npm run build
```

Set two things — a GitHub token (read-only is enough) and your LLM provider key (BYOK; keys never leave your machine):

```bash
export GITHUB_TOKEN=ghp_...
export REPOMIND_PROVIDER=anthropic        # or deepseek | openai | openai-compatible
export REPOMIND_API_KEY=sk-...            # your provider key
```

Then mine a repo and generate the Claude Code skill:

```bash
# 1. Ingest review history → extract & score rules → write repomind-report.md
npm run dev -w packages/cli -- analyze <owner>/<repo> --max-prs 50

# 2. Render the approved rules as a Claude Code skill
npm run dev -w packages/cli -- export <owner>/<repo>
# → .claude/skills/<repo>-review-conventions/SKILL.md
```

Review the generated `SKILL.md` before committing it — **that file review is your approval step.** Claude Code auto-loads the skill whenever you work in that repo.

---

## Data & Privacy

Read-only GitHub scopes, BYOK keys that never leave the user's machine, per-repo isolation, and a self-hosted option on the roadmap.
