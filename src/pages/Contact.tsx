import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sunflower } from "../components/Florals";
import { SakuraPetals } from "../components/SakuraPetals";
import { Reveal } from "../components/Reveal";
import {
  formEndpoint,
  availability,
  openTo,
  contactLocation,
  contactIntro,
  topics,
  profile,
} from "../data/profile";

/* ---------- shared bits ---------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-kicker" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <Sunflower size={15} />
      {children}
    </span>
  );
}

/* ============================================================
   1. HERO — with envelope illustration
   ============================================================ */
function MailArt() {
  return (
    <svg viewBox="0 0 260 220" width="min(100%, 300px)" aria-hidden="true" style={{ overflow: "visible" }}>
      {/* soft shapes */}
      <circle cx="130" cy="110" r="96" fill="var(--surface-2)" opacity="0.8" />
      <circle cx="130" cy="110" r="96" fill="none" stroke="var(--border-strong)" strokeDasharray="3 6" />

      {/* bouquet */}
      <motion.g
        animate={{ rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "196px 96px" }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse key={i} cx="196" cy="80" rx="3.6" ry="7.5" fill="var(--sunflower)" transform={`rotate(${i * 45} 196 88)`} />
        ))}
        <circle cx="196" cy="88" r="6.5" fill="#5b3a12" />
        <path d="M196 94 C 192 104, 192 112, 194 118" stroke="var(--teal)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </motion.g>

      {/* envelope */}
      <motion.g
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="52" y="92" width="120" height="80" rx="10" fill="var(--neon-pink-soft)" stroke="var(--crimson)" strokeWidth="2" />
        <path d="M56 100 L112 140 L168 100" fill="none" stroke="var(--crimson)" strokeWidth="2" strokeLinecap="round" />
        {/* letter peeking */}
        <rect x="86" y="70" width="52" height="34" rx="5" fill="#fff" stroke="var(--border-strong)" />
        <line x1="94" y1="80" x2="130" y2="80" stroke="var(--border-strong)" strokeWidth="2" />
        <line x1="94" y1="88" x2="122" y2="88" stroke="var(--border-strong)" strokeWidth="2" />
        <circle cx="138" cy="100" r="7" fill="var(--sunflower)" stroke="#c98f0e" />
      </motion.g>

      {/* sparkles + petals */}
      <motion.text
        x="38" y="60" fontSize="16" fill="var(--neon-pink)"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✦
      </motion.text>
      <motion.text
        x="212" y="160" fontSize="14" fill="var(--sunflower)"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.6, repeat: Infinity }}
      >
        ✧
      </motion.text>
      <motion.path
        d="M40 150 c4.5 3.2 8 7.6 8 12.2 C48 190 44 194 40 194c-4 0-8-4-8-19.6C32 170 35.5 153.2 40 150Z"
        fill="var(--lavender)"
        animate={{ y: [0, 10, 0], rotate: [0, 18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function ContactHero() {
  return (
    <section
      className="container"
      style={{
        position: "relative",
        paddingBlock: "4rem 3rem",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: "3rem",
        alignItems: "center",
        overflow: "clip",
      }}
    >
      <SakuraPetals count={6} />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          right: "0%",
          top: "-40%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--sunflower), transparent 70%)",
          filter: "blur(64px)",
          opacity: "var(--orb-opacity)" as string,
          pointerEvents: "none",
        }}
      />

      <Reveal style={{ position: "relative", zIndex: 1 }}>
        <Kicker>Let's connect</Kicker>
        <h1 style={{ fontSize: "clamp(2.3rem, 5.5vw, 3.7rem)", marginBlock: "0.6rem 1rem", maxWidth: "16ch" }}>
          Have an Idea?{" "}
          <span style={{ color: "var(--crimson)" }}>Let's Talk.</span>
        </h1>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
          <Sunflower size={24} style={{ marginTop: 6 }} />
          <p style={{ color: "var(--text-muted)", maxWidth: "52ch", fontSize: "1.04rem" }}>
            {contactIntro}
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
          My inbox is open ♡
        </p>
      </Reveal>

      <Reveal delay={0.15} style={{ justifySelf: "center", zIndex: 1 }}>
        <MailArt />
      </Reveal>
    </section>
  );
}

/* ============================================================
   2. CONTACT FORM
   ============================================================ */

type Fields = { name: string; email: string; topic: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Please tell me your name.";
  if (!f.email.trim()) e.email = "Please add your email so I can reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email doesn't look quite right.";
  if (!f.message.trim()) e.message = "Don't be shy — write me a little message.";
  else if (f.message.trim().length < 10) e.message = "A little more detail helps (at least 10 characters).";
  return e;
}

function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "grid", gap: "0.4rem" }}>
      <label htmlFor={htmlFor} style={{ fontWeight: 600, fontSize: "0.92rem" }}>
        {label}
        {required && (
          <span style={{ color: "var(--crimson)" }} aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {!required && <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.85rem" }}> (optional)</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--crimson)",
            marginTop: "0.15rem",
          }}
        >
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--border-strong)",
  background: "var(--surface)",
  color: "var(--text)",
  fontSize: "0.98rem",
  transition: "border-color .25s, box-shadow .25s",
};

function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: "", email: "", topic: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      // move keyboard focus to the first invalid field
      const first = (["name", "email", "message"] as const).find((k) => errs[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }
    setSendError(null);

    if (!formEndpoint) {
      // No backend configured → compose an email in the visitor's own client.
      // This is a honest fallback, not a fake "delivery".
      const subject = encodeURIComponent(
        `[Portfolio] ${fields.topic || "Hello"}${fields.subject ? ` — ${fields.subject}` : ""}`,
      );
      const body = encodeURIComponent(
        `Hi Khushbu,\n\n${fields.message}\n\n— ${fields.name}\nReply-to: ${fields.email}\nTopic: ${fields.topic || "General"}`,
      );
      window.location.href = `${profile.socials.email}?subject=${subject}&body=${body}`;
      return;
    }

    setSending(true);
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setSent(true);
    } catch {
      setSendError(
        "Something went wrong sending your message. Please try again in a moment — or email me directly at the address below.",
      );
    } finally {
      setSending(false);
    }
  }

  const devPreviewNote = !formEndpoint;

  return (
    <section
      id="contact-form"
      className="section container"
      style={{ maxWidth: "720px", position: "relative", zIndex: 1 }}
    >
      <Reveal className="section-head">
        <Kicker>Say hello</Kicker>
        <h2 className="section-title">
          Send me a <span className="hand-accent">little hello</span>
        </h2>
        <p className="section-sub">
          Tell me a little about what you're thinking, and I'll be happy to hear from you.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          className="card"
          style={{ padding: "clamp(1.4rem, 3.5vw, 2.4rem)", position: "relative", overflow: "hidden" }}
        >
          <form ref={formRef} onSubmit={submit} noValidate style={{ display: "grid", gap: "1.2rem" }}>
            {/* success / dev preview banners */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  style={{
                    display: "flex",
                    gap: "0.7rem",
                    alignItems: "flex-start",
                    padding: "1rem 1.2rem",
                    borderRadius: "var(--radius-md)",
                    background: "color-mix(in srgb, var(--teal) 12%, var(--surface))",
                    border: "1px solid color-mix(in srgb, var(--teal) 40%, transparent)",
                    color: "var(--text)",
                  }}
                >
                  <Sunflower size={26} style={{ flexShrink: 0, animation: "spin-slow 6s linear infinite" }} />
                  <div>
                    <strong>Your message is on its way!</strong>
                    <p style={{ fontSize: "0.92rem", color: "var(--text-muted)" }}>
                      Thank you for reaching out. I'll be happy to connect with you.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {devPreviewNote && (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  background: "color-mix(in srgb, var(--sunflower) 16%, var(--surface))",
                  border: "1px dashed var(--border-strong)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.7rem 1rem",
                }}
              >
                <strong style={{ color: "var(--crimson)" }}>Note:</strong> this form opens your own email
                app with everything pre-filled (no data is stored or sent in the background). Connect a
                form service in <code>src/data/profile.ts</code> → <code>formEndpoint</code> to enable
                direct delivery.
              </p>
            )}

            {sendError && (
              <p
                role="alert"
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "flex-start",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  color: "var(--crimson)",
                  background: "color-mix(in srgb, var(--crimson) 8%, var(--surface))",
                  border: "1px solid color-mix(in srgb, var(--crimson) 30%, transparent)",
                  borderRadius: "var(--radius-sm)",
                  padding: "0.8rem 1rem",
                }}
              >
                <span aria-hidden="true">⚠</span> {sendError}
              </p>
            )}

            <div
              style={{
                display: "grid",
                gap: "1.2rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
              }}
            >
              <FormField label="Full Name" htmlFor="name" required error={errors.name}>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={fields.name}
                  onChange={set("name")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="form-input"
                  style={inputStyle}
                />
              </FormField>

              <FormField label="Email Address" htmlFor="email" required error={errors.email}>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={fields.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="form-input"
                  style={inputStyle}
                />
              </FormField>
            </div>

            <div
              style={{
                display: "grid",
                gap: "1.2rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
              }}
            >
              <FormField label="What would you like to discuss?" htmlFor="topic">
                <select id="topic" value={fields.topic} onChange={set("topic")} className="form-input" style={inputStyle}>
                  <option value="">Choose a topic…</option>
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Subject" htmlFor="subject">
                <input
                  id="subject"
                  type="text"
                  placeholder="What's on your mind?"
                  value={fields.subject}
                  onChange={set("subject")}
                  className="form-input"
                  style={inputStyle}
                />
              </FormField>
            </div>

            <FormField label="Your Message" htmlFor="message" required error={errors.message}>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell me a little about your idea..."
                value={fields.message}
                onChange={set("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="form-input"
                style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }}
              />
            </FormField>

            <button
              type="submit"
              className="btn btn-primary form-submit"
              disabled={sending}
              style={{ justifySelf: "start", opacity: sending ? 0.75 : 1 }}
            >
              {sending ? "Sending…" : <>Send My Message <span aria-hidden="true">✿</span></>}
            </button>

            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Fields marked <span style={{ color: "var(--crimson)" }}>*</span> are required. Your details
              are only used to reply to your message.
            </p>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   3. ALTERNATIVE CONTACT METHODS
   ============================================================ */
const CONTACT_CARDS = [
  { label: "Email", value: profile.socials.email, desc: "For anything and everything — replies land in my inbox." },
  { label: "LinkedIn", value: profile.socials.linkedin, desc: "Professional conversations." },
  { label: "GitHub", value: profile.socials.github, desc: "Explore my code and projects." },
  { label: "Instagram", value: profile.socials.instagram, desc: "Art in progress & everyday inspiration." },
];

function AlternativeContactMethods() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    const email = profile.socials.email.replace("mailto:", "");
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section className="section container" style={{ maxWidth: "960px" }}>
      <Reveal className="section-head">
        <Kicker>More ways to reach me</Kicker>
        <h2 className="section-title">
          Prefer a <span className="hand-accent">different way?</span>
        </h2>
        <p className="section-sub">Choose whichever way feels easiest for you.</p>
      </Reveal>

      <div
        style={{
          display: "grid",
          gap: "1.2rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
        }}
      >
        {CONTACT_CARDS.map((c, i) => (
          <Reveal key={c.label} delay={(i % 2) * 0.08}>
            <div
              className="card contact-card"
              style={{
                padding: "1.3rem 1.4rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                background: i % 2 === 0 ? "var(--surface)" : "color-mix(in srgb, var(--lavender) 12%, var(--surface))",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: "2.7rem",
                  height: "2.7rem",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: "linear-gradient(135deg, var(--crimson), var(--neon-pink))",
                  color: "#fff",
                  fontSize: "1rem",
                }}
              >
                {c.label === "Email" ? "✉" : c.label === "LinkedIn" ? "in" : c.label === "GitHub" ? "⌥" : "📷"}
              </span>
              <div style={{ display: "grid", gap: "0.2rem", minWidth: 0, flex: 1 }}>
                <h3 style={{ fontSize: "1.05rem" }}>{c.label}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{c.desc}</p>
                <a
                  href={c.value}
                  target={c.value.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "var(--crimson)",
                    overflowWrap: "anywhere",
                  }}
                >
                  {c.label === "Email"
                    ? "Open my inbox ↗"
                    : `Visit my ${c.label} ↗`}
                </a>
                {c.label === "Email" && (
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy my email address to clipboard"
                    style={{
                      justifySelf: "start",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: copied ? "var(--teal)" : "var(--text-muted)",
                      border: "1px solid var(--border)",
                      borderRadius: "999px",
                      padding: "0.2rem 0.7rem",
                      marginTop: "0.3rem",
                    }}
                  >
                    {copied ? "Copied ✓" : "Copy email"}
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. OPEN TO + OPTIONAL LOCATION
   ============================================================ */
function OpenTo() {
  return (
    <section className="section container" style={{ maxWidth: "820px" }}>
      <Reveal>
        <div
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(1.5rem, 4vw, 2.4rem)",
            display: "grid",
            gap: "1.2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div aria-hidden="true" style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <Sunflower size={26} />
            <h2 style={{ fontSize: "1.4rem", fontFamily: "var(--font-display)", color: "var(--crimson)" }}>
              Things I'm Open To
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", maxWidth: "60ch", fontSize: "0.98rem" }}>{availability}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {openTo.map((o) => (
              <span
                key={o}
                style={{
                  fontSize: "0.84rem",
                  fontWeight: 600,
                  padding: "0.42rem 0.95rem",
                  borderRadius: "999px",
                  background: "var(--surface)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text)",
                }}
              >
                {o} <span aria-hidden="true" style={{ color: "var(--neon-pink)" }}>✦</span>
              </span>
            ))}
          </div>
          {contactLocation && (
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", display: "flex", gap: "0.4rem", alignItems: "center" }}>
              <span aria-hidden="true">◌</span>
              <strong style={{ color: "var(--text)" }}>{contactLocation.label}:</strong> {contactLocation.value}
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================
   5. CLOSING NOTE
   ============================================================ */
function ContactClosingNote() {
  return (
    <section className="container" style={{ paddingBottom: "4.5rem" }}>
      <Reveal>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background:
              "linear-gradient(130deg, color-mix(in srgb, var(--neon-pink-soft) 14%, var(--surface)) 0%, color-mix(in srgb, var(--sunflower) 16%, var(--surface)) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(2rem, 5vw, 4rem)",
            textAlign: "center",
            boxShadow: "var(--shadow)",
          }}
        >
          <SakuraPetals count={4} />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "-2rem",
              top: "-2.5rem",
              opacity: 0.22,
              transform: "rotate(16deg)",
              pointerEvents: "none",
            }}
          >
            <Sunflower size={120} />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <Sunflower size={34} />
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.9rem, 4.5vw, 2.7rem)", color: "var(--crimson)", marginTop: "0.6rem" }}>
              Every Great Idea Starts Somewhere.
            </h2>
            <p style={{ maxWidth: "60ch", marginInline: "auto", marginTop: "1rem", color: "var(--text-muted)" }}>
              Sometimes it starts with a question, sometimes with a sketch, and
              sometimes with a simple hello. Whatever brings you here, thank you
              for stopping by. I hope we get the chance to create something
              wonderful together.
            </p>
            <p
              style={{
                fontFamily: "var(--font-hand)",
                fontSize: "1.5rem",
                color: "var(--neon-pink)",
                marginTop: "1.1rem",
              }}
            >
              With a little creativity and sunshine ♡
            </p>
            <Link to="/" className="btn btn-ghost" style={{ marginTop: "1.6rem" }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================================================ */

export default function Contact() {
  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <ContactHero />
      <ContactForm />
      <AlternativeContactMethods />
      <OpenTo />
      <ContactClosingNote />
    </motion.main>
  );
}
