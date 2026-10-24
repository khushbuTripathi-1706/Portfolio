/**
 * ============================================================
 *  BLOG CONTENT — add real articles here when they're written.
 * ============================================================
 * Articles are structured content blocks (no Markdown dependency
 * needed — write blocks directly; a renderer displays them).
 *
 * - `draft: true`  → never shown anywhere on the site
 * - `date`         → publication date (blog sorts newest first)
 * - `readingTime`  → minutes, e.g. 4 ("mind the estimates; keep them honest")
 */

export type Category =
  | "Technology"
  | "AI & Machine Learning"
  | "Business & Analytics"
  | "E-commerce"
  | "Web Development"
  | "Design & Art"
  | "Learning & Growth";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; source?: string }
  | {
      type: "code";
      lang: string;
      code: string;
      caption?: string;
    }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "callout"; text: string; tone?: "idea" | "note" | "warning" }
  | { type: "divider" };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  tags: string[];
  /** ✎ genuine publication date, e.g. "Oct 2026" */
  date?: string;
  updated?: string;
  readingTime?: number;
  cover?: string;
  coverAlt?: string;
  featured?: boolean;
  draft?: boolean;
  /** Closing author note shown at the very end of the article */
  closingNote?: string;
  content: ContentBlock[];
};

/** ✎ Publish real articles by adding entries here. */
export const articles: Article[] = [];

/**
 * Planned topics — displayed on the blog as honest "ideas in progress",
 * clearly NOT published articles. Personalize; delete freely.
 */
export const plannedTopics: { category: string; idea: string }[] = [
  { category: "Technology", idea: "What I learned while building this very portfolio" },
  { category: "AI & Machine Learning", idea: "Exploring AI tools in my everyday workflow" },
  { category: "Business & Analytics", idea: "How data can help us make better decisions" },
  { category: "Design & Art", idea: "My process for creating a digital illustration" },
  { category: "Learning & Growth", idea: "Learning something new without feeling overwhelmed" },
];

/** Blog hero supporting text */
export const blogIntro =
  "A little space for the things I'm learning, the ideas I'm exploring, the projects I'm building, and the lessons I collect along the way.";

/** Newsletter section — set a real service URL later; null hides the form entirely */
export const newsletter: null | { endpoint: string } = null;
