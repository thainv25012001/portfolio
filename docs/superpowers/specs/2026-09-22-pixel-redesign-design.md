# Pixel / Game Redesign — Design Spec

**Date:** 2026-09-22
**Status:** Approved for planning
**Scope:** Presentation layer of the bilingual portfolio. Content layer and
diagram geometry are preserved.

---

## 1. Goal

Rebuild the site's visual identity around a pixel/game aesthetic: larger type,
buttons that read as pressable controls, full-height "screens" instead of a
continuous editorial column, a filterable tech stack, and per-project detail
pages.

The content layer (`src/data/content/`) and the SVG diagram system stay. They
are verified, independent of visual style, and re-usable as-is.

## 2. Decisions and their reasons

These four were settled with the project owner before this spec was written.

| Decision | Choice | Why |
|---|---|---|
| Typography | Pixel face for chrome, large sans for body | Press Start 2P, Pixelify Sans, Silkscreen and Jersey 10 have **no Vietnamese subset**. Only VT323 and Handjet do. A fully-pixel body would also make long Vietnamese paragraphs with stacked diacritics hard to read. |
| Home layout | Full-height screens, one idea per screen | Reads as a game without fragmenting the page. Stays a single URL, so recruiters scroll once and SEO is unchanged. |
| Project content split | Home lists projects; detail pages hold everything | A full-height WORK screen cannot hold 4 projects × (3 paragraphs + diagram + images). This also gives detail pages a reason to exist. |
| Theme | Dark default, light toggle retained | Dark suits the aesthetic; keeping both preserves reader choice and the existing token architecture. |

Two further decisions were delegated and are recorded here:

**Diagrams: restyle, do not redraw.** Stroke width goes 1px → 2px and every
corner stays square; coordinates do not change. Redrawing on a pixel grid would
mean rewriting ~400 lines of verified geometry and would break the self-draw
animation, which depends on `pathLength` normalisation per line. The cost is not
proportionate to the gain.

**Project links: build the mechanism, ship it empty.** Which projects are public
is not knowable from the repo, and inventing URLs is not acceptable. The field is
optional and the detail page omits the whole block when a project has no links,
so an unfilled field never renders as a broken empty region.

## 3. Type system

| Role | Family | Notes |
|---|---|---|
| Pixel chrome — headings, buttons, labels, numerals, nav | **Handjet** | Variable `100..900`, has the `vietnamese` subset. The weight axis is what allows chunky display type; VT323 is single-weight and terminal-thin. |
| Body copy | **Inter** | Already loaded. Body scales from 16px to 20–22px. |

Playfair Display is removed.

Size scale (fluid, defined as Tailwind `fontSize` tokens backed by CSS vars):

| Token | Size |
|---|---|
| `display` | `clamp(3.5rem, 12vw, 8.75rem)` |
| `h2` | `clamp(2.5rem, 6vw, 4.5rem)` |
| `h3` | `clamp(1.5rem, 3vw, 2.25rem)` |
| `body` | `clamp(1.125rem, 1.4vw, 1.375rem)` |
| `label` | `0.875rem`, uppercase, wide tracking |

The pixel character comes from layout rules, not from the font:

- `border-radius: 0` everywhere, with no exceptions
- 3px solid borders
- Hard drop shadows — a solid offset, never blurred
- Every spacing value is a multiple of 4px

## 4. Pixel primitives

New directory `src/components/ui/pixel/`. Each primitive is presentational and
takes no data-layer knowledge.

### `PixelButton`

The press affordance is the point: resting state has a 4px offset shadow; on
`:active` the button translates by `4px, 4px` and the shadow is removed, so it
visibly sinks.

```
resting                  pressed
┌──────────┐             ┌──────────┐
│  RESUME  │▐            │  RESUME  │
└──────────┘▐            └──────────┘
 ▀▀▀▀▀▀▀▀▀▀▀
```

Variants: `primary` (accent fill), `secondary` (transparent fill, accent border).
Renders as `<button>` or, with `href`, as `<a>` — the element must match the
semantics, never a div with a click handler.

### `PixelPanel`

Bordered container with the same hard shadow. Used for project rows, the stack
category panel and detail-page sections.

### `PixelTag`

Small square-cornered tag for technology names. No shadow — tags are not
interactive and must not look pressable.

## 5. Layout

- **`src/components/ui/grid-lines.tsx` is deleted.** The side rules are gone.
- **`Screen` replaces `Section`.** `min-h-screen`, full-bleed background, inner
  column widening from 1100px to 1280px.
- **No scroll-snap.** The stack screen grows past the viewport once a category
  is expanded; snapping would trap the reader mid-screen and breaks keyboard
  scrolling. Full-height screens read as discrete without it.
- Header becomes a thin HUD: name · section nav · EN/VI · theme toggle. The
  scroll-progress bar and active-section highlight are kept as built.

Screen order: `HERO → ABOUT → STACK → WORK → EXPERIENCE → CONTACT`.

The hero keeps exactly two controls, now as `PixelButton`s: `RESUME` (primary,
opens the PDF) and `CONTACT` (secondary, jumps to the contact screen).

## 6. Stack screen

A single row of category buttons, `ALL` selected by default:

```
[ ALL ] [ LANGUAGES ] [ FRAMEWORKS ] [ DATABASES ] [ ARCHITECTURE ] [ TOOLS ]
```

`ALL` renders every group. Selecting a category renders that group alone, with
its `note` shown as a subtitle.

Selection is local component state. It is deliberately **not** synced to the URL:
a link to a filtered stack view carries no useful meaning, and the query
parameter would have to be threaded through the static-export route params.

### Required content change

`src/data/content/tech-stack.ts` currently groups `Languages & Frameworks`
together. The categories above require them separated:

| Current group | Becomes |
|---|---|
| `languages` — Node.js, Express.js, NestJS, React, TypeScript, JavaScript | `languages` — TypeScript, JavaScript · `frameworks` — Node.js, Express.js, NestJS, React |
| `databases` | unchanged |
| `architecture` | unchanged |
| `tools` | unchanged |

Labels for the two new groups are needed in both locales.

## 7. Project detail pages

New route: `src/app/[locale]/work/[slug]/page.tsx`.

- `generateStaticParams` iterates locales × projects, so every page is
  prerendered; `dynamicParams = false` as elsewhere in the app.
- Slug is the existing `Project.id` — `aivn-elearning`, `kyc-platform`,
  `marketplace`, `hedera-esg`. No new identifier is introduced.
- Each page carries its own `generateMetadata` with a canonical URL and the
  `hreflang` pair, matching the existing home-page treatment.

Page contents, in order: title · period · tagline · links · problem / approach /
outcome · architecture diagram (full width) · screenshots · technology tags ·
a back control to `#work` on the home screen.

`project-entry.tsx` is split rather than edited in place: its prose layout moves
to the detail page, and the home screen gets a new, much smaller list-row
component. `project-visual.tsx`, `DiagramMotion` and the slider move with the
prose to the detail page — no visuals remain on the home screen.

The WORK screen on the home page becomes a select list — index, title, tagline,
tags, and a control leading to the detail page. The three prose fields move off
the home page entirely.

### New data field

```ts
links?: {
  label: L;
  href: string;
  kind: "live" | "repo" | "doc";
}[];
```

Optional. When absent or empty the detail page renders no links block at all.

## 8. Resume

- `public/cv.pdf` is renamed to `public/resume.pdf`.
- `PROFILE.cvUrl` becomes `PROFILE.resumeUrl`.
- The control is labelled `RESUME` and opens the PDF in a new tab
  (`target="_blank"`, `rel="noopener"`). It is a link, not a download attribute:
  the request was to reach the resume page, not to force a file save.
- Every `ui` string referring to a CV is updated in both locales.

## 9. Diagrams

`src/components/visuals/svg-primitives.tsx` only:

- `strokeWidth` 1 → 2 on boxes, frames, lines and arrowheads
- `BUS_THICKNESS` 12 → 14 and `HEAD` 7 → 9, so the queue bar and arrowheads
  still read as heavier than the lines they sit against

Coordinates, the label table `T`, the bilingual mechanism, `lane()`, and all
`.dg-*` animation classes are untouched. Geometry is verified by rendering the
SVG standalone before and after and comparing.

## 10. Motion

Existing motion is kept and reused — it was rebuilt and measured recently:

- `Reveal` (CSS-driven, `data-visible` attribute only)
- `DiagramMotion` (per-diagram trigger, 44% of the diagram visible when the
  self-draw starts)
- `prefers-reduced-motion` handled in one CSS block, verified to show everything
  by 80ms

New motion is limited to the button press transform. No new animation library.

## 11. Documentation

- **`DESIGN.md`** at the repo root, in English: tokens, primitives, layout rules,
  motion, accessibility contract.
- **`README.md`** converted to English.
- Vietnamese code comments are retained — that was an explicit earlier
  preference and applies to source, not to documentation files.

## 12. Accessibility

- Contrast is re-verified for both themes after the palette shift; the accent
  must stay at or above 4.5:1 against its background in each. The existing dark
  accent `#EA580C` and light accent `#C2410C` were chosen for exactly this.
- Buttons and links keep visible focus states — the press shadow must not be the
  only affordance.
- Category buttons are real buttons with `aria-pressed`.
- Larger type must not introduce horizontal overflow at 320px width.

## 13. Out of scope

- Redrawing diagrams on a pixel grid
- Sound, cursor trails, or other game ornamentation
- Populating project links (content, owner-supplied)
- `PROFILE.siteUrl`, still a placeholder and still blocking correct canonical
  URLs, sitemap entries and OG image URLs

## 14. Sequencing

This is one plan, but the work has a forced order — later phases cannot compile
without earlier ones:

1. Token layer (fonts, scale, palette, radius/shadow rules)
2. Pixel primitives
3. `Screen` + header/HUD; delete `grid-lines.tsx`
4. Home screens rebuilt on the new primitives
5. Stack data split + category filter
6. Project detail route; split `project-entry.tsx`
7. Resume rename
8. Diagram stroke pass
9. `DESIGN.md`, English `README.md`

## 15. Verification

| Check | Method |
|---|---|
| Diagram geometry unchanged except stroke | Render SVG standalone before/after, compare |
| No horizontal overflow | Measure `scrollWidth` vs `clientWidth` at 320/768/1440 |
| Contrast | Compute ratios for accent and body text in both themes |
| Reduced motion | Confirm nothing hidden at 80ms with the media feature emulated |
| Detail routes static | Build output lists all locale × project paths |
| Bilingual completeness | `tsc` — a missing translation is a compile error by construction |
