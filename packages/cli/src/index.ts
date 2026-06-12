#!/usr/bin/env node
import { Command } from "commander";

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
  .option("--since <date>", "only ingest PRs merged after this date")
  .description("ingest review history and extract candidate rules")
  .action(async (repo: string) => {
    // Pipeline wiring lands here: ingest → extract → cluster → score
    console.log(`analyze ${repo} — not implemented yet`);
  });

program
  .command("export")
  .option("--format <format>", "claude | cursor | copilot | agents | all", "all")
  .description("render approved rules into AI context files")
  .action(async () => {
    console.log("export — not implemented yet");
  });

program.parseAsync();
