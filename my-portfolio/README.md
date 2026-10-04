# Mehakdeep Singh: Portfolio

Personal portfolio built with **Next.js 16, React 19, Tailwind CSS 4 and TypeScript**.

👉 **New here? Read [GUIDE.md](GUIDE.md).** It explains, step by step, how to change your details,
turn on the real-time coding timer, use your chat room, and put the site online.

## Features
- **Home:** photo, intro, and a bento grid with:
  - scrolling tech-stack logos
  - live **GitHub stats**
  - social cards (LinkedIn, GitHub, Email)
  - a **real-time coding timer** (WakaTime): total hours, today's time, and a live
    "Coding now" clock that ticks every second while you code
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
src/app/api/coding-time/       ← serves your live WakaTime numbers
src/app/globals.css            ← colours, animations, grid layout
src/components/chat-widget.tsx ← 💬 chat button + chat window
src/components/bento/          ← home page cards (coding timer, GitHub, socials…)
src/lib/                       ← GitHub + WakaTime data, helpers
```

## Environment variables
| Name | Needed for | Where to get it |
| --- | --- | --- |
| `WAKATIME_API_KEY` | Real-time coding timer | <https://wakatime.com/settings/api-key> |
| `GITHUB_TOKEN` | Optional: higher GitHub API limits | <https://github.com/settings/tokens> |

Put these in `.env.local` on your computer **and** in Vercel → Project → Settings → Environment Variables.
