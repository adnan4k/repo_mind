# RepoMind (working name)

**Turn years of pull request feedback into AI-ready team knowledge — with receipts.**

---

## The Problem

Code review is where teams encode how they actually build software:

```text
Use a transaction here.
This endpoint needs authorization.
We don't use repositories in this codebase — query from the model.
```

That knowledge is trapped inside thousands of merged PRs. Developers forget it, new hires never see it, AI assistants don't know it, and the same lessons get re-taught for years.

Meanwhile teams hand-write `CLAUDE.md`, `.cursor/rules`, and `copilot-instructions.md` — from memory. The source of truth already exists in the review history. Nobody is mining it.

---

## What RepoMind Does

It analyzes a repo's pull request history and produces a **team knowledge base** where every rule is backed by evidence:

```yaml
Rule: Use events for cross-domain communication
Evidence: flagged 17 times by 4 reviewers over 2 years
Last seen: 3 weeks ago
Status: approved by team lead
```

Then exports it as a **Claude Code skill** — a `.claude/skills/<repo>-review-conventions/SKILL.md` your assistant loads automatically when working in the repo. Generic rules any LLM already knows are dropped; only the team-specific conventions ship.

> Today RepoMind targets Claude Code. Cursor (`.cursor/rules/`), Copilot (`.github/copilot-instructions.md`), tool-agnostic `AGENTS.md`, and a human handbook are on the roadmap — same mined rules, more renderers.

---

## Why Provenance Is the Product

Any LLM can generate generic "engineering guidelines" nobody trusts. RepoMind rules are different:

1. **They're yours** — mined from your team's decisions, not boilerplate.
2. **They have receipts** — every rule links to the PR threads it came from.
3. **They're current** — weighted by recency, flagged when behavior changes.

Trust is what gets a rules file committed and obeyed. Provenance creates trust.

---

## How It Works

Most review comments aren't reusable knowledge — they're nitpicks, generic advice any LLM knows, stale conventions, or contradictions. The value is in the minority that encode **team-specific, non-obvious decisions**, so the pipeline filters as much as it extracts:

1. **Extract** — AI reads each review thread for candidate lessons, including how it was resolved (accepted? pushed back on?).
2. **Cluster** — similar feedback across years of PRs is grouped (`"avoid N+1"`, `"missing with()"`, `"please eager load"` → one rule, 63 occurrences, 5 reviewers).
3. **Score** — on **specificity** (does it differ from what a frontier LLM says by default?), **consensus** (reviewers, contradiction rate), and **recency** (still enforced?).
4. **Approve** — a human signs off before anything ships. RepoMind proposes; the team lead disposes.
5. **Export** — approved rules render into a Claude Code skill the assistant auto-loads in the repo (more formats on the roadmap).

"Confidence: 92%" means the share of clustered comments consistent with the rule, weighted by recency and reviewer diversity — not a vibe.

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

## Who It's For

* **Established teams (core market)** — years of review history, real conventions, onboarding pain.
* **AI-first teams** — repo-specific context for Claude Code, maintained automatically (Cursor and Copilot on the roadmap).
* **Consultancies** — preserve client-specific practices across engagements.

Young repos have little review history; the product earns its keep on codebases with depth — which is where the budget is.

---

## Competitive Position

CodeRabbit has "learnings," Cursor has memories, Copilot auto-generates instructions — but each feeds its own tool. RepoMind is:

1. **Neutral** — one knowledge base, every assistant.
2. **Evidence-first** — linked PR provenance and human approval, not opaque memory.
3. **An artifact** — handbook and rules files live in the repo, not locked in a vendor.

---

## Roadmap

* **Phase 0 — Validate (now).** A CLI that ingests one repo's review history and emits candidate rules with evidence. The number that matters: **what fraction of rules are team-specific, correct, and current?**
* **Phase 1 — Product.** GitHub App, continuous ingestion, approve/curate workflow, exporters.
* **Phase 2 — Living knowledge.** Drift detection, new-rule alerts, handbook and onboarding generation.
* **Phase 3 — Beyond PRs.** ADRs, incident reports, postmortems, docs — the full repository brain.

---

## Data & Privacy

Read-only GitHub App scopes, no training on customer data, per-repo isolation, and a self-hosted option on the roadmap. This is the first question every serious buyer asks; the answer has to be boring.

---

**RepoMind mines years of pull request feedback into an evidence-backed, team-approved knowledge base, and exports it as the context files that make AI assistants — and new hires — write code the way your team actually works.**
