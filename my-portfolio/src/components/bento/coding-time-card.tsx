"use client";

import { useEffect, useRef, useState } from "react";
import { TbBrandVscode, TbCode } from "react-icons/tb";
import { VscTerminal } from "react-icons/vsc";
import type { CodingStats } from "@/lib/wakatime";

const REFRESH_MS = 60_000; // ask for fresh numbers every minute
const LIVE_WINDOW_MS = 5 * 60_000; // "Coding now" = WakaTime heard from your editor in the last 5 minutes

/** 1,284 hrs / 6.5 hrs */
function formatHours(seconds: number | null | undefined) {
  if (!seconds || seconds <= 0) return null;
  const hours = seconds / 3600;
  return hours < 10 ? String(Math.round(hours * 10) / 10) : Math.round(hours).toLocaleString("en-US");
}

/** 2:13:05 */
function formatClock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${Math.floor(s / 3600)}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

/** 2h 13m / 45m */
function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes}m`;
}

/** 4m ago / 3h ago / 2d ago */
function timeAgo(ms: number) {
  const minutes = Math.max(1, Math.floor(ms / 60_000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
}

function PulseDot() {
  return (
    <span className="relative flex size-2 shrink-0">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
  );
}

/**
 * Real-time coding time from WakaTime: total hours, today's time and a live
 * "Coding now" timer that ticks every second while you're coding.
 * Shows "--" until WAKATIME_API_KEY is set up (GUIDE.md, Step 4).
 */
export function CodingTimeCard() {
  const [stats, setStats] = useState<CodingStats | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [now, setNow] = useState(0);
  const enabled = useRef(true);

  // Load the numbers now and every minute (paused while the tab is in the background).
  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function refresh() {
      clearTimeout(timer);
      try {
        const res = await fetch("/api/coding-time", { cache: "no-store" });
        const data = res.ok ? ((await res.json()) as CodingStats) : null;
        if (cancelled) return;
        if (data) setStats(data);
        // Nothing set up yet? Then there's no point asking again.
        if (data && !data.configured) enabled.current = false;
      } catch {
        // Offline or the server is busy: keep the last numbers and try again later.
      }
      if (cancelled) return;
      setNow(Date.now());
      setLoaded(true);
      if (enabled.current && !document.hidden) timer = setTimeout(refresh, REFRESH_MS);
    }

    function onVisibilityChange() {
      if (document.hidden) clearTimeout(timer);
      else if (enabled.current) refresh();
    }

    refresh();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const lastBeat = stats?.lastHeartbeatAt ? Date.parse(stats.lastHeartbeatAt) : Number.NaN;
  const sinceLastBeat = now - lastBeat; // NaN when unknown
  const live = stats?.todaySeconds != null && sinceLastBeat > -60_000 && sinceLastBeat < LIVE_WINDOW_MS;

  // While you're coding, tick every second.
  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [live]);

  // WakaTime has counted up to your last keystroke; add the seconds since then.
  const today = (stats?.todaySeconds ?? 0) + (live ? Math.max(0, sinceLastBeat) / 1000 : 0);
  const total = formatHours(stats?.totalSeconds);
  const showSetupHint = loaded && !stats?.configured && process.env.NODE_ENV === "development";

  return (
    <div
      className="card group relative flex flex-col overflow-hidden p-5 [grid-area:code]"
      title={stats?.configured ? "Tracked live with WakaTime" : undefined}
    >
      <div className="relative flex items-center gap-2">
        <TbCode className="size-4 text-subtle" aria-hidden />
        {live && (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-px text-[9px] font-semibold tracking-[0.14em] text-emerald-600 dark:text-emerald-300">
            LIVE
          </span>
        )}
      </div>
      <TbBrandVscode
        aria-hidden
        className="pointer-events-none absolute -top-3 -right-3 size-24 text-sky-500/70 blur-[3px] transition duration-500 group-hover:text-sky-500 group-hover:blur-[1px]"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <p className="flex items-baseline gap-2 font-display text-4xl font-semibold tracking-tight text-foreground">
          {total ??
            (loaded ? "--" : <span className="inline-block h-8 w-16 animate-pulse rounded-md bg-foreground/10" />)}
          <span className="bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-2xl text-transparent">hrs</span>
        </p>
        <p className="mt-1 font-display text-lg text-emerald-500">Coding Time</p>

        {stats?.todaySeconds != null &&
          (live ? (
            <div className="mt-2 flex flex-col items-center gap-1" aria-live="off">
              <p className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-300">
                <PulseDot />
                <span className="max-w-[11rem] truncate">
                  Coding now{stats.project ? ` · ${stats.project}` : stats.editor ? ` in ${stats.editor}` : ""}
                </span>
              </p>
              <p className="text-xs text-subtle">
                Today{" "}
                <span className="font-mono text-sm font-medium text-foreground tabular-nums">{formatClock(today)}</span>
              </p>
            </div>
          ) : (
            <div className="mt-2 flex flex-col items-center gap-0.5 text-xs text-subtle">
              <p>
                Today · <span className="text-muted">{formatDuration(today)}</span>
                {stats.language && today > 0 ? ` · ${stats.language}` : ""}
              </p>
              {Number.isFinite(sinceLastBeat) && <p className="text-[11px]">Last coded {timeAgo(sinceLastBeat)}</p>}
            </div>
          ))}

        {showSetupHint && (
          <p className="mt-2 max-w-[13rem] text-[11px] leading-snug text-subtle">
            Add WAKATIME_API_KEY to .env.local to go live (GUIDE.md, Step 4)
          </p>
        )}
      </div>

      <VscTerminal
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-4 size-10 text-subtle/60 blur-[2px]"
      />
    </div>
  );
}
