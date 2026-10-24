import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sunflower } from "../components/Florals";
import { SakuraPetals } from "../components/SakuraPetals";
import { Reveal } from "../components/Reveal";
import { profile } from "../data/profile";
import {
  aboutIntro,
  storyParagraphs,
  principles,
  interests,
  strengths,
  timeline,
  closingNote,
} from "../data/profile";

/* ---------- tiny shared bits ---------- */

const sectionPad = "4.5rem";

function Kicker({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="section-kicker"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: color ?? "var(--crimson)",
      }}
    >
      <Sunflower size={15} />
      {children}
    </span>
  );
}

/** Words wrapped in *asterisks* inside story text get a pink highlight. */
function renderHighlight(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <strong
        key={i}
        style={{
          color: "var(--crimson)",
          fontWeight: 600,
          background:
            "linear-gradient(180deg, transparent 62%, rgba(255, 217, 102, .5) 0)",
        }}
      >
        {part.slice(1, -1)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/* ============================================================
   1. ABOUT HERO — "The Girl Behind the Ideas"
   ============================================================ */
function AboutHero() {
  return (
    <section
      className="container"
      style={{
        position: "relative",
        paddingBlock: `4rem ${sectionPad}`,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
        gap: "3.5rem",
        alignItems: "center",
        overflow: "clip",
      }}
    >
      <SakuraPetals count={8} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: "var(--orb-opacity)" as string,
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            right: "-4%",
            top: "-16%",
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--neon-pink-soft), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Left — text */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <span
            style={{
              fontFamily: "var(--font-hand)",
              fontSize: "1.6rem",
              color: "var(--neon-pink)",
            }}
          >
            a little about me
          </span>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 3.8rem)",
              marginBlock: "0.6rem 1.2rem",
              maxWidth: "14ch",
            }}
          >
            The Girl{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Behind
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
                  originX: 0,
                  background:
                    "linear-gradient(90deg, var(--neon-pink-soft), var(--sunflower))",
                  opacity: 0.75,
                }}
              />
            </span>{" "}
            the Ideas.
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
            <Sunflower size={26} style={{ marginTop: 6 } as React.CSSProperties} />
            <p style={{ color: "var(--text-muted)", maxWidth: "50ch", fontSize: "1.05rem" }}>
              {aboutIntro}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Right — scrapbook portrait */}
      <Reveal
        delay={0.2}
        style={{ position: "relative", justifySelf: "center", zIndex: 1, width: "min(100%, 340px)" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-10px",
            background:
              "linear-gradient(140deg, var(--neon-pink-soft), var(--lavender) 60%, var(--sunflower))",
            filter: "blur(16px)",
            opacity: 0.5,
            borderRadius: "var(--radius-lg)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            background: "#fff",
            padding: "0.9rem 0.9rem 3rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            boxShadow: "0 18px 44px rgba(134,30,45,.15)",
            transform: "rotate(2.4deg)",
            transition: "transform .4s var(--ease)",
          }}
        >
          <div
            style={{
              aspectRatio: "4 / 5",
              borderRadius: "var(--radius-sm)",
              overflow: "hidden",
              background:
                "linear-gradient(150deg, var(--surface-2), var(--bg-alt) 55%, var(--lavender))",
              display: "grid",
              placeItems: "center",
            }}
          >
            {profile.portrait ? (
              <img
                src={profile.portrait}
                alt={profile.portraitAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "1rem" }}>
                <Sunflower size={46} />
                <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.35rem", marginTop: "0.5rem" }}>
                  your portrait here
                </p>
              </div>
            )}
          </div>
          {/* taped notes + sticker */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -14,
              left: "50%",
              transform: "translateX(-50%) rotate(-4deg)",
              width: 74,
              height: 22,
              background: "rgba(255, 216, 102, .65)",
              borderRadius: 3,
              boxShadow: "0 2px 6px rgba(0,0,0,.08)",
            }}
          />
          <p
            style={{
              position: "absolute",
              bottom: 10,
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: "var(--font-hand)",
              fontSize: "1.3rem",
              color: "var(--crimson)",
            }}
          >
            just me & my ideas 🌻
          </p>
        </div>

        {/* floating sticker note */}
        <motion.div
          initial={{ y: 8 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "-1.4rem",
            right: "-1.6rem",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "0.7rem 1rem",
            boxShadow: "var(--shadow)",
            transform: "rotate(-5deg)",
            fontFamily: "var(--font-hand)",
            fontSize: "1.05rem",
            color: "var(--crimson)",
            maxWidth: "11rem",
            zIndex: 2,
          }}
        >
          curious, creative & always growing ✿
        </motion.div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   2. MY STORY — four editorial paragraphs
   ============================================================ */
function MyStory() {
  return (
    <section className="section container" style={{ maxWidth: "860px", position: "relative" }}>
      <Reveal className="section-head">
        <Kicker>My story</Kicker>
        <h2 className="section-title">
          Every idea has a <span className="hand-accent">story</span>
        </h2>
        <p className="section-sub">
          Here's a little more about the person behind the work.
        </p>
      </Reveal>

      {/* large decorative quote mark */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "-0.6rem",
          fontFamily: "var(--font-display)",
          fontSize: "7rem",
          lineHeight: 1,
          color: "var(--neon-pink-soft)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
      >
        “
      </span>

      <div style={{ display: "grid", gap: "2.8rem", position: "relative" }}>
        {storyParagraphs.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.1}>
            <article
              style={
                {
                  marginLeft: "clamp(0px, 6vw, 48px)",
                  borderLeft: "2px dashed var(--border-strong)",
                  paddingLeft: "1.8rem",
                }
              }
            >
              <Kicker color={i % 2 === 1 ? "var(--neon-pink)" : undefined}>
                {p.label}
              </Kicker>
              <h3 style={{ fontSize: "1.35rem", marginBlock: "0.5rem 0.75rem" }}>
                {renderHighlight(`*${p.lead}*`)}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.02rem", lineHeight: 1.8 }}>
                {renderHighlight(p.text)}
              </p>
              {i === 1 && (
                <div aria-hidden="true" style={{ marginTop: "1.6rem", display: "flex", gap: "0.4rem", opacity: 0.8 }}>
                  <Sunflower size={18} />
                  <span style={{ color: "var(--neon-pink-soft)", fontSize: "0.9rem" }}>✿ ✿ ✿</span>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   3. PHILOSOPHY — "Growing at My Own Pace"
   ============================================================ */
function Philosophy() {
  return (
    <section
      className="section"
      style={{ background: "var(--surface-2)", position: "relative", overflow: "hidden" }}
    >
      {/* big soft sunflower watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-3rem",
          top: "50%",
          transform: "translateY(-50%) rotate(-10deg)",
          opacity: 0.1,
          pointerEvents: "none",
        }}
        className="watermark-sunflower"
      >
        <div style={{ filter: "blur(0.5px)" }}>
          <FloatingSunflower size={190} />
        </div>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal className="section-head">
          <Kicker color="#b3860a">Philosophy</Kicker>
          <h2 className="section-title">
            Growing at my own <span className="hand-accent">pace</span>
          </h2>
          <p className="section-sub">
            I believe growth doesn't always happen loudly. Sometimes it happens in
            the little things — a new skill, a lesson learned, a challenge faced,
            or an idea finally brought to life.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
            gap: "1.4rem",
          }}
        >
          {principles.map((pr, i) => (
            <Reveal key={pr.title} delay={i * 0.08}>
              <div
                className="card"
                style={{
                  padding: "1.7rem",
                  height: "100%",
                  borderLeft: `3px solid ${pr.color}`,
                  borderRadius: "var(--radius-md)",
                  background: i % 2 === 0 ? "var(--surface)" : "color-mix(in srgb, var(--lavender) 14%, var(--surface))",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "1.5rem",
                    display: "inline-grid",
                    placeItems: "center",
                    width: "2.8rem",
                    height: "2.8rem",
                    borderRadius: "50%",
                    background: "color-mix(in srgb, currentColor 12%, transparent)",
                    color: pr.color,
                    marginBottom: "0.8rem",
                  }}
                >
                  {pr.icon}
                </span>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>{pr.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>{pr.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A sunflower that very gently floats — used for the philosophy watermark. */
function FloatingSunflower({ size }: { size: number }) {
  return (
    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
      <Sunflower size={size} />
    </motion.div>
  );
}

/* ============================================================
   4. INTERESTS — scrapbook gallery
   ============================================================ */
function Interests() {
  return (
    <section className="section container">
      <Reveal className="section-head">
        <Kicker>Beyond the screen</Kicker>
        <h2 className="section-title">
          A few things that <span className="hand-accent">feel like me</span>
        </h2>
        <p className="section-sub">
          Because there's always more to a person than their job title.
        </p>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))",
          gap: "1.8rem 1.4rem",
          paddingTop: "0.8rem",
        }}
      >
        {interests.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.08}>
            <div
              className="card polaroid"
              style={{
                padding: "0.85rem 0.85rem 0.9rem",
                transform: `rotate(${it.tilt}deg)`,
                borderRadius: "var(--radius-sm)",
                background: "#fff",
                transition: "transform .35s var(--ease), box-shadow .35s var(--ease)",
              }}
            >
              <div
                style={{
                  aspectRatio: "1 / 0.85",
                  borderRadius: "calc(var(--radius-sm) - 4px)",
                  background:
                    i % 2 === 0
                      ? "linear-gradient(140deg, var(--bg-alt), var(--lavender) 70%, var(--neon-pink-soft))"
                      : "linear-gradient(140deg, var(--cream), var(--sunflower) 70%, var(--bg-alt))",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "2.6rem",
                }}
                aria-hidden="true"
              >
                {it.emoji}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-hand)",
                  color: "var(--crimson)",
                  fontSize: "1.25rem",
                  marginTop: "0.7rem",
                }}
              >
                {it.title}
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.86rem",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {it.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   5. TEAM STRENGTHS — "How I Show Up"
   ============================================================ */
function TeamStrengths() {
  return (
    <section
      className="section"
      style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}
    >
      <SakuraPetals count={6} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal className="section-head">
          <Kicker>In a team</Kicker>
          <h2 className="section-title">
            How I <span className="hand-accent">show up</span>
          </h2>
          <p className="section-sub">
            The qualities I bring to collaboration, everyday work, and shared goals.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
            gap: "1.2rem",
          }}
        >
          {strengths.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div
                className="card"
                style={{
                  padding: "1.4rem",
                  height: "100%",
                  display: "flex",
                  gap: "0.9rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: "2.6rem",
                    height: "2.6rem",
                    borderRadius: "var(--radius-sm)",
                    display: "grid",
                    placeItems: "center",
                    background: "linear-gradient(135deg, var(--sunflower), #ffe9ad)",
                    color: "#5b3a12",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                  }}
                >
                  {s.icon}
                </span>
                <div>
                  <h3 style={{ fontSize: "1.02rem", marginBottom: "0.3rem" }}>{s.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{s.text}</p>
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
   6. TIMELINE — "Still Becoming, Always Growing"
   ============================================================ */
function Timeline() {
  return (
    <section className="section container" style={{ maxWidth: "760px" }}>
      <Reveal className="section-head">
        <Kicker color="#b3860a">My journey</Kicker>
        <h2 className="section-title">
          Still becoming, <span className="hand-accent">always growing</span>
        </h2>
        <p className="section-sub">
          Milestones along the way — each marker is a seed that kept growing.
        </p>
      </Reveal>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          position: "relative",
          display: "grid",
          gap: "2rem",
        }}
      >
        {/* the pink line */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 13,
            top: 8,
            bottom: 8,
            width: 2,
            background: "linear-gradient(var(--neon-pink-soft), var(--sunflower))",
            borderRadius: 2,
          }}
        />
        {timeline.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.1} as="li" style={{ position: "relative", paddingLeft: "3.4rem" }}>
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                top: 2,
              }}
            >
              <Sunflower size={28} />
            </span>
            <div
              className="card"
              style={{
                padding: "1.2rem 1.5rem",
                borderRadius: "var(--radius-md)",
              }}
            >
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--neon-pink)",
                }}
              >
                {t.date}
              </span>
              <h3 style={{ fontSize: "1.08rem", marginBlock: "0.25rem 0.35rem" }}>{t.title}</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.94rem" }}>{t.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ============================================================
   7. CLOSING NOTE — "Before You Go..."
   ============================================================ */
function ClosingNote() {
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
          <SakuraPetals count={5} />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-2rem",
              top: "-2rem",
              opacity: 0.25,
              pointerEvents: "none",
              transform: "rotate(-14deg)",
            }}
          >
            <Sunflower size={110} />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <Sunflower size={34} />
            <h2
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
                color: "var(--crimson)",
                marginTop: "0.6rem",
              }}
            >
              Before You Go...
            </h2>
            <p
              style={{
                maxWidth: "58ch",
                marginInline: "auto",
                marginTop: "1rem",
                color: "var(--text-muted)",
              }}
            >
              {closingNote}
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
              <Link to="/contact" className="btn btn-primary">
                Let's Connect
              </Link>
              <Link to="/projects" className="btn btn-ghost">
                Explore My Work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================ */

export default function About() {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <AboutHero />
      <MyStory />
      <Philosophy />
      <Interests />
      <TeamStrengths />
      <Timeline />
      <ClosingNote />
    </motion.main>
  );
}
