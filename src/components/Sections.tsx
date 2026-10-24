import { Link } from "react-router-dom";
import { featuredProjects, skillGroups, achievements, qualities } from "../data/profile";
import { Sunflower } from "./Florals";
import { Reveal } from "./Reveal";

const categoryHue: Record<string, string> = {
  "Web Development": "var(--neon-pink)",
  "Business & Analytics": "var(--crimson)",
  "Business & Analytics ✎": "var(--crimson)",
  "E-commerce": "var(--lavender)",
  "AI/ML": "var(--teal)",
  Animation: "var(--sunflower)",
  "Digital Art": "var(--neon-pink-soft)",
};

/* ============================================================
   FEATURED PROJECTS
   ============================================================ */
export function FeaturedProjects() {
  return (
    <section className="section container" id="projects-preview">
      <Reveal className="section-head">
        <span className="section-kicker">
          <Sunflower size={15} /> Featured work
        </span>
        <h2 className="section-title">
          A little of what{" "}
          <span className="hand-accent">I create</span>
        </h2>
        <p className="section-sub">
          From thoughtful digital experiences to creative experiments, here's a
          glimpse of what I love building.
        </p>
      </Reveal>

      <div
        style={{
          display: "grid",
          gap: "1.6rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
        }}
      >
        {featuredProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.09}>
            <article
              className="card project-card"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* thumbnail */}
              <div
                style={{
                  aspectRatio: "16 / 10",
                  background: p.image
                    ? `url(${p.image}) center/cover`
                    : "linear-gradient(135deg, var(--bg-alt), var(--surface-2) 60%, var(--lavender))",
                  display: "grid",
                  placeItems: "center",
                  overflow: "hidden",
                  transition: "transform .5s var(--ease)",
                }}
                className="project-thumb"
              >
                {!p.image && (
                  <span style={{ fontSize: "2.2rem", opacity: 0.85 }} aria-hidden="true">
                    {p.placeholder ? "✎" : "❀"}
                  </span>
                )}
              </div>

              <div style={{ padding: "1.4rem", display: "grid", gap: "0.7rem", flex: 1 }}>
                <span
                  style={{
                    justifySelf: "start",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: categoryHue[p.category] ?? "var(--neon-pink)",
                    background: "color-mix(in srgb, currentColor 10%, transparent)",
                    padding: "0.25rem 0.7rem",
                    borderRadius: "999px",
                  }}
                >
                  {p.category}
                </span>
                <h3 style={{ fontSize: "1.2rem" }}>{p.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.93rem", flex: 1 }}>
                  {p.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "0.4rem",
                    flexWrap: "wrap",
                    marginTop: "0.2rem",
                  }}
                >
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.76rem",
                        color: "var(--text-muted)",
                        border: "1px solid var(--border)",
                        borderRadius: "999px",
                        padding: "0.15rem 0.6rem",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.link ?? undefined}
                  className="project-link"
                  aria-label={`View ${p.title}`}
                  style={{
                    marginTop: "0.5rem",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "var(--crimson)",
                    display: "inline-flex",
                    gap: "0.35rem",
                    pointerEvents: p.link ? "auto" : "none",
                    opacity: p.link ? 1 : 0.5,
                    cursor: p.link ? "pointer" : "default",
                  }}
                  target="_blank"
                  rel="noreferrer"
                >
                  View project{" "}
                  <span className="arrow" aria-hidden="true" style={{ transition: "transform .3s var(--ease)" }}>
                    ↗
                  </span>
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal style={{ textAlign: "center", marginTop: "2.6rem" }}>
        <Link to="/projects" className="btn btn-ghost">
          View All Projects <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}

/* ============================================================
   SKILLS
   ============================================================ */
export function Skills() {
  return (
    <section
      className="section"
      id="skills"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="container">
        <Reveal className="section-head">
          <span className="section-kicker">
            <Sunflower size={15} /> Skills
          </span>
          <h2 className="section-title">
            My <span className="hand-accent">creative toolkit</span>
          </h2>
          <p className="section-sub">
            A growing collection of tools, technologies, and ideas I use to
            bring projects to life.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: "1.4rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
          }}
        >
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <div
                className="card"
                style={{ padding: "1.6rem", height: "100%" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7rem",
                    marginBottom: "1.1rem",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "2.4rem",
                      height: "2.4rem",
                      borderRadius: "var(--radius-sm)",
                      display: "grid",
                      placeItems: "center",
                      background: "linear-gradient(135deg, var(--crimson), var(--neon-pink))",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {g.icon}
                  </span>
                  <h3 style={{ fontSize: "1.08rem" }}>{g.title}</h3>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.45rem",
                  }}
                >
                  {g.skills.map((s) => (
                    <li
                      key={s}
                      style={{
                        fontSize: "0.83rem",
                        padding: "0.28rem 0.75rem",
                        borderRadius: "999px",
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ACHIEVEMENTS
   ============================================================ */
export function Achievements() {
  return (
    <section className="section container" id="achievements">
      <Reveal className="section-head">
        <span className="section-kicker" style={{ color: "#b3860a" }}>
          <Sunflower size={15} /> Milestones
        </span>
        <h2 className="section-title">
          Little wins, <span className="hand-accent">big growth</span>
        </h2>
        <p className="section-sub">
          Certifications, completed courses, and milestones along the way — each
          one a seed that kept growing.
        </p>
      </Reveal>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gap: "1.2rem",
          maxWidth: "720px",
          position: "relative",
        }}
      >
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.1}>
            <li
              className="card"
              style={{
                padding: "1.4rem 1.6rem",
                display: "flex",
                gap: "1.1rem",
                alignItems: "flex-start",
                borderLeft: "3px solid var(--sunflower)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "1.3rem",
                  flexShrink: 0,
                  background: "var(--sunflower)",
                  borderRadius: "50%",
                  width: "2.6rem",
                  height: "2.6rem",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                🌻
              </span>
              <div>
                <h3 style={{ fontSize: "1.05rem" }}>{a.title}</h3>
                {a.date && (
                  <span
                    style={{
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {a.date}
                  </span>
                )}
                <p style={{ color: "var(--text-muted)", fontSize: "0.93rem", marginTop: "0.3rem" }}>
                  {a.description}
                </p>
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--crimson)" }}
                  >
                    Verify ↗
                  </a>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ============================================================
   PERSONAL QUALITIES
   ============================================================ */
export function Qualities() {
  return (
    <section
      className="section"
      id="qualities"
      style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal className="section-head" >
          <span className="section-kicker">
            <Sunflower size={15} /> Beyond the résumé
          </span>
          <h2 className="section-title">
            More than <span className="hand-accent">just the work</span>
          </h2>
          <p className="section-sub">
            The way I show up matters as much as what I make.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gap: "1.3rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
          }}
        >
          {qualities.map((q, i) => (
            <Reveal key={q.title} delay={i * 0.08}>
              <div
                className="card"
                style={{ padding: "1.5rem", height: "100%", position: "relative" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "1.1rem",
                    right: "1.2rem",
                    color: "var(--neon-pink-soft)",
                    fontSize: "1rem",
                    opacity: 0.8,
                  }}
                >
                  ✿
                </span>
                <h3
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--crimson)",
                    marginBottom: "0.45rem",
                  }}
                >
                  {q.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.93rem" }}>
                  {q.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
