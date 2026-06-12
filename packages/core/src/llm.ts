import { generateText, type LanguageModel } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { createOpenAI } from "@ai-sdk/openai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import PQueue from "p-queue";
import type { z } from "zod";

export type Provider = "deepseek" | "openai" | "anthropic" | "openai-compatible";

export interface LlmConfig {
  provider: Provider;
  model: string;
  apiKey: string;
  /** Required for openai-compatible (Ollama, vLLM, LM Studio, ...). */
  baseUrl?: string;
  concurrency: number;
}

const DEFAULT_MODELS: Record<Provider, string> = {
  deepseek: "deepseek-chat",
  openai: "gpt-4o-mini",
  anthropic: "claude-opus-4-8",
  "openai-compatible": "",
};

const KEY_ENV_VARS: Record<Provider, string> = {
  deepseek: "DEEPSEEK_API_KEY",
  openai: "OPENAI_API_KEY",
  anthropic: "ANTHROPIC_API_KEY",
  "openai-compatible": "REPOMIND_API_KEY",
};

export function llmConfigFromEnv(env: NodeJS.ProcessEnv = process.env): LlmConfig {
  const provider = (env.REPOMIND_PROVIDER ?? "deepseek") as Provider;
  if (!(provider in DEFAULT_MODELS)) {
    throw new Error(
      `Unknown REPOMIND_PROVIDER "${provider}". Use: deepseek | openai | anthropic | openai-compatible`,
    );
  }
  const model = env.REPOMIND_MODEL ?? DEFAULT_MODELS[provider];
  if (!model) {
    throw new Error(`REPOMIND_MODEL is required for provider "${provider}".`);
  }
  const apiKey = env.REPOMIND_API_KEY ?? env[KEY_ENV_VARS[provider]] ?? "";
  if (!apiKey && provider !== "openai-compatible") {
    throw new Error(
      `No API key found. Set REPOMIND_API_KEY or ${KEY_ENV_VARS[provider]}.`,
    );
  }
  return {
    provider,
    model,
    apiKey,
    baseUrl: env.REPOMIND_BASE_URL,
    concurrency: Number(env.REPOMIND_CONCURRENCY ?? 4),
  };
}

function createModel(cfg: LlmConfig): LanguageModel {
  switch (cfg.provider) {
    case "deepseek":
      return createDeepSeek({ apiKey: cfg.apiKey })(cfg.model);
    case "openai":
      return createOpenAI({ apiKey: cfg.apiKey })(cfg.model);
    case "anthropic":
      return createAnthropic({ apiKey: cfg.apiKey })(cfg.model);
    case "openai-compatible": {
      if (!cfg.baseUrl) {
        throw new Error("REPOMIND_BASE_URL is required for provider openai-compatible.");
      }
      return createOpenAICompatible({
        name: "openai-compatible",
        baseURL: cfg.baseUrl,
        apiKey: cfg.apiKey || "unused",
      })(cfg.model);
    }
  }
}

/** Pull the first JSON object/array out of a completion that may include prose or fences. */
function extractJson(text: string): string {
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(text);
  const body = fenced?.[1] ?? text;
  const start = body.search(/[[{]/);
  if (start === -1) return body.trim();
  const open = body[start];
  const close = open === "{" ? "}" : "]";
  const end = body.lastIndexOf(close);
  return end > start ? body.slice(start, end + 1) : body.slice(start);
}

export interface LlmStats {
  calls: number;
  retries: number;
  failures: number;
}

/**
 * BYOK client. Lowest-common-denominator contract (see llm-providers skill):
 * plain completion + JSON shape described in the prompt + Zod parse + one retry.
 * All calls share one bounded queue.
 */
export class LlmClient {
  private readonly model: LanguageModel;
  private readonly queue: PQueue;
  readonly stats: LlmStats = { calls: 0, retries: 0, failures: 0 };

  constructor(readonly config: LlmConfig) {
    this.model = createModel(config);
    this.queue = new PQueue({ concurrency: config.concurrency });
  }

  /** Returns null after a failed retry — callers record the failure and continue. */
  async callWithSchema<T>(prompt: string, schema: z.ZodType<T>): Promise<T | null> {
    const result = await this.queue.add(async () => {
      let lastError = "";
      for (let attempt = 0; attempt < 2; attempt++) {
        const fullPrompt =
          attempt === 0
            ? prompt
            : `${prompt}\n\nYour previous response was not valid (${lastError}). Respond with ONLY the JSON, no other text.`;
        this.stats.calls++;
        if (attempt > 0) this.stats.retries++;
        try {
          const { text } = await generateText({ model: this.model, prompt: fullPrompt });
          const parsed = schema.safeParse(JSON.parse(extractJson(text)));
          if (parsed.success) return parsed.data;
          lastError = parsed.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .slice(0, 3)
            .join("; ");
        } catch (err) {
          lastError = err instanceof Error ? err.message.slice(0, 200) : "unknown error";
        }
      }
      this.stats.failures++;
      return null;
    });
    return result ?? null;
  }
}
