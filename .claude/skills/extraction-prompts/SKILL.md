---
name: extraction-prompts
description: Rules for writing or editing any LLM prompt in the RepoMind pipeline (extraction, clustering, synthesis, scoring). Read this before creating or modifying prompt text, few-shot examples, or output schemas for LLM calls.
---

# Designing RepoMind pipeline prompts

These rules exist because the product fails quietly if the pipeline outputs generic
best-practice advice. The value is concentrated in team-specific, non-obvious rules —
every prompt must be engineered toward surfacing those and demoting everything else.

## Hard rules

1. **Ecosystem-neutral.** No framework-specific few-shot examples (no Laravel, no React,
   no Rails). The repo's primary language/framework is injected at runtime as a context
   variable (`{{repo_language}}`); the prompt template itself must read correctly for a
   Go repo and a PHP repo alike. If you need few-shot examples, write one per distinct
   *pattern* (style nit, architecture decision, security rule) using neutral pseudo-stacks,
   or parametrize them.

2. **Extract the lesson, not the comment.** A review comment is an instance; the output is
   the generalized rule. "Please wrap these two writes in a transaction" →
   "Wrap related writes in a transaction when they must succeed or fail together."
   Prompts must explicitly instruct this generalization step.

3. **Capture the resolution.** Whether the feedback was accepted, pushed back on, or
   ignored changes the rule's weight. Extraction prompts always receive the full thread
   (not a lone comment) and must output a `resolution` field
   (`accepted | disputed | ignored | unknown`).

4. **Specificity is a first-class output.** Every extraction/scoring prompt outputs a
   `specificity` judgment: would a frontier LLM already give this advice unprompted?
   (`generic | conventional | team_specific`). Generic candidates are kept in the DB but
   demoted — never silently dropped (we need the denominator for the Phase 0 metric).

5. **Schema-validated output only.** Every LLM call has a Zod schema in
   `packages/core/src/types.ts`. The JSON shape is described in the prompt (BYOK lowest
   common denominator — do not rely on provider-native structured outputs), validated
   with Zod, retried once on parse failure, then recorded as a failed extraction. Never
   parse LLM output with regex or string matching.

6. **No model-specific phrasing.** Users bring their own model. Avoid prompt tricks tuned
   to one vendor; keep instructions plain, explicit, and short. If a provider needs
   special handling it belongs in the provider capability map, not the prompt.

## Output vocabulary (keep consistent across all prompts)

- Categories: `security | performance | architecture | testing | style | process | other`
- Resolution: `accepted | disputed | ignored | unknown`
- Specificity: `generic | conventional | team_specific`

If you need to change this vocabulary, change it in `types.ts` first and update every
prompt in the same commit.

## Testing a prompt change

Run the extraction against the fixture threads in `packages/core/test/fixtures/` (real
anonymized review threads across ecosystems) and check: no schema failures, specificity
labels stable on the known-generic fixtures, and team-specific fixtures still extracted.
A prompt change that improves one ecosystem but regresses another is a regression.
