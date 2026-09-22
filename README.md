# Portfolio

Bilingual (EN/VI) personal portfolio. Next.js 14 (App Router) · TypeScript ·
Tailwind CSS · shadcn/ui.

```bash
pnpm install
pnpm dev      # http://localhost:3000 -> redirects to /en
```

**Use pnpm only.** Never run `npm install` in this repo — it recreates
`package-lock.json` alongside `pnpm-lock.yaml`, and having two lockfiles is
what broke this project's Vercel deploy once already: Vercel installs with
pnpm, and the pnpm lockfile had silently gone stale against the npm one.
Only `pnpm-lock.yaml` should exist in the tree.

## Editing content

Every string shown on the site lives in
[`src/data/content/`](src/data/content/). Components only render — no copy
is hardcoded in JSX, so editing content never means touching a component.

Each file maps to exactly one section of the page:

| File | Section |
|---|---|
| [`profile.ts`](src/data/content/profile.ts) | name, email, LinkedIn, resume, site domain — **edit this first** |
| [`hero.ts`](src/data/content/hero.ts) | 1. Hero |
| [`about.ts`](src/data/content/about.ts) | 2. About |
| [`tech-stack.ts`](src/data/content/tech-stack.ts) | 3. Stack |
| [`projects.ts`](src/data/content/projects.ts) | 4. Selected Work — the longest file |
| [`experience.ts`](src/data/content/experience.ts) | 5. Experience |
| [`contact.ts`](src/data/content/contact.ts) | 6. Contact |
| [`site.ts`](src/data/content/site.ts) | metadata, navigation, footer, screen-reader labels |

`index.ts` just re-exports everything — components still import from
`@/data/content` as before.

> Imports **between files inside this directory** must keep an explicit
> `.ts` extension. `scripts/generate-og.ts` loads this directory directly
> through Node's type-stripping, and plain Node ESM resolution can't guess
> extensions the way the Next/webpack compiler can. Drop the `.ts` and the
> OG-image generation script dies silently — it swallows its own errors so
> the build won't fail, it just stops producing current OG images.

`PROFILE` is filled in from `Thai-Nguyen-Resume.docx`. Two things are still
open:

```bash
pnpm run check:todo   # lists every remaining placeholder
```

As of this writing that surfaces two items:

- **`PROFILE.siteUrl`** (`src/data/content/profile.ts`) is still the
  placeholder `https://your-domain.vercel.app`. Every canonical URL,
  `hreflang` pair, sitemap entry and OG image URL derives from it and is
  wrong until a real domain is set post-deploy.
- The `hedera-esg` project entry in `src/data/content/projects.ts` carries a
  `TODO(owner)` flagging that its problem/approach copy is inferred prose,
  not verified against the source resume the way the other projects' copy
  is.

Each string is an `{ en, vi }` pair (typed as `L = Record<Locale, string>`
in `src/lib/i18n.ts`). A missing translation is a TypeScript compile error,
not a runtime gap.

To update the resume: replace `public/Thai-Nguyen-Resume.docx`, re-export it
to PDF, and overwrite `public/resume.pdf` (the current one was produced by
converting via Word).

## Structure

```
src/
  app/[locale]/           layout.tsx (root layout, fonts, SEO/OG), page.tsx (home screens)
  app/[locale]/work/[slug] static project detail route
  app/globals.css          design tokens for both themes, all site animation
  components/
    layout/                header (HUD), footer, theme toggle, locale toggle
    sections/               hero, about, tech-stack + filter, projects (list + detail), experience, contact
    ui/                     screen, reveal, slider, separated, shadcn button
    ui/pixel/               PixelButton, PixelPanel, PixelTag — see DESIGN.md
    visuals/                per-project SVG diagrams, DiagramMotion, project-visual
  data/content/             content, split per section (see above)
  lib/                      i18n, useInView, cn
scripts/
  generate-og.ts            generates static Open Graph images
```

See [`DESIGN.md`](DESIGN.md) for the visual system: tokens, the pixel
primitives, layout rules, motion, and the accessibility contract.

## Bilingual routing

Each language has its own URL: `/en` and `/vi`. `/` redirects to `/en`.

This (rather than a React-state toggle) lets each language carry its own
metadata, Open Graph tags and `hreflang` pair — Google indexes both
versions, and a link shared externally keeps the language it was shared in.

To add a language: add the code to `locales` in
[`src/lib/i18n.ts`](src/lib/i18n.ts); TypeScript will point out every place
in `content/` that still needs a translation.

## Project visuals

Each project has an optional `visuals` field in `content/projects.ts` — a
**list**, so a project can carry both an architecture diagram and product
screenshots:

```ts
visuals: [
  { kind: "diagram", id: "ai-pipeline" },
  {
    kind: "image",
    src: "/work/aivn-dashboard.png",   // file lives under public/work/
    alt: { en: "Teacher dashboard", vi: "Bảng điều khiển giáo viên" },
    caption: { en: "Teacher dashboard", vi: "Bảng điều khiển giáo viên" },
    ratio: "1918 / 911",              // the image's real pixel dimensions
  },
]
// omitted -> the project block is text-only, layout stays correct
```

### Adding a screenshot

1. Drop the file into `public/work/`.
2. Add a `{ kind: "image", ... }` entry to that project's `visuals` in
   `content/projects.ts` — a commented-out example block is already there.

Layout: the diagram always renders full width first, images sit below. A
**single** image renders directly. **Two or more** become a horizontally
scrolling strip, one image at a time — a multi-column grid would squeeze
each image to half-width, too small to read interface detail.

The strip runs on CSS scroll-snap, not JS: touch swipe, two-finger trackpad
scroll and arrow keys all work without any script, and it still scrolls if
JS fails to load. JS only adds prev/next buttons and a slide counter for
mouse users.

Every image frame shares the aspect ratio of the **tallest** image in the
set, so the frame doesn't change height between slides. Set `ratio` to the
image's real pixel dimensions (e.g. `"1918 / 911"`) so it fits without
extra border.

Images always use `object-contain`, never `cover` — a screenshot with a
cropped corner is a broken screenshot. `alt` is required by the type.

All four projects use an **SVG diagram** drawn in
[`src/components/visuals/diagrams.tsx`](src/components/visuals/diagrams.tsx):
schematic system diagrams, not literal UI screenshots — a Node API handing
work to an AI service over RabbitMQ, an automated-first / human-review-on-
exception KYC flow, a Kafka event axis keeping inventory in sync with order
history, and so on. They re-color themselves per theme, need no image file,
and never expose a client's real interface or data.

**Diagram rule:** an SVG only contains technology names and service
names — things that stay identical in both languages — so one drawing
serves both EN and VI. Every explanatory sentence lives in `caption` in
`content/projects.ts`, where it can be translated. Never hardcode English
prose into the SVG: the Vietnamese page would silently show it in English.
Numbers (user counts, throughput) also aren't drawn into the diagram, since
they already live in a project's `result` field — keeping the same number
in two places is how they drift apart.

When a real, shareable screenshot exists, switch `kind` to `"image"` —
never edit the diagram JSX to fake one. To add a new diagram: add an id to
`DiagramId` in `content/projects.ts`; TypeScript will flag the `DIAGRAMS`
registry until a matching drawing exists.

## Motion

All motion is CSS-driven; there is no animation library dependency
(`framer-motion` was removed). Two components exist purely to flip a
`data-visible` attribute via `IntersectionObserver`, and `globals.css`
carries every actual animation:

- [`Reveal`](src/components/ui/reveal.tsx) — fade+slide or mask-reveal for
  content blocks and headings, triggered once when scrolled into view.
- [`DiagramMotion`](src/components/visuals/diagram-motion.tsx) — a separate
  trigger scoped to each architecture diagram, so the diagram's self-draw
  animation starts based on the diagram's own visibility rather than the
  much taller content block around it.

`prefers-reduced-motion: reduce` is handled once, in `globals.css`. If
JavaScript is disabled, a `<noscript>` block in the root layout forces every
`[data-reveal]` and diagram element to its finished state, since
`data-visible` would otherwise never be set.

See [`DESIGN.md`](DESIGN.md#motion) for the full timing chain and the
reduced-motion contract.

## Open Graph images

`pnpm run og` generates `public/og-en.png` and `public/og-vi.png` straight
from `content/` (wired into `prebuild`, so every build refreshes them).

Static generation instead of Next's `opengraph-image.tsx` for two reasons:
Next 14's bundled `@vercel/og` resolves its font path incorrectly on
Windows and crashes that route locally, and its default font is Latin-only,
so Vietnamese diacritics render as boxes. Pre-generating PNGs avoids both
and costs nothing at request time.

The script needs network access to fetch fonts. If a build has no network,
it keeps the existing PNGs and the build still proceeds.

## Deploying to Vercel

1. Push the repo to GitHub.
2. Vercel → **New Project** → select the repo. Framework is auto-detected
   as Next.js; no configuration needed.
3. Once a domain exists, set `PROFILE.siteUrl` in `content/profile.ts` and
   redeploy — `siteUrl` is the root every canonical URL, `hreflang` pair,
   sitemap entry and `og:image` tag is built from.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | dev server |
| `pnpm build` | production build (runs `og` first) |
| `pnpm run og` | regenerate Open Graph images |
| `pnpm run typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm run check:todo` | list remaining content placeholders |

This repository has no test runner — no Jest/Vitest/Playwright dependency
and no `*.test.*` files. Verification is `tsc --noEmit` + `next lint` +
`next build` + `check:todo`.
