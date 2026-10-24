import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { SakuraPetals } from "./SakuraPetals";
import { Sunflower } from "./Florals";

/* ---------- typewriter for rotating titles ---------- */
function useTypewriter(titles: string[], enabled = true) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("typing");

  useEffect(() => {
    if (!enabled) {
      setText(titles[idx]);
      return;
    }
    const full = titles[idx];
    let delay = phase === "typing" ? 55 : phase === "hold" ? 2000 : 28;
    const t = setTimeout(() => {
      if (phase === "typing") {
        setText(full.slice(0, text.length + 1));
        if (text.length + 1 >= full.length) setPhase("hold");
      } else if (phase === "hold") {
        setPhase("erasing");
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length - 1 <= 0) {
          setIdx((i) => (i + 1) % titles.length);
          setPhase("typing");
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, phase, idx, titles, enabled]);

  return enabled ? text : titles[idx];
}

function SocialIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    GitHub: "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.35-3.88-1.35-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.74 1.27 3.4.97.1-.76.4-1.28.74-1.57-2.56-.3-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z",
    LinkedIn: "M4.98 3.5A2.49 2.49 0 1 1 0 3.5a2.49 2.49 0 0 1 4.98 0ZM.2 8.3h4.6V23.5H.2V8.3Zm7.6 0h4.42v2.07h.06c.62-1.16 2.12-2.38 4.36-2.38 4.67 0 5.53 3.07 5.53 7.06v8.45h-4.6v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.96v7.63H7.8V8.3Z",
    Email: "M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 8.6 8-5.2V6L12 11.2 4 6v1.4l8 5.2Z",
    Instagram: "M7.8 2h8.4C20 2 22 4 22 7.8v8.4C22 20 20 22 16.2 22H7.8C4 22 2 20 2 16.2V7.8C2 4 4 2 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4C4 18.9 5.1 20 7.8 20h8.4c2.7 0 3.8-1.1 3.8-3.8V7.8C20 5.1 18.9 4 16.2 4H7.8ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.3-2.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  };
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  );
}

const socialList = [
  { label: "GitHub", href: profile.socials.github, type: "GitHub" },
  { label: "LinkedIn", href: profile.socials.linkedin, type: "LinkedIn" },
  { label: "Email", href: profile.socials.email, type: "Email" },
  ...(profile.socials.instagram
    ? [{ label: "Instagram", href: profile.socials.instagram, type: "Instagram" }]
    : []),
];

export function Hero() {
  const reduced = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )[0];
  const typed = useTypewriter(profile.titles, !reduced);

  return (
    <section
      className="container"
      style={{
        position: "relative",
        paddingBlock: "4.5rem 4rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
        alignItems: "center",
        gap: "3rem",
        overflow: "clip",
      }}
    >
      {/* Ambient orbs (decorative) */}
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
          className="orb"
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            right: "-6%",
            top: "-14%",
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--neon-pink-soft), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="orb-slow"
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            left: "-8%",
            bottom: "-10%",
            borderRadius: "50%",
            background: "radial-gradient(circle, var(--sunflower), transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>
      <SakuraPetals />

      {/* ---------- Portrait ---------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={{
          position: "relative",
          justifySelf: "center",
          zIndex: 1,
          order: 0,
        }}
      >
        {/* animated ring */}
        <div
          aria-hidden="true"
          className="portrait-ring"
          style={{
            position: "absolute",
            inset: "-14px",
            borderRadius: "var(--radius-lg) 40% var(--radius-lg) 40%",
            border: "1.5px dashed var(--neon-pink-soft)",
            opacity: 0.6,
            animation: "spin-slow 28s linear infinite",
            pointerEvents: "none",
          }}
        />
        {/* soft glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-8px",
            borderRadius: "var(--radius-lg)",
            background:
              "linear-gradient(130deg, var(--neon-pink-soft), var(--lavender), var(--sunflower))",
            filter: "blur(18px)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            width: "min(100%, 380px)",
            borderRadius: "var(--radius-lg)",
            border: "2px solid var(--neon-pink)",
            background:
              "linear-gradient(150deg, var(--surface-2), var(--bg-alt) 55%, var(--lavender))",
            display: "grid",
            placeItems: "center",
            overflow: "hidden",
            boxShadow: "0 18px 50px rgba(134,30,45,.16)",
          }}
        >
          {profile.portrait ? (
            <img
              src={profile.portrait}
              alt={profile.portraitAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                display: "grid",
                justifyItems: "center",
                gap: "0.6rem",
                padding: "1rem",
              }}
            >
              <Sunflower size={54} />
              <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.5rem" }}>
                your portrait here
              </p>
              <p style={{ fontSize: "0.8rem", maxWidth: "220px" }}>
                Add your photo in <code>src/data/profile.ts</code> →{" "}
                <code>portrait</code>
              </p>
            </div>
          )}
        </div>

        {/* handwritten caption */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-1.1rem",
            right: "0.4rem",
            fontFamily: "var(--font-hand)",
            fontSize: "1.4rem",
            color: "var(--crimson)",
            transform: "rotate(-6deg)",
            display: "inline-flex",
            gap: "0.25rem",
            alignItems: "center",
            background: "var(--bg)",
            paddingInline: "0.5rem",
            borderRadius: "10px",
          }}
        >
          {profile.portraitCaption}
        </span>
      </motion.div>

      {/* ---------- Introduction ---------- */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
        }}
        style={{ zIndex: 1 }}
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
          className="section-kicker"
        >
          Hello, world! I'm
        </motion.p>

        <motion.h1
          variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
          style={{
            fontSize: "clamp(2.6rem, 6.5vw, 4.2rem)",
            marginTop: "0.5rem",
          }}
        >
          <span
            style={{
              background: "linear-gradient(120deg, var(--crimson) 10%, var(--neon-pink))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.name.split(" ")[0]}
          </span>{" "}
          <span>{profile.name.split(" ").slice(1).join(" ")}</span>
        </motion.h1>

        <motion.p
          aria-live="polite"
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          style={{
            marginTop: "0.9rem",
            fontSize: "clamp(1.15rem, 2.4vw, 1.4rem)",
            fontWeight: 600,
            minHeight: "1.7em",
            color: "var(--crimson)",
          }}
        >
          {typed}
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "2px",
              height: "1.05em",
              background: "var(--neon-pink)",
              marginLeft: 2,
              verticalAlign: "text-bottom",
            }}
          />
        </motion.p>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          style={{
            marginTop: "1.1rem",
            color: "var(--text-muted)",
            maxWidth: "52ch",
          }}
        >
          {profile.intro}
        </motion.p>

        {/* actions */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          style={{ display: "flex", gap: "0.9rem", marginTop: "1.8rem", flexWrap: "wrap" }}
        >
          <Link to="/projects" className="btn btn-primary">
            Explore My Work →
          </Link>
          <Link to="/about" className="btn btn-ghost">
            More About Me
          </Link>
        </motion.div>

        {/* socials */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          style={{ display: "flex", gap: "0.7rem", marginTop: "1.8rem" }}
        >
          {socialList.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="social-link"
              style={{
                width: "2.6rem",
                height: "2.6rem",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--text-muted)",
                transition: "all .25s var(--ease)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--neon-pink)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--glow)";
                e.currentTarget.style.borderColor = "var(--neon-pink-soft)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
              target={s.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
            >
              <SocialIcon type={s.type} />
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
