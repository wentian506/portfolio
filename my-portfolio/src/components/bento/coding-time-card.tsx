"use client";

import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { TbBrandVscode, TbCode } from "react-icons/tb";
import { VscTerminal } from "react-icons/vsc";
import type { LaunchInfo } from "@/lib/launch";
import { findLaunchTime } from "@/lib/launch-time";
import type { CodingStats } from "@/lib/wakatime";

const REFRESH_MS = 60_000; // optional WakaTime numbers: refresh every minute
const LIVE_WINDOW_MS = 5 * 60_000; // "Coding now" = WakaTime heard from your editor in the last 5 minutes

/* ── One shared clock that ticks every second (browser only) ─────────────── */
let nowSecond = 0;
function subscribe(onTick: () => void) {
  const tick = () => {
    nowSecond = Math.floor(Date.now() / 1000);
    onTick();
  };
  tick();
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}
const getNow = () => nowSecond;
const getServerNow = () => 0; // the server renders a placeholder; the browser takes over

/* ── Formatting ──────────────────────────────────────────────────────────── */
const pad = (n: number) => String(n).padStart(2, "0");

/** The big number: 42 sec → 12 min → 5 hrs → 12 days → 1.4 yrs */
function headline(seconds: number) {
  const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
  const years = Math.floor((seconds / 31_557_600) * 10) / 10;
  if (years >= 1) return { value: String(years), unit: plural(years, "yr", "yrs") };
  const days = Math.floor(seconds / 86_400);
  if (days >= 1) return { value: String(days), unit: plural(days, "day", "days") };
  const hours = Math.floor(seconds / 3600);
  if (hours >= 1) return { value: String(hours), unit: plural(hours, "hr", "hrs") };
  const minutes = Math.floor(seconds / 60);
  if (minutes >= 1) return { value: String(minutes), unit: "min" };
  return { value: String(Math.floor(seconds)), unit: "sec" };
}

/** 12d 04:22:09 */
function preciseClock(seconds: number) {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 86_400)}d ${pad(Math.floor((s % 86_400) / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

/** 2:13:05 */
function formatClock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
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

/* ── localStorage can throw (private mode, sandboxed frames) ─────────────── */
function readCache(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeCache(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* not available */
  }
}

function PulseDot() {
  return (
    <span className="relative flex size-1.5 shrink-0">
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}

/**
 * "Live since launch": a clock that starts by itself the moment the site first
 * goes live and ticks every second from then on (see src/lib/launch.ts).
 * Optional: with WAKATIME_API_KEY set, the bottom line shows real coding time.
 */
export function CodingTimeCard({ launch, wakatime }: { launch: LaunchInfo; wakatime: boolean }) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow) * 1000; // 0 = not ticking yet

  // 1. Start time. If the server couldn't reach GitHub, the browser asks once and remembers it.
  const repo = launch.launchedAt ? null : launch.repo;
  const [lookup, setLookup] = useState<{ repo: string; value: string | null } | null>(null);
  useEffect(() => {
    if (!repo) return;
    let cancelled = false;
    (async () => {
      const key = `launch-time:${repo}`;
      let value = readCache(key);
      if (!value) {
        value = await findLaunchTime(repo, {
          headers: { Accept: "application/vnd.github+json" },
          signal: AbortSignal.timeout(6000),
        });
        if (value) writeCache(key, value);
      }
      if (!cancelled) setLookup({ repo, value });
    })();
    return () => {
      cancelled = true;
    };
  }, [repo]);

  const waiting = repo !== null && lookup?.repo !== repo;
  const start = Date.parse(launch.launchedAt ?? lookup?.value ?? launch.builtAt);
  const ready = now > 0 && !waiting && Number.isFinite(start);
  const elapsed = ready ? Math.max(0, (now - start) / 1000) : 0;
  const big = ready ? headline(elapsed) : null;
  const launchedOn = ready
    ? new Date(start).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
    : null;

  // 2. Optional: real coding time from WakaTime (only when a key is set up).
  const [stats, setStats] = useState<CodingStats | null>(null);
  const keepAsking = useRef(true);
  useEffect(() => {
    if (!wakatime) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function refresh() {
      clearTimeout(timer);
      try {
        const res = await fetch("/api/coding-time", { cache: "no-store" });
        const data = res.ok ? ((await res.json()) as CodingStats) : null;
        if (cancelled) return;
        if (data?.configured) setStats(data);
        else if (data) keepAsking.current = false;
      } catch {
        // Offline or busy: keep the last numbers and try again later.
      }
      if (!cancelled && keepAsking.current && !document.hidden) timer = setTimeout(refresh, REFRESH_MS);
    }
    function onVisibilityChange() {
      if (document.hidden) clearTimeout(timer);
      else if (keepAsking.current) refresh();
    }

    refresh();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [wakatime]);

  const lastBeat = stats?.lastHeartbeatAt ? Date.parse(stats.lastHeartbeatAt) : Number.NaN;
  const sinceLastBeat = now - lastBeat; // NaN when unknown
  const coding = now > 0 && stats?.todaySeconds != null && sinceLastBeat > -60_000 && sinceLastBeat < LIVE_WINDOW_MS;
  const today = (stats?.todaySeconds ?? 0) + (coding ? Math.max(0, sinceLastBeat) / 1000 : 0);

  let bottom: ReactNode = launchedOn ? `Launched ${launchedOn}` : "\u00a0";
  if (stats && now > 0) {
    if (coding) {
      bottom = (
        <span className="text-emerald-600 dark:text-emerald-300">
          Coding now{stats.project ? ` · ${stats.project}` : ""} ·{" "}
          <span className="font-mono tabular-nums">{formatClock(today)}</span> today
        </span>
      );
    } else if (today >= 60) {
      bottom = `Coded today · ${formatDuration(today)}${stats.language ? ` · ${stats.language}` : ""}`;
    } else if (Number.isFinite(sinceLastBeat)) {
      bottom = `Last coded ${timeAgo(sinceLastBeat)}`;
    }
  }

  return (
    <div
      className="card group relative flex flex-col overflow-hidden p-5 [grid-area:code]"
      title={ready ? `Live since ${new Date(start).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}` : undefined}
    >
      <div className="relative flex items-center gap-2">
        <TbCode className="size-4 text-subtle" aria-hidden />
        <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-px text-[9px] font-semibold tracking-[0.14em] text-emerald-600 dark:text-emerald-300">
          <PulseDot />
          LIVE
        </span>
      </div>
      <TbBrandVscode
        aria-hidden
        className="pointer-events-none absolute -top-3 -right-3 size-24 text-sky-500/70 blur-[3px] transition duration-500 group-hover:text-sky-500 group-hover:blur-[1px]"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <p className="flex items-baseline gap-2 font-display text-4xl font-semibold tracking-tight text-foreground">
          {big ? big.value : <span className="inline-block h-8 w-12 animate-pulse rounded-md bg-foreground/10" />}
          <span className="bg-linear-to-r from-sky-400 to-blue-600 bg-clip-text text-2xl text-transparent">
            {big ? big.unit : "days"}
          </span>
        </p>
        <p className="mt-1 font-display text-lg text-emerald-500">Live since launch</p>
        <p role="timer" aria-label="Time since this site went live" className="mt-1.5 font-mono text-sm font-medium text-foreground tabular-nums">
          {ready ? preciseClock(elapsed) : "–d ––:––:––"}
        </p>
        <p className="mt-1 max-w-full truncate px-2 text-[11px] text-subtle">{bottom}</p>
      </div>

      <VscTerminal
        aria-hidden
        className="pointer-events-none absolute bottom-4 left-4 size-10 text-subtle/60 blur-[2px]"
      />
    </div>
  );
}
