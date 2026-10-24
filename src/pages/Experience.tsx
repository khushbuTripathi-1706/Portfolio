import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sunflower } from "../components/Florals";
import { SakuraPetals } from "../components/SakuraPetals";
import { Reveal } from "../components/Reveal";
import {
  resume,
  experienceIntro,
  experiences,
  experienceEmptyNote,
  contributions,
  education,
  certifications,
  approach,
  skillsInPractice,
  careerGoals,
  type ExperienceEntry,
} from "../data/profile";

/* ---------- shared bits ---------- */

function Kicker({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="section-kicker"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: color ?? "var(--crimson)" }}
    >
      <Sunflower size={15} />
      {children}
    </span>
  );
}

const isExample = (e: { role: string }) => e.role.includes("✎");

/* ============================================================
   1. HERO — "Every Step Shapes the Journey"
   ============================================================ */

/** Decorative SVG career path: winding line, milestones, sunflower at the end. */
function CareerPathArt() {
  const dots = [
    { x: 26, y: 150 },
    { x: 66, y: 112 },
    { x: 118, y: 86 },
    { x: 172, y: 62 },
  ];
  return (
    <svg
      viewBox="0 0 230 200"
      width="min(100%, 260px)"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <motion.path
        d="M 20 168 C 20 130 45 150 66 112 S 120 110 118 86 S 168 88 172 62 S 196 46 200 44"
        fill="none"
        stroke="var(--neon-pink)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
      />
      {dots.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r="5"
          fill="var(--sunflower)"
          stroke="var(--crimson)"
          strokeWidth="1.4"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9 + i * 0.35, type: "spring", stiffness: 260, damping: 14 }}
        />
      ))}
      {/* small field of icons: tech / business / creativity */}
      <text x="14" y="192" fontSize="13" fill="var(--teal)">⌘</text>
      <text x="44" y="196" fontSize="13" fill="var(--crimson)">◍</text>
      <text x="72" y="192" fontSize="13" fill="var(--neon-pink)">❀</text>
      {/* sunflower at the end of the path (starts it all!) */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.3, type: "spring", stiffness: 200, damping: 12 }}
        style={{ transformOrigin: "200px 40px" }}
      >
        <g transform="translate(186 24)">
          {Array.from({ length: 10 }).map((_, i) => (
            <ellipse
              key={i}
              cx="14"
              cy="9"
              rx="2.4"
              ry="5"
              fill="var(--sunflower)"
              transform={`rotate(${i * 36} 14 14)`}
            />
          ))}
          <circle cx="14" cy="14" r="5" fill="#5b3a12" />
        </g>
      </motion.g>
    </svg>
  );
}

function ExperienceHero() {
  return (
    <section
      className="container"
      style={{
        position: "relative",
        paddingBlock: "4rem 4.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
        gap: "3rem",
        alignItems: "center",
        overflow: "clip",
      }}
    >
      <SakuraPetals count={5} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          right: "2%",
          top: "-30%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--neon-pink-soft), transparent 70%)",
          filter: "blur(60px)",
          opacity: "var(--orb-opacity)" as string,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <Kicker>Experience & Growth</Kicker>
          <h1 style={{ fontSize: "clamp(2.3rem, 5.5vw, 3.6rem)", marginBlock: "0.6rem 1rem", maxWidth: "16ch" }}>
            Every Step Shapes the{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Journey.
              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "-6px",
                  height: 8,
                  borderRadius: 6,
                  background: "linear-gradient(90deg, var(--neon-pink-soft), var(--sunflower))",
                  opacity: 0.75,
                }}
              />
            </span>
          </h1>
          <div style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
            <Sunflower size={24} style={{ marginTop: 6 }} />
            <p style={{ color: "var(--text-muted)", maxWidth: "52ch", fontSize: "1.04rem" }}>
              {experienceIntro}
            </p>
          </div>
          {resume && (
            <a
              href={resume}
              className="btn btn-ghost"
              style={{ marginTop: "1.6rem" }}
              aria-label="Open or download my resume (PDF)"
              target="_blank"
              rel="noreferrer"
            >
              ⌁ View Resume (PDF)
            </a>
          )}
        </Reveal>
      </div>

      <Reveal
        delay={0.2}
        style={{ justifySelf: "center", zIndex: 1, display: "grid", placeItems: "center" }}
      >
        <CareerPathArt />
      </Reveal>
    </section>
  );
}

/* ============================================================
   2. TIMELINE — "Where I've Grown"
   ============================================================ */

function experienceTypeIcon(type?: string) {
  switch (type?.toLowerCase()) {
    case "internship": return "◈";
    case "freelance": return "✎";
    case "volunteering": return "❤";
    case "project-based": return "❀";
    default: return "◍";
  }
}

function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <Reveal as="li" delay={Math.min(index * 0.08, 0.4)} style={{ position: "relative", paddingLeft: "3.2rem" }}>
      {/* sunflower marker */}
      <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 4 }}>
        <Sunflower size={26} />
      </span>
      <article
        className="card experience-card"
        style={{ padding: "1.5rem 1.7rem", borderRadius: "var(--radius-md)" }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.4rem 0.8rem" }}>
          <h3 style={{ fontSize: "1.18rem" }}>{entry.role}</h3>
          <span style={{ color: "var(--text-muted)", fontSize: "0.95rem", fontWeight: 600 }}>
            {entry.org}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "0.5rem",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          {entry.type && (
            <span className="exp-badge">
              {experienceTypeIcon(entry.type)} {entry.type}
            </span>
          )}
          {entry.period && (
            <span className="exp-badge" style={{ color: "var(--crimson)", fontWeight: 600 }}>
              {entry.period}
            </span>
          )}
          {entry.location && (
            <span className="exp-badge">◌ {entry.location}</span>
          )}
        </div>

        {entry.overview && (
          <p style={{ marginTop: "0.9rem", color: "var(--text-muted)", fontSize: "0.97rem" }}>
            {entry.overview}
          </p>
        )}

        {entry.contributions && entry.contributions.length > 0 && (
          <ul
            style={{
              margin: "0.9rem 0 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: "0.45rem",
            }}
          >
            {entry.contributions.map((c, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display: "flex",
                  gap: "0.55rem",
                  fontSize: "0.93rem",
                  color: "var(--text)",
                }}
              >
                <span aria-hidden="true" style={{ color: "var(--neon-pink)", fontWeight: 700 }}>›</span>
                {c}
              </motion.li>
            ))}
          </ul>
        )}

        {entry.skills && entry.skills.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
            {entry.skills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  fontSize: "0.76rem",
                  border: "1px solid var(--border)",
                  borderRadius: "999px",
                  padding: "0.14rem 0.6rem",
                  color: "var(--text-muted)",
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        )}

        {entry.link && (
          <a
            href={entry.link}
            target="_blank"
            rel="noreferrer"
            style={{
              marginTop: "0.9rem",
              display: "inline-flex",
              gap: "0.3rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--crimson)",
            }}
          >
            Related link <span aria-hidden="true">↗</span>
          </a>
        )}
      </article>
    </Reveal>
  );
}

function ExperienceTimeline() {
  const categories = useMemo(
    () => Array.from(new Set(experiences.map((e) => e.type).filter(Boolean))) as string[],
    [],
  );
  const [filter, setFilter] = useState<string | null>(null);
  const shown = filter ? experiences.filter((e) => e.type === filter) : experiences;
  const showFilters = categories.length > 1 && experiences.length > 2;

  const allExample = experiences.every(isExample);

  return (
    <section className="section container" style={{ position: "relative", maxWidth: "820px" }}>
      <Reveal className="section-head">
        <Kicker>Professional timeline</Kicker>
        <h2 className="section-title">
          Where I've <span className="hand-accent">grown</span>
        </h2>
        <p className="section-sub">
          A timeline of the experiences, projects, and opportunities that have helped shape my professional journey.
        </p>
      </Reveal>

      {showFilters && (
        <Reveal>
          <div
            role="group"
            aria-label="Filter experiences by type"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}
          >
            <button
              type="button"
              className={`filter-btn${filter === null ? " active" : ""}`}
              onClick={() => setFilter(null)}
              aria-pressed={filter === null}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-btn${filter === c ? " active" : ""}`}
                onClick={() => setFilter(filter === c ? null : c)}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>
      )}

      <ol style={{ listStyle: "none", padding: 0, margin: 0, position: "relative", display: "grid", gap: "1.8rem" }}>
        {/* the pink line */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 12,
            top: 10,
            bottom: 10,
            width: 2,
            borderRadius: 2,
            background: "linear-gradient(var(--neon-pink) 60%, var(--crimson))",
          }}
        />

        {shown.map((entry, i) => (
          <ExperienceCard key={(entry.role ?? "") + i} entry={entry} index={i} />
        ))}
      </ol>

      {allExample && (
        <Reveal delay={0.2}>
          <p
            style={{
              marginTop: "2.2rem",
              padding: "1rem 1.3rem",
              borderRadius: "var(--radius-md)",
              background: "color-mix(in srgb, var(--sunflower) 14%, var(--surface))",
              border: "1px dashed var(--border-strong)",
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              display: "flex",
              gap: "0.6rem",
              alignItems: "flex-start",
            }}
          >
            <Sunflower size={20} />
            {experienceEmptyNote}{" "}
            <em style={{ fontStyle: "normal", color: "var(--crimson)" }}>
              (The timeline above is a clearly labeled example — replace it in{" "}
              <code>src/data/profile.ts</code>. Internships, freelance, volunteering and
              project-based work all belong here.)
            </em>
          </p>
        </Reveal>
      )}
    </section>
  );
}

/* ============================================================
   3. CONTRIBUTIONS — "Small Details. Meaningful Impact."
   ============================================================ */
function Contributions() {
  return (
    <section
      className="section"
      style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal className="section-head">
          <Kicker>In practice</Kicker>
          <h2 className="section-title">
            Small details. <span className="hand-accent">Meaningful impact.</span>
          </h2>
          <p className="section-sub">
            The work behind the titles — what I actually contributed, and how.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: "1.3rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          }}
        >
          {contributions.map((c, i) => (
            <Reveal key={c.category} delay={(i % 3) * 0.08}>
              <article className="card" style={{ padding: "1.5rem", height: "100%", borderLeft: `3px solid ${c.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.7rem" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: "2.3rem",
                      height: "2.3rem",
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "var(--radius-sm)",
                      background: "color-mix(in srgb, currentColor 12%, transparent)",
                      color: c.color,
                      fontSize: "1rem",
                    }}
                  >
                    {c.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: c.color,
                    }}
                  >
                    {c.category}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.06rem", marginBottom: "0.4rem" }}>{c.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>{c.text}</p>
                {c.skills && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.8rem" }}>
                    {c.skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "0.74rem",
                          border: "1px solid var(--border)",
                          borderRadius: "999px",
                          padding: "0.12rem 0.55rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                {c.link && (
                  <Link to="/projects" style={{ marginTop: "0.7rem", display: "inline-flex", gap: "0.3rem", fontSize: "0.88rem", fontWeight: 600, color: "var(--crimson)" }}>
                    {c.link} <span aria-hidden="true">↗</span>
                  </Link>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. EDUCATION — "Learning Is Part of the Journey."
   ============================================================ */
function Education() {
  return (
    <section className="section container" style={{ maxWidth: "780px" }}>
      <Reveal className="section-head">
        <Kicker>Education</Kicker>
        <h2 className="section-title">
          Learning is part of <span className="hand-accent">the journey</span>
        </h2>
        <p className="section-sub">
          Formal studies and continuing education, side by side.
        </p>
      </Reveal>

      <div style={{ display: "grid", gap: "1.2rem" }}>
        {education.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.08}>
            <article
              className="card"
              style={{
                padding: "1.4rem 1.6rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                borderLeft: "3px solid var(--lavender)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: "2.7rem",
                  height: "2.7rem",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: "color-mix(in srgb, var(--lavender) 30%, var(--surface))",
                  fontSize: "1.15rem",
                }}
              >
                {i === education.length - 1 ? "🌱" : "🎓"}
              </span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.08rem" }}>{e.title}</h3>
                <p style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-muted)" }}>
                  {e.org}
                  {e.period && <span style={{ fontWeight: 400 }}> · {e.period}</span>}
                </p>
                {e.focus && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.55rem" }}>
                    {e.focus.map((f) => (
                      <span
                        key={f}
                        style={{
                          fontSize: "0.76rem",
                          background: "var(--surface-2)",
                          border: "1px solid var(--border)",
                          borderRadius: "999px",
                          padding: "0.14rem 0.6rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
                {e.link && (
                  <a
                    href={e.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: "0.5rem", display: "inline-block", fontSize: "0.88rem", fontWeight: 600, color: "var(--crimson)" }}
                  >
                    Certificate ↗
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   5. CERTIFICATIONS — hidden when empty
   ============================================================ */
function Certifications() {
  if (certifications.length === 0) return null;
  return (
    <section className="section container" style={{ maxWidth: "880px" }}>
      <Reveal className="section-head">
        <Kicker>Certifications</Kicker>
        <h2 className="section-title">
          Skills in progress, <span className="hand-accent">knowledge in bloom</span>
        </h2>
        <p className="section-sub">
          Courses and certificates gathered along the way.
        </p>
      </Reveal>
      <div
        style={{
          display: "grid",
          gap: "1.2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
        }}
      >
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={(i % 3) * 0.08}>
            <article className="card cert-card" style={{ padding: "1.4rem", height: "100%", position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "999px",
                  background:
                    c.status === "Completed"
                      ? "color-mix(in srgb, var(--teal) 14%, transparent)"
                      : "color-mix(in srgb, var(--sunflower) 30%, transparent)",
                  color: c.status === "Completed" ? "var(--teal)" : "#8a6a0a",
                }}
              >
                {c.status}
              </span>
              <h3 style={{ fontSize: "1.05rem", maxWidth: "85%", marginBottom: "0.3rem" }}>{c.title}</h3>
              <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-muted)" }}>
                {c.org}
                {c.date && ` · ${c.date}`}
              </p>
              {c.note && (
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "0.5rem" }}>{c.note}</p>
              )}
              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginTop: "0.7rem", display: "inline-block", fontSize: "0.88rem", fontWeight: 600, color: "var(--crimson)" }}
                >
                  Verify ↗
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   6. WORKING STYLE — "How I Approach My Work"
   ============================================================ */
function WorkingStyle() {
  return (
    <section
      className="section"
      style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal className="section-head">
          <Kicker>Working style</Kicker>
          <h2 className="section-title">
            How I <span className="hand-accent">approach my work</span>
          </h2>
          <p className="section-sub">
            The habits and principles behind everything I do.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: "1.2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))",
          }}
        >
          {approach.map((a, i) => (
            <Reveal key={a.title} delay={(i % 3) * 0.08}>
              <div
                className="card"
                style={{ padding: "1.4rem", height: "100%", display: "flex", gap: "0.85rem", alignItems: "flex-start" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, var(--sunflower), #ffe9ad)"
                      : "linear-gradient(135deg, var(--neon-pink-soft), var(--lavender))",
                    color: i % 2 === 0 ? "#5b3a12" : "#7a2347",
                    fontWeight: 700,
                  }}
                >
                  {a.icon}
                </span>
                <div>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.3rem" }}>{a.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.89rem" }}>{a.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. SKILLS IN ACTION — "Putting Skills into Action."
   ============================================================ */
function SkillsInAction() {
  return (
    <section className="section container">
      <Reveal className="section-head">
        <Kicker>Application</Kicker>
        <h2 className="section-title">
          Putting skills <span className="hand-accent">into action</span>
        </h2>
        <p className="section-sub">
          Not just what I can use — but how each skill shows up in real work.
        </p>
      </Reveal>

      <div
        style={{
          display: "grid",
          gap: "1.3rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(270px, 100%), 1fr))",
        }}
      >
        {skillsInPractice.map((g, i) => (
          <Reveal key={g.group} delay={(i % 3) * 0.08}>
            <div className="card" style={{ padding: "1.5rem", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: "2.2rem",
                    height: "2.2rem",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "50%",
                    background: "color-mix(in srgb, currentColor 12%, transparent)",
                    color: g.color,
                  }}
                >
                  {g.icon}
                </span>
                <h3 style={{ fontSize: "1.05rem", color: g.color }}>{g.group}</h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.5rem" }}>
                {g.items.map((s) => (
                  <li
                    key={s}
                    style={{ display: "flex", gap: "0.5rem", fontSize: "0.92rem", color: "var(--text-muted)" }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--neon-pink)" }}>›</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   8. CAREER GOALS — "Still Growing. Still Exploring."
   ============================================================ */
function CareerGoals() {
  return (
    <section className="container" style={{ paddingBottom: "4.5rem" }}>
      <Reveal>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(135deg, color-mix(in srgb, var(--sunflower) 16%, var(--surface)) 0%, color-mix(in srgb, var(--neon-pink-soft) 14%, var(--surface)) 100%)",
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
              right: "-2.4rem",
              bottom: "-3rem",
              opacity: 0.22,
              pointerEvents: "none",
              transform: "rotate(12deg)",
            }}
          >
            <FloatingSunflower size={150} />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <Sunflower size={34} />
            <h2
              style={{
                fontSize: "clamp(1.9rem, 4.5vw, 2.7rem)",
                color: "var(--crimson)",
                marginTop: "0.6rem",
              }}
            >
              Still growing. <span className="hand-accent">Still exploring.</span>
            </h2>
            <p style={{ maxWidth: "56ch", marginInline: "auto", marginTop: "1rem", color: "var(--text-muted)" }}>
              {careerGoals}
            </p>
            <div
              style={{
                display: "flex",
                gap: "0.9rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "2rem",
              }}
            >
              <Link to="/projects" className="btn btn-primary">
                Explore My Projects
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Let's Connect
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FloatingSunflower({ size }: { size: number }) {
  return (
    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
      <Sunflower size={size} />
    </motion.div>
  );
}

/* ============================================================ */

export default function Experience() {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <ExperienceHero />
      <ExperienceTimeline />
      <Contributions />
      <Education />
      <Certifications />
      <WorkingStyle />
      <SkillsInAction />
      <CareerGoals />
    </motion.main>
  );
}
