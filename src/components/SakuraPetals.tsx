import { useMemo, useRef } from "react";

type Petal = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
};

/**
 * Slow-floating sakura petals rendered as a background layer.
 * Purely decorative — pointer-events are disabled and it sits
 * behind all content. Pauses entirely for reduced-motion users.
 */
export function SakuraPetals({ count = 0 }: { count?: number }) {
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ).current;

  const petals = useMemo<Petal[]>(() => {
    const n = count || (window.innerWidth < 768 ? 7 : 14);
    return Array.from({ length: n }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * -26,
      duration: 20 + Math.random() * 18,
      size: 8 + Math.random() * 10,
      drift: (Math.random() - 0.5) * 120,
      opacity: 0.5 + Math.random() * 0.5,
    }));
  }, [count]);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {petals.map((p, i) => (
        <svg
          key={i}
          width={p.size}
          height={p.size}
          viewBox="0 0 24 24"
          fill="var(--neon-pink-soft)"
          style={{
            position: "absolute",
            top: "-24px",
            left: `${p.left}%`,
            opacity: p.opacity * 0.55,
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            "--drift": `${p.drift}px`,
          } as React.CSSProperties}
        >
          <path d="M12 2c4.5 3.2 8 7.6 8 12.2C20 19 16.4 22 12 22S4 19 4 14.2C4 9.6 7.5 5.2 12 2Z" />
        </svg>
      ))}
      <style>{`
        @keyframes petal-fall {
          0% { transform: translate(0, -10px) rotate(0deg); }
          100% { transform: translate(var(--drift, 40px), 105vh) rotate(320deg); }
        }
      `}</style>
    </div>
  );
}
