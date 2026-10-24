import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sunflower, Petal } from "../components/Florals";
import { SakuraPetals } from "../components/SakuraPetals";
import { Reveal } from "../components/Reveal";
import {
  artworks,
  characters,
  motionArt,
  processStages,
  creativeTools,
  studioNotes,
  artHeroIntro,
  type Artwork,
} from "../data/art";

/* ---------- shared bits ---------- */

function Kicker({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="section-kicker"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color }}
    >
      <Sunflower size={15} />
      {children}
    </span>
  );
}

const SHAPES: Record<string, string> = {
  tall: "3 / 4",
  portrait: "2 / 3",
  square: "1 / 1",
  wide: "4 / 3",
};

const CAT_GRADIENT: Record<string, string> = {
  "Digital Illustrations":
    "linear-gradient(150deg, var(--lavender) 0%, var(--neon-pink-soft) 60%, var(--cream) 100%)",
  "Character Design":
    "linear-gradient(150deg, var(--cream) 0%, var(--neon-pink-soft) 55%, var(--lavender) 100%)",
  "Sketches & Concepts":
    "linear-gradient(150deg, var(--bg-alt) 0%, var(--lavender) 70%, var(--cream) 100%)",
  Animation:
    "linear-gradient(150deg, var(--cream) 0%, var(--sunflower) 55%, var(--neon-pink-soft) 100%)",
  "Fan Art":
    "linear-gradient(150deg, var(--neon-pink-soft) 0%, var(--cream) 60%, var(--bg-alt) 100%)",
  "Visual Experiments":
    "linear-gradient(150deg, var(--lavender) 0%, var(--sunflower) 60%, var(--bg-alt) 100%)",
};

function PlaceholderArt({ a }: { a: Artwork }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        background: CAT_GRADIENT[a.category] ?? "linear-gradient(150deg, var(--cream), var(--lavender))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "color-mix(in srgb, var(--crimson) 75%, transparent)",
          padding: "1rem",
          display: "grid",
          justifyItems: "center",
          gap: "0.2rem",
        }}
      >
        <Sunflower size={40} />
        <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.4rem" }}>your artwork here</p>
        <p style={{ fontSize: "0.75rem", opacity: 0.8 }}>placeholder frame — not real art</p>
      </div>
      <span
        aria-hidden="true"
        style={{ position: "absolute", top: 12, right: 14, fontSize: "1rem", opacity: 0.7 }}
      >
        ✧
      </span>
      <span
        aria-hidden="true"
        style={{ position: "absolute", bottom: 12, left: 14, fontSize: "1rem", opacity: 0.6 }}
      >
        ✿
      </span>
    </div>
  );
}

/* ============================================================
   1. HERO — collage
   ============================================================ */
function artFor(i: number, fallback: Artwork["category"], shape: Artwork["shape"]): Artwork {
  return (
    artworks[i] ?? {
      id: `hero-${i}`,
      title: "✎ Hero artwork",
      category: fallback,
      placeholder: true,
      shape,
    }
  );
}

function ArtHero() {
  return (
    <section
      className="container"
      style={{
        position: "relative",
        paddingBlock: "4rem 4rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(330px, 100%), 1fr))",
        gap: "3rem",
        alignItems: "center",
        overflow: "clip",
      }}
    >
      <SakuraPetals count={8} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          left: "30%",
          bottom: "-40%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--lavender), transparent 70%)",
          filter: "blur(64px)",
          opacity: "var(--orb-opacity)" as string,
          pointerEvents: "none",
        }}
      />

      {/* text */}
      <Reveal style={{ position: "relative", zIndex: 2 }}>
        <Kicker>Art, imagination & little experiments</Kicker>
        <h1 style={{ fontSize: "clamp(2.4rem, 5.8vw, 3.9rem)", marginBlock: "0.6rem 1rem", maxWidth: "15ch" }}>
          Welcome to{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            my little
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
                background: "linear-gradient(90deg, var(--neon-pink-soft), var(--lavender))",
                opacity: 0.75,
              }}
            />
          </span>{" "}
          universe.
        </h1>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
          <Sunflower size={24} style={{ marginTop: 6 }} />
          <p style={{ color: "var(--text-muted)", maxWidth: "50ch", fontSize: "1.04rem" }}>
            {artHeroIntro}
          </p>
        </div>
        <p
          style={{
            fontFamily: "var(--font-hand)",
            fontSize: "1.35rem",
            color: "var(--neon-pink)",
            marginTop: "0.9rem",
          }}
        >
          Made with curiosity and a little sunshine ♡
        </p>
      </Reveal>

      {/* collage */}
      <Reveal
        delay={0.18}
        style={{ position: "relative", zIndex: 1, height: "min(56vw, 380px)", justifySelf: "center", width: "min(100%, 380px)" }}
      >
        {/* main frame */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: "12%",
            width: "58%",
            aspectRatio: "3 / 4",
            borderRadius: "var(--radius-md)",
            border: "2px solid var(--neon-pink)",
            background: "#fff",
            padding: "8px",
            boxShadow: "0 16px 40px rgba(134,30,45,.16)",
            zIndex: 2,
          }}
        >
          <div style={{ borderRadius: "calc(var(--radius-md) - 6px)", overflow: "hidden", height: "100%" }}>
            <PlaceholderArt a={artFor(0, "Digital Illustrations", "tall")} />
          </div>
        </motion.div>

        {/* small tile right */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          style={{
            position: "absolute",
            top: "18%",
            right: 0,
            width: "34%",
            aspectRatio: "1 / 1",
            borderRadius: "var(--radius-sm)",
            border: "1.5px solid var(--border-strong)",
            background: "#fff",
            padding: "6px",
            boxShadow: "var(--shadow)",
            transform: "rotate(3deg)",
            zIndex: 1,
          }}
        >
          <div style={{ borderRadius: 8, overflow: "hidden", height: "100%" }}>
            <PlaceholderArt a={artFor(1, "Character Design", "square")} />
          </div>
        </motion.div>

        {/* small tile bottom-left */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: "2%",
            width: "38%",
            aspectRatio: "4 / 3",
            borderRadius: "var(--radius-sm)",
            border: "1.5px solid var(--border-strong)",
            background: "#fff",
            padding: "6px",
            boxShadow: "var(--shadow)",
            transform: "rotate(-2.5deg)",
            zIndex: 3,
          }}
        >
          <div style={{ borderRadius: 8, overflow: "hidden", height: "100%" }}>
            <PlaceholderArt a={artFor(2, "Sketches & Concepts", "wide")} />
          </div>
        </motion.div>

        {/* stickers */}
        <motion.div
          animate={{ rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
          style={{ position: "absolute", top: "-6px", right: "26%", zIndex: 4, filter: "drop-shadow(0 3px 4px rgba(0,0,0,.12))" }}
        >
          <Sunflower size={44} />
        </motion.div>
        <motion.span
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.6, repeat: Infinity }}
          aria-hidden="true"
          style={{ position: "absolute", top: "46%", left: "8%", color: "var(--neon-pink)", zIndex: 4, fontSize: "1.2rem" }}
        >
          ✦
        </motion.span>
        <motion.span
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4.2, repeat: Infinity, delay: 1 }}
          aria-hidden="true"
          style={{ position: "absolute", bottom: "26%", right: "6%", color: "var(--sunflower)", zIndex: 4, fontSize: "1rem" }}
        >
          ✧
        </motion.span>
        <Petal size={18} color="var(--lavender)" style={{ position: "absolute", top: "8%", left: "4%", opacity: 0.8, transform: "rotate(-30deg)", zIndex: 0 }} />
        <Petal size={14} color="var(--neon-pink-soft)" style={{ position: "absolute", bottom: "10%", right: "18%", opacity: 0.7, transform: "rotate(40deg)", zIndex: 0 }} />
      </Reveal>
    </section>
  );
}

/* ============================================================
   2. FEATURED ARTWORK — auto-selects featured else first item
   ============================================================ */
function FeaturedArtwork() {
  const featured = artworks.find((a) => a.featured) ?? artworks[0];
  if (!featured) return null;

  return (
    <section className="section container">
      <Reveal className="section-head">
        <Kicker>A little something I'm proud of</Kicker>
        <h2 className="section-title">
          Featured <span className="hand-accent">artwork</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: featured.image ? "repeat(auto-fit, minmax(min(320px, 100%), 1fr))" : "1fr",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          {/* framed artwork */}
          <div
            style={{
              background: "var(--surface-2)",
              padding: "14px",
              borderRadius: "var(--radius-lg)",
              border: "2px solid var(--neon-pink)",
              boxShadow: "0 18px 46px rgba(134,30,45,.15)",
              position: "relative",
            }}
          >
            <div style={{ borderRadius: "calc(var(--radius-lg) - 10px)", overflow: "hidden", aspectRatio: featured.shape ? SHAPES[featured.shape] : "4 / 3" }}>
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.imageAlt ?? featured.title}
                  style={{ width: "100%", height: "100%", objectFit: "contain", background: "var(--surface)" }}
                />
              ) : (
                <PlaceholderArt a={featured} />
              )}
            </div>
            <span aria-hidden="true" style={{ position: "absolute", bottom: -12, right: -10, filter: "drop-shadow(0 3px 5px rgba(0,0,0,.14))" }}>
              <Sunflower size={38} />
            </span>
          </div>

          {/* info */}
          <div style={{ display: "grid", gap: "0.7rem" }}>
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
              {featured.date && (
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{featured.date}</span>
              )}
              {featured.medium && (
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>· {featured.medium}</span>
              )}
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>
              {featured.title}
            </h3>
            {featured.caption && (
              <p style={{ color: "var(--text-muted)", maxWidth: "52ch" }}>{featured.caption}</p>
            )}
            {featured.tools && featured.tools.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.3rem" }}>
                {featured.tools.map((t) => (
                  <span key={t} style={{ fontSize: "0.76rem", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.15rem 0.6rem", color: "var(--text-muted)" }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
            {featured.link && (
              <a
                href={featured.link}
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--crimson)", fontWeight: 600, display: "inline-flex", gap: "0.3rem", marginTop: "0.3rem" }}
              >
                See related work ↗
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   3+4. FILTERS + MASONRY GALLERY
   ============================================================ */
function ArtworkGallery() {
  const categories = useMemo(
    () => Array.from(new Set(artworks.map((a) => a.category))),
    [],
  );
  const [active, setActive] = useState("All Artwork");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const shown = active === "All Artwork" ? artworks : artworks.filter((a) => a.category === active);

  return (
    <section className="section" style={{ background: "var(--bg-alt)", position: "relative" }}>
      <SakuraPetals count={4} />
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <Reveal className="section-head">
          <Kicker>The collection</Kicker>
          <h2 className="section-title">
            Explore the <span className="hand-accent">gallery</span>
          </h2>
          <p className="section-sub">
            Illustrations, characters, sketches, and experiments — each one a little world of its own.
          </p>
        </Reveal>

        <Reveal>
          <div
            role="group"
            aria-label="Filter artwork by category"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.2rem" }}
          >
            {["All Artwork", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                className={`filter-btn${active === c ? " active" : ""}`}
                onClick={() => setActive(c)}
                aria-pressed={active === c}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="masonry">
          {shown.map((a, i) => (
            <motion.figure
              layout
              key={a.id}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3), ease: [0.22, 1, 0.36, 1] }}
              className="card artwork-card"
              style={{ padding: "10px", breakInside: "avoid", marginBottom: "1.4rem" }}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`View artwork: ${a.title}${a.image ? "" : " (placeholder)"}`}
                className="art-open"
                style={{ display: "block", width: "100%", borderRadius: "calc(var(--radius-md) - 4px)", overflow: "hidden", position: "relative" }}
              >
                <div style={{ aspectRatio: a.shape ? SHAPES[a.shape] : "4 / 3" }}>
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.imageAlt ?? a.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <PlaceholderArt a={a} />
                  )}
                </div>
                {/* hover overlay */}
                <span
                  className="art-hover"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(21,16,24,.4)",
                    opacity: 0,
                    transition: "opacity .3s",
                    color: "#fff",
                    fontSize: "1.6rem",
                    pointerEvents: "none",
                  }}
                >
                  ⇱
                </span>
              </button>
              <figcaption style={{ padding: "0.7rem 0.4rem 0.3rem", display: "grid", gap: "0.15rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
                  <strong style={{ fontFamily: "var(--font-hand)", fontSize: "1.15rem", color: "var(--crimson)" }}>
                    {a.title}
                  </strong>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                    {a.category}
                  </span>
                </div>
                {a.caption && (
                  <span style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>{a.caption}</span>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>

      <Lightbox
        index={lightboxIndex}
        list={shown}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}

/* ============================================================
   5. LIGHTBOX
   ============================================================ */
function Lightbox({
  index,
  list,
  onClose,
  onNavigate,
}: {
  index: number | null;
  list: Artwork[];
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const restoredFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (index === null) return;
    restoredFocus.current = document.activeElement as HTMLElement;
    closeBtn.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      restoredFocus.current?.focus?.();
    };
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && list.length > 1) onNavigate((index + list.length - 1) % list.length);
      if (e.key === "ArrowRight" && list.length > 1) onNavigate((index + 1) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, list.length, onClose, onNavigate]);

  if (index === null) return null;
  const a = list[index];

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing artwork: ${a.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        background: "rgba(21,16,24,.94)",
        display: "grid",
        placeItems: "center",
        padding: "1rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(92vw, 880px)",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
        }}
      >
        <div
          style={{
            flex: "1 1 auto",
            minHeight: 0,
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            background: "var(--surface)",
            display: "grid",
            placeItems: "center",
            border: "2px solid var(--neon-pink)",
          }}
        >
          <div style={{ width: "100%", height: "100%", maxHeight: "66vh" }}>
            {a.image ? (
              <img
                src={a.image}
                alt={a.imageAlt ?? a.title}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <PlaceholderArt a={a} />
            )}
          </div>
        </div>

        {/* meta */}
        <div
          style={{
            color: "#f5eef6",
            textAlign: "center",
            display: "grid",
            gap: "0.15rem",
            fontSize: "0.92rem",
          }}
        >
          <strong style={{ fontFamily: "var(--font-hand)", fontSize: "1.5rem", color: "var(--neon-pink-soft)" }}>
            {a.title}
          </strong>
          <span style={{ color: "#b3a3b3" }}>
            {a.category}
            {a.date ? ` · ${a.date}` : ""}
            {a.medium ? ` · ${a.medium}` : ""}
          </span>
          {a.caption && <span style={{ color: "#d8ccd8", maxWidth: "60ch", marginInline: "auto" }}>{a.caption}</span>}
        </div>

        {/* controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {list.length > 1 && (
            <button
              type="button"
              aria-label="Previous artwork"
              onClick={() => onNavigate((index + list.length - 1) % list.length)}
              className="lightbox-btn"
            >
              ←
            </button>
          )}
          <button
            ref={closeBtn}
            type="button"
            aria-label="Close viewer"
            onClick={onClose}
            className="lightbox-btn"
            style={{ width: "3rem", height: "3rem", fontSize: "1.2rem" }}
          >
            ✕
          </button>
          {list.length > 1 && (
            <button
              type="button"
              aria-label="Next artwork"
              onClick={() => onNavigate((index + 1) % list.length)}
              className="lightbox-btn"
            >
              →
            </button>
          )}
        </div>
        <span style={{ textAlign: "center", fontSize: "0.75rem", color: "#8a7a8a" }}>
          Esc to close · ← → to browse
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   6. CHARACTER SHOWCASE — hidden when empty
   ============================================================ */
function CharacterShowcase() {
  if (characters.length === 0) return null;
  return (
    <section className="section container" style={{ maxWidth: "880px" }}>
      <Reveal className="section-head">
        <Kicker color="var(--neon-pink)">Character design</Kicker>
        <h2 className="section-title">
          Characters with their own <span className="hand-accent">little worlds</span>
        </h2>
      </Reveal>
      <div style={{ display: "grid", gap: "2.5rem" }}>
        {characters.map((c) => (
          <Reveal key={c.name}>
            <article
              className="card"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
                overflow: "hidden",
              }}
            >
              <div style={{ aspectRatio: "3 / 4", overflow: "hidden", background: "var(--surface-2)" }}>
                <img src={c.image} alt={c.imageAlt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "clamp(1.3rem, 3vw, 2rem)", display: "grid", gap: "0.8rem", alignContent: "center" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--crimson)" }}>
                  {c.name}
                </h3>
                <p style={{ color: "var(--text-muted)" }}>{c.description}</p>
                {c.traits && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {c.traits.map((t) => (
                      <span key={t} style={{ fontSize: "0.76rem", border: "1px solid var(--border)", borderRadius: "999px", padding: "0.15rem 0.6rem" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {c.palette && (
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>palette</span>
                    {c.palette.map((hex) => (
                      <span
                        key={hex}
                        title={hex}
                        aria-label={`Color ${hex}`}
                        style={{ width: 20, height: 20, borderRadius: "50%", background: hex, border: "2px solid var(--surface)", boxShadow: "0 0 0 1px var(--border-strong)" }}
                      />
                    ))}
                  </div>
                )}
                {c.sketches && c.sketches.length > 0 && (
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {c.sketches.map((s, i) => (
                      <img
                        key={i}
                        src={s}
                        alt={`${c.name} sketch ${i + 1}`}
                        style={{ width: 74, height: 74, objectFit: "cover", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}
                      />
                    ))}
                  </div>
                )}
                {c.backstory && <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>{c.backstory}</p>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   7. MOTION ART — hidden when empty
   ============================================================ */
function MotionGallery() {
  if (motionArt.length === 0) return null;
  return (
    <section
      className="section"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="container">
        <Reveal className="section-head">
          <Kicker color="var(--neon-pink)">Animation</Kicker>
          <h2 className="section-title">
            Little things that <span className="hand-accent">move</span>
          </h2>
          <p className="section-sub">
            Short loops, motion experiments, and visual storytelling tests.
          </p>
        </Reveal>
        <div
          style={{
            display: "grid",
            gap: "1.4rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
          }}
        >
          {motionArt.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.08}>
              <figure className="card" style={{ padding: "10px", overflow: "hidden" }}>
                <video
                  controls
                  preload="metadata"
                  poster={m.poster}
                  style={{ width: "100%", borderRadius: "calc(var(--radius-md) - 4px)", aspectRatio: "16 / 9", background: "var(--surface-2)" }}
                >
                  {m.src && <source src={m.src} />}
                  Your browser doesn't support embedded video.
                </video>
                <figcaption style={{ padding: "0.9rem 0.5rem 0.3rem", display: "grid", gap: "0.3rem" }}>
                  <strong style={{ fontFamily: "var(--font-hand)", fontSize: "1.2rem", color: "var(--crimson)" }}>{m.title}</strong>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{m.description}</span>
                  {m.tools && (
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      Tools: {m.tools.join(", ")}
                    </span>
                  )}
                  {m.link && (
                    <a href={m.link} target="_blank" rel="noreferrer" style={{ color: "var(--crimson)", fontWeight: 600, fontSize: "0.88rem" }}>
                      Related project ↗
                    </a>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. CREATIVE PROCESS
   ============================================================ */
function CreativeProcess() {
  return (
    <section className="section container" style={{ position: "relative", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-2rem",
          bottom: "-3rem",
          opacity: 0.1,
          transform: "rotate(14deg)",
          pointerEvents: "none",
        }}
      >
        <Sunflower size={170} />
      </div>
      <Reveal className="section-head">
        <Kicker>The process</Kicker>
        <h2 className="section-title">
          From little idea <span className="hand-accent">to little world</span>
        </h2>
        <p className="section-sub">
          A loose rhythm my art tends to follow — spontaneous, never rigid.
        </p>
      </Reveal>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: "1.3rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(230px, 100%), 1fr))",
          position: "relative",
          zIndex: 1,
        }}
      >
        {processStages.map((s, i) => (
          <Reveal key={s.stage} delay={i * 0.09}>
            <li
              className="card"
              style={{
                padding: "1.5rem",
                height: "100%",
                position: "relative",
                borderTop: "3px solid var(--neon-pink-soft)",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "2.6rem",
                  height: "2.6rem",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(135deg, var(--neon-pink-soft), var(--lavender))",
                  color: "#7a2347",
                  fontWeight: 700,
                  marginBottom: "0.8rem",
                }}
              >
                {s.icon}
              </span>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "0.4rem", color: "var(--crimson)" }}>
                {s.stage}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.93rem" }}>{s.text}</p>
              {i < processStages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="process-connector"
                  style={{
                    position: "absolute",
                    top: "2.4rem",
                    right: "-1.05rem",
                    width: "2rem",
                    height: 2,
                    background: "linear-gradient(90deg, var(--neon-pink-soft), var(--lavender))",
                    display: "none",
                  }}
                />
              )}
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

/* ============================================================
   9. TOOLKIT + NOTES
   ============================================================ */
function CreativeToolkit() {
  return (
    <section
      className="section"
      style={{ background: "var(--bg-alt)", position: "relative" }}
    >
      <div className="container">
        <Reveal className="section-head">
          <Kicker>Tools</Kicker>
          <h2 className="section-title">
            My creative <span className="hand-accent">toolkit</span>
          </h2>
          <p className="section-sub">
            The brushes, software, and materials behind the art.
          </p>
        </Reveal>
        <div
          style={{
            display: "grid",
            gap: "1.1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
          }}
        >
          {creativeTools.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 0.06}>
              <div
                className="card"
                style={{ padding: "1.3rem", display: "flex", gap: "0.85rem", alignItems: "flex-start", height: "100%" }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "var(--radius-sm)",
                    display: "grid",
                    placeItems: "center",
                    background: "linear-gradient(135deg, var(--lavender), var(--neon-pink-soft))",
                    color: "#7a2347",
                    fontSize: "1.05rem",
                  }}
                >
                  {t.icon}
                </span>
                <div>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>{t.name}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{t.use}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudioNotes() {
  if (studioNotes.length === 0) return null;
  return (
    <section className="section container" style={{ maxWidth: "780px" }}>
      <Reveal className="section-head">
        <Kicker color="#b3860a">From the studio</Kicker>
        <h2 className="section-title">
          Little notes <span className="hand-accent">from the studio</span>
        </h2>
        <p className="section-sub">
          Small reflections behind selected pieces.
        </p>
      </Reveal>
      <div style={{ display: "grid", gap: "1rem" }}>
        {studioNotes.map((n, i) => {
          const art = artworks.find((a) => a.id === n.artworkId);
          return (
            <Reveal key={i} delay={i * 0.06}>
              <div
                className="card"
                style={{
                  padding: "1.2rem 1.4rem",
                  borderLeft: "3px solid var(--sunflower)",
                  display: "flex",
                  gap: "0.8rem",
                  alignItems: "flex-start",
                }}
              >
                <Sunflower size={20} style={{ flexShrink: 0, marginTop: 3 }} />
                <div>
                  <p style={{ color: "var(--text-muted)" }}>{n.text}</p>
                  {art && (
                    <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--crimson)" }}>
                      — {art.title}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================ */

export default function Art() {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <ArtHero />
      <FeaturedArtwork />
      <ArtworkGallery />
      <CharacterShowcase />
      <MotionGallery />
      <CreativeProcess />
      <CreativeToolkit />
      <StudioNotes />
    </motion.main>
  );
}
