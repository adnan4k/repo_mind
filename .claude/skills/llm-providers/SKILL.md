---
name: llm-providers
description: Rules for the BYOK LLM layer — adding or modifying provider adapters, the capability map, model configuration, key handling, or any code that calls an LLM. Read before touching packages/core LLM-call code.
---

# RepoMind LLM layer (BYOK)

Users bring their own API key and choose their own model. RepoMind never ships with a
key, never proxies requests through our infrastructure, and never assumes a specific
provider. The Vercel AI SDK (`ai` package) is the only LLM dependency.

## Hard rules

1. **Lowest common denominator is the baseline.** Every pipeline LLM call must work with:
   plain text completion + JSON shape described in the prompt + Zod parse + **one** retry
   on parse failure. A second failure is recorded as a failed extraction (thread ID +
   error), never thrown past the pipeline stage. No provider-native structured outputs,
   batch APIs, or caching in pipeline logic.

2. **Provider features live behind the capability map.** A single module exports
   `getCapabilities(provider)` → `{ supportsBatch, supportsCaching, supportsStructuredOutput, maxConcurrency }`.
   Optimizations switch on this map inside the LLM layer; pipeline stages must not know
   which provider is running.

3. **Keys come from env/config and go nowhere else.** Read from `REPOMIND_API_KEY` (and
   `REPOMIND_PROVIDER`, `REPOMIND_MODEL`) or the repo's `repomind.config` file. Never log
   a key, never include it in error messages, never write it to SQLite. When logging
   requests for debugging, log the prompt hash and token counts, not raw secrets.

4. **Local models are first-class.** The OpenAI-compatible adapter pointed at
   Ollama/vLLM/LM Studio must pass the same test suite as hosted providers. "Nothing
   leaves my machine" is a selling point — don't break it with hosted-only assumptions
   (e.g. assuming high rate limits or large context windows).

5. **Concurrency is bounded centrally.** All calls go through one `p-queue` instance
   configured from the capability map. Pipeline stages never fire unbounded
   `Promise.all` fan-outs at a provider.

6. **Two model roles, not one.** Config distinguishes `extractionModel` (bulk, cheap is
   fine) and `synthesisModel` (cluster naming, specificity scoring — quality-sensitive).
   Default both to the same model if the user sets only one. Never hardcode model IDs.

## Error handling

- Rate-limit (429-style) errors: exponential backoff, respect provider retry-after when
  exposed, max 3 attempts, then surface as a stage-level warning with counts.
- Schema-parse failures after retry: persist `{threadId, rawOutput, error}` so prompt
  regressions are debuggable; continue the run.
- A pipeline run must end with a summary: calls made, failures, estimated tokens.

## Testing

Adapters are tested against recorded fixtures (no live API calls in CI). When adding a
provider, add: a capability-map entry, a fixture-based parse test, and a line in
`docs/DECISIONS.md` only if the addition changes a default.
