import type { CSSProperties } from "react";
import { TbStack2 } from "react-icons/tb";
import { techIcons, type TechName } from "@/components/tech-icons";
import { brandColor } from "@/components/social-icons";
import { cn } from "@/lib/utils";
import { CardLabel } from "./card-label";

/** Two rows of tech logos drifting in opposite directions. Hover a logo to see its colour. */
export function StacksCard({ items }: { items: TechName[] }) {
  const half = Math.ceil(items.length / 2);
  const rows = [items.slice(0, half), items.slice(half)];

  return (
    <div className="card flex flex-col overflow-hidden py-5 [grid-area:stack]">
      <CardLabel
        className="px-5"
        icon={<TbStack2 className="size-4 text-sky-400" />}
      >
        <span className="bg-linear-to-r from-sky-300 to-sky-600 bg-clip-text text-transparent">Stacks</span>
      </CardLabel>
      <div className="fade-edges-x flex flex-1 flex-col justify-center gap-6 pt-3">
        <MarqueeRow items={rows[0]} direction="left" />
        <MarqueeRow items={rows[1]} direction="right" />
      </div>
    </div>
  );
}

function MarqueeRow({ items, direction }: { items: TechName[]; direction: "left" | "right" }) {
  if (items.length === 0) return null;
  // Repeat short lists so the row is always wider than the card.
  let list = items;
  while (list.length < 9) list = [...list, ...items];

  return (
    <div className="group flex overflow-hidden">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "flex shrink-0 items-center gap-7 pr-7 group-hover:[animation-play-state:paused]",
            direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
          )}
        >
          {list.map((name, i) => {
            const { icon: Icon, color } = techIcons[name];
            return (
              <li
                key={`${name}-${i}`}
                title={name}
                style={{ "--brand": brandColor(color) } as CSSProperties}
                className="text-[2.1rem] text-neutral-400 transition-[color,scale] duration-300 hover:scale-110 hover:text-(--brand) dark:text-neutral-500"
              >
                <Icon aria-hidden />
                <span className="sr-only">{name}</span>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}
