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

Playfair Display, used in the previous design, is removed entirely.

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
| `body` | `clamp(1.125rem, 1.4vw, 1.375rem)` | line-height `1.6` |
| `label` | `0.875rem` | line-height `1.2`, letter-spacing `0.18em`, weight `500`, uppercase by convention at the call site |

Display weight (700) and label weight (500) are baked directly into the
`fontSize` entries, not applied ad hoc with `font-bold`/`font-medium`
utilities at each call site.

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
| `href` | `string` | — | when present, renders `<a>` |
| `external` | `boolean` | — | anchor-only; adds `target="_blank" rel="noopener noreferrer"` |
| ...rest | native `<a>` or `<button>` attributes | — | passed through depending on which element renders |

When `href` is provided the component renders `<a href={href}>`; otherwise
it renders `<button>`. It never renders a clickable `<div>` — the
implementation comment is explicit that a div with `onClick` would be
invisible to keyboard and screen-reader users as a control.

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
  with `threshold: 0.25` and `rootMargin: "0px 0px -10% 0px"`. This
  replaces an earlier version where the diagram's animation was gated on
  the *enclosing* `Reveal`, which — per the in-code comment — fired with
  only ~4% of the diagram visible and finished animating at ~7% visible,
  because that wrapper is much taller than the viewport. Giving the diagram
  its own observer root fixes that.
  - Note: I could not independently re-measure the "fires at ratio 0.403"
    figure supplied as background for this task — that would require an
    actual browser measurement, which is outside what static source
    reading can confirm. What the source verifiably sets is
    `threshold: 0.25` with a `-10%` bottom `rootMargin`; I'm documenting
    the configured values rather than asserting an unverified derived
    number.
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
  - I could not independently re-verify the "nothing hidden at 80ms" timing
    claim through static reading; I'm documenting the mechanism (why the
    CSS block exists and what it guarantees structurally) rather than
    re-asserting an unmeasured number.

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
  on both locales per the design spec's verification table.

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
Next's own compiler) can. If an internal import in that directory drops its
`.ts` extension, module resolution fails inside the OG script — and that
script wraps its own logic in a way that **swallows the resulting error**,
so `npm run og` (wired into `prebuild`) fails silently: no exception
surfaces, no build failure, and `og-en.png` / `og-vi.png` simply don't get
regenerated with current content. This is the single most dangerous
footgun in the repo — there is no compiler or test that would catch it.

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
