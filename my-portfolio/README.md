# Mehakdeep Singh: Portfolio

Personal portfolio built with **Next.js 16, React 19, Tailwind CSS 4 and TypeScript**.

👉 **New here? Read [GUIDE.md](GUIDE.md).** It explains, step by step, how to change your details,
how the live clock works, how to use your chat room, and how to put the site online.

## Features
- **Home:** photo, intro, and a bento grid with:
  - scrolling tech-stack logos
  - live **GitHub stats**
  - social cards (LinkedIn, GitHub, Email)
  - a **"Live since launch" clock** that starts by itself at your first deploy and ticks every
    second (optional: also shows your real coding time from WakaTime)
- **Projects:** screenshots, tech tags, Source / Live Demo buttons
- **About:** picture, intro with **Get Resume** button, education, experience, skills, activities, achievements
- **Live chat:** a 💬 button on every page opens the Connect chat room inside the site
- **Resume PDF**, plus its editable source in `resume/resume.html`
- Dark/light mode, link-preview image with your photo, SEO tags, works on phones
- Free hosting on Vercel

## Quick start
```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Run locally with instant updates |
| `npm run build` | Production build (what Vercel runs) |
| `npm start` | Serve the production build |
| `npm run lint` | Check the code |

## Where things live
```
src/data/portfolio.ts          ← ✏️ ALL your content (text, links, projects, education…)
public/images/profile.jpg      ← home page photo
public/images/avatar.jpg       ← About page picture
public/images/projects/        ← project screenshots
public/resume.pdf              ← the file the "Get Resume" button opens
resume/resume.html             ← editable source of your resume (print it to PDF)
.env.local                     ← secret keys (create from .env.example, never uploaded)

src/app/page.tsx               ← Home page
src/app/projects/page.tsx      ← Projects page
src/app/about/page.tsx         ← About page
src/app/api/coding-time/       ← optional WakaTime numbers for the clock card
src/app/globals.css            ← colours, animations, grid layout
src/components/chat-widget.tsx ← 💬 chat button + chat window
src/components/bento/          ← home page cards (live clock, GitHub, socials…)
src/lib/                       ← GitHub data, launch time, WakaTime, helpers
```

## Environment variables
None are required. The site, including the live clock, works without any.

| Name | Needed for | Where to get it |
| --- | --- | --- |
| `WAKATIME_API_KEY` | Optional: real coding time on the clock card | <https://wakatime.com/settings/api-key> |
| `GITHUB_TOKEN` | Optional: higher GitHub API limits | <https://github.com/settings/tokens> |

Put these in `.env.local` on your computer **and** in Vercel → Project → Settings → Environment Variables.
