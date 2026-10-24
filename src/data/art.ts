/**
 * ============================================================
 *  ART DATA — structured & editable. ✎ marks placeholder items.
 * ============================================================
 * Only add artwork you actually created. `placeholder: true`
 * entries render labeled placeholder frames until real images,
 * prompts, or previews are supplied.
 */

export type ArtCategory =
  | "Digital Illustrations"
  | "Character Design"
  | "Animation"
  | "Sketches & Concepts"
  | "Fan Art"
  | "Visual Experiments";

export type Artwork = {
  id: string;
  title: string;
  category: ArtCategory;
  /** ✎ Image path (import from src/assets or /public) */
  image?: string;
  imageAlt?: string;
  date?: string;
  caption?: string;
  tools?: string[];
  medium?: string;
  link?: string;
  placeholder?: boolean;
  /** aspect hint for placeholder frames: "tall" | "square" | "wide" | "portrait" */
  shape?: "tall" | "square" | "wide" | "portrait";
  featured?: boolean;
};

export const artworks: Artwork[] = [
  {
    id: "art-1",
    title: "✎ Artwork One",
    category: "Digital Illustrations",
    placeholder: true,
    shape: "tall",
    caption: "✎ Replace with a real illustration — a couple of sentences about it.",
    tools: ["✎ Tool"],
  },
  {
    id: "art-2",
    title: "✎ Artwork Two",
    category: "Character Design",
    placeholder: true,
    shape: "square",
    caption: "✎ A character concept lives here.",
    tools: ["✎ Tool"],
  },
  {
    id: "art-3",
    title: "✎ Artwork Three",
    category: "Sketches & Concepts",
    placeholder: true,
    shape: "wide",
    caption: "✎ A sketch or unfinished experiment.",
  },
  {
    id: "art-4",
    title: "✎ Artwork Four",
    category: "Visual Experiments",
    placeholder: true,
    shape: "portrait",
    caption: "✎ A color study, motion test, or visual experiment.",
  },
];

/* ---------- Character showcase — hidden when empty ---------- */

export type CharacterDesign = {
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  traits?: string[];
  palette?: string[];
  sketches?: string[];
  backstory?: string;
  link?: string;
};

export const characters: CharacterDesign[] = [];

/* ---------- Animation & motion art — hidden when empty ---------- */

export type MotionArt = {
  title: string;
  description: string;
  poster?: string;
  src?: string; // video or animation file
  tools?: string[];
  link?: string;
};

export const motionArt: MotionArt[] = [];

/* ---------- Creative process ---------- */

export const processStages = [
  {
    stage: "01 — Inspiration",
    icon: "✦",
    text: "Collecting little ideas, references, colors, and visual details that spark curiosity.",
  },
  {
    stage: "02 — Exploration",
    icon: "❀",
    text: "Trying different shapes, compositions, moods, and possible directions.",
  },
  {
    stage: "03 — Creation",
    icon: "✎",
    text: "Developing the idea through sketching, illustration, animation, or digital tools.",
  },
  {
    stage: "04 — Refinement",
    icon: "◎",
    text: "Reviewing the result, adjusting the details, and deciding what feels right.",
  },
];

/* ---------- Creative toolkit — only real tools ✎ ---------- */

export const creativeTools = [
  { name: "✎ Digital illustration software", use: "Illustrations & character art", icon: "❁" },
  { name: "✎ Animation software", use: "Loops & motion experiments", icon: "🎞" },
  { name: "✎ Photo editing / compositing", use: "Fixes, textures & lighting", icon: "◧" },
  { name: "✎ Traditional materials", use: "Sketches by hand", icon: "✎" },
];

/* ---------- Studio notes — hidden when empty ---------- */

export const studioNotes = [] as {
  text: string;
  artworkId?: string;
}[];

/** Hero copy */
export const artHeroIntro =
  "A little corner of the internet where colors, characters, imagination, and curiosity come together. Here's where I explore ideas, create little worlds, and give my imagination room to grow.";
