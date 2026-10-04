import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { TbArrowRight } from "react-icons/tb";
import type { Project } from "@/lib/types";

/** One project: screenshot in a browser window on the left, details on the right. */
export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  const href = project.liveUrl ?? project.sourceUrl;

  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <BrowserFrame title={project.title} href={href}>
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={1280}
          height={800}
          priority={priority}
          sizes="(min-width: 768px) 420px, 100vw"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </BrowserFrame>

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{project.title}</h2>
        <p className="mt-2 text-sm text-subtle">{project.date}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-pill py-1 pr-2.5 pl-2 text-xs text-foreground/90"
            >
              <span className="h-3 w-[3px] rounded-full bg-foreground/80" aria-hidden />
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-85"
            >
              <SiGithub className="size-4" /> Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/live inline-flex items-center gap-2 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-opacity hover:opacity-85"
            >
              Live Demo
              <TbArrowRight className="size-3.5 transition-transform group-hover/live:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function BrowserFrame({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  const inner = (
    <>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-2.5 rounded-full bg-foreground/15 transition-colors group-hover:bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-foreground/15 transition-colors delay-75 group-hover:bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-foreground/15 transition-colors delay-150 group-hover:bg-[#28c840]" />
        <span className="mx-auto -translate-x-5 rounded bg-foreground/5 px-10 py-0.5 text-[10px] text-subtle sm:px-16">
          {title}
        </span>
      </div>
      <div className="overflow-hidden">{children}</div>
    </>
  );

  const className = "card group block overflow-hidden !rounded-xl";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={`Open ${title}`}>
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}
