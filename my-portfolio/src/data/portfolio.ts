/* ============================================================================
 *  ✏️  EDIT THIS FILE TO CHANGE ANYTHING ON YOUR WEBSITE
 * ----------------------------------------------------------------------------
 *  The sections below are in the same order as the website:
 *    1. Basics   2. Home page   3. Social links   4. Live features
 *    5. Projects   6. About page
 *
 *  • Text inside "quotes" is what appears on the site. Change it freely.
 *  • Wrap words in **double stars** to give them the yellow → purple highlight.
 *  • Image paths start from the /public folder: "/images/profile.jpg"
 *    means public/images/profile.jpg.
 *  • Anything still containing "your_handle" is hidden on the site
 *    automatically until you fill it in.
 *  • Lines marked ← CHECK were written for you. Make sure they're right.
 *  • Step-by-step help for everything: GUIDE.md
 * ========================================================================== */

import type { Portfolio } from "@/lib/types";

export const portfolio: Portfolio = {
  /* ═══════════════════════════ 1. BASICS ═══════════════════════════ */
  name: "Mehakdeep Singh",
  shortName: "Mehakdeep", // used in "Hey, I'm Mehakdeep 👋" on the About page
  role: "AI/ML & Full-Stack Developer",
  tagline:
    "AI/ML & Full-Stack Developer building intelligent, data-driven web apps, from machine-learning models to production-ready products.",
  siteUrl: "", // leave "" on Vercel; put your custom domain here later, e.g. "https://mehakdeep.dev"
  avatar: "/images/profile.jpg", // your photo on the home page
  email: "mehakdeep.s2006@gmail.com",
  resume: "/resume.pdf", // the "Get Resume" button opens public/resume.pdf

  /* ═════════════════════════ 2. HOME PAGE ══════════════════════════ */
  intro: [
    "Hi, I'm Mehakdeep, **an AI/ML & Full-Stack Developer** who loves turning data into useful products, from **machine-learning models** to fast, modern web apps built with **Next.js**, **React** and **FastAPI**.",
    "I've built projects like an **explainable credit-scoring platform for MSMEs**, a **speech emotion recognition** model and an **AI-verified resume builder**, and I'm always exploring new ideas in **AI**, **security** and **cloud deployment**.",
  ],

  // Scrolling logos in the "Stacks" card. Type a name inside the quotes and
  // your editor suggests every available icon.
  techStack: [
    "Python", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML", "CSS", "Vite", "Git", "Vercel",
    "FastAPI", "Flask", "scikit-learn", "TensorFlow", "pandas", "NumPy", "Streamlit", "PostgreSQL", "MySQL", "Supabase", "Docker",
  ],

  // The two artwork pictures in the home page grid.
  artwork: {
    left: "/images/art-forest.jpg",
    right: "/images/art-street.jpg",
  },

  /* ════════════════════════ 3. SOCIAL LINKS ════════════════════════ */
  // Shown as tilted cards on the home page (first 4) and on the About page.
  // Your email (above) is added as an "Email" card automatically.
  // Twitter and Instagram stay hidden until you replace "your_handle".
  // Icons available: linkedin, x, github, instagram, spotify, youtube,
  // email, leetcode, discord, medium, website
  socials: [
    {
      label: "LinkedIn",
      icon: "linkedin",
      url: "https://www.linkedin.com/in/mehakdeep-singh-72914238a",
      handle: "@Mehakdeep_Singh",
    },
    { label: "GitHub", icon: "github", url: "https://github.com/wentian506", handle: "@wentian506" },
    { label: "Twitter", icon: "x", url: "https://x.com/your_handle" }, // ← your X/Twitter username
    { label: "Instagram", icon: "instagram", url: "https://www.instagram.com/your_handle" }, // ← your Instagram username
  ],

  /* ════════════════════════ 4. LIVE FEATURES ═══════════════════════ */
  // Live GitHub stats card (refreshes every hour).
  github: {
    username: "wentian506",
  },

  // Live clock on the home page. It starts by itself the moment your site goes
  // live (your first Vercel deploy) and keeps counting, even when you update the site.
  // Leave "" for automatic, or set a fixed start like "2026-10-05T18:30:00+05:30".
  launch: {
    date: "",
  },

  // Optional extra: also show your real coding time on the clock card once you
  // add the WAKATIME_API_KEY environment variable (GUIDE.md, Step 3).
  wakatime: {
    showProject: false, // true = also show which project you're coding right now
    shareUrl: "", // not needed when you use WAKATIME_API_KEY
  },

  // Your Connect chat room. A 💬 button on every page opens it, and visitors
  // join the room below automatically. Open the same room yourself to reply:
  // https://chat-room-connect.onrender.com/?room=mehakdeep
  chat: {
    url: "https://chat-room-connect.onrender.com/",
    room: "mehakdeep",
  },

  /* ═════════════════════════ 5. PROJECTS ═══════════════════════════ */
  // Taken from your GitHub READMEs. Dates are when each repo was last updated. ← CHECK
  projects: [
    {
      title: "PulseFi AI",
      date: "Jul 2026",
      description:
        "A full-stack fintech platform that builds a living financial identity for MSMEs: XGBoost scoring models explained with SHAP, a FastAPI + PostgreSQL backend, and a Next.js + TypeScript frontend, built to deploy on Vercel and Railway.",
      image: "/images/projects/pulsefi-ai.jpg",
      tech: ["Next.js", "TypeScript", "FastAPI", "XGBoost", "SHAP", "PostgreSQL"],
      sourceUrl: "https://github.com/wentian506/Pulsefi-ai",
    },
    {
      title: "CRYPTORA",
      date: "Sep 2026",
      description:
        "Cryptographic risk & post-quantum migration intelligence platform built with Team KRYPTX for the Smart India Hackathon (PS-26164). Scans code in the browser, generates a CBOM, scores quantum risk and plans hybrid/PQC migration.",
      image: "/images/projects/cryptora.jpg",
      tech: ["React", "Vite", "JavaScript", "FastAPI", "MySQL", "Docker"],
      sourceUrl: "https://github.com/wentian506/cryptora-deployment",
    },
    {
      title: "Connect",
      date: "Oct 2026",
      description:
        "Real-time, room-based chat app with zero dependencies: a hand-written WebSocket server with an HTTP long-polling fallback, live member lists, typing indicators, invite links, rate limiting and 70 automated test checks. It powers the live chat on this website.",
      image: "/images/projects/connect.jpg",
      tech: ["Node.js", "JavaScript", "WebSockets", "HTML", "CSS", "Render"],
      sourceUrl: "https://github.com/wentian506/chat-room-connect",
      liveUrl: "https://chat-room-connect.onrender.com",
    },
    {
      title: "Reflect",
      date: "Jun 2026",
      description:
        "AI skill-verification & resume builder with 16 resume templates, proctored skill tests (tab-switch, copy-paste and eye-tracking checks) and in-browser liveness detection using MediaPipe face landmarks.",
      image: "/images/projects/reflect.jpg",
      tech: ["JavaScript", "HTML", "CSS", "MediaPipe", "Vercel"],
      sourceUrl: "https://github.com/wentian506/Reflect---Ai-Resume-maker-and-Authenticator",
      liveUrl: "https://reflect-ai-resume.vercel.app",
    },
    {
      title: "Speech Emotion Recognition",
      date: "Jul 2026",
      description:
        "Deep-learning model that recognises emotions such as happy, angry, sad and fearful from raw speech: MFCC, chroma and mel-spectrogram features feed a CNN-LSTM, with a Streamlit demo to upload or record audio.",
      image: "/images/projects/speech-emotion.jpg",
      tech: ["Python", "TensorFlow", "Librosa", "scikit-learn", "Streamlit"],
      sourceUrl: "https://github.com/wentian506/-Speech-Emotion-Recognition",
    },
    {
      title: "Disease Risk Predictor",
      date: "Jul 2026",
      description:
        "Predicts the likelihood of heart disease, diabetes and breast cancer from patient data. Compares Logistic Regression, SVM, Random Forest and XGBoost, auto-selects the best model per dataset, and serves live predictions in Streamlit.",
      image: "/images/projects/disease-risk.jpg",
      tech: ["Python", "scikit-learn", "XGBoost", "pandas", "Streamlit"],
      sourceUrl: "https://github.com/wentian506/Disease-Risk-Predictor",
    },
    {
      title: "Email Spam Detection",
      date: "Sep 2026",
      description:
        "Classifies emails and SMS messages as spam or ham with TF-IDF features, comparing Logistic Regression and Linear SVM (98.65% accuracy, F1 0.946), served through a Flask web app and JSON REST API.",
      image: "/images/projects/email-spam.jpg",
      tech: ["Python", "scikit-learn", "pandas", "Flask"],
      sourceUrl: "https://github.com/wentian506/Email-Detection",
    },
  ],

  /* ════════════════════════ 6. ABOUT PAGE ══════════════════════════ */
  about: {
    subtitle: "AI/ML & Full-Stack Developer building intelligent, data-driven web applications.",
    image: "/images/avatar.jpg", // the round picture next to "Hey, I'm Mehakdeep 👋"
    paragraphs: [
      "I'm a **B.Tech CSE (AI & ML)** student at **CGC – College of Engineering** and a **developer who loves building with data**. I work across the stack, training models with **Python**, **scikit-learn**, **XGBoost** and **TensorFlow** and shipping them in real products with **FastAPI**, **React** and **Next.js**.",
      "My projects range from an **explainable credit-scoring platform for MSMEs** and a **CNN-LSTM speech emotion model** to **CRYPTORA**, a post-quantum security platform my team built for the **Smart India Hackathon**.",
      "Beyond my own projects, I'm a **Co-Lead at Google Developer Groups** and a team member of the **Infosys Springboard Club**, where I love learning alongside other students. I'm always open to opportunities to **learn**, **collaborate** and build things with **real impact**.",
    ],
  },

  education: [
    {
      school: "CGC – College of Engineering",
      degree: "B.Tech – Computer Science & Engineering (AI & ML)",
      period: "2025 – Present",
      status: "Current",
      // scoreLabel: "CGPA",  ← remove the // on these two lines to show your CGPA
      // score: "8.5",
    },
    {
      school: "Kendriya Vidyalaya Sangathan, Panchkula",
      degree: "Class XII – Senior Secondary (CBSE)",
      period: "2024",
      status: "Graduated",
      // scoreLabel: "Score",
      // score: "90%",
    },
  ],

  experience: [
    {
      role: "Team Member",
      org: "Infosys Springboard Club (COE)",
      date: "2026 – Present",
      // certificateUrl: "https://drive.google.com/...",  ← add a certificate link if you have one
      points: [
        // ← CHECK: change this line to describe what you actually do
        "Building industry-ready tech skills and taking part in club activities at the Infosys Springboard Centre of Excellence.",
      ],
    },
    {
      role: "Co-Lead",
      org: "Google Developer Groups (GDG)",
      date: "2026 – Present",
      points: [
        // ← CHECK: change this line to describe what you actually do
        "Co-leading the GDG community and helping organise tech sessions, workshops and events for student developers.",
      ],
    },
  ],

  skills: [
    { category: "AI / Machine Learning", items: ["Python", "scikit-learn", "XGBoost", "TensorFlow", "pandas", "NumPy", "SHAP", "Streamlit"] },
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS"] },
    { category: "Backend", items: ["FastAPI", "Flask", "REST APIs", "SQLAlchemy"] },
    { category: "Databases & Deployment", items: ["PostgreSQL", "MySQL", "Supabase", "Docker", "Vercel", "Railway"] },
  ],

  // Empty lists are hidden on the site. Copy the example format to add yours.
  activities: [
    // {
    //   role: "Volunteer",
    //   org: "Tech Fest, CGC",
    //   date: "Mar 2026",
    //   points: ["What you did, e.g. organised events and managed participants."],
    // },
  ],

  achievements: [
    // { text: "Finalist at XYZ Hackathon 2026 out of 500+ teams.", certificateUrl: "https://drive.google.com/..." },
  ],
};
