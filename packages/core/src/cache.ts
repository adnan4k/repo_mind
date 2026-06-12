import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

/**
 * MVP persistence: JSON files under ~/.cache/repomind/<owner>__<repo>/.
 * Re-runs skip GitHub refetching and already-paid extraction calls. Lives in the
 * user's home cache — never in the analyzed project's working directory.
 * (SQLite/Drizzle replaces this when the approval workflow lands — see docs/DECISIONS.md.)
 */
export class JsonCache {
  constructor(private readonly dir: string) {}

  static forRepo(owner: string, name: string, root?: string): JsonCache {
    const base = root ?? path.join(os.homedir(), ".cache", "repomind");
    return new JsonCache(path.join(base, `${owner}__${name}`));
  }

  private file(name: string): string {
    return path.join(this.dir, `${name}.json`);
  }

  async read<T>(name: string): Promise<T | null> {
    try {
      return JSON.parse(await fs.readFile(this.file(name), "utf8")) as T;
    } catch {
      return null;
    }
  }

  async write(name: string, data: unknown): Promise<void> {
    await fs.mkdir(this.dir, { recursive: true });
    await fs.writeFile(this.file(name), JSON.stringify(data, null, 2));
  }
}
