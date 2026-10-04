import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa6";
import {
  SiDiscord, SiGithub, SiInstagram, SiLeetcode, SiMedium, SiSpotify, SiX, SiYoutube,
} from "react-icons/si";
import { TbMail, TbWorld } from "react-icons/tb";

/** Icons available for `socials` in src/data/portfolio.ts. */
export const socialIcons = {
  linkedin: { icon: FaLinkedin, color: "#0A66C2" },
  x: { icon: SiX, color: "fg" },
  github: { icon: SiGithub, color: "fg" },
  instagram: { icon: SiInstagram, color: "#E4405F" },
  spotify: { icon: SiSpotify, color: "#1ED760" },
  youtube: { icon: SiYoutube, color: "#FF0000" },
  email: { icon: TbMail, color: "#EA4335" },
  leetcode: { icon: SiLeetcode, color: "#FFA116" },
  discord: { icon: SiDiscord, color: "#5865F2" },
  medium: { icon: SiMedium, color: "fg" },
  website: { icon: TbWorld, color: "#38BDF8" },
} satisfies Record<string, { icon: IconType; color: string }>;

export type SocialIconName = keyof typeof socialIcons;

/** Resolves "fg" to the current text colour so mono logos work in both themes. */
export function brandColor(color: string) {
  return color === "fg" ? "var(--foreground)" : color;
}
