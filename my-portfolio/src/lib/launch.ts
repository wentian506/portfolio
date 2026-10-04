import { portfolio } from "@/data/portfolio";
import { findLaunchTime } from "./launch-time";

export interface LaunchInfo {
  /** When the site first went live, if the server could find out. */
  launchedAt: string | null;
  /** "owner/repo" of your GitHub repository (known on Vercel), so the browser can look it up as a backup. */
  repo: string | null;
  /** When this version was built. Only used if nothing better is known (e.g. on your computer). */
  builtAt: string;
}

/**
 * Start time for the "Live since launch" clock:
 *   1. `launch.date` in portfolio.ts, if you set one
 *   2. otherwise your first Vercel deploy (looked up on GitHub), so the clock
 *      keeps counting when you update the site later
 *   3. otherwise when this version was built
 */
export async function getLaunchInfo(): Promise<LaunchInfo> {
  const builtAt = process.env.BUILT_AT || new Date().toISOString();

  const fixed = portfolio.launch.date.trim();
  if (fixed && Number.isFinite(Date.parse(fixed))) {
    return { launchedAt: new Date(fixed).toISOString(), repo: null, builtAt };
  }

  // Vercel tells every build which GitHub repository it came from.
  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const slug = process.env.VERCEL_GIT_REPO_SLUG;
  const repo = owner && slug ? `${owner}/${slug}` : null;
  if (!repo) return { launchedAt: null, repo: null, builtAt };

  const launchedAt = await findLaunchTime(repo, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    next: { revalidate: 3600 },
  });
  return { launchedAt, repo, builtAt };
}
