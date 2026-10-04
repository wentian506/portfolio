"use client";

import { useEffect, useEffectEvent, useRef, useState, type ReactNode } from "react";
import { TbArrowUpRight, TbMessageCircle, TbX } from "react-icons/tb";
import { cn } from "@/lib/utils";

/*
 * Live chat with visitors, using your own Connect chat app.
 * A 💬 button sits in the bottom-right corner of every page. It opens your
 * chat room in a small window (full screen on phones). Visitors land in your
 * room automatically; open the same room on your phone or laptop to talk to them.
 * Turned on by `chat.url` and `chat.room` in src/data/portfolio.ts.
 */

const OPEN_EVENT = "portfolio:open-chat";
const WAKE_EVENT = "portfolio:wake-chat";

/** Opens the chat window. Works from any button on the site. */
export function openChat() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function wakeChat() {
  window.dispatchEvent(new Event(WAKE_EVENT));
}

/** A button anywhere on the site that opens the chat window. */
export function ChatButton({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openChat} onPointerEnter={wakeChat} onFocus={wakeChat} className={className}>
      {children}
    </button>
  );
}

let serverWoken = false;

/**
 * Free Render servers fall asleep after 15 minutes without visitors and take
 * up to a minute to wake. A tiny request in advance means the chat is
 * usually ready by the time someone opens it.
 */
function wakeServer(url: string) {
  if (serverWoken) return;
  serverWoken = true;
  fetch(url, { mode: "no-cors", cache: "no-store" }).catch(() => {});
}

export function ChatWidget({ url, room, name }: { url: string; room: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false); // the room loads on first open, then stays connected
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  function show() {
    setStarted(true);
    setOpen(true);
    wakeServer(url);
    requestAnimationFrame(() => closeButton.current?.focus({ preventScroll: true }));
  }

  const onOpenRequest = useEffectEvent(() => show());

  // Let other "chat with me" buttons open the window, and wake the server early.
  useEffect(() => {
    const onOpen = () => onOpenRequest();
    const onWake = () => wakeServer(url);
    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener(WAKE_EVENT, onWake);
    const timer = setTimeout(onWake, 8000); // still here after 8 s? Get the chat ready.
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener(WAKE_EVENT, onWake);
      clearTimeout(timer);
    };
  }, [url]);

  // Esc closes the window.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Still loading after a few seconds? Explain that the free server is waking up.
  useEffect(() => {
    if (!started || loaded) return;
    const timer = setTimeout(() => setSlow(true), 4000);
    return () => clearTimeout(timer);
  }, [started, loaded]);

  return (
    <>
      <div
        id="chat-window"
        role="dialog"
        aria-label={`Chat with ${name}`}
        inert={!open}
        className={cn(
          "fixed inset-0 z-[70] flex flex-col overflow-hidden bg-background shadow-[0_30px_80px_-20px_rgb(0_0_0/0.75)] transition-[opacity,translate,scale,visibility] duration-300 ease-out",
          "sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] sm:origin-bottom-right sm:rounded-2xl sm:border sm:border-border",
          open ? "visible opacity-100" : "pointer-events-none invisible translate-y-4 opacity-0 sm:scale-95",
        )}
      >
        <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-md">
            <TbMessageCircle className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">Chat with {name}</p>
            <p className="flex items-center gap-1.5 truncate text-xs text-subtle">
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
              Room &ldquo;{room}&rdquo; · real-time
            </p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Open in a new tab"
            aria-label="Open the chat room in a new tab"
            className="flex size-8 items-center justify-center rounded-lg text-subtle transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <TbArrowUpRight className="size-[18px]" />
          </a>
          <button
            ref={closeButton}
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-subtle transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <TbX className="size-[18px]" />
          </button>
        </header>

        <div className="relative flex-1 bg-[#0b0f1a]">
          {started && (
            <iframe
              src={url}
              title={`Chat room with ${name}`}
              allow="clipboard-write; web-share; autoplay"
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 size-full border-0"
            />
          )}
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center text-sm text-neutral-300">
              <span className="size-8 animate-spin rounded-full border-2 border-white/15 border-t-violet-400" aria-hidden />
              <p>Connecting to the chat room…</p>
              {slow && (
                <p className="max-w-[17rem] text-xs leading-relaxed text-neutral-400">
                  The free server naps when nobody is chatting. Waking it up can take up to a minute.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : show())}
        onPointerEnter={() => wakeServer(url)}
        onFocus={() => wakeServer(url)}
        aria-label={open ? "Close chat" : `Chat with ${name}`}
        aria-expanded={open}
        aria-controls="chat-window"
        className={cn(
          "group fixed right-4 bottom-4 z-[70] flex size-12 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-[0_12px_32px_-8px_rgb(139_92_246/0.75)] ring-1 ring-white/20 transition-transform duration-200 hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6 sm:size-14",
          open && "max-sm:hidden",
        )}
      >
        <TbMessageCircle
          className={cn("absolute size-6 transition-all duration-300 sm:size-7", open && "scale-50 rotate-90 opacity-0")}
          aria-hidden
        />
        <TbX
          className={cn("absolute size-6 transition-all duration-300", !open && "scale-50 -rotate-90 opacity-0")}
          aria-hidden
        />
        {!open && (
          <span className="pointer-events-none absolute right-full mr-3 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium whitespace-nowrap text-foreground opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 max-sm:hidden">
            Chat with me 👋
          </span>
        )}
      </button>
    </>
  );
}
