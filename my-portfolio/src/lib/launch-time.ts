/**
 * Finds the moment a site first went live, using only public GitHub data:
 *   1. its first deploy (Vercel records every deploy on the GitHub repo), or
 *   2. when the GitHub repo was created, if no deploys are recorded.
 * Safe to use on the server and in the browser. Returns an ISO date or null.
 */
export async function findLaunchTime(repo: string, init?: RequestInit): Promise<string | null> {
  const api = `https://api.github.com/repos/${repo}`;
  try {
    const res = await fetch(`${api}/deployments?per_page=100`, init);
    if (res.ok) {
      let deploys = (await res.json()) as Array<{ created_at?: string }>;
      // Newest come first, so the very first deploy is on the last page.
      const lastPage = res.headers.get("link")?.match(/<([^>]+)>;\s*rel="last"/)?.[1];
      if (lastPage) {
        const older = await fetch(lastPage, init);
        if (older.ok) deploys = (await older.json()) as Array<{ created_at?: string }>;
      }
      const first = earliest(deploys.map((d) => d.created_at));
      if (first) return first;
    }

    const repoRes = await fetch(api, init);
    if (repoRes.ok) return earliest([((await repoRes.json()) as { created_at?: string }).created_at]);
  } catch {
    // Offline or GitHub is busy: the caller falls back to something else.
  }
  return null;
}

function earliest(dates: Array<string | undefined>): string | null {
  const times = dates.map((d) => (d ? Date.parse(d) : Number.NaN)).filter(Number.isFinite);
  return times.length ? new Date(Math.min(...times)).toISOString() : null;
}
