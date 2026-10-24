/**
 * ============================================================
 *  PERSONAL CONTENT — EDIT THIS FILE TO UPDATE THE WHOLE SITE
 * ============================================================
 * All names, links, copy, projects, skills and achievements
 * live here so nothing is hard-coded inside components.
 * Replace placeholder values (marked with ✎) with real data.
 */

export const profile = {
  /** ✎ Your name */
  name: "Khushbu Tripathi",
  /** Short wordmark used in the navbar / footer */
  wordmark: "Khushbu",
  /** Loader subtitle */
  loaderTagline: "Creative mind. Curious soul. Building what's next.",

  /** ✎ Portrait photo — drop your image in src/assets and update the path,
   *  or set to null to keep the tasteful placeholder frame. */
  portrait: null as string | null,
  portraitAlt: "Portrait of Khushbu Tripathi",

  /** ✎ Small handwritten caption near the portrait */
  portraitCaption: "hello, it's me 🌻",

  /** Rotating professional titles (typewriter effect) */
  titles: [
    "Multidisciplinary Analyst",
    "Business Development Enthusiast",
    "IT & Web Developer",
    "E-commerce Strategist",
    "Digital Artist",
    "Animator & Character Designer",
  ],

  /** Hero introduction paragraph */
  intro:
    "I'm passionate about connecting creativity, technology, and business to build meaningful digital experiences. From exploring new ideas to developing practical solutions, I enjoy turning challenges into opportunities for growth, innovation, and continuous improvement.",

  /** ✎ Social links — use your real URLs. Remove/replace as needed. */
  socials: {
    github: "https://github.com/your-username", // ✎
    linkedin: "https://www.linkedin.com/in/your-handle", // ✎
    email: "mailto:you@example.com", // ✎
    instagram: "https://www.instagram.com/your-handle", // ✎ (optional)
  },

  footerTagline:
    "Growing ideas, creating experiences, and building something meaningful — one project at a time.",
};

/* ---------------------------------------------------------- */
/*  FEATURED PROJECTS                                          */
/*  ✎ Replace with real projects. Use `placeholder: true` when  */
/*  content is not ready yet.                                  */
/* ---------------------------------------------------------- */

export type Project = {
  title: string;
  /** unique URL slug → /projects/:slug */
  slug: string;
  description: string;
  category: string;
  tags: string[];
  /** ✎ Links — any field left undefined is simply hidden */
  link?: string;
  repo?: string;
  demo?: string;
  image?: string;
  imageAlt?: string;
  placeholder?: boolean;
  /** Case-study fields (all optional) */
  status?: string;
  date?: string;
  role?: string;
  challenge?: string;
  goal?: string;
  process?: string[];
  tools?: string[];
  outcome?: string;
  lessons?: string;
};

export const featuredProjects: Project[] = [
  {
    title: "✎ Project One — Web Development",
    slug: "project-one",
    description:
      "A short description of the problem you solved, the approach you took, and the outcome. Two sentences is plenty.",
    category: "Web Development",
    tags: ["React", "TypeScript", "CSS"],
    placeholder: true,
    status: "✎ Status",
    date: "✎ 2025",
    role: "✎ Describe your personal role here.",
    challenge: "✎ Explain the problem, need, or creative question this project answered.",
    goal: "✎ Describe the intended outcome (separate from results).",
    process: ["✎ Research & planning", "✎ Build / creation", "✎ Testing & refinement"],
    tools: ["✎ Tool", "✎ Tool"],
    outcome: "✎ The final result — describe it honestly; no invented metrics.",
    lessons: "✎ What you learned and what you'd improve next time.",
  },
  {
    title: "✎ Project Two — Business & Analytics",
    slug: "project-two",
    description:
      "Another real project of yours — what it does, what you learned, and why it matters to you.",
    category: "Business & Analytics",
    tags: ["Excel", "Power BI"],
    placeholder: true,
    role: "✎ Describe your personal role here.",
    challenge: "✎ The problem or question behind this project.",
    goal: "✎ The intended outcome.",
    lessons: "✎ Key takeaway.",
  },
  {
    title: "✎ Project Three — Digital Art",
    slug: "project-three",
    description:
      "A creative piece — character design, animation loop, or digital artwork you're proud of.",
    category: "Digital Art",
    tags: ["Illustration", "Animation"],
    placeholder: true,
    role: "✎ Your creative role.",
    challenge: "✎ The creative question or brief.",
    goal: "✎ What the artwork set out to express.",
    lessons: "✎ Key takeaway.",
  },
];

/**
 * Small experiments — work that doesn't need a full case study.
 * Leave the array EMPTY to hide the "Little Experiments" section.
 */
export const experiments = [] as {
  title: string;
  note: string;
  status?: "Experiment" | "Work in Progress";
  emoji?: string;
  link?: string;
}[];

/* ---------------------------------------------------------- */
/*  SKILLS — only include entries that are accurate            */
/* ---------------------------------------------------------- */

export type SkillGroup = {
  title: string;
  icon: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "</>",
    skills: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "SQL"],
  },
  {
    title: "Tools & Platforms",
    icon: "⚒",
    skills: [
      "Microsoft Office",
      "Excel",
      "Power BI",
      "Git",
      "GitHub",
      "VS Code",
      "OpenCode",
      "Figma",
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: "✦",
    skills: [
      "Generative AI tools",
      "ML fundamentals",
      "Data analysis",
      "AI-assisted development",
      "Automation workflows",
    ],
  },
  {
    title: "Concepts & Specializations",
    icon: "❀",
    skills: [
      "Business Development",
      "E-commerce Strategy",
      "Website Development",
      "Business Analytics",
      "UI/UX Fundamentals",
      "Animation",
      "Digital Art",
      "Character Design",
    ],
  },
];

/* ---------------------------------------------------------- */
/*  ACHIEVEMENTS — verified items only, no invented awards      */
/* ---------------------------------------------------------- */

export type Achievement = {
  title: string;
  description: string;
  date?: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    title: "✎ Certification name",
    description:
      "Replace with a real certification, completed course, competition placement, or milestone — with its date.",
    date: "2025",
  },
  {
    title: "✎ Milestone name",
    description:
      "Another genuine milestone. If achievements are still on the way, completed projects and learning milestones fit perfectly here.",
    date: "2025",
  },
];

/* ---------------------------------------------------------- */
/*  PERSONAL QUALITIES — working style, not fake testimonials  */
/* ---------------------------------------------------------- */

export const qualities = [
  {
    title: "Positive Energy",
    description:
      "Bringing enthusiasm and an encouraging attitude to everyday collaboration.",
  },
  {
    title: "Always Learning",
    description:
      "Looking for ways to improve, adapt, and grow through experience.",
  },
  {
    title: "Focused & Reliable",
    description:
      "Valuing preparation, consistency, and respect for deadlines.",
  },
  {
    title: "Team Spirit",
    description:
      "Paying attention to the people around me and helping create a supportive working environment.",
  },
  {
    title: "Never Stop Growing",
    description:
      "Approaching challenges with persistence, curiosity, and an open mind.",
  },
];

/* ---------------------------------------------------------- */
/*  NAVIGATION — the seven pages of the site                   */
/* ---------------------------------------------------------- */

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Art", to: "/art" },
  { label: "Contact", to: "/contact" },
];

/* ============================================================
 *  ABOUT PAGE CONTENT — edit freely, ✎ marks placeholder facts
 * ============================================================ */

/** About hero — short warm intro under the heading */
export const aboutIntro =
  "Hi, I'm Khushbu Tripathi — a multidisciplinary analyst and a curious mind with a creative soul. I specialize in business development, IT development, e-commerce, website development, and I love the space where technology, business, and imagination meet.";

/** "Every Idea Has a Story" — four editorial paragraphs (biography drafts, not verified facts) */
export const storyParagraphs: { label: string; lead: string; text: string }[] = [
  {
    label: "01 — The Person",
    lead: "Who I Am",
    text: "I'm Khushbu Tripathi, a multidisciplinary analyst specializing in Business Development, IT development, e-commerce business development, website development, animation, digital art, and character design. I love exploring different fields because each one offers a new way to understand problems, express ideas, and create something meaningful. For me, being creative is not limited to making things look beautiful — it's also about thinking differently, finding possibilities, and turning ideas into something useful.",
  },
  {
    label: "02 — The Purpose",
    lead: "Growth & Innovation",
    text: "I'm passionate about improving businesses and the standards of the teams I work with — regrowth, stability, and digital transformation beyond the standard. Whether it's developing a digital experience, exploring business opportunities, improving a workflow, or learning a new technology, I enjoy the process of finding ways to make things better. I believe meaningful progress comes from curiosity, thoughtful planning, experimentation, and the willingness to keep improving.",
  },
  {
    label: "03 — The Creative Side",
    lead: "Colors & Stories",
    text: "Beyond technology and business, I have a creative side that loves colors, visual storytelling, animation, digital art, and character design. I enjoy the freedom of imagining something from scratch and gradually giving it shape, personality, and purpose. I'm especially drawn to soft aesthetics, flowers, and the little details that make an experience feel special — they let me approach problems from different perspectives and bring a personal touch to everything I make.",
  },
  {
    label: "04 — The Journey",
    lead: "Where I'm Headed",
    text: "I believe in staying positive, being consistent, respecting time, and never giving up simply because something feels difficult at first. I'm always looking for opportunities to learn, become more capable, and understand the world a little better. My goal is to keep growing at the intersection of business, technology, and creativity — contributing to projects and environments where ideas develop into meaningful results, and letting my journey reflect not only what I accomplish, but how much I learn and how positively I contribute along the way.",
  },
];

/** "Growing at My Own Pace" — four principles */
export const principles = [
  {
    title: "Stay Curious",
    icon: "✦",
    color: "var(--neon-pink)",
    text: "Keep asking questions, exploring possibilities, and being open to learning something new.",
  },
  {
    title: "Create with Purpose",
    icon: "❀",
    color: "var(--crimson)",
    text: "Bring together imagination, thoughtful decisions, and practical solutions to create work that matters.",
  },
  {
    title: "Choose Growth",
    icon: "🌱",
    color: "var(--teal)",
    text: "Treat challenges as opportunities to learn, adapt, and become better with experience.",
  },
  {
    title: "Spread Good Energy",
    icon: "☀",
    color: "#b3860a",
    text: "Be thoughtful, encouraging, and considerate of the people and environments around me.",
  },
];

/** "A Few Things That Feel Like Me" — scrapbook interests (✎ only keep the genuine ones) */
export const interests = [
  {
    title: "Sunflowers & Little Details",
    text: "I love the warmth, color, and quiet beauty that flowers bring to a space.",
    emoji: "🌻",
    tilt: -2,
  },
  {
    title: "Creative Experiments",
    text: "I enjoy trying new ideas, exploring visual styles, and seeing where imagination takes me.",
    emoji: "🎨",
    tilt: 1.5,
  },
  {
    title: "Learning Something New",
    text: "Discovering a new tool or concept always feels like opening a door to another possibility.",
    emoji: "📚",
    tilt: -1,
  },
  {
    title: "Design & Aesthetics",
    text: "Color palettes, mood boards, and soft aesthetics inspire how I think and create.",
    emoji: "🌸",
    tilt: 2,
  },
];

/** "How I Show Up" — workplace strengths (working style, not testimonials) */
export const strengths = [
  {
    title: "Positive Energy",
    icon: "☀",
    text: "Approaching collaboration with enthusiasm and helping maintain an encouraging atmosphere.",
  },
  {
    title: "Attention to Detail",
    icon: "◎",
    text: "Observing the small things that can make a process, project, or experience better.",
  },
  {
    title: "Persistence",
    icon: "⛏",
    text: "Working through challenges patiently and continuing to learn when the first approach doesn't work.",
  },
  {
    title: "Time Awareness",
    icon: "◷",
    text: "Respecting deadlines, preparing thoughtfully, and understanding the value of other people's time.",
  },
  {
    title: "Focus & Curiosity",
    icon: "✧",
    text: "Staying engaged with a task while remaining open to new perspectives and better solutions.",
  },
  {
    title: "Continuous Improvement",
    icon: "↗",
    text: "Reflecting on feedback, identifying opportunities to grow, and refining the way I work.",
  },
];

/** "Still Becoming, Always Growing" — timeline (✎ replace with real milestones only) */
export const timeline = [
  {
    date: "20XX ✎",
    title: "✎ First spark",
    text: "Replace with a real moment — discovering an interest in technology or creativity.",
  },
  {
    date: "20XX ✎",
    title: "✎ Learning milestone",
    text: "Replace with a real course, project, or skill you began learning.",
  },
  {
    date: "20XX ✎",
    title: "✎ Next chapter",
    text: "Replace with a meaningful project, event, or professional step forward.",
  },
];

/** "Before You Go..." closing note */
export const closingNote =
  "Thank you for taking a little time to get to know me. I'm always learning, exploring, and discovering new ways to bring ideas to life. If something here resonates with you, or if you have an interesting idea you'd like to discuss, I'd love to connect. Here's to creating meaningful things, growing through every experience, and finding a little sunshine along the way.";

/* ============================================================
 *  EXPERIENCE PAGE CONTENT — ✎ marks placeholder facts.
 *  Only keep entries that are real; delete the rest.
 * ============================================================ */

/** ✎ Path to your resume PDF (e.g. "/Khushbu-Tripathi-Resume.pdf" placed in
 *  the public/ folder). Set to null to hide the resume button entirely. */
export const resume: string | null = null;

/** Experience hero supporting text */
export const experienceIntro =
  "Every experience has something to teach us. From exploring new technologies and solving problems to collaborating on projects and developing new skills, I'm building my journey one meaningful step at a time.";

/**
 * Professional experience — clearly labeled example so the owner can see
 * the expected format. Delete it and add real entries (internships,
 * freelance, volunteering and project-based work are all welcome here).
 */
export type ExperienceEntry = {
  role: string;
  org: string;
  type?: string;              // Professional | Internship | Freelance | Volunteering | Project-Based
  period?: string;            // e.g. "Jan 2025 – Jun 2025"
  location?: string;          // e.g. "Remote"
  overview?: string;
  contributions?: string[];
  skills?: string[];
  link?: string;
};

export const experiences: ExperienceEntry[] = [
  {
    role: "✎ Example Entry — Your Role Title",
    org: "✎ Company / Organization (or Personal Project)",
    type: "Project-Based",
    period: "Month Year – Month Year",
    location: "✎ Remote / City",
    overview:
      "This example shows the format: one line about the role, the work involved, and the value you contributed. Replace it — or delete it — with real experiences.",
    contributions: [
      "A specific responsibility or task you owned ✎",
      "A project, process, or problem you worked on ✎",
      "A measured result, only if verified ✎",
    ],
    skills: ["Skill 1 ✎", "Skill 2 ✎", "Tool ✎"],
    link: undefined,
  },
];

/** Selected contributions — potential categories, not claims of completed work */
export const contributions = [
  {
    category: "Business & Strategy",
    icon: "◍",
    color: "var(--crimson)",
    title: "✎ Contribution title",
    text: "Describe a real example — researching opportunities, supporting a growth initiative, or assisting with planning or business analysis.",
    skills: ["Research", "Analysis"],
    link: undefined,
  },
  {
    category: "Technology & Development",
    icon: "⌘",
    color: "var(--teal)",
    title: "✎ Contribution title",
    text: "Describe a real example — building or improving a website, developing a practical digital solution, exploring automation, or working with data.",
    skills: ["Skill", "Tool"],
    link: undefined,
  },
  {
    category: "Creative & Visual Work",
    icon: "❀",
    color: "var(--neon-pink)",
    title: "✎ Contribution title",
    text: "Describe a real example — an illustration, a character concept, an animation, or visual storytelling and design work.",
    skills: ["Skill", "Tool"],
    link: undefined,
  },
  {
    category: "Collaboration & Improvement",
    icon: "✦",
    color: "#b3860a",
    title: "✎ Contribution title",
    text: "Describe a real example — contributing to a team project, documenting processes, learning from feedback, or improving a workflow.",
    skills: ["Skill", "Tool"],
    link: undefined,
  },
];

/** Education & learning — verified information only */
export const education = [
  {
    title: "✎ Degree / Program name",
    org: "✎ Institution or provider",
    period: "Year – Year",
    focus: ["Relevant subject ✎", "Relevant subject ✎"],
    link: undefined,
  },
  {
    title: "✎ Course or workshop name",
    org: "✎ Online platform / training provider",
    period: "Year",
    focus: ["What it covered ✎"],
    link: undefined,
  },
];

/** Certifications — leave the array empty to hide the section entirely */
export const certifications = [] as {
  title: string;
  org: string;
  date?: string;
  status: "Completed" | "In Progress";
  note?: string;
  link?: string;
}[];

/** Working-style principles */
export const approach = [
  { title: "Curious by Nature", icon: "✧", text: "I enjoy understanding how things work and exploring different approaches to a problem." },
  { title: "Focused on Improvement", icon: "↗", text: "I look for practical ways to refine my skills, processes, and results over time." },
  { title: "Creative Problem-Solving", icon: "✎", text: "I enjoy combining structured thinking with fresh ideas to explore possible solutions." },
  { title: "Respectful of Time", icon: "◷", text: "I value preparation, clear priorities, and being considerate of shared deadlines." },
  { title: "Positive Collaboration", icon: "☀", text: "I aim to contribute to an encouraging environment where people can share ideas and learn together." },
  { title: "Adaptable & Open to Learning", icon: "❀", text: "I'm willing to explore unfamiliar tools, accept feedback, and adjust my approach when needed." },
];

/** Skills applied in practice — grouped by how they get used, not a full toolkit list */
export const skillsInPractice = [
  {
    group: "Technology",
    icon: "⌘",
    color: "var(--teal)",
    items: [
      "✎ Programming / languages you've actually used",
      "✎ Website development work",
      "✎ Version control (Git/GitHub) in real tasks",
    ],
  },
  {
    group: "Business & Analytics",
    icon: "◍",
    color: "var(--crimson)",
    items: [
      "✎ Business research or planning work",
      "✎ E-commerce experience",
      "✎ Reporting, spreadsheets or Power BI",
    ],
  },
  {
    group: "AI & Automation",
    icon: "✦",
    color: "var(--neon-pink)",
    items: [
      "✎ AI-assisted development",
      "✎ Automation workflows",
      "✎ ML fundamentals applied somewhere real",
    ],
  },
  {
    group: "Creative Practice",
    icon: "❀",
    color: "#b3860a",
    items: [
      "✎ Digital illustration",
      "✎ Character design",
      "✎ Animation / visual storytelling",
    ],
  },
];

/** Career-goals closing text */
export const careerGoals =
  "I'm excited to keep exploring the intersection of technology, business, and creativity. I want to learn from meaningful projects, work with people who inspire new ideas, and continue developing solutions that are thoughtful, useful, and well-crafted. Every new challenge is another opportunity to grow.";

/** Friendly empty-state message shown when all entries are examples */
export const experienceEmptyNote =
  "Every career starts somewhere. I'm building my experience through learning, creative exploration, and hands-on projects, with plenty more to discover.";

/* ============================================================
 *  CONTACT PAGE CONTENT — ✎ marks placeholder facts
 * ============================================================ */

/**
 * Contact form endpoint.
 * Set to a real backend/service URL (e.g. Formspree/Getform/serverless endpoint)
 * to deliver messages to email. While null the form falls back to opening the
 * visitor's own email client (mailto) — honest behavior, no fake delivery.
 */
export const formEndpoint: string | null = null;

/** ✎ Availability statement (shown once it matches reality) */
export const availability =
  "Open to meaningful opportunities, creative collaborations, and projects that bring together technology, business, and imagination.";

/** ✎ Only keep options that genuinely match current preferences */
export const openTo = [
  "Full-time opportunities",
  "Internships",
  "Freelance projects",
  "Remote collaboration",
  "Creative partnerships",
  "Technical projects",
  "Business & analytics projects",
];

/** ✎ Optional professional location / time zone — null hides the section */
export const contactLocation: null | { label: string; value: string } = null;

/** Contact hero supporting text */
export const contactIntro =
  "Whether you have a project in mind, an opportunity to share, or simply want to say hello, I'd love to hear from you. Good things often begin with a little conversation.";

export const topics = [
  "Job Opportunity",
  "Freelance Project",
  "Collaboration",
  "Creative Project",
  "Technical Discussion",
  "Something Else",
] as const;
