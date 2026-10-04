# 🚀 Your Portfolio: The Complete Guide

Hi Mehakdeep! This guide takes you from "files on my computer" to "live website". Go through the steps in order.

## ✅ What's already done

| | |
| --- | --- |
| ✅ | Your **photo** on Home (`public/images/profile.jpg`) and your **avatar** on About (`public/images/avatar.jpg`) |
| ✅ | **Education:** CGC – College of Engineering (B.Tech CSE AI & ML, 2025 – Present) and Kendriya Vidyalaya Sangathan, Panchkula (Class XII, 2024) |
| ✅ | **Experience:** Team Member, Infosys Springboard Club (COE), and Co-Lead, Google Developer Groups (2026 – Present) |
| ✅ | **Resume PDF** with a **Get Resume 💻** button on About, just like the reference site (`public/resume.pdf`) |
| ✅ | **LinkedIn, GitHub and Email** connected, plus **live GitHub stats** |
| ✅ | **Your Connect chat room** is connected: a 💬 button on every page opens it inside the site |
| ✅ | **Live clock** on Home: starts by itself the moment your site goes live, and keeps ticking (Step 3) |
| ✅ | Your **7 real projects** from GitHub, including **Connect**, your chat app |

## ⏳ What's left for you

| | |
| --- | --- |
| ⏳ | Check the lines marked `← CHECK` in `src/data/portfolio.ts` (Step 2) |
| ⏳ | **Put the site online** (Step 5, about 15 min) |
| ➕ | Optional: add Twitter/X and Instagram, and your CGPA (Step 2) |
| ➕ | Optional: also show your real coding time on the clock card (Step 3) |

---

## Step 1: Run the website on your computer (about 10 min)

1. **Install these free programs.** Use the default options:
   - **Node.js**: <https://nodejs.org>. Choose the **LTS** version.
   - **VS Code**: <https://code.visualstudio.com>
   - **Git** (only needed for Option B in Step 5): <https://git-scm.com/downloads>
2. **Download** `mehakdeep-website.zip` from this chat. Right-click it → **Extract All**, and put it somewhere easy, e.g. `Documents`.
   Inside are two folders: `my-portfolio` (this website) and `chat-room-connect` (your chat app).
3. Open **VS Code**, click **File → Open Folder…** and choose the `my-portfolio` folder.
4. Open the terminal with **Terminal → New Terminal** and run:
   ```bash
   npm install
   npm run dev
   ```
5. Open **<http://localhost:3000>** in your browser. 🎉

> Keep the terminal running while you edit. Every time you save a file (`Ctrl + S`), the page updates by itself.
> To stop the site, click in the terminal and press `Ctrl + C`.

---

## Step 2: Change your details

**All your text is in one file:** `src/data/portfolio.ts`. Its sections are in the same order as the website:
**1. Basics → 2. Home page → 3. Social links → 4. Live features → 5. Projects → 6. About page**.

**Rules:**
- Only change the text **inside the quotes** `"like this"`. Keep the quotes, commas and brackets.
- Put `**double stars**` around words to give them the yellow → purple highlight.
- If the page shows an error after you save, you probably deleted a quote or comma. Press `Ctrl + Z` to undo.
  The terminal also tells you the line number.

### Where each part of the site comes from

| On the website | In `portfolio.ts` |
| --- | --- |
| Name, title and tagline (top of Home) | `name`, `role`, `tagline` |
| "Hey, I'm Mehakdeep 👋" | `shortName` (change it to `"Mehakdeep Singh"` to show your full name) |
| The two paragraphs on Home | `intro` |
| Email (Home, Socials card, About) | `email` |
| Get Resume button | `resume` (see "Your resume" below) |
| LinkedIn, GitHub, Twitter/X, Instagram | `socials` |
| Subtitle under "About Me" | `about.subtitle` |
| Round picture on About | `about.image`, which is `public/images/avatar.jpg` |
| Paragraphs on About | `about.paragraphs` |
| Education cards | `education` |
| Experience cards | `experience` |
| Skills boxes | `skills` |
| Extracurricular Activities, Achievements | `activities`, `achievements` (empty = hidden) |
| Projects page | `projects` |
| Scrolling tech logos on Home | `techStack` |

### Lines to check (`← CHECK`)
- **Experience:** I wrote one short line for each role. Change them to describe what you really do, e.g.
  `"Organised a Google Cloud Study Jam for 200+ students."`
- **Projects:** the dates are when each GitHub repo was last updated.

### Show your CGPA or percentage
In `education`, remove the `//` at the start of the two score lines and type your score:
```ts
scoreLabel: "CGPA",
score: "8.7",
```

### Add Twitter/X and Instagram
In `socials`, replace **`your_handle`** with your username:
```ts
{ label: "Twitter",   icon: "x",         url: "https://x.com/mehakdeep_dev" },
{ label: "Instagram", icon: "instagram", url: "https://www.instagram.com/mehakdeep.codes" },
```
Links that still contain `your_handle` are **hidden automatically**. If you don't use one, delete that line.
More icons you can use: `youtube`, `leetcode`, `discord`, `medium`, `website`, `spotify`.

### Add achievements or activities
Remove the `//` at the start of the example lines and change the text:
```ts
achievements: [
  { text: "Finalist at XYZ Hackathon 2026 among 500+ teams.", certificateUrl: "https://drive.google.com/..." },
],
```

### Your resume
The **Get Resume** button opens `public/resume.pdf`. I made it from your details: contact info, education, experience, projects and skills.

- **To edit it:** open `resume/resume.html` in VS Code and change the text. Then open that file in **Chrome**
  (right-click → Open with → Chrome), press **`Ctrl + P`**, choose **Save as PDF**, **A4**, Margins **Default**,
  and save it as `resume.pdf` in the `public` folder, replacing the old one.
- **Have your own resume?** Just copy it into `public` and name it `resume.pdf`.
- 🔒 Your **phone number** is on the resume, and anyone can download the resume from your site.
  If you'd rather not share it publicly, delete that line in `resume/resume.html` and save the PDF again.

### Photos and project images
- **Home photo:** replace `public/images/profile.jpg` with a square photo, using the same name.
- **About picture:** replace `public/images/avatar.jpg`, using the same name.
- **Project screenshot:** put an image (1280×800 is ideal) in `public/images/projects/` and set that project's `image`.
- **Add a project:** copy one `{ title: ... },` block inside `projects`, paste it, and edit it.
  Add `liveUrl: "https://..."` to show a **Live Demo** button.

---

## Step 3: Your live clock (works by itself)

The clock card on Home shows how long your site has been live, e.g. **12 days · Live since launch · 12d 04:22:09**,
ticking every second. There's nothing to set up:

- **It starts the moment your site first goes live on Vercel.** It finds your first deploy on GitHub by itself.
- **Updates don't reset it.** It keeps counting from your first deploy, however often you update the site.
- On your computer (`npm run dev`) it counts from when you started the site. That's normal.

**Want a fixed start date instead?** In `portfolio.ts`, fill in `launch.date`, e.g.
`date: "2026-10-05T18:30:00+05:30"` (`+05:30` means India time).

### Optional: also show your real coding time
With a free **WakaTime** key, the bottom line of the clock card also shows your coding time, e.g.
**"Coding now · 2:13:48 today"** while you're coding, or "Coded today · 2h 13m".

1. **Sign up** at <https://wakatime.com/signup>. "Sign up with GitHub" is easiest.
2. **Install the VS Code extension:** press `Ctrl + Shift + X`, search **WakaTime**, click **Install**.
   When it asks for your **API key**, copy it from <https://wakatime.com/settings/api-key> and paste it in.
3. **On your computer:** right-click **`.env.example`** → **Copy**, paste, and rename the copy to **`.env.local`**.
   Paste your key after `WAKATIME_API_KEY=`, then restart `npm run dev`.
4. **On Vercel:** go to **Settings → Environment Variables**, add `WAKATIME_API_KEY` with your key, then **Redeploy**.

> ⚠️ **Never paste the API key into `portfolio.ts`**. That file is public. `.env.local` is never uploaded.

---

## Step 4: Your Connect chat room (already connected)

**How visitors use it:** they click the 💬 button (bottom-right of every page), or "chat with me live" on Home or
"Live chat" on About. Your chat room opens **inside your site** with the room **`mehakdeep`** already filled in.
They type a name and press **Enter Chat Room**.

**How you talk to them:**
1. On your phone or laptop, open **<https://chat-room-connect.onrender.com/?room=mehakdeep>**
   and join with your name.
2. 📱 Tip: in Chrome on your phone, tap **⋮ → Add to Home screen**, so the room is one tap away.
3. While you're in the room, you see visitors join in the member list and can chat in real time.

**Good to know**
- Messages last only while the room is open. If a visitor is still in the room when you join, you'll see what they
  already wrote (up to the last 150 messages). When everyone leaves, the room and its messages are gone.
  When you're not around, visitors can still reach you by Email or LinkedIn (both are on the site).
- Your chat app runs on Render's **free plan**, which sleeps after 15 minutes without visitors. Your portfolio wakes
  it up automatically when someone stays 8+ seconds or points at the chat button. Even so, the first load can take
  up to a minute, and the chat window tells visitors that.
- **Change the room name:** edit `chat.room` in `portfolio.ts`. **Turn chat off:** set `chat.url` to `""`.
- **Updating your chat app:** its code is in the `chat-room-connect` folder of the zip. Change what you like, then on
  <https://github.com/wentian506/chat-room-connect> click **Add file → Upload files**, drag in the changed files and
  **Commit changes**. Render redeploys it by itself in about 2–3 minutes.

---

## Step 5: Put it online for free (about 15 min)

You'll put your code on **GitHub** and let **Vercel** host it for free. After that, every change you upload goes live
by itself. Pick **Option A** (no commands, just drag and drop) or **Option B** (terminal commands).

### 5.1 Create a GitHub repository
Go to <https://github.com/new> and fill it in:
- **Repository name:** `portfolio`
- **Visibility:** Public
- **Don't** tick "Add a README"

Then click **Create repository**.

### 5.2 Upload your code

**Option A: Drag and drop (easiest)**
1. On the new repository page, click the link **"uploading an existing file"**.
2. Extract `mehakdeep-website.zip` **again** into a new folder, so `my-portfolio` has no `node_modules` or `.env.local` in it.
3. Open the extracted `my-portfolio` folder, select **everything inside it** (`Ctrl + A`), and drag it onto the GitHub page.
   Drag the *contents*, not the `my-portfolio` folder itself.
4. Wait for all files to finish uploading, then click **Commit changes**.

**Option B: Terminal commands**
In the VS Code terminal (stop the site first with `Ctrl + C`), run these one by one:
```bash
git config --global user.name "Mehakdeep Singh"
git config --global user.email "mehakdeep.s2006@gmail.com"
git init
git add .
git commit -m "My portfolio"
git branch -M main
git remote add origin https://github.com/wentian506/portfolio.git
git push -u origin main
```
The first time, a window asks you to **sign in to GitHub**. Allow it.
(Your `.env.local` with the secret key is **not** uploaded. That's correct.)

### 5.3 Deploy on Vercel
1. Go to <https://vercel.com/signup> and choose **Continue with GitHub**.
2. Click **Add New… → Project**. Next to your `portfolio` repo, click **Import**.
3. Leave everything as it is. Vercel detects Next.js, and **no settings are needed**. Optional, under **Environment Variables**:
   - `GITHUB_TOKEN`: a token from <https://github.com/settings/tokens>. It helps if GitHub numbers ever show "–".
   - `WAKATIME_API_KEY`: only if you set up the optional coding time (Step 3).
4. Click **Deploy** and wait about 1 minute. 🎉 Your site is live at an address like `https://portfolio-xxxx.vercel.app`,
   and your **live clock starts ticking** from that moment.
5. **Nicer address:** go to your project → **Settings → Domains** and set something like `mehakdeep.vercel.app`,
   if it's available.

> Added or changed an environment variable *after* deploying? Go to **Deployments** → **⋯** on the latest one → **Redeploy**.

### 5.4 Share it
- **LinkedIn:** Edit intro → Contact info → **Website**. Also add the link under **Featured**.
- **GitHub:** go to your profile → **Edit profile** → **Website**.
- **Resume:** add your site link to `resume/resume.html` and save the PDF again (Step 2).

---

## Step 6: Update the live site anytime

- **Option A users:** open your repository on GitHub → **Add file → Upload files**, drag the changed files into
  the right folder, and click **Commit changes**. You can also edit a file on GitHub directly with the ✏️ pencil icon.
- **Option B users:** run
  ```bash
  git add .
  git commit -m "Update about section"
  git push
  ```

Vercel rebuilds the site automatically, and it's live about 1 minute later.

---

## Step 7: Custom domain like `mehakdeep.dev` (optional)

- **Students:** the free [GitHub Student Developer Pack](https://education.github.com/pack) has included a free `.me`
  domain (Namecheap) and a free `.tech` domain for one year. Offers can change.
- Or buy one (about ₹800–1,500/year) on Namecheap, Porkbun, Cloudflare or GoDaddy.
- In Vercel, go to **Settings → Domains → Add**, type your domain, and copy the DNS records Vercel shows into your
  domain provider's DNS settings.
- Set `siteUrl: "https://mehakdeep.dev"` in `portfolio.ts`, then upload the change.

---

## 📁 What's inside

```
my-portfolio/
├── GUIDE.md                  ← this guide
├── README.md                 ← short technical overview
├── .env.example              ← template for your secret keys
├── resume/resume.html        ← editable source of your resume
├── public/
│   ├── resume.pdf            ← opened by the "Get Resume" button
│   └── images/               ← profile.jpg (Home), avatar.jpg (About), artwork, projects/
└── src/
    ├── data/portfolio.ts     ← ✏️ ALL your content
    ├── app/                  ← pages: Home, Projects, About, plus api/coding-time
    ├── components/           ← navbar, cards, chat window…
    └── lib/                  ← GitHub data, live clock, WakaTime
```

---

## 🛠 Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm` is not recognized | Install Node.js, then **close and reopen VS Code**. |
| Red error page after editing | A quote, comma or bracket is missing. Read the line number in the terminal, or press `Ctrl + Z`. |
| Clock started again from 0 after an update | Make sure the site is deployed from GitHub (Step 5). Or set `launch.date` in `portfolio.ts` to lock the start date. |
| Optional coding-time line doesn't show | The file must be named exactly `.env.local` (not `.env.local.txt`). Restart `npm run dev`. On Vercel, add `WAKATIME_API_KEY` and **Redeploy**. |
| Chat stuck on "Connecting…" | The free Render server is waking up. Wait up to a minute, or click ↗ to open the room in a new tab. |
| GitHub numbers show `–` | GitHub's free API limit was hit. It recovers within an hour, or add `GITHUB_TOKEN`. |
| Vercel says "No Next.js version detected" | You uploaded the `my-portfolio` folder itself instead of its contents. In your Vercel project's **Settings**, find **Root Directory**, set it to `my-portfolio`, then redeploy. |
| Old image still showing | Hard refresh with `Ctrl + Shift + R`. |
| `git push` asks for a password | Use the browser sign-in window. GitHub doesn't accept account passwords in the terminal. |

---

## ✔️ Checklist before you share your link

- [ ] Experience lines and project dates checked (`← CHECK`)
- [ ] Resume opened and checked (About → **Get Resume**)
- [ ] After deploying, the clock card on Home says **Live since launch** and is ticking (Step 3)
- [ ] Joined your chat room once from your phone and bookmarked it (Step 4)
- [ ] Optional: Twitter/X and Instagram added, or their lines deleted
- [ ] Site link added to LinkedIn, GitHub and your resume (Step 5.4)
