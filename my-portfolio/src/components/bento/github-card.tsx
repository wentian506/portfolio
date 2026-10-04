import { SiGithub } from "react-icons/si";
import { getGithubStats, type ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";
import { CardLabel } from "./card-label";

const levelClass = [
  "bg-neutral-200 dark:bg-neutral-200/90",
  "bg-emerald-200",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-emerald-600",
];

/** 1234 → "1,234", 326216 → "326.2K" */
function formatCount(n: number | null | undefined) {
  if (n == null) return "–";
  return n >= 10_000
    ? new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n)
    : n.toLocaleString("en-US");
}

const emptyWeeks: ContributionDay[][] = Array.from({ length: 9 }, () =>
  Array.from({ length: 7 }, () => ({ date: "", count: 0, level: 0 as const })),
);

/** Live GitHub stats (fetched on the server and refreshed hourly). */
export async function GithubCard({ username }: { username: string }) {
  const stats = await getGithubStats(username);
  const weeks = stats?.weeks.length ? stats.weeks : emptyWeeks;

  const pills = [
    { label: "PRs", value: stats?.prs },
    { label: "Followers", value: stats?.followers },
    { label: "Following", value: stats?.following },
    { label: "Repos", value: stats?.repos },
    { label: "Issues", value: stats?.issues },
  ];

  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noreferrer"
      className="card group relative flex flex-col overflow-hidden pt-4 [grid-area:github]"
    >
      <CardLabel className="px-4" icon={<SiGithub className="size-4" />}>
        Github
      </CardLabel>

      <div className="mt-4 flex justify-center gap-1" aria-hidden>
        {weeks.map((week, w) => (
          <div key={w} className="flex flex-col gap-1">
            {week.map((day, d) => (
              <span
                key={d}
                title={day?.date ? `${day.count} contributions on ${day.date}` : undefined}
                style={{ transitionDelay: `${(w + d) * 12}ms` }}
                className={cn(
                  "size-[11px] rounded-[2px] transition-transform duration-300 group-hover:scale-110",
                  day ? levelClass[day.level] : "opacity-0",
                )}
              />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-3 px-4 text-right text-xs text-subtle">
        {stats?.contributionsThisYear != null
          ? `${stats.contributionsThisYear.toLocaleString("en-US")} contributions this year`
          : "Add your GitHub username"}
      </p>

      <div className="mt-auto flex flex-col gap-2 pb-4 pt-3">
        {pills.map((pill, i) => (
          <span
            key={pill.label}
            className={cn(
              "flex h-9 w-fit max-w-[95%] min-w-[58%] items-center gap-2.5 border border-border bg-pill px-3.5 text-[13px] whitespace-nowrap text-subtle sm:px-4 sm:text-sm shadow-[0_6px_16px_-10px_rgb(0_0_0/0.6)] transition-colors group-hover:text-muted",
              i % 2 === 0
                ? "justify-end self-start rounded-r-full border-l-0"
                : "justify-start self-end rounded-l-full border-r-0",
            )}
          >
            {pill.label}
            <b className="font-medium text-foreground">{formatCount(pill.value)}</b>
          </span>
        ))}
      </div>
    </a>
  );
}
