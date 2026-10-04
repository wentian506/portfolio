import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

// The preview card shown when your link is shared on LinkedIn, WhatsApp, X, etc.
export const alt = `${portfolio.name} | ${portfolio.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Reads your avatar from /public so it can be drawn into the preview card. */
async function loadAvatar() {
  const src = portfolio.avatar;
  if (!/\.(jpe?g|png)$/i.test(src) || /^https?:/i.test(src)) return null;
  try {
    const file = await readFile(join(process.cwd(), "public", src));
    return `data:${/\.png$/i.test(src) ? "image/png" : "image/jpeg"};base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const avatar = await loadAvatar();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 96px",
          background: "radial-gradient(circle at 85% 15%, #1e1b4b 0%, #000 55%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: avatar ? 640 : 960 }}>
          {!siteUrl.includes("localhost") && (
            <div style={{ fontSize: 28, color: "#737373" }}>{siteUrl.replace(/^https?:\/\//, "")}</div>
          )}
          <div style={{ fontSize: 84, fontWeight: 700, marginTop: 18, letterSpacing: -3, lineHeight: 1 }}>
            {portfolio.name}
          </div>
          <div style={{ fontSize: 38, marginTop: 14, color: "#c084fc" }}>{portfolio.role}</div>
          <div style={{ fontSize: 26, color: "#a3a3a3", marginTop: 28, lineHeight: 1.45 }}>{portfolio.tagline}</div>
        </div>
        {avatar && (
          <img
            src={avatar}
            alt=""
            width={300}
            height={300}
            style={{ borderRadius: 9999, border: "6px solid rgba(255,255,255,0.12)", objectFit: "cover" }}
          />
        )}
      </div>
    ),
    size,
  );
}
