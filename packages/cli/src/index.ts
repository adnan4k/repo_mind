#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";
import {
  analyzeRepo,
  JsonCache,
  llmConfigFromEnv,
  renderClaudeSkill,
  type RepoContext,
  type Rule,
} from "@repomind/core";

import os from "node:os";

// Config resolution: shell env vars win, then ~/.config/repomind/env, then .env in
// the current directory. The user-level config is loaded FIRST (loadEnvFile never
// overrides already-set variables) because project .env files routinely carry their
// own stale GITHUB_TOKEN for unrelated purposes (Composer, CI) — credentials the
// user deliberately configured for RepoMind must not be shadowed by those.
for (const envPath of [
  path.join(os.homedir(), ".config", "repomind", "env"),
  path.join(process.cwd(), ".env"),
]) {
  try {
    process.loadEnvFile(envPath);
  } catch {
    // not present — fine
  }
}

const program = new Command();

program
  .name("repomind")
  .description(
    "Mine a repository's PR review history into an evidence-backed engineering knowledge base.",
  )
  .version("0.0.1");

program
  .command("analyze")
  .argument("<repo>", "repository to analyze, e.g. owner/name")
  .option("--max-prs <n>", "merged PRs to scan (most recently updated first)", "50")
  .option("--out <file>", "report output path", "repomind-report.md")
  .description("ingest review history, extract rules, write a markdown report")
  .action(async (repoArg: string, opts: { maxPrs: string; out: string }) => {
    const [owner, name] = repoArg.split("/");
    if (!owner || !name) {
      console.error(`Expected <owner>/<name>, got "${repoArg}"`);
      process.exit(1);
    }
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      console.error("GITHUB_TOKEN is not set (in the shell or in .env).");
      process.exit(1);
    }

    let llm;
    try {
      llm = llmConfigFromEnv();
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
      process.exit(1);
    }

    console.log(`repomind · ${owner}/${name} · ${llm.provider}/${llm.model}\n`);
    const started = Date.now();

    try {
      const result = await analyzeRepo({
        owner,
        name,
        githubToken,
        llm,
        maxPrs: Number(opts.maxPrs),
        onProgress: (stage, message) => console.log(`  [${stage}] ${message}`),
      });

      const outPath = path.resolve(opts.out);
      await fs.writeFile(outPath, result.report);

      const s = result.summary;
      const seconds = Math.round((Date.now() - started) / 1000);
      console.log(`
Done in ${seconds}s.
  PRs scanned:        ${s.prsScanned}
  Review threads:     ${s.threads}
  Candidate lessons:  ${s.candidates}
  Merged rules:       ${s.rules}
  LLM calls:          ${s.llm.calls} (${s.llm.retries} retries, ${s.llm.failures} failures)

Report: ${outPath}`);
    } catch (err) {
      console.error(`\nFailed: ${err instanceof Error ? err.message : err}`);
      process.exit(1);
    }
  });

program
  .command("export")
  .argument("<repo>", "previously analyzed repository, e.g. owner/name")
  .option("--dir <dir>", "directory to write the skill folder into", ".claude/skills")
  .option("--all", "include generic-specificity rules too", false)
  .description("render mined rules as a Claude Code skill folder")
  .action(async (repoArg: string, opts: { dir: string; all: boolean }) => {
    const [owner, name] = repoArg.split("/");
    if (!owner || !name) {
      console.error(`Expected <owner>/<name>, got "${repoArg}"`);
      process.exit(1);
    }
    const cache = JsonCache.forRepo(owner, name);
    const stored = await cache.read<{ context: RepoContext; rules: Rule[] }>("rules");
    if (!stored) {
      console.error(`No analysis found for ${repoArg}. Run: repomind analyze ${repoArg}`);
      process.exit(1);
    }

    const skill = renderClaudeSkill(stored.context, stored.rules, {
      includeGeneric: opts.all,
    });
    const skillDir = path.resolve(opts.dir, skill.folderName);
    await fs.mkdir(skillDir, { recursive: true });
    await fs.writeFile(path.join(skillDir, "SKILL.md"), skill.content);

    const excluded = skill.excludedGeneric
      ? ` (${skill.excludedGeneric} generic rules excluded — use --all to keep them)`
      : "";
    console.log(`Skill written: ${path.join(skillDir, "SKILL.md")}
  Rules included: ${skill.included}${excluded}

Review the file before committing — that's your approval step.`);
  });

program.parseAsync();
