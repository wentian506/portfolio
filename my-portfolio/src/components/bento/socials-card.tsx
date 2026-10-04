import type { CSSProperties } from "react";
import type { Social } from "@/lib/types";
import { brandColor, socialIcons } from "@/components/social-icons";
import { CardLabel } from "./card-label";

/** Fanned-out "cards" for your first four socials. They straighten up on hover. */
export function SocialsCard({ socials }: { socials: Social[] }) {
  const items = socials.slice(0, 4);
  const spread = items.length <= 2 ? 6 : 12; // fan angle in degrees
  const angleOf = (i: number) => (items.length === 1 ? 0 : -spread + (2 * spread * i) / (items.length - 1));

  return (
    <div className="card flex flex-col overflow-hidden p-5 [grid-area:social]">
      <CardLabel>Socials</CardLabel>
      <div className="group/socials flex flex-1 items-center justify-center pb-3">
        {items.map((social, i) => {
          const { icon: Icon, color } = socialIcons[social.icon];
          const angle = angleOf(i);
          return (
            <a
              key={social.url}
              href={social.url}
              target={social.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              aria-label={social.label}
              style={{ "--r": `${angle}deg`, "--y": `${Math.round((Math.abs(angle) / 12) * 8)}px` } as CSSProperties}
              className="-mx-1 flex h-[4.4rem] w-[3.6rem] shrink-0 translate-y-(--y) rotate-(--r) flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-linear-to-b from-(--card-2) to-(--card) shadow-[var(--card-inset),0_10px_24px_-10px_rgb(0_0_0/0.7)] transition-[rotate,translate,margin,scale] duration-300 ease-out group-hover/socials:mx-1.5 group-hover/socials:translate-y-0 group-hover/socials:rotate-0 hover:scale-110"
            >
              <Icon className="size-6" style={{ color: brandColor(color) }} />
              <span className="text-[9px] text-muted">{social.label}</span>
            </a>
          );
        })}
        {items.length === 0 && <p className="text-sm text-subtle">Add your links in portfolio.ts</p>}
      </div>
    </div>
  );
}
