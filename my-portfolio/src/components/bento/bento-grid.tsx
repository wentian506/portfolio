import { portfolio } from "@/data/portfolio";
import { socials } from "@/lib/site";
import { CodingTimeCard } from "./coding-time-card";
import { GithubCard } from "./github-card";
import { ImageCard } from "./image-card";
import { SocialsCard } from "./socials-card";
import { StacksCard } from "./stacks-card";

/** The home page grid. Layout lives in globals.css (.bento). */
export function BentoGrid() {
  return (
    <div className="bento mt-8">
      <ImageCard src={portfolio.artwork.left} area="img1" />
      <StacksCard items={portfolio.techStack} />
      <GithubCard username={portfolio.github.username} />
      <SocialsCard socials={socials} />
      <CodingTimeCard />
      <ImageCard src={portfolio.artwork.right} area="img2" />
    </div>
  );
}
