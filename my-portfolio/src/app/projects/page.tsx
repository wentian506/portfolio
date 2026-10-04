import type { Metadata } from "next";
import { TbArrowRight } from "react-icons/tb";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { BackLink, BigFadedText, PageHeader, Reveal } from "@/components/ui";
import { portfolio } from "@/data/portfolio";
import { githubUrl as github } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects built by ${portfolio.name}.`,
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 pt-12 sm:pt-16">
      <PageHeader title="Projects" subtitle="Projects I've created." />

      <div className="mt-16 space-y-20 sm:mt-20">
        {portfolio.projects.map((project, i) => (
          <Reveal key={project.title} delay={150 + i * 100}>
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      {github && (
        <p className="mt-20 text-xl text-foreground">
          View more on{" "}
          <a
            href={`${github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-emerald-500 transition-colors hover:text-emerald-400"
          >
            Github
            <TbArrowRight className="size-4 text-subtle transition-transform group-hover:translate-x-1" />
          </a>
        </p>
      )}

      <BigFadedText>Stay tuned...</BigFadedText>
      <BackLink />
      <Footer />
    </div>
  );
}
