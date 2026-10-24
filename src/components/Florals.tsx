/** Small custom SVG sunflower used as the site's personal symbol. */
export function Sunflower({
  size = 20,
  style,
}: {
  size?: number;
  style?: React.CSSProperties;
}) {
  const petals = Array.from({ length: 12 });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, ...style }}
    >
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="20"
          cy="8.5"
          rx="3.1"
          ry="6.5"
          fill="#FFD966"
          stroke="#e0a800"
          strokeWidth="0.6"
          transform={`rotate(${i * 30} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="7.5" fill="#5b3a12" />
      <circle cx="20" cy="20" r="7.5" fill="url(#seed)" opacity="0.35" />
      <defs>
        <radialGradient id="seed" cx="0.4" cy="0.4" r="0.8">
          <stop offset="0" stopColor="#8a5a1e" />
          <stop offset="1" stopColor="#2c1a06" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/** Small sakura petal shape, reused by the loader, navbar and hero. */
export function Petal({
  size = 14,
  color = "var(--neon-pink-soft)",
  style,
  className,
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M12 2c4.5 3.2 8 7.6 8 12.2C20 19 16.4 22 12 22S4 19 4 14.2C4 9.6 7.5 5.2 12 2Z" />
      <path d="M12 4.5v15" stroke="#00000022" strokeWidth="1" />
    </svg>
  );
}
