import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Bricolage_Grotesque, Geist_Mono, Inter } from "next/font/google";
import { ChatWidget } from "@/components/chat-widget";
import { Navbar } from "@/components/navbar";
import { portfolio } from "@/data/portfolio";
import { chatUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = `${portfolio.name} | ${portfolio.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${portfolio.name}` },
  description: portfolio.tagline,
  openGraph: {
    title,
    description: portfolio.tagline,
    url: "/",
    siteName: portfolio.name,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description: portfolio.tagline },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

// Runs before the page paints, so a saved light/dark choice never "flashes".
const themeScript = `(function(){try{var t=localStorage.getItem('theme')||'dark';var r=document.documentElement;r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${bricolage.variable} ${geistMono.variable}`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <Navbar />
        <main className="overflow-x-clip">{children}</main>
        {chatUrl && (
          <ChatWidget
            url={chatUrl}
            room={portfolio.chat.room}
            name={portfolio.shortName ?? portfolio.name.split(" ")[0]}
          />
        )}
      </body>
    </html>
  );
}
