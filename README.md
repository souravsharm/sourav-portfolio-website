# Sourav Sharma — Portfolio

Personal portfolio for Sourav Sharma, a full-stack software engineer in Melbourne.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP + Lenis, and three.js via React Three Fiber.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Content

All copy lives in `content/` — no text is hard-coded in components.

| File            | What it holds                                                        |
| --------------- | -------------------------------------------------------------------- |
| `site.ts`       | Name, links, hero copy, the recruiter snapshot, stats, SEO metadata   |
| `projects.ts`   | The six case studies, each with its own colour theme and title font   |
| `skills.ts`     | Skills tagged by role and depth, plus the `alsoUsed` long tail        |
| `experience.ts` | The three engineering roles                                           |
| `education.ts`  | Degree, certifications, publication                                   |

### Editing projects

Each project carries a `theme` (accent, panel backgrounds, body-text tones, title
font) so every card in the slider looks distinct. **Keep the copy short** — a
card has to fit on one screen: roughly a two-line `summary`, a two-line
`problem`, three single-line `build` bullets, and a two-line `outcome`. Overrun
that and the card grows past the viewport and the link at the bottom is never
seen.

Project artwork is drawn in code, not screenshotted — see
`components/visuals/ProjectVisual.tsx`. Add a new diagram there and reference it
by the `visual` key.

### Editing skills

`skills` is the short list shown as a grid: six groups of five. `alsoUsed` is
the quieter row of chips underneath. `level` is 3 (Core) / 2 (Strong) /
1 (Familiar), and `evidence` is only rendered for level 3 — those are the claims
that need backing. `roles` drives the "pick the role you are hiring for" filter
and the 3D skill cloud.

## Notable pieces

- `components/three/` — the two WebGL scenes. Both are lazy-loaded and gated by
  `Scene3D`, which falls back to a static design when the user prefers reduced
  motion, the device has no WebGL, or the viewport is small.
- `components/providers/SmoothScroll.tsx` — Lenis driven off GSAP's ticker, so
  pinned ScrollTrigger ranges stay in sync with the smoothed scroll position.
- `components/motion/TextReveal.tsx` — masked word-by-word heading reveals.

## Assets

- `public/Sourav-Sharma-Resume.pdf` — linked from the header, hero, and contact
  section. It opens in a new tab rather than downloading. Replace this file to
  update the résumé.
