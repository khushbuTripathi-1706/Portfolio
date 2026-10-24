import { Link } from "react-router-dom";
import { Sunflower } from "../components/Florals";

/**
 * Temporary holding page for About, Experience, Projects, Blog,
 * Art and Contact. Each will be built out with its own design.
 */
export default function Placeholder({ title }: { title: string }) {
  return (
    <main
      id="main"
      className="container"
      style={{
        minHeight: "70vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        paddingBlock: "5rem",
      }}
    >
      <div>
        <Sunflower size={44} />
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", margin: "1rem 0 0.5rem" }}>
          {title}
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: "44ch", marginInline: "auto" }}>
          This page is still{" "}
          <span className="hand-accent">blooming 🌱</span> — the shared design
          system is ready, content is coming next.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: "1.6rem" }}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
