# 🌻 Khushi's Creative Portfolio

A premium, animated personal portfolio website — floral, feminine, and professional. Built with **React + TypeScript + Vite**, **React Router**, and **Framer Motion**.

## ✨ Current status

- ✅ **Homepage** complete: intro loader, hero, featured projects, skills, achievements, personal qualities, floral decorations, footer
- 🚧 About, Experience, Projects, Blog, Art, and Contact pages are placeholders, ready to be built on the same design system

## 🚀 Run it

```bash
npm install
npm run dev      # development server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## ✏️ Customize everything in one file

Open [`src/data/profile.ts`](src/data/profile.ts) and replace the `✎` placeholders:

| What | Where |
|---|---|
| Name, tagline, intro paragraph | `profile` |
| **Your portrait photo** | drop an image into `src/assets/`, then set `profile.portrait` to e.g. `"./src/assets/me.jpg"` (or import it in `Hero.tsx`) |
| Real social links (GitHub, LinkedIn, email, Instagram) | `profile.socials` |
| Real projects | `featuredProjects` (set `placeholder: true` items aside, add `link` / `repo` / `demo`) |
| Skills | `skillGroups` |
| Verified achievements & certifications | `achievements` |
| Working qualities | `qualities` |

> **Note:** the placeholder social links and achievements are pre-filled with `✎`-marked examples — always replace them with your real URLs and verified facts.

## 🎨 Design system

Defined in [`src/index.css`](src/index.css):

- Teal green `#0e422e` · Crimson `#861e2d` · Neon pink `#ff4d8d` · Sunflower `#FFD966` · Lavender `#DCC6FF`
- Light theme: soft blush `#FFF7FA` / cream · Dark theme: deep plum-black `#151018` with pink glow
- Display font **Fraunces**, body **Outfit**, handwritten accents **Caveat**
- Light/dark toggle (top-right, persisted in `localStorage`, respects system preference)

## ♿ Accessibility

Skip link, semantic HTML, keyboard-navigable drawer (Esc to close), visible focus rings, `aria-live` typewriter titles, `prefers-reduced-motion` respected everywhere, decorative petals never intercept clicks.

## 🗺 Next pages

Add real pages in `src/pages/`, register them in `src/App.tsx` (replace the `Placeholder` routes), and reuse the shared `Navbar`, `Footer`, `Reveal`, and theme system.
