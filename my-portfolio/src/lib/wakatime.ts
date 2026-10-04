/**
 * Real-time coding time from WakaTime (https://wakatime.com). It records the
 * time you spend coding in VS Code automatically.
 *
 * How it works:
 *   1. You add the WAKATIME_API_KEY environment variable (GUIDE.md, Step 4).
 *   2. /api/coding-time (src/app/api/coding-time/route.ts) asks WakaTime for
 *      your numbers. The key stays on the server, visitors never see it.
 *   3. The Coding Time card asks /api/coding-time every minute and, while
 *      you're coding, ticks today's timer every second.
 *
 * Without a key, a public WakaTime share link in portfolio.ts can still show
 * your total hours (no live timer).
 */

/** Advanced: point this at Wakapi or another WakaTime-compatible server. */
const API = (process.env.WAKATIME_API_URL || "https://wakatime.com/api/v1").replace(/\/+$/, "");

export interface CodingStats {
  /** false until WAKATIME_API_KEY (or a share link) is set up. */
  configured: boolean;
  /** Everything WakaTime has ever recorded, in seconds. */
  totalSeconds: number | null;
  /** Today so far, in seconds (API key only). */
  todaySeconds: number | null;
  /** When WakaTime last heard from your editor (ISO time). Recent = "Coding now". */
  lastHeartbeatAt: string | null;
  /** e.g. "VS Code". */
  editor: string | null;
  /** Only filled in when `wakatime.showProject` is true. */
  project: string | null;
  /** Language you've used most today, e.g. "Python". */
  language: string | null;
}

const EMPTY: CodingStats = {
  configured: false,
  totalSeconds: null,
  todaySeconds: null,
  lastHeartbeatAt: null,
  editor: null,
  project: null,
  language: null,
};

async function getJson<T>(url: string, headers?: HeadersInit): Promise<T | null> {
  try {
    // Always fresh. /api/coding-time is cached for 20 s instead (see route.ts).
    const res = await fetch(url, { headers, cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

const number = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? value : null);

const EDITORS: Record<string, string> = {
  vscode: "VS Code",
  "vs code": "VS Code",
  "visual studio code": "VS Code",
  cursor: "Cursor",
  windsurf: "Windsurf",
  pycharm: "PyCharm",
  intellij: "IntelliJ IDEA",
  idea: "IntelliJ IDEA",
  webstorm: "WebStorm",
  androidstudio: "Android Studio",
  "android studio": "Android Studio",
  jupyter: "Jupyter",
  jupyterlab: "JupyterLab",
  sublime: "Sublime Text",
  vim: "Vim",
  neovim: "Neovim",
  zed: "Zed",
  xcode: "Xcode",
  eclipse: "Eclipse",
  chrome: "Chrome",
};

function prettyEditor(name: unknown) {
  if (typeof name !== "string" || !name.trim()) return null;
  const clean = name.trim();
  return EDITORS[clean.toLowerCase()] ?? clean.charAt(0).toUpperCase() + clean.slice(1);
}

type UserJson = {
  data?: { last_heartbeat_at?: string | null; last_plugin_name?: string | null; last_project?: string | null };
};
type AllTimeJson = { data?: { total_seconds?: number } };
type StatusBarJson = {
  data?: { grand_total?: { total_seconds?: number }; languages?: Array<{ name?: string; total_seconds?: number }> };
};
type ShareJson = {
  data?: { total_seconds?: number; grand_total?: { total_seconds?: number } } | Array<{ grand_total?: { total_seconds?: number } }>;
};

export async function getCodingStats({
  shareUrl,
  showProject,
}: {
  shareUrl: string;
  showProject: boolean;
}): Promise<CodingStats> {
  const apiKey = process.env.WAKATIME_API_KEY?.trim();

  if (apiKey) {
    // WakaTime expects the API key base64-encoded in a Basic auth header.
    const headers = { Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}` };
    const [user, allTime, today] = await Promise.all([
      getJson<UserJson>(`${API}/users/current`, headers),
      getJson<AllTimeJson>(`${API}/users/current/all_time_since_today`, headers),
      getJson<StatusBarJson>(`${API}/users/current/status_bar/today`, headers),
    ]);
    const languages = [...(today?.data?.languages ?? [])].sort(
      (a, b) => (b.total_seconds ?? 0) - (a.total_seconds ?? 0),
    );

    return {
      configured: true,
      totalSeconds: number(allTime?.data?.total_seconds),
      todaySeconds: today?.data ? (number(today.data.grand_total?.total_seconds) ?? 0) : null,
      lastHeartbeatAt: user?.data?.last_heartbeat_at ?? null,
      editor: prettyEditor(user?.data?.last_plugin_name),
      project: showProject ? (user?.data?.last_project ?? null) : null,
      language: languages[0]?.name ?? null,
    };
  }

  if (shareUrl) {
    const json = await getJson<ShareJson>(shareUrl);
    const data = json?.data;
    const seconds = Array.isArray(data)
      ? data.reduce((sum, day) => sum + (day.grand_total?.total_seconds ?? 0), 0)
      : (data?.total_seconds ?? data?.grand_total?.total_seconds);
    return { ...EMPTY, configured: true, totalSeconds: number(seconds) };
  }

  return EMPTY;
}
