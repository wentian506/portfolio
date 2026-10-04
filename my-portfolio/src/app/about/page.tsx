import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TbArrowUpRight } from "react-icons/tb";
import { ChatButton } from "@/components/chat-widget";
import { Footer } from "@/components/footer";
import { RichText } from "@/components/rich-text";
import {
  BackLink, BigFadedText, CertificateLink, PageHeader, Pill, Reveal, SectionHeading,
} from "@/components/ui";
import { portfolio } from "@/data/portfolio";
import { chatUrl, socials } from "@/lib/site";
import type { Experience } from "@/lib/types";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: portfolio.about.subtitle,
};

export default function AboutPage() {
  const { about, education, experience, skills, activities, achievements } = portfolio;
  const connectLinks = socials.filter((s) => s.icon !== "spotify");
  const firstName = portfolio.shortName ?? portfolio.name.split(" ")[0];

  return (
    <div className="mx-auto w-full max-w-4xl px-6 pt-12 sm:pt-16">
      <PageHeader title="About Me" subtitle={about.subtitle} />

      {/* 1. Intro: picture + "Hey, I'm ..." + Get Resume */}
      <Reveal as="section" delay={150} className="mt-16 grid gap-10 md:grid-cols-[17rem_1fr] md:gap-12">
        <div className="card mx-auto aspect-square w-64 overflow-hidden p-1.5 md:w-full dark:bg-linear-to-b dark:from-[#12041d] dark:to-[#08020c]">
          <Image
            src={about.image}
            alt={portfolio.name}
            width={560}
            height={560}
            priority
            className="size-full rounded-full object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-[2rem]">
              Hey, I&apos;m {firstName}{" "}
              <span className="inline-block origin-[70%_70%] hover:animate-wave">👋</span>
            </h2>
            {portfolio.resume && (
              <a
                href={portfolio.resume}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-lg border border-black/10 bg-linear-to-r from-violet-100 to-amber-50 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-black/25 dark:border-white/15 dark:from-[#1f1029] dark:to-[#211619] dark:text-white dark:hover:border-white/30"
              >
                Get Resume
                <span aria-hidden className="text-base transition-transform duration-200 group-hover:scale-110">
                  💻
                </span>
              </a>
            )}
          </div>
          <div className="mt-6 space-y-5 leading-relaxed text-muted">
            {about.paragraphs.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 2. Education */}
      {education.length > 0 && (
        <section className="mt-24">
          <SectionHeading title="Education" subtitle="Where I've learned and grown" />
          <div className="space-y-4">
            {education.map((item) => (
              <div key={item.school} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="flex flex-wrap items-center gap-2 font-semibold text-foreground">
                    {item.school}
                    <StatusBadge status={item.status} />
                  </h3>
                  <p className="mt-1 text-sm text-subtle italic">{item.degree}</p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <p className="font-semibold text-foreground">{item.period}</p>
                  {item.score && (
                    <p className="text-xs text-subtle">
                      {item.scoreLabel}: <span className="text-highlight font-medium">{item.score}</span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Experience */}
      {experience.length > 0 && (
        <section className="mt-24">
          <SectionHeading title="Experience" subtitle="Leadership and hands-on experience" />
          <div className="space-y-4">
            {experience.map((item) => (
              <TimelineCard key={item.role + item.org} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Skills */}
      <section className="mt-24">
        <SectionHeading title="Skills" subtitle="Technologies I work with" />
        <div className="grid gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category} className="card p-5">
              <h3 className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Extracurricular (hidden while the list is empty) */}
      {activities.length > 0 && (
        <section className="mt-24">
          <SectionHeading title="Extracurricular Activities" subtitle="Community involvement and volunteering" />
          <div className="space-y-4">
            {activities.map((item) => (
              <TimelineCard key={item.role + item.org} item={item} italicOrg />
            ))}
          </div>
        </section>
      )}

      {/* 6. Achievements (hidden while the list is empty) */}
      {achievements.length > 0 && (
        <section className="mt-24">
          <SectionHeading title="Achievements" subtitle="Competitions and recognitions" />
          <ul className="card space-y-3 p-5">
            {achievements.map((a) => (
              <li key={a.text} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
                <span>
                  {a.text} {a.certificateUrl && <CertificateLink href={a.certificateUrl} />}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 7. Let's Connect */}
      <section className="mt-24">
        <SectionHeading title="Let's Connect" />
        <p className="-mt-3 max-w-2xl text-muted">
          I&apos;m always open to interesting conversations, collaborations, or new opportunities. Feel free to reach
          out through any of these platforms{chatUrl ? ", or chat with me live right here on the site" : ""}:
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {chatUrl && (
            <ChatButton className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-700 transition-colors hover:border-emerald-500/60 dark:text-emerald-300">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Live chat
            </ChatButton>
          )}
          {connectLinks.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target={s.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-pill px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/25"
            >
              {s.label}
              <TbArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
          {portfolio.resume && (
            <a
              href={portfolio.resume}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-pill px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/25"
            >
              Resume
              <TbArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      </section>

      <BigFadedText>Thanks for visiting</BigFadedText>
      <p className="mt-6 text-center text-muted">
        Feel free to explore my{" "}
        <Link href="/projects" className="text-highlight font-medium">
          projects
        </Link>{" "}
        and get in touch!
      </p>
      <BackLink />
      <Footer />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const current = status.toLowerCase() === "current";
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[10px] font-medium",
        current
          ? "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300"
          : "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300",
      )}
    >
      {status}
    </span>
  );
}

function TimelineCard({ item, italicOrg }: { item: Experience; italicOrg?: boolean }) {
  return (
    <div className="card p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-semibold text-foreground">{item.role}</span>
          <span className={cn("text-sm text-subtle", italicOrg && "italic")}>— {item.org}</span>
          {item.certificateUrl && <CertificateLink href={item.certificateUrl} />}
        </h3>
        <p className="shrink-0 font-semibold text-foreground">{item.date}</p>
      </div>
      {item.points.length > 0 && (
        <ul className="mt-3 space-y-2">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-500" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
