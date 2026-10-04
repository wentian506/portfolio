"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:px-12">
        <Link
          href="/"
          aria-label="Home"
          className="text-subtle transition-[color,rotate] duration-500 hover:rotate-180 hover:text-foreground"
        >
          <Logo className="size-7" />
        </Link>

        <div className="flex items-center gap-5 sm:gap-7">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-[15px] transition-colors hover:text-foreground",
                  active ? "text-foreground" : "text-subtle",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
