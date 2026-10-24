import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sunflower } from "../components/Florals";
import { SakuraPetals } from "../components/SakuraPetals";
import { Reveal } from "../components/Reveal";
import { featuredProjects, experiments, type Project } from "../data/profile";

/* ---------- shared bits ---------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="section-kicker"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
    >
      <Sunflower size={15} />
      {children}
    </span>
  );
}

/** Category-themed placeholder thumbnails when no real image is supplied. */
function CategoryThumb({ project }: { project: Project }) {
  const style: Record<string, string> = {
    "Web Development":
      "linear-gradient(140deg, var(--bg-alt) 0%, var(--lavender) 55%, var(--neon-pink-soft) 100%)",
    "Business & Analytics":
      "linear-gradient(140deg, var(--cream) 0%, var(--bg-alt) 55%, var(--sunflower) 100%)",
    "E-commerce":
      "linear-gradient(140deg, var(--bg-alt) 0%, var(--neon-pink-soft) 60%, var(--blush-lime) 100%)",
    "AI & Machine Learning":
      "linear-gradient(140deg, var(--bg-alt) 0%, var(--teal) 60%, var(--lavender) 100%)",
    Animation:
      "linear-gradient(140deg, var(--cream) 0%, var(--sunflower) 55%, var(--neon-pink-soft) 100%)",
    "Digital Art":
      "linear-gradient(140deg, var(--lavender) 0%, var(--neon-pink-soft) 55%, var(--bg-alt) 100%)",
    "Character Design":
      "linear-gradient(140deg, var(--cream) 0%, var(--neon-pink-soft) 50%, var(--lavender) 100%)",
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        background: style[project.category] ?? "linear-gradient(140deg, var(--bg-alt), var(--lavender))",
        overflow: "hidden",
      }}
    >
      {project.category === "Web Development" && (
        <svg width="90" height="64" viewBox="0 0 90 64" aria-hidden="true" opacity="0.85">
          <rect x="4" y="4" width="82" height="56" rx="7" fill="var(--surface)" stroke="var(--crimson)" strokeWidth="1.5" />
          <line x1="4" y1="15" x2="86" y2="15" stroke="var(--border-strong)" />
          <circle cx="14" cy="9.5" r="2.4" fill="var(--neon-pink)" />
          <circle cx="22" cy="9.5" r="2.4" fill="var(--sunflower)" />
          <rect x="12" y="22" width="40" height="6" rx="3" fill="var(--crimson)" opacity="0.55" />
          <rect x="12" y="33" width="66" height="5" rx="2.5" fill="var(--border-strong)" />
          <rect x="12" y="42" width="52" height="5" rx="2.5" fill="var(--border-strong)" />
          <rect x="12" y="51" width="30" height="0" rx="2.5" />
        </svg>
      )}
      {project.category === "Business & Analytics" && (
        <svg width="90" height="64" viewBox="0 0 90 64" aria-hidden="true" opacity="0.85">
          <rect x="8" y="6" width="74" height="52" rx="7" fill="var(--surface)" stroke="var(--crimson)" strokeWidth="1.5" />
          <rect x="16" y="38" width="10" height="14" rx="2" fill="var(--neon-pink)" opacity="0.8" />
          <rect x="32" y="28" width="10" height="24" rx="2" fill="var(--crimson)" opacity="0.75" />
          <rect x="48" y="18" width="10" height="34" rx="2" fill="var(--sunflower)" />
          <polyline points="16,26 34,20 52,12 66,16" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
      {project.category === "E-commerce" && (
        <svg width="90" height="64" viewBox="0 0 90 64" aria-hidden="true" opacity="0.85">
          <rect x="14" y="8" width="62" height="48" rx="7" fill="var(--surface)" stroke="var(--crimson)" strokeWidth="1.5" />
          <rect x="21" y="16" width="16" height="16" rx="3" fill="var(--neon-pink-soft)" />
          <rect x="43" y="16" width="16" height="16" rx="3" fill="var(--lavender)" />
          <rect x="65" y="16" width="5" height="16" rx="1.5" fill="var(--sunflower)" />
          <rect x="21" y="38" width="24" height="5" rx="2.5" fill="var(--crimson)" opacity="0.6" />
          <rect x="21" y="46" width="40" height="4" rx="2" fill="var(--border-strong)" />
        </svg>
      )}
      {project.category === "AI & Machine Learning" && (
        <svg width="80" height="64" viewBox="0 0 80 64" aria-hidden="true" opacity="0.85">
          {[
            [14, 14], [40, 8], [66, 16],
            [10, 36], [40, 32], [70, 40],
            [24, 56], [56, 56],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill={i % 3 === 0 ? "var(--neon-pink)" : "var(--teal)"} opacity="0.8" />
          ))}
          <g stroke="var(--border-strong)" strokeWidth="1.4">
            <line x1="14" y1="14" x2="40" y2="8" /><line x1="40" y1="8" x2="66" y2="16" />
            <line x1="14" y1="14" x2="40" y2="32" /><line x1="66" y1="16" x2="40" y2="32" />
            <line x1="10" y1="36" x2="40" y2="32" /><line x1="40" y1="32" x2="70" y2="40" />
            <line x1="10" y1="36" x2="24" y2="56" /><line x1="40" y1="32" x2="24" y2="56" />
            <line x1="70" y1="40" x2="56" y2="56" /><line x1="40" y1="32" x2="56" y2="56" />
          </g>
        </svg>
      )}
      {["Digital Art", "Animation", "Character Design"].includes(project.category) && (
        <span style={{ fontSize: "3rem" }} aria-hidden="true">
          {project.category === "Character Design" ? "👤" : project.category === "Animation" ? "🎞" : "❁"}
        </span>
      )}
    </div>
  );
}

/* ============================================================
   1. HERO — "Things I've Brought to Life"
   ============================================================ */
function ProjectsHero() {
  return (
    <section
      className="container"
      style={{ position: "relative", paddingBlock: "4rem 3.5rem", overflow: "clip" }}
    >
      <SakuraPetals count={6} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          left: "38%",
          top: "-38%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--neon-pink-soft), transparent 70%)",
          filter: "blur(64px)",
          opacity: "var(--orb-opacity)" as string,
          pointerEvents: "none",
        }}
      />
      <Reveal style={{ position: "relative", zIndex: 1 }}>
        <Kicker>My creative playground</Kicker>
        <h1 style={{ fontSize: "clamp(2.4rem, 6vw, 3.9rem)", marginBlock: "0.6rem 0.4rem", maxWidth: "18ch" }}>
          Things I've{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            Brought
            <motion.span
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: "-6px",
                height: 8,
                borderRadius: 6,
                background: "linear-gradient(90deg, var(--neon-pink), var(--crimson))",
                opacity: 0.65,
              }}
            />
          </span>{" "}
          to Life.
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: "58ch", fontSize: "1.04rem" }}>
          Every project begins with a question, an idea, or a little curiosity.
          Here's a collection of things I've explored, designed, developed, and
          learned from along the way.
        </p>
        <p
          style={{
            marginTop: "0.9rem",
            fontWeight: 600,
            color: "var(--crimson)",
            letterSpacing: "0.06em",
          }}
        >
          Technology × Business × Creativity
        </p>
        <Link to="/contact" className="btn btn-ghost" style={{ marginTop: "1.4rem" }}>
          Let's Build Something Together
        </Link>
      </Reveal>
    </section>
  );
}

/* ============================================================
   2. FEATURED SPOTLIGHT
   ============================================================ */
function FeaturedSpotlight() {
  const featured = featuredProjects[0];
  if (!featured) return null;

  return (
    <section className="section container" style={{ paddingTop: "1.5rem" }}>
      <Reveal className="section-head">
        <Kicker>Currently in the spotlight</Kicker>
        <h2 className="section-title">
          A closer <span className="hand-accent">look</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <article
          className="card spotlight-card"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ position: "relative", aspectRatio: "16 / 11", overflow: "hidden" }}>
            {featured.image ? (
              <img
                src={featured.image}
                alt={featured.imageAlt ?? featured.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div className="spotlight-thumb" style={{ width: "100%", height: "100%", transition: "transform .6s var(--ease)" }}>
                <CategoryThumb project={featured} />
              </div>
            )}
            <span
              aria-hidden="true"
              style={{ position: "absolute", bottom: 10, right: 10, opacity: 0.9 }}
            >
              <Sunflower size={30} />
            </span>
          </div>

          <div style={{ padding: "clamp(1.4rem, 3vw, 2.2rem)", display: "grid", gap: "0.8rem", alignContent: "center", borderLeft: "1px solid var(--border)" }}>
            <span
              style={{
                justifySelf: "start",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--crimson)",
              }}
            >
              {featured.category}
            </span>
            <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>{featured.title}</h3>
            <p style={{ color: "var(--text-muted)" }}>{featured.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {featured.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.76rem",
                    border: "1px solid var(--border)",
                    borderRadius: "999px",
                    padding: "0.15rem 0.6rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem", marginTop: "0.5rem" }}>
              <Link to={`/projects/${featured.slug}`} className="btn btn-primary">
                Open Case Study →
              </Link>
              {featured.demo && (
                <a href={featured.demo} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  Live Demo ↗
                </a>
              )}
              {featured.repo && (
                <a href={featured.repo} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}

/* ============================================================
   3. + 4. FILTERS + GALLERY
   ============================================================ */
const CARD_REVEAL = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96 },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      variants={CARD_REVEAL}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="card project-card"
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <Link
        to={`/projects/${project.slug}`}
        aria-label={`Open case study: ${project.title}`}
        style={{ display: "block", aspectRatio: "16 / 10", overflow: "hidden" }}
      >
        <div className="project-thumb" style={{ width: "100%", height: "100%", transition: "transform .55s var(--ease)" }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt ?? project.title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <CategoryThumb project={project} />
          )}
        </div>
      </Link>

      <div style={{ padding: "1.3rem", display: "grid", gap: "0.65rem", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.71rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--neon-pink)",
            }}
          >
            {project.category}
          </span>
          {project.status && (
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                borderRadius: "999px",
                padding: "0.12rem 0.5rem",
              }}
            >
              {project.status}
            </span>
          )}
        </div>
        <h3 style={{ fontSize: "1.15rem" }}>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", flex: 1 }}>
          {project.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.74rem",
                border: "1px solid var(--border)",
                borderRadius: "999px",
                padding: "0.12rem 0.55rem",
                color: "var(--text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          className="card-links"
          style={{ display: "flex", gap: "0.8rem", fontSize: "0.88rem", fontWeight: 600, marginTop: "0.2rem" }}
        >
          <Link
            to={`/projects/${project.slug}`}
            style={{ color: "var(--crimson)", display: "inline-flex", gap: "0.3rem" }}
          >
            Case study{" "}
            <span className="arrow" aria-hidden="true" style={{ display: "inline-block", transition: "transform .3s var(--ease)" }}>
              ↗
            </span>
          </Link>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" style={{ color: "var(--text-muted)" }}>
              Demo ↗
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" style={{ color: "var(--text-muted)" }}>
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectGallery() {
  const categories = useMemo(
    () => Array.from(new Set(featuredProjects.map((p) => p.category))),
    [],
  );
  const [active, setActive] = useState<string>("All Projects");
  const shown = active === "All Projects"
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === active);
  const simple = featuredProjects.length < 3;

  return (
    <section
      className="section"
      style={{ background: "var(--bg-alt)", position: "relative" }}
    >
      <div className="container">
        <Reveal className="section-head">
          <Kicker>The gallery</Kicker>
          <h2 className="section-title">
            Explore <span className="hand-accent">my work</span>
          </h2>
          <p className="section-sub">
            Different interests, different challenges, one little corner of creativity.
          </p>
        </Reveal>

        {/* filters */}
        <Reveal>
          <div
            role="group"
            aria-label="Filter projects by category"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "2.2rem",
              overflowX: "auto",
              paddingBottom: "0.3rem",
            }}
          >
            {["All Projects", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-btn${active === c ? " active" : ""}`}
                onClick={() => setActive(c)}
                aria-pressed={active === c}
              >
                {c}
                {c !== "All Projects" && (
                  <span style={{ opacity: 0.75, marginLeft: "0.35rem", fontSize: "0.9em" }}>
                    {featuredProjects.filter((p) => p.category === c).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* grid */}
        {featuredProjects.length === 0 ? (
          <Reveal>
            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                padding: "3rem 1rem",
                fontSize: "1.05rem",
              }}
            >
              Every creative journey starts with an idea. New projects will find
              their place here soon.
            </p>
          </Reveal>
        ) : (
          <>
            <motion.div
              layout
              style={{
                display: "grid",
                gap: "1.6rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
              }}
            >
              <AnimatePresence mode="popLayout">
                {shown.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>

            {shown.length === 0 && (
              <Reveal>
                <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--text-muted)" }}>
                  <p style={{ fontSize: "1.02rem" }}>Nothing blooming in this category just yet.</p>
                  <button type="button" className="btn btn-ghost" style={{ marginTop: "1rem" }} onClick={() => setActive("All Projects")}>
                    ← Back to all projects
                  </button>
                </div>
              </Reveal>
            )}
          </>
        )}

        {simple && (
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.88rem", marginTop: "1.4rem" }}>
            A few projects are still growing 🌱 — the collection updates as new work is ready.
          </p>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   5. EXPERIMENTS — hidden when empty
   ============================================================ */
function Experiments() {
  if (experiments.length === 0) return null;
  return (
    <section className="section container">
      <Reveal className="section-head">
        <Kicker>Experiments & play</Kicker>
        <h2 className="section-title">
          Little experiments, <span className="hand-accent">big curiosity</span>
        </h2>
        <p className="section-sub">
          Not every idea needs to become a big project. Some are simply little
          things made to explore, learn, and have fun.
        </p>
      </Reveal>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
        }}
      >
        {experiments.map((e, i) => (
          <Reveal key={e.title} delay={(i % 4) * 0.06}>
            <div
              className="card"
              style={{ padding: "1.2rem", height: "100%", textAlign: "left" }}
            >
              <span style={{ fontSize: "1.8rem" }} aria-hidden="true">
                {e.emoji ?? "✦"}
              </span>
              <h3 style={{ fontSize: "1rem", marginBlock: "0.4rem 0.2rem" }}>{e.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.87rem" }}>{e.note}</p>
              {e.status && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.6rem",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#8a6a0a",
                    background: "color-mix(in srgb, var(--sunflower) 30%, transparent)",
                    padding: "0.15rem 0.55rem",
                    borderRadius: "999px",
                  }}
                >
                  {e.status}
                </span>
              )}
              {e.link && (
                <a href={e.link} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: "0.5rem", fontSize: "0.88rem", fontWeight: 600, color: "var(--crimson)" }}>
                  Open ↗
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   6. CLOSING CTA
   ============================================================ */
function ProjectsCTA() {
  return (
    <section className="container" style={{ paddingBottom: "4.5rem" }}>
      <Reveal>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(130deg, color-mix(in srgb, var(--neon-pink-soft) 16%, var(--surface)) 0%, color-mix(in srgb, var(--sunflower) 14%, var(--surface)) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(2rem, 5vw, 4rem)",
            textAlign: "center",
            boxShadow: "var(--shadow)",
          }}
        >
          <SakuraPetals count={4} />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-2rem",
              top: "-2rem",
              opacity: 0.24,
              pointerEvents: "none",
              transform: "rotate(-14deg)",
            }}
          >
            <Sunflower size={110} />
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(1.9rem, 4.5vw, 2.7rem)", color: "var(--crimson)" }}>
              Have an idea <span className="hand-accent">in mind?</span>
            </h2>
            <p style={{ maxWidth: "54ch", marginInline: "auto", marginTop: "0.9rem", color: "var(--text-muted)" }}>
              Whether it's a digital experience, a creative collaboration, or a
              fresh challenge, I'd love to hear what you're thinking.
            </p>
            <div style={{ display: "flex", gap: "0.9rem", justifyContent: "center", flexWrap: "wrap", marginTop: "2rem" }}>
              <Link to="/contact" className="btn btn-primary">
                Let's Work Together
              </Link>
              <Link to="/about" className="btn btn-ghost">
                Read About Me
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================ */

export default function Projects() {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <ProjectsHero />
      <FeaturedSpotlight />
      <ProjectGallery />
      <Experiments />
      <ProjectsCTA />
    </motion.main>
  );
}
