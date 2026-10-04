"use client";

import { useSyncExternalStore } from "react";
import { TbMoon, TbSun } from "react-icons/tb";

// The current theme lives on <html class="dark">. We subscribe to that class
// so the icon always matches, without any extra theme library.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => true; // the site renders dark by default

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = isDark ? "light" : "dark";
    const apply = () => {
      const root = document.documentElement;
      root.classList.toggle("dark", next === "dark");
      root.style.colorScheme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(apply);
    else apply();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid size-9 place-items-center rounded-full text-subtle transition-colors hover:bg-foreground/5 hover:text-foreground"
    >
      {isDark ? <TbSun className="size-[18px]" /> : <TbMoon className="size-[18px]" />}
    </button>
  );
}
