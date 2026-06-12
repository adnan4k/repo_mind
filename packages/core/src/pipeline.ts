import { JsonCache } from "./cache.js";
import { extractAll, type ExtractStats } from "./extract.js";
import { ingestRepo, type IngestResult } from "./ingest.js";
import { LlmClient, type LlmConfig, type LlmStats } from "./llm.js";
import { mergeCandidates } from "./merge.js";
import { renderReport } from "./report.js";
import type { Rule } from "./types.js";

export interface AnalyzeOptions {
  owner: string;
  name: string;
  githubToken: string;
  llm: LlmConfig;
  maxPrs: number;
  /** Cache + output root; defaults to cwd. */
  workDir?: string;
  onProgress?: (stage: string, message: string) => void;
}

export interface AnalyzeResult {
  report: string;
  rules: Rule[];
  summary: {
    prsScanned: number;
    threads: number;
    candidates: number;
    rules: number;
    extract: ExtractStats;
    llm: LlmStats;
  };
}

export async function analyzeRepo(opts: AnalyzeOptions): Promise<AnalyzeResult> {
  const progress = opts.onProgress ?? (() => {});
  const cache = JsonCache.forRepo(opts.owner, opts.name, opts.workDir);
  const client = new LlmClient(opts.llm);

  // 1. Ingest (cached: re-runs skip GitHub entirely; key includes maxPrs so a
  // small scan never short-circuits a larger one)
  const threadsKey = `threads-p${opts.maxPrs}`;
  let ingested = await cache.read<IngestResult>(threadsKey);
  if (ingested) {
    progress("ingest", `using cached threads (${ingested.threads.length})`);
  } else {
    ingested = await ingestRepo({
      owner: opts.owner,
      name: opts.name,
      token: opts.githubToken,
      maxPrs: opts.maxPrs,
      onProgress: (m) => progress("ingest", m),
    });
    await cache.write(threadsKey, ingested);
  }
  const { context, threads, prsScanned } = ingested;

  // 2. Extract (cached per thread)
  progress("extract", `extracting lessons from ${threads.length} threads via ${opts.llm.provider}/${opts.llm.model}`);
  const { candidates, stats: extractStats } = await extractAll(
    client,
    threads,
    context,
    cache,
    (done, total) => {
      if (done % 25 === 0 || done === total) progress("extract", `${done}/${total} threads`);
    },
  );

  // 3. Merge duplicates per category
  progress("merge", `merging ${candidates.length} candidates`);
  const rules = await mergeCandidates(client, candidates, threads, (category) =>
    progress("merge", `category: ${category}`),
  );

  // Persist rules so `repomind export` can render them without re-running the pipeline
  await cache.write("rules", { context, rules });

  // 4. Report
  const report = renderReport({
    context,
    prsScanned,
    threadCount: threads.length,
    candidates,
    rules,
  });

  return {
    report,
    rules,
    summary: {
      prsScanned,
      threads: threads.length,
      candidates: candidates.length,
      rules: rules.length,
      extract: extractStats,
      llm: client.stats,
    },
  };
}
