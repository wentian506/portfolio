import { portfolio } from "@/data/portfolio";
import type { Social } from "./types";
import { isPlaceholder } from "./utils";

/* Values worked out from src/data/portfolio.ts and used across the site.
 * You normally don't need to edit this file. */

/** Your email, or null while it's still the placeholder. */
export const email = isPlaceholder(portfolio.email) ? null : portfolio.email;

const filledSocials = portfolio.socials.filter((s) => !isPlaceholder(s.url));

/**
 * Social links that are filled in (placeholders like "your_handle" are hidden),
 * plus an "Email" card when you've added your email.
 */
export const socials: Social[] =
  email && !filledSocials.some((s) => s.url.startsWith("mailto:"))
    ? [...filledSocials, { label: "Email", icon: "email", url: `mailto:${email}` }]
    : filledSocials;

export const linkedin = socials.find((s) => s.icon === "linkedin");

export const githubUrl =
  socials.find((s) => s.icon === "github")?.url ??
  (isPlaceholder(portfolio.github.username) ? undefined : `https://github.com/${portfolio.github.username}`);

/**
 * The public address of the site. On Vercel this is filled in automatically
 * (your *.vercel.app address) unless you set `siteUrl` to a custom domain.
 */
export const siteUrl =
  portfolio.siteUrl ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/**
 * Link to your chat room with the room already filled in
 * (e.g. https://chat-room-connect.onrender.com/?room=mehakdeep),
 * or null when chat is turned off.
 */
export const chatUrl = buildChatUrl(portfolio.chat.url, portfolio.chat.room);

function buildChatUrl(url: string, room: string) {
  if (!url) return null;
  try {
    const link = new URL(url);
    if (room) link.searchParams.set("room", room);
    return link.toString();
  } catch {
    return null;
  }
}
