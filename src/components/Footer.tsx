import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks, profile } from "../data/profile";
import { Sunflower } from "./Florals";
import { Reveal } from "./Reveal";

const ICON_PATHS: Record<string, string> = {
  GitHub:
    "M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.35-3.88-1.35-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.74 1.27 3.4.97.1-.76.4-1.28.74-1.57-2.56-.3-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z",
  LinkedIn:
    "M4.98 3.5A2.49 2.49 0 1 1 0 3.5a2.49 2.49 0 0 1 4.98 0ZM.2 8.3h4.6V23.5H.2V8.3Zm7.6 0h4.42v2.07h.06c.62-1.16 2.12-2.38 4.36-2.38 4.67 0 5.53 3.07 5.53 7.06v8.45h-4.6v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.96v7.63H7.8V8.3Z",
  Instagram:
    "M7.8 2h8.4C20 2 22 4 22 7.8v8.4C22 20 20 22 16.2 22H7.8C4 22 2 20 2 16.2V7.8C2 4 4 2 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4C4 18.9 5.1 20 7.8 20h8.4c2.7 0 3.8-1.1 3.8-3.8V7.8C20 5.1 18.9 4 16.2 4H7.8ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.3-2.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
};

function SoloIcon({
  name,
  href,
  label,
}: {
  name: string;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="footer-social"
      style={{
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        border: "1px solid var(--border)",
        color: "var(--text-muted)",
        transition: "all .25s var(--ease)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--neon-pink)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "var(--neon-pink-soft)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d={name === "Email" ? "M2 4h20a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 8.6 8-5.2V6L12 11.2 4 6v1.4l8 5.2Z" : ICON_PATHS[name]} />
      </svg>
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  // "Back to top" appears only after scrolling down a bit
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Reveal as="footer" className="site-footer">
      <div
        className="container"
        style={{
          paddingBlock: "3.5rem 2rem",
          borderTop: "1px solid var(--border)",
          display: "grid",
          gap: "2.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {/* Brand */}
        <div style={{ maxWidth: "280px" }}>
          <Link
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.55rem",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.25rem",
            }}
          >
            <Sunflower size={24} />
            {profile.wordmark}
          </Link>
          <p
            style={{
              marginTop: "0.8rem",
              color: "var(--text-muted)",
              fontSize: "0.92rem",
            }}
          >
            {profile.footerTagline}
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              marginBottom: "0.9rem",
            }}
          >
            Explore
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(110px, max-content))",
              gap: "0.45rem 1.4rem",
            }}
          >
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="footer-link"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.93rem",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--neon-pink)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--crimson)",
              marginBottom: "0.9rem",
            }}
          >
            Say hello
          </h3>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <SoloIcon name="GitHub" href={profile.socials.github} label="GitHub profile" />
            <SoloIcon name="LinkedIn" href={profile.socials.linkedin} label="LinkedIn profile" />
            <SoloIcon name="Email" href={profile.socials.email} label="Send an email" />
            <SoloIcon name="Instagram" href={profile.socials.instagram} label="Instagram profile" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container"
        style={{
          paddingBlock: "1.2rem",
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.8rem",
          fontSize: "0.85rem",
          color: "var(--text-muted)",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem" }}>
          <Sunflower size={16} />
          © {year} {profile.name} — grown with care
        </span>
        {showTop && (
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
              });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
              fontWeight: 600,
              color: "var(--crimson)",
            }}
            className="footer-link"
          >
            Back to Top ↑
          </a>
        )}
      </div>
    </Reveal>
  );
}
