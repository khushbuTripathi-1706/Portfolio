import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Sunflower } from "../components/Florals";
import { Reveal } from "../components/Reveal";
import { articles, type Article, type ContentBlock } from "../data/blog";

/* ---------- reading progress ---------- */
function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const body = ref.current?.parentElement;
      if (!body) return;
      const start = body.offsetTop;
      const total = body.scrollHeight - window.innerHeight;
      const p = total <= 0 ? 0 : Math.min(Math.max((window.scrollY - start) / total, 0), 1);
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 200,
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, var(--neon-pink), var(--crimson))",
          borderRadius: "0 3px 3px 0",
          boxShadow: "0 0 6px rgba(255,77,141,.5)",
        }}
      />
    </div>
  );
}

/* ---------- code block with copy ---------- */
function CodeBlock({ block }: { block: Extract<ContentBlock, { type: "code" }> }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(block.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <figure style={{ marginBlock: "1.4rem" }}>
      <div
        style={{
          position: "relative",
          background: "var(--surface-2)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.4rem 1rem",
            borderBottom: "1px solid var(--border)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <span style={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>{block.lang}</span>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy code to clipboard"
            style={{ color: copied ? "var(--teal)" : "var(--crimson)", fontWeight: 600, fontSize: "0.78rem" }}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <pre
          style={{
            margin: 0,
            padding: "1rem 1.2rem",
            overflowX: "auto",
            fontSize: "0.85rem",
            lineHeight: 1.7,
            fontFamily: "Consolas, 'Courier New', monospace",
          }}
        >
          <code>{block.code}</code>
        </pre>
      </div>
      {block.caption && (
        <figcaption
          style={{
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            marginTop: "0.45rem",
            textAlign: "center",
          }}
        >
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- block renderer ---------- */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return <p style={{ color: "var(--text-muted)", lineHeight: 1.85, marginBlock: "1rem" }}>{block.text}</p>;
    case "h2": {
      const id = slugify(block.text);
      return (
        <h2
          id={id}
          className="article-heading"
          style={{ scrollMarginTop: "5.5rem", margin: "2.2rem 0 0.8rem", fontSize: "1.5rem" }}
        >
          {block.text}
        </h2>
      );
    }
    case "h3": {
      const id = slugify(block.text);
      return (
        <h3
          id={id}
          className="article-heading"
          style={{ scrollMarginTop: "5.5rem", margin: "1.6rem 0 0.5rem", fontSize: "1.2rem" }}
        >
          {block.text}
        </h3>
      );
    }
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag
          style={{
            margin: "1rem 0 1rem 1.4rem",
            color: "var(--text-muted)",
            lineHeight: 1.8,
            display: "grid",
            gap: "0.4rem",
          }}
        >
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </Tag>
      );
    }
    case "quote":
      return (
        <blockquote
          style={{
            margin: "1.5rem 0",
            padding: "0.9rem 1.3rem",
            borderLeft: "3px solid var(--neon-pink)",
            background: "color-mix(in srgb, var(--neon-pink-soft) 8%, transparent)",
            borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
            fontStyle: "italic",
            color: "var(--text)",
          }}
        >
          “{block.text}”
          {block.source && (
            <footer style={{ marginTop: "0.4rem", fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "normal" }}>
              — {block.source}
            </footer>
          )}
        </blockquote>
      );
    case "code":
      return <CodeBlock block={block} />;
    case "image":
      return (
        <figure style={{ margin: "1.6rem 0" }}>
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            style={{ borderRadius: "var(--radius-md)", width: "100%" }}
          />
          {block.caption && (
            <figcaption style={{ fontSize: "0.84rem", color: "var(--text-muted)", marginTop: "0.5rem", textAlign: "center" }}>
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <aside
          style={{
            margin: "1.5rem 0",
            padding: "1rem 1.2rem",
            borderRadius: "var(--radius-md)",
            background: "color-mix(in srgb, var(--sunflower) 16%, var(--surface))",
            border: "1px solid color-mix(in srgb, var(--sunflower) 45%, transparent)",
            display: "flex",
            gap: "0.7rem",
            alignItems: "flex-start",
          }}
        >
          <Sunflower size={20} style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: "0.93rem", color: "var(--text)" }}>{block.text}</p>
        </aside>
      );
    case "divider":
      return (
        <hr aria-hidden="true" style={{ border: "none", borderTop: "1px dashed var(--border-strong)", margin: "2rem auto", width: "60%" }} />
      );
    default:
      return null;
  }
}

/* ---------- table of contents ---------- */
function TableOfContents({ blocks, compact = false }: { blocks: ContentBlock[]; compact?: boolean }) {
  const headings = blocks
    .filter((b) => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: slugify(b.text), text: b.text, level: b.type === "h2" ? 0 : 1 }));

  if (headings.length < 3) return null; // TOC not worth it for short articles

  const list = (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "0.4rem", fontSize: "0.9rem" }}>
      {headings.map((h) => (
        <li key={h.id} style={{ paddingLeft: h.level ? "0.9rem" : 0 }}>
          <a
            href={`#${h.id}`}
            style={{ color: "var(--text-muted)", transition: "color .2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon-pink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "")}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  if (compact) return list;

  return (
    <nav
      aria-label="Table of contents"
      className="card"
      style={{
        padding: "1.1rem 1.3rem",
        position: "sticky",
        top: "5.5rem",
        maxHeight: "70vh",
        overflowY: "auto",
      }}
    >
      <h2 style={{ fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--crimson)", marginBottom: "0.7rem" }}>
        On this page
      </h2>
      {list}
    </nav>
  );
}

/* ============================================================ */

export default function BlogPost() {
  const { slug } = useParams();
  const article: Article | undefined = articles.find(
    (a) => a.slug === slug && !a.draft,
  );
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.scrollIntoView({ block: "start" });
    document.title = article ? `${article.title} — Blog` : "Blog";
    return () => {
      document.title = "Khushbu Tripathi — Creative Portfolio";
    };
  }, [article]);

  const related = useMemo(() => {
    if (!article) return [];
    const sameCat = articles.filter(
      (a) => !a.draft && a.slug !== article.slug && a.category === article.category,
    );
    const byTag = articles.filter(
      (a) =>
        !a.draft &&
        a.slug !== article.slug &&
        a.category !== article.category &&
        a.tags.some((t) => article.tags.includes(t)),
    );
    return [...sameCat, ...byTag].slice(0, 3);
  }, [article]);

  // Local adjacent-article nav (already sorted list order = published order)
  const idx = article ? articles.indexOf(article) : -1;
  const prev = idx > 0 ? articles[idx - 1] : undefined;
  const next = article && idx >= 0 && idx < articles.length - 1 ? articles[idx + 1] : undefined;

  if (!article) {
    return (
      <main id="main" className="container" style={{ minHeight: "60vh", display: "grid", placeItems: "center", textAlign: "center" }}>
        <div>
          <Sunflower size={40} />
          <h1 style={{ margin: "1rem 0 0.4rem" }}>This story hasn't been written yet</h1>
          <p style={{ color: "var(--text-muted)" }}>
            The article you're looking for doesn't exist (or is still a draft 🌱).
          </p>
          <Link to="/blog" className="btn btn-primary" style={{ marginTop: "1.4rem" }}>
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <ReadingProgress />

      {/* header */}
      <header
        className="container"
        style={{ maxWidth: "760px", position: "relative", paddingBlock: "3.5rem 2rem", textAlign: "center" }}
      >
        <Reveal>
          <Link to="/blog" style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 600 }}>
            ← Back to Blog
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginTop: "1.2rem" }}>
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
              {article.category}
            </span>
            {article.date && (
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", alignSelf: "center" }}>
                {article.date}
                {article.readingTime ? ` · ${article.readingTime} min read` : ""}
              </span>
            )}
          </div>
          <h1
            ref={headingRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.9rem, 5vw, 3rem)",
              marginBlock: "0.9rem 0.6rem",
              maxWidth: "24ch",
              marginInline: "auto",
              lineHeight: 1.18,
            }}
          >
            {article.title}
          </h1>
          <p style={{ color: "var(--text-muted)", maxWidth: "56ch", marginInline: "auto", fontSize: "1.05rem" }}>
            {article.excerpt}
          </p>
          {article.updated && (
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.7rem" }}>
              Last updated {article.updated}
            </p>
          )}
          {article.cover && (
            <img
              src={article.cover}
              alt={article.coverAlt ?? article.title}
              style={{ marginTop: "2rem", borderRadius: "var(--radius-lg)", width: "100%", boxShadow: "var(--shadow)" }}
            />
          )}
        </Reveal>
      </header>

      {/* body + optional TOC */}
      <div className="container" style={{ maxWidth: "1100px", paddingBlock: "1rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 760px) auto",
            gap: "2.5rem",
            justifyContent: "center",
          }}
        >
          <article style={{ maxWidth: "700px", width: "100%", marginInline: "auto", minWidth: 0 }}>
            {article.content.map((b, i) => (
              <Reveal key={i} delay={Math.min((i % 6) * 0.05, 0.2)}>
                <Block block={b} />
              </Reveal>
            ))}

            {/* tags */}
            {article.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginTop: "2.2rem" }}>
                {article.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.76rem",
                      border: "1px solid var(--border-strong)",
                      borderRadius: "999px",
                      padding: "0.2rem 0.7rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* closing note */}
            {article.closingNote && (
              <Reveal>
                <div
                  style={{
                    marginTop: "2rem",
                    padding: "1.2rem 1.4rem",
                    borderRadius: "var(--radius-md)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    gap: "0.8rem",
                    alignItems: "flex-start",
                  }}
                >
                  <Sunflower size={22} style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontFamily: "var(--font-hand)", fontSize: "1.25rem", color: "var(--crimson)" }}>
                    {article.closingNote}
                  </p>
                </div>
              </Reveal>
            )}

            {/* prev / next */}
            {(prev || next) && (
              <nav
                aria-label="More articles"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "1rem",
                  marginTop: "2.4rem",
                  flexWrap: "wrap",
                }}
              >
                {prev && !prev.draft ? (
                  <Link
                    to={`/blog/${prev.slug}`}
                    style={{ color: "var(--crimson)", fontWeight: 600, fontSize: "0.95rem" }}
                  >
                    ← {prev.title}
                  </Link>
                ) : (
                  <span />
                )}
                {next && !next.draft && (
                  <Link
                    to={`/blog/${next.slug}`}
                    style={{ color: "var(--crimson)", fontWeight: 600, fontSize: "0.95rem", marginLeft: "auto" }}
                  >
                    {next.title} →
                  </Link>
                )}
              </nav>
            )}
          </article>

          {/* TOC side column — desktop only */}
          <aside
            className="toc-aside"
            style={{ display: "none", minWidth: "220px" }}
          >
            <TableOfContents blocks={article.content} />
          </aside>
        </div>

        {/* mobile-class TOC */}
        <div className="toc-collapse" style={{ maxWidth: "700px", marginInline: "auto" }}>
          <details
            className="card"
            style={{ padding: "0.9rem 1.2rem", marginBlock: "1.5rem" }}
          >
            <summary style={{ cursor: "pointer", fontWeight: 600, color: "var(--crimson)" }}>
              On this page
            </summary>
            <div style={{ marginTop: "0.8rem" }}>
              <TableOfContents blocks={article.content} compact />
            </div>
          </details>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section
          className="container"
          style={{ maxWidth: "960px", paddingBlock: "2rem 4rem" }}
        >
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.2rem", fontFamily: "var(--font-display)" }}>
            Keep <span className="hand-accent">reading</span>
          </h2>
          <div
            style={{
              display: "grid",
              gap: "1.1rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            }}
          >
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.07}>
                <Link
                  to={`/blog/${r.slug}`}
                  className="card related-card"
                  style={{ display: "block", padding: "1.2rem 1.35rem", height: "100%" }}
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
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", marginBlock: "0.3rem 0.2rem" }}>
                    {r.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{r.excerpt}</p>
                  <span style={{ color: "var(--crimson)", fontSize: "0.88rem", fontWeight: 600 }}>
                    Read ↗
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <Link to="/blog" className="btn btn-ghost" style={{ marginTop: "1.8rem" }}>
              ← Back to the journal
            </Link>
          </Reveal>
        </section>
      )}
    </motion.main>
  );
}
