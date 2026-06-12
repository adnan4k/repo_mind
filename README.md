# RepoMind (working name)

**Turn years of pull request feedback into AI-ready team knowledge — with receipts.**

---

## The Problem

Engineering teams generate enormous knowledge through code review. Every day, senior engineers leave comments like:

```text
Use a transaction here.
This endpoint needs authorization.
Move this logic into a service.
We don't use repositories in this codebase — query from the model.
```

That knowledge is trapped inside thousands of merged PRs:

* Developers forget the feedback.
* New team members never see it.
* AI coding assistants don't know it.
* The same lessons get re-taught, review after review, for years.

Meanwhile, teams are now hand-writing `CLAUDE.md`, `.cursor/rules`, and `copilot-instructions.md` files — from memory. The source of truth for "how we actually build software here" already exists in the review history. Nobody is mining it.

---

## What RepoMind Does

RepoMind analyzes a repository's pull request history and produces a **team engineering knowledge base** where every rule is backed by evidence:

```yaml
Rule: Use events for cross-domain communication
Category: Architecture
Evidence: flagged 17 times by 4 reviewers over 2 years
Last seen: 3 weeks ago
Examples: 6 linked PR threads
Status: approved by team lead
```

Then it exports that knowledge into the formats AI assistants and humans already consume:

* `.claude/skills/` and `CLAUDE.md` — Claude Code
* `.cursor/rules/` — Cursor
* `.github/copilot-instructions.md` — Copilot
* `AGENTS.md` — tool-agnostic
* An engineering handbook — humans

---

## Why Provenance Is the Product

Anyone can ask an LLM to generate "engineering guidelines" — and get plausible, generic output nobody trusts or maintains.

RepoMind rules are different in three ways:

1. **They're yours.** Mined from your team's actual decisions, not industry boilerplate.
2. **They have receipts.** Every rule links to the real PR discussions it came from. A skeptical engineer can click through and see their own tech lead saying it, 17 times.
3. **They're current.** Rules are weighted by recency and flagged when the team's behavior changes.

Trust is what makes a rules file get committed, maintained, and obeyed. Provenance is what creates trust.

---

## The Hard Problem (and how we handle it)

Most review comments are **not** reusable knowledge. They are:

* Line-specific nitpicks that don't generalize
* Generic best practices any LLM already knows ("avoid N+1 queries")
* Stale conventions the team has since abandoned
* Contradictions between reviewers

The naive version of this product — "summarize all PR comments into rules" — produces a file of obvious advice that adds nothing to an AI assistant's context. The value is concentrated in the minority of comments that encode **team-specific, non-obvious decisions**.

So the pipeline is built around filtering, not just extraction:

### 1. Extract
AI reads review comments and threads, and identifies candidate lessons — including the resolution (was the feedback accepted? pushed back on?).

### 2. Cluster
Similar feedback across years of PRs is grouped:

```text
"Use eager loading."  "Avoid N+1."  "Missing with()."  "Please eager load memberships."
        → one candidate rule, 63 occurrences, 5 reviewers
```

### 3. Score
Each candidate rule is scored on:

* **Specificity** — does this differ from what a frontier LLM would say by default? Generic rules are demoted or dropped.
* **Consensus** — multiple reviewers, low contradiction rate.
* **Recency** — still being enforced, or last seen in 2022?

"Confidence: 92%" has a defined meaning: the share of clustered comments consistent with the rule, weighted by recency and reviewer diversity — not a vibe.

### 4. Approve
A human reviews the candidate rules before anything ships. RepoMind proposes; the team lead disposes. This step is non-negotiable — it's what keeps the output authoritative instead of noisy.

### 5. Export
Approved rules are rendered into each target format, kept in sync as the knowledge base evolves.

---

## Example

**Without RepoMind:**

```text
Senior engineer: "Wrap these writes in a transaction."
Developer fixes it.
Three weeks later, another developer — or an AI assistant — makes the same mistake.
```

**With RepoMind:**

The AI assistant's context already contains the team's approved, evidence-backed rules before it writes a line. The senior engineer reviews architecture instead of re-teaching the same lesson for the fifth year.

---

## Who It's For

* **Established teams (the core market):** years of review history, real conventions, onboarding pain. RepoMind works best where the data is richest.
* **AI-first teams:** repository-specific context for Claude Code, Cursor, and Copilot, generated and maintained automatically.
* **Consulting companies:** preserve client-specific engineering practices across engagements.

(Honest caveat: very young repos have little review history. The product earns its keep on codebases with depth — which is also where the budget is.)

---

## Competitive Position

This space is active: CodeRabbit has "learnings," Cursor has memories, Copilot auto-generates instructions. Each vendor feeds its own tool.

RepoMind's position:

1. **Neutral export layer.** One knowledge base, every assistant. Teams use multiple AI tools; vendors will never serve each other.
2. **Evidence-first.** Rules with linked PR provenance and human approval, not opaque memory.
3. **Knowledge as an artifact.** The handbook and rules files are durable team assets that live in the repo, not state locked inside a vendor's product.

---

## Roadmap

### Phase 0 — Validate the core thesis (now)
A CLI that ingests one repo's review history via the GitHub API and emits candidate rules with evidence. Run it against large open-source repos and measure the number that matters: **what fraction of extracted rules are team-specific, correct, and current?** If that ratio is low, everything else is moot. If it's high, the demo writes itself.

### Phase 1 — Product
GitHub App, continuous ingestion of new reviews, the approve/curate workflow, exporters for Claude / Cursor / Copilot / AGENTS.md.

### Phase 2 — Living knowledge
Drift detection ("this rule hasn't been enforced in 8 months — retire it?"), new-rule alerts, handbook generation, onboarding guides.

### Phase 3 — Beyond PRs
Architecture decision records, incident reports, postmortems, docs — the full repository brain.

---

## Data & Privacy

PR discussions are sensitive. From day one: read-only GitHub App scopes, no training on customer data, per-repo data isolation, and a self-hosted option on the roadmap for enterprises that won't ship review history to a third party. This is the first question every serious buyer asks; the answer has to be boring.

---

## One-Sentence Pitch

**RepoMind mines years of pull request feedback into an evidence-backed, team-approved engineering knowledge base, and exports it as the context files that make AI assistants — and new hires — write code the way your team actually works.**
