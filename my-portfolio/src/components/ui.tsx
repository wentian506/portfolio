import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { TbArrowUpRight, TbChevronRight } from "react-icons/tb";
import { cn } from "@/lib/utils";

/** Fades + un-blurs its children in on page load. `delay` is in ms. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "header" | "li" | "article";
}) {
  return (
    <Tag className={cn("animate-enter", className)} style={{ animationDelay: `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Big centred page title with the animated "circuit" underline. */
export function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <Reveal as="header" className="flex flex-col items-center text-center">
      <h1 className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">{title}</h1>
      <p className="mt-4 max-w-xl text-balance text-muted sm:text-lg">{subtitle}</p>
      <svg viewBox="0 0 360 26" fill="none" className="mt-6 w-64 sm:w-80" aria-hidden>
        <defs>
          <linearGradient id="header-line" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="0.45" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <path
          d="M0 3 H150 L178 23 H360"
          stroke="url(#header-line)"
          strokeWidth="1.5"
          pathLength={1}
          strokeDasharray="1"
          className="animate-draw"
        />
      </svg>
    </Reveal>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground">{title}</h2>
      {subtitle && <p className="mt-1.5 text-subtle">{subtitle}</p>}
    </div>
  );
}

/** Inline link with the little ↗ arrow. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-start text-foreground/90 transition-colors hover:text-foreground">
      {children}
      <TbArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/** Small "Certificate ↗" link. */
export function CertificateLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-0.5 text-sm text-violet-500 transition-colors hover:text-violet-400 dark:text-violet-400 dark:hover:text-violet-300"
    >
      Certificate
      <TbArrowUpRight className="size-3.5" />
    </a>
  );
}

/** Huge faded line of text near the bottom of a page. */
export function BigFadedText({ children }: { children: ReactNode }) {
  return (
    <p className="text-faded mt-28 text-center font-display text-6xl font-light tracking-tight select-none sm:text-8xl">
      {children}
    </p>
  );
}

/** Terminal-style "› cd .." link back home. */
export function BackLink() {
  return (
    <Link
      href="/"
      className="group mt-12 inline-flex items-center gap-2 font-mono text-subtle transition-colors hover:text-foreground"
    >
      <TbChevronRight className="size-4 transition-transform group-hover:-translate-x-0.5" />
      <span className="border-b border-dashed border-subtle/60">cd ..</span>
    </Link>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-pill px-2.5 py-1 text-xs text-foreground/90",
        className,
      )}
    >
      {children}
    </span>
  );
}
