import type { TechName } from "@/components/tech-icons";
import type { SocialIconName } from "@/components/social-icons";

export type { TechName, SocialIconName };

export interface Social {
  /** Shown under the icon on the home page "Socials" card and on the About page. */
  label: string;
  /** Which icon to show. See src/components/social-icons.tsx for the full list. */
  icon: SocialIconName;
  /** Full link. While it still contains "your_handle" it stays hidden on the site. */
  url: string;
  /** Optional @handle. The LinkedIn one is used in "Find me on LinkedIn @handle". */
  handle?: string;
}

export interface Project {
  title: string;
  /** Any text, e.g. "Jun 2026". */
  date: string;
  description: string;
  /** Screenshot path inside /public, e.g. "/images/projects/my-app.jpg" (1280×800 looks best). */
  image: string;
  /** Tech tags shown as pills. Any text works here. */
  tech: string[];
  sourceUrl?: string;
  liveUrl?: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  /** e.g. "Current" or "Graduated". */
  status: string;
  /** e.g. "CGPA" or "Score". */
  scoreLabel?: string;
  score?: string;
}

export interface Experience {
  role: string;
  org: string;
  /** Any text, e.g. "2026 – Present". */
  date: string;
  certificateUrl?: string;
  /** Bullet points. Leave the list empty [] for none. */
  points: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Achievement {
  text: string;
  certificateUrl?: string;
}

export interface Portfolio {
  name: string;
  /** What people call you, used in "Hey, I'm ___ 👋". Defaults to your first name. */
  shortName?: string;
  role: string;
  tagline: string;
  /**
   * Your website address, used for link previews and SEO.
   * Leave "" while you use the free *.vercel.app address (filled in automatically).
   * Set it when you buy a custom domain, e.g. "https://mehakdeep.dev".
   */
  siteUrl: string;
  avatar: string;
  /** Hidden on the site while it's still "you@example.com". */
  email: string;
  /** Path inside /public, e.g. "/resume.pdf". Leave "" to hide the "Get Resume" button. */
  resume: string;
  /** Home page paragraphs. Wrap words in **double stars** to highlight them. */
  intro: string[];
  socials: Social[];
  github: {
    /** Your GitHub username. Powers the live stats card. */
    username: string;
  };
  launch: {
    /**
     * The live clock on the home page counts up from the moment your site first
     * went live. It finds your first Vercel deploy by itself, so leave this "".
     * Want a fixed start instead? e.g. "2026-10-05T18:30:00+05:30"
     */
    date: string;
  };
  wakatime: {
    /**
     * Optional extra: once you add the WAKATIME_API_KEY environment variable, the
     * clock card also shows your real coding time (GUIDE.md, Step 3).
     * true = also show the name of the project you're coding in right now.
     */
    showProject: boolean;
    /**
     * Optional, only if you DON'T use the API key: a public WakaTime share link
     * (total hours only, no live timer). Open https://wakatime.com/share/embed,
     * pick "All Time Since Today" + "JSON", and paste the URL here.
     */
    shareUrl: string;
  };
  chat: {
    /** Address of your Connect chat app. Leave "" to hide every chat button. */
    url: string;
    /** Room that visitors join automatically. Open the same room yourself to talk to them. */
    room: string;
  };
  /** Icons for the scrolling "Stacks" card. Autocomplete shows every available name. */
  techStack: TechName[];
  /** The two artwork images in the home page grid. */
  artwork: { left: string; right: string };
  projects: Project[];
  about: {
    subtitle: string;
    image: string;
    /** Wrap words in **double stars** to highlight them. */
    paragraphs: string[];
  };
  education: Education[];
  experience: Experience[];
  skills: SkillGroup[];
  activities: Experience[];
  achievements: Achievement[];
}
