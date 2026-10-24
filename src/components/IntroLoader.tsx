import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/profile";
import { Petal, Sunflower } from "./Florals";

/**
 * Personalized intro loader. Shows every visit briefly; skips long
 * waits if the app is ready (target: ~1.4s total), and yields to
 * reduced-motion users with an instant fade.
 */
export function IntroLoader() {
  const reduced = useRef(
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ).current;
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = reduced ? 200 : 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 350);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
      <motion.div
        aria-hidden="true"
        exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeOut" } }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 300,
          display: "grid",
          placeItems: "center",
          background: "var(--bg)",
        }}
      >
        {/* floating petals */}
        {reduced
          ? null
          : [8, 22, 76, 90, 48].map((left, i) => (
              <Petal
                key={i}
                size={12 + (i % 3) * 4}
                style={{
                  position: "absolute",
                  left: `${left}%`,
                  top: `${12 + i * 16}%`,
                  opacity: 0.5,
                  animation: `petal-float ${6 + i}s ease-in-out ${i * 0.7}s infinite alternate`,
                }}
              />
            ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.9rem",
            padding: "1rem",
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 180 }}
          >
            <Sunflower size={46} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 6vw, 3.4rem)",
              background: "linear-gradient(120deg, var(--crimson), var(--neon-pink))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            style={{ color: "var(--text-muted)", fontSize: "1.02rem" }}
          >
            {profile.loaderTagline}
          </motion.p>

          {/* loading bar */}
          <div
            style={{
              width: "min(230px, 60vw)",
              height: 3,
              borderRadius: 3,
              marginTop: "0.6rem",
              background: "var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                borderRadius: 3,
                background: "linear-gradient(90deg, var(--neon-pink), var(--crimson))",
                transition: "width .1s linear",
              }}
            />
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              color: "var(--text-muted)",
            }}
          >
            {progress}%
          </span>
        </motion.div>

        <style>{`
          @keyframes petal-float {
            from { transform: translateY(0) rotate(0deg); }
            to { transform: translateY(26px) rotate(24deg); }
          }
        `}</style>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
