import { graphql } from "@octokit/graphql";
import { RepoContext, ReviewThread } from "./types.js";

const QUERY = /* GraphQL */ `
  query ($owner: String!, $name: String!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      description
      primaryLanguage {
        name
      }
      pullRequests(
        states: MERGED
        first: 25
        after: $cursor
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          number
          title
          reviewThreads(first: 50) {
            nodes {
              id
              isResolved
              path
              comments(first: 20) {
                nodes {
                  id
                  body
                  url
                  createdAt
                  diffHunk
                  author {
                    login
                    __typename
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface GqlComment {
  id: string;
  body: string;
  url: string;
  createdAt: string;
  diffHunk: string | null;
  author: { login: string; __typename: string } | null;
}
interface GqlThread {
  id: string;
  isResolved: boolean;
  path: string | null;
  comments: { nodes: (GqlComment | null)[] | null };
}
interface GqlPr {
  number: number;
  title: string;
  reviewThreads: { nodes: (GqlThread | null)[] | null };
}
interface GqlResponse {
  repository: {
    description: string | null;
    primaryLanguage: { name: string } | null;
    pullRequests: {
      pageInfo: { hasNextPage: boolean; endCursor: string | null };
      nodes: (GqlPr | null)[] | null;
    };
  };
}

export interface IngestResult {
  context: RepoContext;
  threads: ReviewThread[];
  prsScanned: number;
}

export interface IngestOptions {
  owner: string;
  name: string;
  token: string;
  maxPrs: number;
  onProgress?: (message: string) => void;
}

const MAX_DIFF_HUNK_CHARS = 1500;

/** Bot comments (linters, CI, code-review bots) are noise for team-knowledge mining. */
function isBot(comment: GqlComment): boolean {
  return (
    comment.author === null ||
    comment.author.__typename === "Bot" ||
    comment.author.login.endsWith("[bot]")
  );
}

export async function ingestRepo(opts: IngestOptions): Promise<IngestResult> {
  const client = graphql.defaults({
    headers: { authorization: `token ${opts.token}` },
  });

  const threads: ReviewThread[] = [];
  let context: RepoContext | null = null;
  let cursor: string | null = null;
  let prsScanned = 0;

  while (prsScanned < opts.maxPrs) {
    const resp: GqlResponse = await client(QUERY, {
      owner: opts.owner,
      name: opts.name,
      cursor,
    });
    const repo = resp.repository;
    context ??= RepoContext.parse({
      owner: opts.owner,
      name: opts.name,
      primaryLanguage: repo.primaryLanguage?.name ?? null,
      description: repo.description,
    });

    for (const pr of repo.pullRequests.nodes ?? []) {
      if (!pr || prsScanned >= opts.maxPrs) continue;
      prsScanned++;
      for (const thread of pr.reviewThreads.nodes ?? []) {
        if (!thread) continue;
        const comments = (thread.comments.nodes ?? []).filter(
          (c): c is GqlComment =>
            c !== null && c.body.trim().length > 0 && !isBot(c),
        );
        if (comments.length === 0) continue;
        threads.push(
          ReviewThread.parse({
            id: thread.id,
            prNumber: pr.number,
            prTitle: pr.title,
            path: thread.path,
            diffHunk: comments[0]?.diffHunk?.slice(0, MAX_DIFF_HUNK_CHARS) ?? null,
            isResolved: thread.isResolved,
            comments: comments.map((c) => ({
              id: c.id,
              author: c.author?.login ?? "ghost",
              body: c.body,
              url: c.url,
              createdAt: c.createdAt,
            })),
          }),
        );
      }
    }

    opts.onProgress?.(`scanned ${prsScanned} PRs, ${threads.length} review threads`);
    const page = repo.pullRequests.pageInfo;
    if (!page.hasNextPage || !page.endCursor) break;
    cursor = page.endCursor;
  }

  if (!context) {
    throw new Error(`Repository ${opts.owner}/${opts.name} not found or inaccessible.`);
  }
  return { context, threads, prsScanned };
}
