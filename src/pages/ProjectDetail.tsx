import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Sunflower } from "../components/Florals";
import { SakuraPetals } from "../components/SakuraPetals";
import { Reveal } from "../components/Reveal";
import { featuredProjects, type Project } from "../data/profile";

/* ---------- helpers ---------- */

function Section({
  heading,
  children,
  kickerColor,
}: {
  heading: string;
  children: React.ReactNode;
  kickerColor?: string;
}) {
  return (
    <Reveal>
      <section style={{ paddingBlock: "1.6rem", borderTop: "1px dashed var(--border-strong)" }}>
        <span
          className="section-kicker"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: kickerColor ?? "var(--neon-pink)" }}
        >
          <Sunflower size={14} />
          {heading}
        </span>
        <div style={{ marginTop: "0.8rem" }}>{children}</div>
      </section>
    </Reveal>
  );
}

function LinkButton({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const external = !href.startsWith("/");
  return (
    <a
      href={href}
      className={`btn ${primary ? "btn-primary" : "btn-ghost"}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/* ============================================================ */

export default function ProjectDetail() {
  const { slug } = useParams();
  const project: Project | undefined = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main id="main" className="container" style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <Sunflower size={40} />
          <h1 style={{ margin: "1rem 0 0.4rem" }}>This project hasn't bloomed yet</h1>
          <p style={{ color: "var(--text-muted)" }}>The case study you're looking for doesn't exist.</p>
          <Link to="/projects" className="btn btn-primary" style={{ marginTop: "1.4rem" }}>
            ← Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const related = featuredProjects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .concat(featuredProjects.filter((p) => p.slug !== project.slug && p.category !== project.category))
    .slice(0, 3);

  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      style={{ paddingBottom: "1rem" }}
    >
      {/* ---------- A. Introduction ---------- */}
      <section
        className="container"
        style={{ position: "relative", paddingBlock: "3.5rem 2.5rem", overflow: "clip" }}
      >
        <SakuraPetals count={4} />
        <Reveal style={{ position: "relative", zIndex: 1 }}>
          <Link
            to="/projects"
            style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}
          >
            ← All Projects
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.2rem" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--crimson)",
                background: "color-mix(in srgb, var(--crimson) 8%, transparent)",
                padding: "0.25rem 0.75rem",
                borderRadius: "999px",
              }}
            >
              {project.category}
            </span>
            {project.status && (
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                }}
              >
                {project.status}
              </span>
            )}
            {project.date && (
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                }}
              >
                {project.date}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", marginBlock: "0.8rem 0.9rem", maxWidth: "20ch" }}>
            {project.title}
          </h1>
          <p style={{ color: "var(--text-muted)", maxWidth: "60ch", fontSize: "1.05rem" }}>
            {project.description}
          </p>

          {project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt ?? `${project.title} preview`}
              style={{ marginTop: "2rem", borderRadius: "var(--radius-lg)", width: "100%", boxShadow: "var(--shadow)" }}
            />
          ) : (
            <div
              style={{
                marginTop: "2rem",
                aspectRatio: "16 / 8",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border-strong)",
                boxShadow: "0 14px 40px rgba(255,77,141,.14)",
                display: "grid",
                placeItems: "center",
                background: "var(--surface-2)",
              }}
            >
              <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "1rem" }}>
                <Sunflower size={44} />
                <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.4rem", marginTop: "0.4rem" }}>
                  project preview goes here
                </p>
                <p style={{ fontSize: "0.82rem" }}>Add <code>image</code> for this project in profile.ts</p>
              </div>
            </div>
          )}

          {/* action links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginTop: "1.6rem" }}>
            {project.demo && <LinkButton href={project.demo} primary>Live Demo ↗</LinkButton>}
            {project.repo && <LinkButton href={project.repo}>GitHub Repository ↗</LinkButton>}
            {project.link && <LinkButton href={project.link}>Project Link ↗</LinkButton>}
          </div>
        </Reveal>
      </section>

      {/* ---------- Case study body ---------- */}
      <div className="container" style={{ maxWidth: "780px" }}>
        {project.challenge && (
          <Section heading="The challenge">
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{project.challenge}</p>
          </Section>
        )}

        {project.goal && (
          <Section heading="The goal">
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{project.goal}</p>
          </Section>
        )}

        {project.role && (
          <Section heading="My role">
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{project.role}</p>
          </Section>
        )}

        {project.process && project.process.length > 0 && (
          <Section heading="Process & approach">
            <ol
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gap: "0.9rem",
                position: "relative",
              }}
            >
              {project.process.map((step, i) => (
                <Reveal key={i} delay={i * 0.06} as="li" style={{ display: "flex", gap: "0.9rem", alignItems: "flex-start" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: "linear-gradient(135deg, var(--crimson), var(--neon-pink))",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: "var(--text-muted)", lineHeight: 1.7, paddingTop: "0.2rem" }}>{step}</span>
                </Reveal>
              ))}
            </ol>
          </Section>
        )}

        {project.tools && project.tools.length > 0 && (
          <Section heading="Tools & technologies">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {project.tools.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "999px",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Section>
        )}

        {project.outcome && (
          <Section heading="Final outcome" kickerColor="#b3860a">
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{project.outcome}</p>
          </Section>
        )}

        {project.lessons && (
          <Section heading="Lessons learned" kickerColor="#b3860a">
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>{project.lessons}</p>
          </Section>
        )}

        {/* ---------- J. Related projects ---------- */}
        <section style={{ paddingBlock: "2.5rem 3rem", borderTop: "1px dashed var(--border-strong)" }}>
          <Reveal>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.2rem" }}>
              More things <span className="hand-accent">I've made</span>
            </h2>
            <div
              style={{
                display: "grid",
                gap: "1.1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
              }}
            >
              {related.map((r, i) => (
                <Reveal key={r.slug} delay={i * 0.07}>
                  <Link
                    to={`/projects/${r.slug}`}
                    className="card related-card"
                    style={{
                      display: "block",
                      padding: "1.1rem 1.3rem",
                      height: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "var(--neon-pink)",
                      }}
                    >
                      {r.category}
                    </span>
                    <h3 style={{ fontSize: "1.02rem", marginBlock: "0.3rem 0.2rem" }}>{r.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.86rem" }}>{r.description}</p>
                    <span style={{ color: "var(--crimson)", fontSize: "0.88rem", fontWeight: 600, display: "inline-flex", gap: "0.3rem", marginTop: "0.5rem" }}>
                      View <span aria-hidden="true">↗</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <Link to="/projects" className="btn btn-ghost" style={{ marginTop: "1.8rem" }}>
                ← Back to all projects
              </Link>
            </Reveal>
          </Reveal>
        </section>
      </div>
    </motion.main>
  );
}
