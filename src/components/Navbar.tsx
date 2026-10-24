import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";
import { navLinks, profile } from "../data/profile";
import { Sunflower } from "./Florals";

function ThemeToggle({ onToggle }: { onToggle?: () => void }) {
  const { theme, toggle: toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={() => {
        toggleTheme();
        onToggle?.();
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="theme-toggle"
      style={{
        width: "2.4rem",
        height: "2.4rem",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        fontSize: "1.05rem",
        transition: "transform .25s var(--ease), border-color .25s",
      }}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`navbar${scrolled ? " is-scrolled" : ""}`}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: scrolled
          ? "color-mix(in srgb, var(--bg) 88%, transparent)"
          : "color-mix(in srgb, var(--bg) 55%, transparent)",
        borderBottom: "1px solid var(--border)",
        boxShadow: scrolled ? "0 4px 24px rgba(134,30,45,0.08)" : "none",
        transition: "background .35s, box-shadow .35s",
      }}
    >
      <nav
        aria-label="Primary"
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          height: "4.25rem",
        }}
      >
        {/* Wordmark */}
        <Link
          to="/"
          aria-label={`${profile.name} — home`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.55rem",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.2rem",
          }}
        >
          <Sunflower size={22} />
          {profile.wordmark}
          <span
            aria-hidden="true"
            className="sparkle"
            style={{ color: "var(--neon-pink)", fontSize: "0.85rem" }}
          >
            ✦
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          className="nav-links"
          style={{
            display: "flex",
            gap: "1.4rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className="nav-link"
                style={{ position: "relative", fontSize: "0.93rem", fontWeight: 500 }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      style={{
                        color: isActive ? "var(--crimson)" : "var(--text-muted)",
                        transition: "color .25s",
                      }}
                    >
                      {l.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="nav-underline"
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -5,
                        height: 2,
                        borderRadius: 2,
                        background:
                          "linear-gradient(90deg, var(--neon-pink), var(--crimson))",
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        transformOrigin: "left",
                        transition: "transform .3s var(--ease)",
                        boxShadow: isActive
                          ? "0 0 8px rgba(255,77,141,.55)"
                          : "none",
                      }}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div className="desktop-only">
            <ThemeToggle />
          </div>
          <button
            ref={menuButton}
            type="button"
            className="hamburger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="h-line" style={open ? { transform: "translateY(7px) rotate(45deg)" } : undefined} />
            <span className="h-line" style={open ? { opacity: 0 } : undefined} />
            <span className="h-line" style={open ? { transform: "translateY(-7px) rotate(-45deg)" } : undefined} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(21,16,24,.45)",
                zIndex: 98,
                backdropFilter: "blur(2px)",
              }}
            />
            <motion.div
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(20rem, 84vw)",
                background: "var(--surface)",
                borderLeft: "1px solid var(--border)",
                boxShadow: "-12px 0 40px rgba(0,0,0,.25)",
                zIndex: 99,
                padding: "5.5rem 1.6rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
                overflowY: "auto",
              }}
            >
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.3 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === "/"}
                    className="drawer-link"
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: "0.65rem",
                      padding: "0.75rem 0.9rem",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 600,
                      fontSize: "1.05rem",
                      background: isActive
                        ? "color-mix(in srgb, var(--neon-pink) 12%, transparent)"
                        : "transparent",
                      color: isActive ? "var(--crimson)" : "var(--text)",
                    })}
                  >
                    <Sunflower size={16} />
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "1.4rem",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  Theme
                </span>
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
