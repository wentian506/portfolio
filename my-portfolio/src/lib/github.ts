import { isPlaceholder } from "./utils";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubStats {
  followers: number | null;
  following: number | null;
  repos: number | null;
  prs: number | null;
  issues: number | null;
  contributionsThisYear: number | null;
  /** Columns of 7 days (Sun → Sat). `null` = a day in the future. */
  weeks: Array<Array<ContributionDay | null>>;
}

const REVALIDATE_SECONDS = 3600; // refresh the numbers at most once an hour
const WEEKS_TO_SHOW = 9;

async function getJson<T>(url: string, headers?: HeadersInit): Promise<T | null> {
  try {
    const res = await fetch(url, { headers, next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Public GitHub data — no token needed. Optionally add GITHUB_TOKEN as an
 * environment variable (e.g. in Vercel) for higher API rate limits.
 */
export async function getGithubStats(username: string): Promise<GithubStats | null> {
  if (isPlaceholder(username)) return null;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };
  const user = encodeURIComponent(username);

  const [profile, prs, issues, calendar] = await Promise.all([
    getJson<{ followers: number; following: number; public_repos: number }>(
      `https://api.github.com/users/${user}`,
      headers,
    ),
    getJson<{ total_count: number }>(
      `https://api.github.com/search/issues?q=author:${user}+type:pr&per_page=1`,
      headers,
    ),
    getJson<{ total_count: number }>(
      `https://api.github.com/search/issues?q=author:${user}+type:issue&per_page=1`,
      headers,
    ),
    // Free community API that returns the public contribution calendar.
    getJson<{ contributions: ContributionDay[] }>(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
    ),
  ]);

  if (!profile && !calendar) return null;

  const days = calendar?.contributions ?? [];
  const year = String(new Date().getFullYear());

  return {
    followers: profile?.followers ?? null,
    following: profile?.following ?? null,
    repos: profile?.public_repos ?? null,
    prs: prs?.total_count ?? null,
    issues: issues?.total_count ?? null,
    contributionsThisYear: calendar
      ? days.filter((d) => d.date.startsWith(year)).reduce((sum, d) => sum + d.count, 0)
      : null,
    weeks: toWeeks(days),
  };
}

/** Turns a flat list of days into the last N weeks, aligned Sunday → Saturday. */
function toWeeks(days: ContributionDay[]): GithubStats["weeks"] {
  if (days.length === 0) return [];
  const byDate = new Map(days.map((d) => [d.date, d]));
  const last = new Date(`${days[days.length - 1].date}T00:00:00Z`);

  const start = new Date(last);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay() - (WEEKS_TO_SHOW - 1) * 7);

  const weeks: GithubStats["weeks"] = [];
  for (let w = 0; w < WEEKS_TO_SHOW; w++) {
    const week: Array<ContributionDay | null> = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + w * 7 + d);
      const key = date.toISOString().slice(0, 10);
      week.push(date > last ? null : (byDate.get(key) ?? { date: key, count: 0, level: 0 }));
    }
    weeks.push(week);
  }
  return weeks;
}
