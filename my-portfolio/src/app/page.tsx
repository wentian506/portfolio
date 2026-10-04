import type { ReactNode } from "react";
import { BeamAvatar } from "@/components/beam-avatar";
import { BentoGrid } from "@/components/bento/bento-grid";
import { Footer } from "@/components/footer";
import { ChatButton } from "@/components/chat-widget";
import { RichText } from "@/components/rich-text";
import { ArrowLink, Reveal } from "@/components/ui";
import { portfolio } from "@/data/portfolio";
import { chatUrl, email, linkedin } from "@/lib/site";

export default function HomePage() {
  // "Find me on LinkedIn @you, drop an Email or chat with me live". Only filled-in parts show.
  const contact: ReactNode[] = [];
  if (linkedin) {
    contact.push(
      <span key="linkedin">
        Find me on LinkedIn{" "}
        <a href={linkedin.url} target="_blank" rel="noreferrer" className="link-wavy">
          {linkedin.handle ?? linkedin.label}
        </a>
      </span>,
    );
  }
  if (email) {
    contact.push(
      <span key="email">
        {contact.length ? "drop" : "Drop"} an{" "}
        <a href={`mailto:${email}`} className="link-wavy">
          Email
        </a>
      </span>,
    );
  }
  if (chatUrl) {
    contact.push(
      <ChatButton key="chat" className="link-wavy cursor-pointer">
        {contact.length ? "chat with me live" : "Chat with me live"}
      </ChatButton>,
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 pt-14 sm:pt-24">
      {/* Hero */}
      <Reveal as="section" className="flex flex-col-reverse gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div>
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-foreground">{portfolio.name}</h1>
          <p className="mt-1 max-w-md leading-relaxed text-muted">{portfolio.tagline}</p>
        </div>
        <BeamAvatar src={portfolio.avatar} alt={portfolio.name} />
      </Reveal>

      {/* Intro */}
      <Reveal as="section" delay={120} className="mt-12 space-y-5 leading-relaxed text-muted">
        {portfolio.intro.map((paragraph, i) => (
          <p key={i}>
            <RichText text={paragraph} />
          </p>
        ))}
        <p>
          A Snapshot of my <ArrowLink href="/projects">Projects</ArrowLink> &amp;{" "}
          <ArrowLink href="/about">About Me</ArrowLink>
        </p>
        {contact.length > 0 && (
          <>
            <div className="mx-auto !my-8 h-px w-14 bg-foreground/20" />
            <p>
              {contact.map((part, i) => (
                <span key={i}>
                  {i > 0 && (i === contact.length - 1 ? " or " : ", ")}
                  {part}
                </span>
              ))}
            </p>
          </>
        )}
      </Reveal>

      {/* Bento grid */}
      <Reveal as="section" delay={240} className="mt-20">
        <h2 className="inline-flex items-center gap-2 text-foreground">
          <span className="underline decoration-foreground/40 underline-offset-[6px]">Tech Stack</span>
          <span aria-hidden>🛠️</span>
        </h2>
        <BentoGrid />
      </Reveal>

      <Footer />
    </div>
  );
}
