---
name: exporters
description: Specs and rules for rendering approved rules into AI context files — CLAUDE.md, .cursor/rules, .github/copilot-instructions.md, AGENTS.md. Read before adding or modifying any export format or template.
---

# RepoMind exporters

Exporters render **approved** rules from the knowledge base into the files AI coding
assistants read. The output lands in *the user's* repo — treat it as a guest: clean
diffs, clearly marked managed sections, nothing clobbered.

## Hard rules

1. **Only approved rules ship.** `status: "approved"` is the sole gate. Candidates,
   rejected, and retired rules never appear in any export.

2. **Every exported rule carries its receipts.** At minimum: occurrence count, reviewer
   count, and a link to one representative PR thread. Provenance is the product — an
   export format that can't fit evidence links still includes the counts.

3. **Deterministic output.** Same input DB → byte-identical output. Stable ordering
   (category, then confidence desc, then rule id). No timestamps of the "generated at"
   kind inside managed content — they pollute diffs. A single generated-by header line
   with the RepoMind version is fine.

4. **Managed-section markers.** When writing into a file the user may also hand-edit
   (CLAUDE.md, AGENTS.md), wrap our content in
   `<!-- repomind:start -->` / `<!-- repomind:end -->` and only ever replace what's
   between the markers. If markers are absent, append a new managed section; never
   rewrite the user's own content. Files we fully own (`.cursor/rules/repomind-*.mdc`)
   are replaced wholesale.

5. **One renderer per format, shared model.** All renderers consume the same
   `Rule[]` input. Format-specific logic stays in the renderer; no format ever reaches
   into the DB directly.

## Target format specs

| Format | Path | Shape |
|---|---|---|
| Claude | `CLAUDE.md` (managed section) | Plain markdown. Terse imperative rules grouped by category; keep the whole section small — it loads into every session's context. |
| Cursor | `.cursor/rules/repomind-<category>.mdc` | MDC: YAML frontmatter (`description`, optional `globs`, `alwaysApply: false`) + markdown body. One file per category. |
| Copilot | `.github/copilot-instructions.md` (managed section) | Plain markdown, no frontmatter. Same managed-marker treatment as CLAUDE.md. |
| Agents | `AGENTS.md` (managed section) | Plain markdown, tool-agnostic phrasing (no vendor names in rule text). |

## Content style for rendered rules

- Imperative, one line per rule: "Wrap related writes in a transaction."
- Optional one-line "why" only when the evidence shows the reason was load-bearing.
- Evidence suffix format: `(seen 63× from 5 reviewers — [example](url))`.
- Context-budget aware: cap the always-loaded formats (CLAUDE.md section) to the
  top rules by confidence; full detail belongs in `.repomind/` source files.

## Testing

Snapshot tests per format against a shared fixture `Rule[]`. A renderer change that
alters snapshots must show *why* in the PR/commit message. Round-trip test for managed
markers: export → hand-edit outside markers → export again → user content intact.
