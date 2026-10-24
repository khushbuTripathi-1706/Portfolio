import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sunflower } from "../components/Florals";
import { SakuraPetals } from "../components/SakuraPetals";
import { Reveal } from "../components/Reveal";
import {
  articles,
  plannedTopics,
  blogIntro,
  newsletter,
  type Article,
} from "../data/blog";
import { profile } from "../data/profile";

/* ---------- shared bits ---------- */

function Kicker({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="section-kicker"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: color }}
    >
      <Sunflower size={15} />
      {children}
    </span>
  );
}

const PUBLISHED = articles.filter((a) => !a.draft);
const SORTED = [...PUBLISHED].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
const CATEGORIES: string[] = [
  "All Articles",
  ...Array.from(new Set(SORTED.map((a) => a.category))),
];

/** Cozy open-journal illustration for the hero. */
function JournalArt() {
  return (
    <svg viewBox="0 0 240 180" width="min(100%, 300px)" aria-hidden="true">
      {/* back sheet */}
      <motion.g
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="52" y="30" width="136" height="110" rx="10" fill="var(--surface-2)" stroke="var(--border-strong)" transform="rotate(-4 120 85)" />
        {/* open book */}
        <path d="M60 60 C 95 48, 118 56, 120 62 L 120 140 C 118 134, 95 126, 60 138 Z" fill="#fff" stroke="var(--crimson)" strokeWidth="1.6" />
        <path d="M180 60 C 145 48, 122 56, 120 62 L 120 140 C 122 134, 145 126, 180 138 Z" fill="#fff" stroke="var(--crimson)" strokeWidth="1.6" />
        <line x1="120" y1="62" x2="120" y2="140" stroke="var(--border-strong)" />
        {/* text lines */}
        <g opacity="0.55">
          <path d="M70 76 C 92 70, 108 74, 112 77" stroke="var(--neon-pink)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M70 88 C 92 82, 108 86, 112 89" stroke="var(--border-strong)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M70 100 C 92 94, 108 98, 112 101" stroke="var(--border-strong)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M128 76 C 150 70, 166 74, 170 77" stroke="var(--border-strong)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M128 88 C 150 82, 166 86, 170 89" stroke="var(--border-strong)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
        {/* little sunflower bookmark */}
        <circle cx="120" cy="150" r="9" fill="var(--sunflower)" stroke="#c98f0e" />
        <circle cx="120" cy="150" r="4" fill="#5b3a12" />
      </motion.g>
      {/* floating heart */}
      <motion.text
        x="196"
        y="40"
        fontSize="14"
        fill="var(--neon-pink)"
        animate={{ y: [0, -6, 0], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        ♡
      </motion.text>
    </svg>
  );
}

/** Category-colored mini illustration used when an article has no cover. */
function CategoryCover({ a }: { a: Article }) {
  const glyph: Record<string, string> = {
    Technology: "⌘",
    "AI & Machine Learning": "✦",
    "Business & Analytics": "◍",
    "E-commerce": "🛍",
    "Web Development": "</>",
    "Design & Art": "❁",
    "Learning & Growth": "🌱",
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        background:
          "linear-gradient(140deg, var(--cream) 0%, var(--bg-alt) 50%, var(--lavender) 100%)",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "2.5rem", opacity: 0.75 }}>
        {glyph[a.category] ?? "✎"}
      </span>
    </div>
  );
}

function readTime(a: Article) {
  return a.readingTime ? `${a.readingTime} min read` : undefined;
}

/* ============================================================
   1. HERO
   ============================================================ */
function BlogHero() {
  return (
    <section
      className="container"
      style={{
        position: "relative",
        paddingBlock: "4rem 3rem",
        display: "grid",
        gridTemplateColumns: "1.15fr 0.85fr",
        gap: "2.5rem",
        alignItems: "center",
        overflow: "clip",
      }}
    >
      <SakuraPetals count={5} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-10%",
          top: "-40%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--neon-pink-soft), transparent 70%)",
          filter: "blur(64px)",
          opacity: "var(--orb-opacity)" as string,
          pointerEvents: "none",
        }}
      />

      <Reveal style={{ position: "relative", zIndex: 1 }}>
        <Kicker>The blog & journal</Kicker>
        <h1 style={{ fontSize: "clamp(2.3rem, 5.5vw, 3.7rem)", marginBlock: "0.6rem 0.9rem", maxWidth: "16ch" }}>
          Thoughts, Ideas &amp; Little Discoveries.
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: "52ch", fontSize: "1.04rem" }}>
          {blogIntro}
        </p>
        <p
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: "1.35rem",
            color: "var(--neon-pink)",
            marginTop: "0.8rem",
          }}
        >
          Written with curiosity ♡
        </p>
        {SORTED.length > 0 && (
          <a href="#articles" className="btn btn-ghost" style={{ marginTop: "1.2rem" }}>
            Read the latest ↓
          </a>
        )}
      </Reveal>

      <Reveal delay={0.15} style={{ justifySelf: "center", zIndex: 1 }}>
        <JournalArt />
      </Reveal>
    </section>
  );
}

/* ============================================================
   2. FEATURED ARTICLE (Editor's Pick) — hidden when empty
   ============================================================ */
function FeaturedArticle() {
  const featured = SORTED.find((a) => a.featured) ?? SORTED[0];
  if (!featured) return null;

  return (
    <section className="section container" style={{ paddingTop: "1rem" }}>
      <Reveal className="section-head">
        <Kicker>Editor's pick</Kicker>
      </Reveal>
      <Reveal delay={0.08}>
        <article
          className="card"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Link to={`/blog/${featured.slug}`} aria-label={`Read: ${featured.title}`} style={{ display: "block", minHeight: "260px" }}>
            <div className="blog-cover" style={{ width: "100%", height: "100%", transition: "transform .6s var(--ease)" }}>
              {featured.cover ? (
                <img
                  src={featured.cover}
                  alt={featured.coverAlt ?? featured.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 260 }}
                />
              ) : (
                <CategoryCover a={featured} />
              )}
            </div>
          </Link>
          <div
            style={{
              padding: "clamp(1.4rem, 3vw, 2.2rem)",
              display: "grid",
              gap: "0.7rem",
              alignContent: "center",
              borderLeft: "1px solid var(--border)",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--crimson)",
                }}
              >
                {featured.category}
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {featured.date}
                {featured.date && readTime(featured) && " · "}
                {readTime(featured)}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              }}
            >
              {featured.title}
            </h3>
            <p style={{ color: "var(--text-muted)" }}>{featured.excerpt}</p>
            <Link
              to={`/blog/${featured.slug}`}
              style={{
                color: "var(--crimson)",
                fontWeight: 600,
                display: "inline-flex",
                gap: "0.3rem",
                marginTop: "0.4rem",
              }}
            >
              Read the article <span aria-hidden="true">↗</span>
            </Link>
            <span aria-hidden="true" style={{ position: "absolute", bottom: 14, right: 14, opacity: 0.85 }}>
              <Sunflower size={26} />
            </span>
          </div>
        </article>
      </Reveal>
    </section>
  );
}

/* ============================================================
   3–5. SEARCH + CATEGORIES + GRID
   ============================================================ */
function ArticleCard({ a, index }: { a: Article; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.07, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="card project-card"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <Link to={`/blog/${a.slug}`} aria-label={`Read: ${a.title}`} style={{ display: "block", aspectRatio: "16 / 9", overflow: "hidden" }}>
        <div className="blog-cover" style={{ width: "100%", height: "100%", transition: "transform .55s var(--ease)" }}>
          {a.cover ? (
            <img src={a.cover} alt={a.coverAlt ?? a.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <CategoryCover a={a} />
          )}
        </div>
      </Link>
      <div style={{ padding: "1.25rem", display: "grid", gap: "0.55rem", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
          <span
            style={{
              fontSize: "0.71rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--neon-pink)",
            }}
          >
            {a.category}
          </span>
          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
            {a.date}
            {a.date && readTime(a) && " · "}
            {readTime(a)}
          </span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
          <Link to={`/blog/${a.slug}`}>{a.title}</Link>
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", flex: 1 }}>{a.excerpt}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {a.tags.map((t) => (
            <span key={t} style={{ fontSize: "0.74rem", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.12rem 0.55rem", color: "var(--text-muted)" }}>
              {t}
            </span>
          ))}
        </div>
        <Link to={`/blog/${a.slug}`} style={{ color: "var(--crimson)", fontWeight: 600, fontSize: "0.9rem", display: "inline-flex", gap: "0.3rem", marginTop: "0.2rem" }}>
          Read <span className="arrow" aria-hidden="true" style={{ display: "inline-block", transition: "transform .3s var(--ease)" }}>↗</span>
        </Link>
      </div>
    </motion.article>
  );
}

function BlogListSection() {
  const [category, setCategory] = useState("All Articles");
  const [query, setQuery] = useState("");

  const filtered = SORTED.filter((a) => {
    const inCat = category === "All Articles" || a.category === category;
    const q = query.trim().toLowerCase();
    const inSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q));
    return inCat && inSearch;
  });

  return (
    <section id="articles" className="section" style={{ background: "var(--bg-alt)", position: "relative" }}>
      <div className="container">
        <Reveal className="section-head">
          <Kicker>The journal</Kicker>
          <h2 className="section-title">
            Every story <span className="hand-accent">starts somewhere</span>
          </h2>
        </Reveal>

        {SORTED.length > 0 && (
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.8rem",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              {/* search */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "999px",
                  padding: "0.25rem 0.9rem",
                  minWidth: "min(280px, 100%)",
                }}
              >
                <span aria-hidden="true" style={{ color: "var(--text-muted)" }}>⌕</span>
                <label htmlFor="blog-search" className="sr-only" style={{ position: "absolute", left: "-9999px" }}>
                  Search articles
                </label>
                <input
                  id="blog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ideas, topics, and stories..."
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: "0.45rem 0",
                    fontSize: "0.92rem",
                    color: "var(--text)",
                    flex: 1,
                    outline: "none",
                    minWidth: "160px",
                  }}
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    style={{ color: "var(--text-muted)", fontSize: "1rem", padding: "0 0.2rem" }}
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* categories */}
              <div role="group" aria-label="Filter articles by category" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`filter-btn${category === c ? " active" : ""}`}
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {SORTED.length === 0 ? (
          <Reveal>
            <div
              style={{
                textAlign: "center",
                padding: "3.5rem 1.5rem",
                border: "1px dashed var(--border-strong)",
                borderRadius: "var(--radius-lg)",
                background: "var(--surface)",
              }}
            >
              <Sunflower size={44} />
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.35rem",
                  marginTop: "1rem",
                  color: "var(--crimson)",
                }}
              >
                Every good story starts with a first sentence.
              </p>
              <p style={{ color: "var(--text-muted)", maxWidth: "46ch", marginInline: "auto", marginTop: "0.5rem" }}>
                New thoughts and little discoveries will find their way here soon.
              </p>
              <Link to="/projects" className="btn btn-primary" style={{ marginTop: "1.4rem" }}>
                Explore My Projects
              </Link>
            </div>
          </Reveal>
        ) : filtered.length === 0 ? (
          <Reveal>
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.02rem" }}>
                No stories found for that search. Try another word or explore a different category.
              </p>
              <button type="button" className="btn btn-ghost" style={{ marginTop: "1rem" }} onClick={() => { setQuery(""); setCategory("All Articles"); }}>
                Clear search & filters
              </button>
            </div>
          </Reveal>
        ) : (
          <motion.div
            layout
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((a, i) => (
                <ArticleCard key={a.slug} a={a} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   6. PLANNED TOPICS — clearly labeled as ideas, not posts
   ============================================================ */
function PlannedTopics() {
  return (
    <section className="section container" style={{ maxWidth: "820px" }}>
      <Reveal className="section-head">
        <Kicker color="#b3860a">Ideas brewing</Kicker>
        <h2 className="section-title">
          Little seeds in <span className="hand-accent">the journal</span>
        </h2>
        <p className="section-sub">
          Topics I'd love to write about someday — ideas taking root, not published articles yet.
        </p>
      </Reveal>
      <div
        style={{
          display: "grid",
          gap: "0.9rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
        }}
      >
        {plannedTopics.map((t, i) => (
          <Reveal key={t.idea} delay={(i % 3) * 0.06}>
            <div
              className="card"
              style={{
                padding: "1.05rem 1.3rem",
                display: "flex",
                gap: "0.8rem",
                alignItems: "flex-start",
                borderLeft: "3px solid var(--sunflower)",
              }}
            >
              <Sunflower size={20} style={{ marginTop: 3 }} />
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  {t.category}
                </span>
                <p style={{ fontSize: "0.95rem", marginTop: "0.15rem" }}>{t.idea}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   7. NEWSLETTER / STAY IN THE LOOP
   ============================================================ */
function StayInTheLoop() {
  return (
    <section className="container" style={{ paddingBottom: "4.5rem" }}>
      <Reveal>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(130deg, color-mix(in srgb, var(--sunflower) 15%, var(--surface)) 0%, color-mix(in srgb, var(--neon-pink-soft) 13%, var(--surface)) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(2rem, 5vw, 3.5rem)",
            textAlign: "center",
            boxShadow: "var(--shadow)",
          }}
        >
          <SakuraPetals count={3} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Sunflower size={32} />
            <h2 style={{ fontFamily: "var(--font-hand)", fontSize: "clamp(1.9rem, 4vw, 2.6rem)", color: "var(--crimson)", marginTop: "0.5rem" }}>
              Letters From My Little Corner
            </h2>
            <p style={{ maxWidth: "52ch", marginInline: "auto", marginTop: "0.6rem", color: "var(--text-muted)" }}>
              Occasional notes about things I'm learning, creating, and
              discovering — delivered with care, never clutter.
            </p>
            {newsletter ? null : (
              <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap", marginTop: "1.5rem" }}>
                <a href={profile.socials.email} className="btn btn-primary">
                  Say Hello by Email
                </a>
                <Link to="/contact" className="btn btn-ghost">
                  Get in Touch
                </Link>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================ */

export default function Blog() {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <BlogHero />
      <FeaturedArticle />
      <BlogListSection />
      <PlannedTopics />
      <StayInTheLoop />
    </motion.main>
  );
}
