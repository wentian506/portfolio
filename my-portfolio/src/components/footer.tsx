import { SiGithub } from "react-icons/si";
import { portfolio } from "@/data/portfolio";
import { chatUrl, githubUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer
      className={cn(
        "mt-28 flex items-center justify-between border-t border-border pt-6 text-sm text-subtle",
        chatUrl ? "pb-24 sm:pb-6" : "pb-6", // room for the chat button on phones
      )}
    >
      <p>
        © {new Date().getFullYear()} {portfolio.name}
      </p>
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="transition-colors hover:text-foreground"
        >
          <SiGithub className="size-5" />
        </a>
      )}
    </footer>
  );
}
