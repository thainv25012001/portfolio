# Design System

Pixel/game presentation layer for the bilingual portfolio. This document
describes the system as it is implemented in code, not as originally
proposed — where a decision changed during implementation, that's noted.

The content layer (`src/data/content/`) and the SVG diagram geometry are
unrelated to this document; see [README.md](README.md) for those.

## Principles

- `border-radius: 0` everywhere. No exceptions, including focus rings and
  images. Enforced structurally (see Tokens below), not by convention.
- Every spacing value is a multiple of 4px.
- Shadows are hard: a solid offset, never a blur radius.
- Vietnamese glyph coverage is mandatory for every font in use.
- An element's semantics must match its role: a control that can be clicked
  must be a real `<button>` or `<a>`, never a `<div>` with `onClick`.

## Tokens

### Type

| Role | Family | Notes |
|---|---|---|
| Pixel chrome — headings, buttons, labels, numerals, nav | **Handjet** | Variable weight axis `100`–`900`, has the `vietnamese` subset. The weight axis is what makes chunky display type possible. |
| Body copy | **Inter** | Loaded via `next/font/google`, `subsets: ["latin", "latin-ext", "vietnamese"]`. |

Both fonts are loaded in `src/app/[locale]/layout.tsx` and exposed as CSS
variables `--font-pixel` / `--font-sans`, wired into Tailwind as
`font-pixel` / `font-sans`.

Playfair Display, used in the previous design, is removed entirely —
including from `scripts/generate-og.ts`, which renders the social share
cards. That script kept loading Playfair after the rest of the redesign had
moved on, so every link preview carried the old serif identity while the
site behind it was pixel. It now loads Handjet at weight 700, matching the
`display` token. Handjet's `vietnamese` subset renders through satori:
verified by rendering `Nguyễn Việt Thái — DỰ ÁN TIÊU BIỂU ỆỰỚẠỖ` through
the same `loadGoogleFont` → satori → resvg path and looking at the PNG.

Press Start 2P, Pixelify Sans, Silkscreen and Jersey 10 were rejected
outright during type selection — none of them ship a Vietnamese subset,
which would break every `/vi` page.

Fluid size scale, defined as Tailwind `fontSize` tokens (`tailwind.config.ts`)
backed by `clamp()`:

| Token | Size | Baked-in styling |
|---|---|---|
| `display` | `clamp(3.5rem, 12vw, 8.75rem)` | line-height `0.92`, letter-spacing `0.01em`, weight `700` |
| `h2` | `clamp(2.5rem, 6vw, 4.5rem)` | line-height `1.0` |
| `h3` | `clamp(1.5rem, 3vw, 2.25rem)` | line-height `1.1` |
| `body` | `clamp(1.375rem, 1.8vw, 1.75rem)` | line-height `1.55` |
| `ui` | `1.375rem` | line-height `1.2` — text on pixel controls (button `default`, header wordmark) |
| `label` | `1.125rem` | line-height `1.2`, letter-spacing `0.18em`, weight `500`, uppercase by convention at the call site |
| `small` | `1.125rem` | line-height `1.5` — secondary prose (footer). No tracking: it is sentence case, not a label |
| `meta` | `0.9375rem` | line-height `1.3`, letter-spacing `0.14em` — backs the `.meta-label` component class |

Display weight (700) and label weight (500) are baked directly into the
`fontSize` entries, not applied ad hoc with `font-bold`/`font-medium`
utilities at each call site.

`body` is deliberately large — 22px at small viewports, 28px past 1555px.
The brief asked for bigger type and an earlier pass delivered that for
headings only: display grew 5.25rem → 8.75rem (+67%) while body stayed at
the 20px of the pre-redesign design and the hero positioning line actually
*shrank*, from 24px to 20px. A 20px paragraph under a 140px name reads as a
caption. `ui`, `small` and `meta` exist so the primitives, the footer and
`.meta-label` sit on the scale too rather than carrying one-off
`text-[13px]`/`text-[1rem]` arbitrary values that drift away from it.

Because the measure has to track the size, prose containers widened to
`max-w-4xl` (`max-w-3xl` for the short contact blurb and the project-row
tagline, which sits in a two-column grid and is constrained by its panel
anyway). One step up from `max-w-2xl` was not enough: measured, `max-w-3xl`
at 26px gives 57 characters per line, which is the "short and ragged"
failure the widening exists to avoid. `max-w-4xl` measures 69–73.

Measured at 1440×900, production build, headless Edge over CDP (characters
per line = content-box width ÷ mean glyph advance for that element's own
computed font, so a partial last line doesn't skew it):

| Element | Size | Measure | Chars/line (en / vi) |
|---|---|---|---|
| Hero positioning | 25.92px | `max-w-4xl` | 71 / 71 |
| About body | 25.92px | `max-w-4xl` | 73 / 69 |
| Work intro | 25.92px | `max-w-4xl` | 73 / 72 |
| Contact blurb | 25.92px | `max-w-3xl` | 63 / 63 |
| Detail tagline / `dd` | 26px | `max-w-4xl` | 71 / 74 |

Rendered type sizes at the same viewport, identical across `/en` and `/vi`:
`h1` 140px, section `h2` 72px, project title (`h3`) 36px, body 25.92px,
footer 18px. `body` reads 25.92px rather than its 28px ceiling because
`1.8vw` of 1440 is 25.92 — the clamp only tops out past 1555px.

### Color

Defined as HSL components in `src/app/globals.css`, consumed through
Tailwind's `hsl(var(--x))` color tokens. Two themes, dark is default
(`defaultTheme="dark"` in `ThemeProvider`).

| Token | Dark | Light |
|---|---|---|
| Background | `#0A0A0A` | `#FAFAF9` |
| Foreground | `#EDEDED` | `#0A0A0A` |
| Accent (`brand`) | `#EA580C` | `#C2410C` |

The accent uses two different shades because `#C2410C` on `#0A0A0A` measures
3.8:1 contrast — under the 4.5:1 WCAG AA floor for body-sized text. The
lighter dark-mode shade `#EA580C` reaches 5.6:1. Both are documented inline
in `globals.css`.

### Borders, shadows, spacing

Single source of truth in `globals.css`:

```css
--pixel-border: 3px;
--pixel-shadow: 4px 4px 0 0 hsl(var(--foreground));
--pixel-shadow-sm: 2px 2px 0 0 hsl(var(--foreground));
```

Exposed to Tailwind as `shadow-pixel` / `shadow-pixel-sm`, and consumed
directly as `border-[length:var(--pixel-border)]` on the pixel primitives.

`borderRadius` is set at the **theme** level in `tailwind.config.ts`, not
under `extend`:

```ts
borderRadius: { none: "0", DEFAULT: "0", sm: "0", md: "0", lg: "0", full: "0" },
```

Setting it at theme level (replacing Tailwind's defaults instead of
augmenting them) means keys Tailwind normally ships — `xl`, `2xl`, `3xl`,
etc. — don't exist at all in this config. There is no `rounded-*` utility
class in the generated CSS that could reintroduce a radius; the constraint
is structural, not just a set of overridden values.

## Primitives

`src/components/ui/pixel/`. Each is presentational; none holds data-layer
knowledge.

### `PixelButton`

`src/components/ui/pixel/pixel-button.tsx`. The press affordance is the
point: resting state carries the `shadow-pixel` (4px hard offset); on
`:active` it translates `4px, 4px` and the shadow is removed, so the button
visibly sinks into its own shadow.

Prop table:

| Prop | Type | Default | Notes |
|---|---|---|---|
| `children` | `React.ReactNode` | — | required |
| `variant` | `"primary" \| "secondary"` | `"primary"` | `primary` = accent fill, foreground border; `secondary` = transparent fill, foreground border, hovers to `bg-secondary` |
| `size` | `"default" \| "sm"` | `"default"` | `default` = `h-14 px-8`, `sm` = `h-10 px-4` |
| `className` | `string` | — | merged in via `cn()` |
| `href` | `string` | — | when present, renders `next/link` or `<a>` (see below) |
| `external` | `boolean` | — | anchor-only; adds `target="_blank" rel="noopener noreferrer"`, and forces the raw `<a>` |
| `navigate` | `"link" \| "anchor"` | inferred | anchor-only; overrides the inference |
| ...rest | native `<a>` or `<button>` attributes | — | passed through depending on which element renders |

When `href` is provided the component renders a link element; otherwise it
renders `<button>`. It never renders a clickable `<div>` — the
implementation comment is explicit that a div with `onClick` would be
invisible to keyboard and screen-reader users as a control.

Which link element: `external` always wins and gives the raw `<a>`.
Otherwise an href starting with `/` (but not `//`, which is
protocol-relative and therefore external) is an App Router route and
renders `next/link`; everything else — `#contact`, `mailto:`, absolute
URLs — stays a raw `<a>`. `navigate` forces either branch when the
inference is wrong.

This matters more than it looks. Both project links —
`ProjectRow`'s "view detail" and `ProjectDetail`'s "back to work" — built
their href from a template literal and got the raw `<a>`, so every click
into a case study was a full white document reload on a site whose whole
brief is game feel. The header was already using `next/link`, so the two
halves of the same navigation behaved differently. Both call sites now pass
`navigate="link"` explicitly rather than relying on the inference, so the
intent is visible where someone edits it.

### `PixelPanel`

`src/components/ui/pixel/pixel-panel.tsx`. Bordered container with the same
hard shadow (`shadow-pixel`, `border-[length:var(--pixel-border)]`). Used
for project rows, the stack category panel, and project detail sections.

| Prop | Type | Default |
|---|---|---|
| `children` | `React.ReactNode` | — |
| `className` | `string` | — |
| `as` | `"div" \| "article" \| "section"` | `"div"` |

### `PixelTag`

`src/components/ui/pixel/pixel-tag.tsx`. Small square-cornered tag for
technology names. Deliberately has **no shadow** — tags aren't interactive
and must not read as pressable.

| Prop | Type | Default |
|---|---|---|
| `children` | `React.ReactNode` | — |
| `className` | `string` | — |

### The press affordance's hidden dependency

`.pixel-press:active` in `globals.css` sets two properties, not one:

```css
.pixel-press:active {
  transform: translate(4px, 4px);
  box-shadow: none;
  --tw-shadow: 0 0 #0000;
}
```

The second line is not redundant. `PixelButton`'s focus ring
(`focus-visible:ring-4`) is a Tailwind utility that also sets `box-shadow`,
via `var(--tw-shadow, 0 0 #0000)`. When a button is both `:active` (held
with Space/Enter after a Tab) and `:focus-visible`, that ring rule ties
`.pixel-press:active` on specificity and wins on source order, because it's
defined later in the generated stylesheet. Its shadow value is read from the
`--tw-shadow` custom property — which cascades independently of the
`box-shadow` shorthand it's substituted into. So `box-shadow: none` alone
does not clear it: the ring rule's own `box-shadow` declaration would still
resolve `--tw-shadow` back to whatever `.shadow-pixel` last set it to,
pulling the hard shadow straight back in. Resetting `--tw-shadow` alongside
`box-shadow` is what actually removes it.

Without the `--tw-shadow` line, the press affordance silently breaks for
keyboard users only — a mouse click never triggers both `:active` and
`:focus-visible` at once, so this only surfaces under keyboard interaction.

## Layout

- `Screen` (`src/components/ui/screen.tsx`) replaces the previous `Section`
  component. It uses `min-h-dvh` — not `min-h-screen` — so mobile browser
  chrome (the address bar showing/hiding) doesn't cause the screen to fall
  short of the viewport.
- Each `Screen` renders its heading as a real `<h2 class="text-h2">`, with
  the section number demoted to a `text-label` line above it. Before this,
  the heading was a `<p class="text-label">` — 14px muted, the *smallest*
  type on a page whose display type is 140px — and the document went
  straight from one `<h1>` to a set of `<h3>`s with no `<h2>` anywhere. One
  change fixes both the visual hierarchy and the heading tree.
- **Screens centre with `my-auto` on the inner block, not
  `justify-center` on the flex column.** They are `min-h-dvh`, not
  `h-dvh`, and several of them are legitimately taller than the viewport
  (Stack with a category open, Work, Experience — the home page measures
  ~7.4 screens of content for 6 sections). When a column flex container's
  content overflows, `justify-center` distributes the overflow to *both*
  ends, and the overflow above the start edge cannot be scrolled to — the
  top of the section is simply unreachable and gets clipped. An `auto`
  block margin centres identically while there is free space and collapses
  to `0` when there isn't, so a tall screen falls back to top-aligned and
  scrolls normally. Vertical padding is `py-20 md:py-24`, down from
  `py-24 md:py-32`, to buy back height on the screens that overflow
  without leaving the short ones looking empty. `Hero` is not a `Screen`
  (it has no index/heading) but repeats the same pattern deliberately.
- **No scroll-snap**, deliberately. The stack screen grows past the
  viewport once a tech category is expanded; snap-scrolling would trap the
  reader mid-screen and break keyboard scrolling (arrow keys / Page Down).
  Full-height screens read as discrete sections without it.
- Shell max width is `1280px`, defined as `maxWidth.shell` under `extend` in
  `tailwind.config.ts` and applied via the `.shell` class in `globals.css`
  (`mx-auto w-full max-w-shell px-content`). This widened from the previous
  design's 1100px.
- `src/components/ui/grid-lines.tsx` has been deleted from the codebase;
  the side vertical rules from the previous editorial layout are gone.
- Screen order on the home page: `HERO → ABOUT → STACK → WORK → EXPERIENCE
  → CONTACT`.

## Motion

- **`Reveal`** (`src/components/ui/reveal.tsx`) is CSS-driven. The
  component's only JS responsibility is toggling a `data-visible` attribute
  via `useInView` (an `IntersectionObserver` wrapper, fires once). All
  animation — fade+slide (`data-reveal="fade"`) or mask-reveal
  (`data-reveal="mask"`) — lives in `globals.css`, gated on the
  `[data-visible]` attribute selector.
- **`DiagramMotion`** (`src/components/visuals/diagram-motion.tsx`) gives
  each architecture diagram its own visibility trigger, independent of the
  `Reveal` wrapping the rest of the project block. It calls `useInView`
  with `threshold: 0.25` and `rootMargin: "0px 0px -10% 0px"`. Configured as
  threshold `0.25` / `rootMargin` `-10%`; measured to fire at ratio **0.403**
  of the diagram's own height (headless Edge over CDP, production build,
  `/en/work/aivn-elearning`, scrolled upward in 10px steps from below the
  fold). The two numbers are consistent, not competing: the negative bottom
  margin shrinks the effective root box, so a `0.25` threshold measured
  against that smaller box lands near `0.40` of the diagram against the
  real viewport. The config is what a maintainer edits; the ratio is what
  it actually buys.
  - This replaces a real bug where the diagram's self-draw was triggered by
    the `Reveal` wrapping the *entire* project entry instead of the diagram
    itself: because that wrapper is far taller than the viewport, the whole
    self-draw sequence played out — and finished — with only ~4% of the
    diagram on screen (7% by the time it finished), long before a reader
    actually scrolled to it. That's why `DiagramMotion` exists as its own
    component with its own observer rather than the diagram simply reusing
    `Reveal` — collapsing it back into `Reveal` would silently reintroduce
    the bug.
- Diagram stage timings derive from each other with `calc()` in
  `globals.css`, under `.dg-root`:
  ```css
  --dg-fade-delay: 0.1s;
  --dg-fade-dur: 0.45s;
  --dg-line-delay: 0.45s;
  --dg-line-dur: 0.8s;
  --dg-bus-delay: calc(var(--dg-fade-delay) + var(--dg-fade-dur));
  --dg-bus-dur: 0.7s;
  --dg-head-delay: calc(var(--dg-line-delay) + var(--dg-line-dur));
  --dg-head-dur: 0.3s;
  ```
  Because `--dg-bus-delay` and `--dg-head-delay` are computed from the
  fade/line stages rather than hand-typed, the chain (blocks fade in → bus
  grows → line draws → arrowhead lands) can't drift out of sync when one
  stage's duration changes — a problem the in-code comment says happened
  historically with hand-tuned literal values.
- `prefers-reduced-motion: reduce` is handled in a single CSS block at the
  bottom of `globals.css`: it forces every `[data-reveal]`/`.dg-root` rest
  state to its *end* state (opacity 1, no transform, no clip-path, no
  stroke-dashoffset) rather than merely zeroing durations. The general
  `@media (prefers-reduced-motion: reduce)` block earlier in the file
  already zeroes all `transition-duration`/`animation-duration` globally;
  this second block is what prevents content from being stuck invisible at
  its *pre-animation* rest state once durations are zeroed. The
  `.pixel-press` transform itself is intentionally kept (only its
  transition is removed) because it's an affordance, not decoration.
  - Measured (headless Edge over CDP, production build,
    `/en/work/aivn-elearning`): with `prefers-reduced-motion: reduce`
    emulated and sampled 80ms after scrolling `.dg-root` into view,
    `data-visible=true` and all 96 animated SVG nodes in the diagram report
    hidden-count 0 — nothing is still in its pre-animation state that
    early. The same check without reduced motion, sampled 2s after scroll,
    also reports 0 of 96 nodes hidden once the sequence completes.

## Accessibility

- Accent contrast floor is 4.5:1 against its own background, per theme.
  Dark accent `#EA580C`, light accent `#C2410C` — chosen specifically to
  clear this floor (see Color, above).
- Focus is always visible via `:focus-visible { ring-2 ring-brand
  ring-offset-2 }` at the base layer, and is never dependent on the press
  shadow alone — see "The press affordance's hidden dependency" above for
  the mechanism that keeps the focus ring visible during a keyboard press.
- Stack category buttons (`src/components/sections/stack-filter.tsx`) are
  real `<button>` elements (via `PixelButton`) carrying `aria-pressed={active
  === g.id}`.
- No horizontal overflow at 320px viewport width; verified at 320/768/1440
  on `/en`, `/vi` and `/en/work/aivn-elearning` — `scrollWidth` equals
  `clientWidth` at every combination (305/305, 753/753, 1425/1425). The
  architecture diagram is wider than a phone, but it lives in its own
  `overflow-x-auto` container, so it scrolls itself rather than the
  document.
- No vertical clipping: at both 1440×900 and 1280×800, on both locales,
  every home screen's inner block sits at a non-negative offset from its
  section's top edge (measured inset ≥ 96px everywhere). The three screens
  that are genuinely taller than the viewport — Stack, Work, Experience —
  top-align and scroll, which is the `my-auto` behaviour described under
  Layout.
- Body copy and the section `h2` clear 4.5:1 in both themes, measured from
  computed styles against the nearest painted background:

  | | Dark | Light |
  |---|---|---|
  | Body (`text-muted-foreground`) | 6.53:1 | 5.50:1 |
  | Section `h2` (`text-foreground`) | 16.91:1 | 18.96:1 |

## Content rules

- Everything user-visible is typed as `L = Record<Locale, string>` (defined
  in `src/lib/i18n.ts`, alongside `LList = Record<Locale, string[]>` for
  arrays of translated strings). A missing translation for either locale is
  a TypeScript compile error, not a runtime gap — this is the bilingual
  guarantee.
- Content lives exclusively in `src/data/content/`; components render, they
  never hold copy.

### The `.ts` extension footgun

Internal imports **inside** `src/data/content/` (e.g. `index.ts` importing
`about.ts`) must keep explicit `.ts` extensions. This is enforced by
necessity, not lint: `scripts/generate-og.ts` loads
`src/data/content/index.ts` directly via Node's built-in type-stripping
(`node --experimental-strip-types`), which is plain Node ESM resolution —
it cannot guess extensions the way bundler-based resolution (webpack,
Next's own compiler) can. Drop a `.ts` extension on an internal import in
that directory and module resolution fails inside the OG script.

**The failure is loud, not silent.** An earlier revision of this document
claimed the script "swallows the resulting error" so the build passes with
stale OG images. That is wrong, and it is worth being precise about why:
the resolution error is thrown by Node's ESM resolver at *import* time, in
the linking phase, before any module body executes. `main()` is never
called, so the `main().catch(...)` handler at the bottom of the script —
the one that deliberately exits `0` when the font fetch fails offline —
is never reached either. The process dies with `ERR_MODULE_NOT_FOUND` and
exit code `1`. Because `prebuild` runs `og`, `npm run build` fails at the
first step.

Verified by reproduction: changing `./about.ts` to `./about` in
`src/data/content/index.ts` and running `npm run og` produces

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../src/data/content/about'
    imported from .../src/data/content/index.ts
  code: 'ERR_MODULE_NOT_FOUND'
exit 1
```

So the requirement stands — the extensions are load-bearing — but the
consequence of breaking it is a red build, not a quiet one. The
`main().catch` handler only covers failures *inside* `main()`, which in
practice means the font fetch: no network at build time keeps the existing
PNGs and exits `0` on purpose.

## Routes

Fully static, no server runtime for content:

- `src/app/[locale]/page.tsx` — home, `generateStaticParams` over `locales`,
  `dynamicParams = false`.
- `src/app/[locale]/work/[slug]/page.tsx` — project detail,
  `generateStaticParams` returns `locales.flatMap(locale =>
  content.projects.items.map(p => ({ locale, slug: p.id })))`, also
  `dynamicParams = false`. Any locale or slug outside the generated set
  404s at request time rather than rendering dynamically.
- The slug **is** `Project.id` — no separate slug field exists. Current
  project ids: `aivn-elearning`, `kyc-platform`, `marketplace`,
  `hedera-esg`.
- Each route sets its own `generateMetadata` with a locale-aware canonical
  URL and `hreflang` (`alternates.languages`) pair.
