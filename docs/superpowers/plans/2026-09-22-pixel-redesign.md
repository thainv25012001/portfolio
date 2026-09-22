# Pixel / Game Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio's presentation layer around a pixel/game aesthetic — large type, pressable buttons, full-height screens, a filterable tech stack, and per-project detail pages — without disturbing the content layer or the verified diagram geometry.

**Architecture:** The token layer (`globals.css` + `tailwind.config.ts`) is rewritten first; pixel primitives are built on those tokens; layout and screens are rebuilt on the primitives; then routes, data and documentation follow. Each phase compiles only if the previous one landed.

**Tech Stack:** Next.js 14 App Router (SSG), TypeScript, Tailwind CSS, `next-themes`, `next/font/google` (Handjet + Inter), CSS-only motion driven by `data-visible`.

**Spec:** [`docs/superpowers/specs/2026-09-22-pixel-redesign-design.md`](../specs/2026-09-22-pixel-redesign-design.md)

## Global Constraints

- **This repository has no test runner.** There is no jest, vitest, playwright or testing-library dependency and no `*.test.*` file. Do not invent one and do not write tests that cannot run. The verification gate for every task is: `npx tsc --noEmit`, `npx next lint`, `npx next build`, plus the measurement step named in that task.
- **Package manager is pnpm.** Never run `npm install` — it recreates `package-lock.json`, and two lockfiles is what broke the Vercel build on 2026-09-07. Only `pnpm-lock.yaml` may exist.
- **Bilingual is enforced by the type system.** All user-visible strings are `L = Record<Locale, string>`. A missing translation is a compile error; that is the bilingual test.
- **Content lives in `src/data/content/`.** Components render, they never hold copy. Internal imports inside that directory **must** keep explicit `.ts` extensions — `scripts/generate-og.ts` loads them through Node type-stripping, which cannot guess extensions, and the script swallows errors so breakage is silent.
- **`border-radius: 0` everywhere.** No exceptions, including focus rings and images.
- **Every spacing value is a multiple of 4px.**
- **Shadows are hard.** A solid offset, never a blur radius.
- **Vietnamese font coverage is mandatory.** Any font added must declare the `vietnamese` subset. Press Start 2P, Pixelify Sans, Silkscreen and Jersey 10 do not have it.
- **Accent contrast floor is 4.5:1** against its own background in each theme. Dark accent `#EA580C`, light accent `#C2410C`.
- **Documentation files are English.** Vietnamese code comments stay.

---

### Task 1: Type specimen — validate Handjet before building on it

The whole design rests on Handjet rendering as chunky pixel display type. That is currently an inference from its variable axes and subset list, not an observation. Validate it before nine phases are stacked on top. This page is **throwaway** and is deleted in Task 2.

**Files:**
- Create: `src/app/specimen/page.tsx` (temporary)

**Interfaces:**
- Consumes: nothing
- Produces: nothing — this is a decision gate, not a dependency

- [ ] **Step 1: Create the specimen page**

```tsx
import { Handjet, VT323 } from "next/font/google";

const pixel = Handjet({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});
const vt = VT323({
  weight: "400",
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
});

const SAMPLES = [
  "NGUYEN VIET THAI",
  "Kỹ sư đầu tiên của dự án",
  "01 ABOUT / 02 STACK / 03 WORK",
  "RESUME · CONTACT",
];

export default function Specimen() {
  return (
    <main style={{ background: "#0A0A0A", color: "#EDEDED", padding: 40 }}>
      {[300, 500, 700, 900].map((w) => (
        <section key={w} style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "monospace", fontSize: 12, color: "#888" }}>
            Handjet {w}
          </p>
          {SAMPLES.map((s) => (
            <p
              key={s}
              className={pixel.className}
              style={{ fontWeight: w, fontSize: 64, margin: "8px 0" }}
            >
              {s}
            </p>
          ))}
        </section>
      ))}
      <section>
        <p style={{ fontFamily: "monospace", fontSize: 12, color: "#888" }}>
          VT323 (single weight, for comparison)
        </p>
        {SAMPLES.map((s) => (
          <p key={s} className={vt.className} style={{ fontSize: 64, margin: "8px 0" }}>
            {s}
          </p>
        ))}
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Build and serve**

```bash
npx next build && npx next start -p 3100
```

- [ ] **Step 3: Screenshot the specimen and look at it**

Start headless Edge with a debug port, then capture. Save the script somewhere
outside the repo (the scratchpad), not in `src/`:

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"   --headless=new --remote-debugging-port=9280 --user-data-dir=/tmp/edge-specimen &
```

```js
// shot.mjs — chup /specimen de nhin tan mat font pixel.
import { writeFileSync } from "node:fs";
const [, , url, out, port = "9280"] = process.argv;
const t = await fetch(`http://localhost:${port}/json/list`).then((r) => r.json());
const ws = new WebSocket(t.find((x) => x.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (pend.has(m.id)) { pend.get(m.id)(m.result ?? {}); pend.delete(m.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 2400, deviceScaleFactor: 2, mobile: false });
await send("Page.navigate", { url });
await new Promise((r) => setTimeout(r, 3000)); // cho font tai xong
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
writeFileSync(out, Buffer.from(shot.data, "base64"));
console.log("saved", out);
process.exit(0);
```

```bash
node shot.mjs http://localhost:3100/specimen specimen.png 9280
```

Then open `specimen.png` and actually look at it — this step's output is a
judgement, not a passing command.

Expected: Vietnamese diacritics (ỹ, ệ, ầ, ự) render correctly at every weight, and at least one weight reads as chunky pixel display type.

- [ ] **Step 4: Decision gate — STOP and report**

If Handjet renders well, record the chosen weight and continue to Task 2. If it renders thin or breaks Vietnamese, report that to the project owner with the screenshot and propose VT323 or a self-hosted pixel font **before** continuing. Do not proceed past this step on a failing specimen.

- [ ] **Step 5: Commit the specimen so the screenshot is reproducible**

```bash
git add src/app/specimen/page.tsx
git commit -m "chore: add throwaway type specimen to validate Handjet"
```

---

### Task 2: Token layer

**Files:**
- Modify: `src/app/[locale]/layout.tsx` (font imports and `<html>` class)
- Modify: `src/app/globals.css` (palette, type scale, pixel tokens)
- Modify: `tailwind.config.ts` (font families, fontSize tokens, boxShadow, borderRadius)
- Delete: `src/app/specimen/page.tsx`

**Interfaces:**
- Produces:
  - CSS vars `--font-pixel`, `--font-sans`, `--pixel-shadow`, `--pixel-shadow-sm`, `--pixel-border`
  - Tailwind families `font-pixel`, `font-sans`
  - Tailwind sizes `text-display`, `text-h2`, `text-h3`, `text-body`, `text-label`
  - Tailwind shadows `shadow-pixel`, `shadow-pixel-sm`
  - `defaultTheme` is now `"dark"`

- [ ] **Step 1: Swap the fonts in the layout**

Replace the `Playfair_Display` import and constant:

```tsx
import { Handjet, Inter } from "next/font/google";

/* Handjet: variable 100..900, has the `vietnamese` subset. Chosen over
   VT323 because the weight axis is what makes chunky display type possible;
   VT323 is single-weight and terminal-thin. Press Start 2P and Pixelify Sans
   were rejected outright — no Vietnamese glyphs. */
const pixel = Handjet({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
  variable: "--font-pixel",
});

const sans = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
  variable: "--font-sans",
});
```

Update the `<html>` className to `` `${sans.variable} ${pixel.variable}` `` and change `defaultTheme="light"` to `defaultTheme="dark"`.

- [ ] **Step 2: Add pixel tokens to `globals.css`**

Inside the existing `@layer base` `:root` block, after `--ease-editorial`:

```css
    /* Do day vien va do lech bong — mot cho duy nhat, moi primitive doc tu day. */
    --pixel-border: 3px;
    --pixel-shadow: 4px 4px 0 0 hsl(var(--foreground));
    --pixel-shadow-sm: 2px 2px 0 0 hsl(var(--foreground));
```

- [ ] **Step 3: Add the type scale and families to `tailwind.config.ts`**

```ts
      fontFamily: {
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(3.5rem, 12vw, 8.75rem)", { lineHeight: "0.92", letterSpacing: "0.01em" }],
        h2: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.0" }],
        h3: ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.1" }],
        body: ["clamp(1.125rem, 1.4vw, 1.375rem)", { lineHeight: "1.6" }],
        label: ["0.875rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },
      boxShadow: {
        pixel: "var(--pixel-shadow)",
        "pixel-sm": "var(--pixel-shadow-sm)",
      },
      borderRadius: { none: "0", DEFAULT: "0", sm: "0", md: "0", lg: "0", full: "0" },
```

- [ ] **Step 4: Delete the specimen page**

```bash
rm src/app/specimen/page.tsx
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx next lint && npx next build
```

Expected: all pass. The build will still render the old layout — that is correct at this stage; only tokens changed.

- [ ] **Step 6: Verify Vietnamese glyphs actually load**

Serve the build and confirm the `vietnamese` woff2 for Handjet appears in the network requests for `/vi`, and that no glyph renders as a fallback box.

- [ ] **Step 7: Commit**

```bash
git add src/app/[locale]/layout.tsx src/app/globals.css tailwind.config.ts
git commit -m "feat: pixel token layer — Handjet display face, fluid scale, hard shadows"
```

---

### Task 3: Pixel primitives

**Files:**
- Create: `src/components/ui/pixel/pixel-button.tsx`
- Create: `src/components/ui/pixel/pixel-panel.tsx`
- Create: `src/components/ui/pixel/pixel-tag.tsx`
- Modify: `src/app/globals.css` (press interaction)

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`; tokens from Task 2
- Produces:
  - `PixelButton({ children, href, variant?: "primary" | "secondary", size?: "default" | "sm", external?: boolean, className?, ...buttonProps })`
  - `PixelPanel({ children, className?, as?: "div" | "article" | "section" })`
  - `PixelTag({ children, className? })`

- [ ] **Step 1: Write `pixel-button.tsx`**

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "default" | "sm";

const BASE =
  "pixel-press inline-flex items-center justify-center gap-2 border-[length:var(--pixel-border)] font-pixel uppercase tracking-[0.12em] shadow-pixel " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-0 " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANT: Record<Variant, string> = {
  primary: "border-foreground bg-brand text-brand-foreground",
  secondary: "border-foreground bg-transparent text-foreground hover:bg-secondary",
};

const SIZE: Record<Size, string> = {
  default: "h-14 px-8 text-[1.375rem]",
  sm: "h-10 px-4 text-[1rem]",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type Props =
  | (CommonProps & { href: string; external?: boolean } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        "href" | "className" | "children"
      >)
  | (CommonProps & { href?: undefined } & Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        "className" | "children"
      >);

/**
 * Nút kiểu game: viền dày, bóng cứng, bấm là lún xuống đúng bằng độ lệch bóng.
 *
 * Có `href` thì render <a>, không thì <button>. Không bao giờ dùng <div> gắn
 * onClick — bàn phím và screen reader sẽ không thấy nó là điều khiển.
 */
export function PixelButton({
  children,
  variant = "primary",
  size = "default",
  className,
  ...rest
}: Props) {
  const classes = cn(BASE, VARIANT[variant], SIZE[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, external, ...anchorProps } = rest as CommonProps & {
      href: string;
      external?: boolean;
    } & React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Add the press interaction to `globals.css`**

In the `@layer components` motion block, beside `.project-rule`:

```css
  /* --- Bam la lun xuong: dich dung bang do lech bong roi bo bong ---
     Day la thu lam nut "ra nut". Dung transform chu khong phai margin nen
     khong lam nhay layout xung quanh. */
  .pixel-press {
    transition:
      transform 0.06s linear,
      box-shadow 0.06s linear;
  }

  .pixel-press:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
```

And in the `prefers-reduced-motion` block add `.pixel-press { transition: none; }` — the transform itself stays, because it is the affordance, not decoration.

- [ ] **Step 3: Write `pixel-panel.tsx`**

```tsx
import { cn } from "@/lib/utils";

/** Khung có viền dày và bóng cứng. Dùng cho dòng dự án, khối stack, khối detail. */
export function PixelPanel({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  return (
    <Tag
      className={cn(
        "border-[length:var(--pixel-border)] border-foreground bg-background shadow-pixel",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 4: Write `pixel-tag.tsx`**

```tsx
import { cn } from "@/lib/utils";

/** Thẻ tên công nghệ. KHÔNG có bóng — nó không bấm được, không được trông như nút. */
export function PixelTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-line px-3 py-1 font-pixel text-[1rem] uppercase tracking-[0.1em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx next lint && npx next build
```

Expected: all pass. Nothing renders these yet.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/pixel src/app/globals.css
git commit -m "feat: pixel primitives — button with press affordance, panel, tag"
```

---

### Task 4: Screen layout and HUD header

**Files:**
- Create: `src/components/ui/screen.tsx`
- Delete: `src/components/ui/grid-lines.tsx`
- Modify: `src/app/[locale]/layout.tsx` (drop `GridLines`, widen shell)
- Modify: `src/app/globals.css` (`.shell` max-width)
- Modify: `src/components/layout/header.tsx`
- Modify: `src/components/layout/section-nav.tsx` (nav link typography only)

**Interfaces:**
- Consumes: `Reveal`, `PixelButton`
- Produces: `Screen({ id, index, heading, children, className? })` — same `id`/`index`/`heading` contract as the deleted `Section`, so callers change import and tag name only.

- [ ] **Step 1: Write `screen.tsx`**

```tsx
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type ScreenProps = {
  /** Trùng NavItem.id trong content để anchor link chạy. */
  id: string;
  /** Số thứ tự, ví dụ "01". */
  index: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Một "màn" chiếm trọn chiều cao viewport.
 *
 * Cố tình KHÔNG dùng scroll-snap: màn Stack cao hơn viewport sau khi mở một
 * category, snap sẽ khoá người đọc ở giữa và phá cuộn bằng bàn phím.
 * min-h-dvh (không phải min-h-screen) để thanh địa chỉ trên mobile không làm
 * màn bị hụt.
 */
export function Screen({ id, index, heading, children, className }: ScreenProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-dvh scroll-mt-20 flex-col justify-center py-24 md:py-32",
        className,
      )}
    >
      <Reveal>
        <p className="mb-8 font-pixel text-label uppercase text-muted-foreground md:mb-12">
          <span className="text-brand">{index}</span>
          <span className="px-3 text-line">/</span>
          {heading}
        </p>
      </Reveal>

      <div className="min-w-0">{children}</div>
    </section>
  );
}
```

- [ ] **Step 2: Delete `grid-lines.tsx` only**

```bash
rm src/components/ui/grid-lines.tsx
```

`src/components/ui/section.tsx` stays for now — five files still import it
(`about`, `contact`, `experience`, `projects`, `tech-stack`). It is deleted in
Task 7, once the last consumer has moved. Every commit must build.

Do **not** delete `src/components/ui/separated.tsx`: `Separator` is still used by
`locale-toggle.tsx`, `experience.tsx` and `tech-stack.tsx`.

- [ ] **Step 3: Remove `GridLines` from the layout**

Delete the `import { GridLines } ...` line and the `<GridLines />` element from `src/app/[locale]/layout.tsx`.

- [ ] **Step 4: Widen the shell**

In `globals.css`, change `.shell`'s max-width from `1100px` to `1280px`.

- [ ] **Step 5: Rebuild the header as a HUD**

Keep `SectionNav` and the progress bar untouched — both were measured and fixed
on 2026-09-07. Only the shell typography and border change. In
`src/components/layout/header.tsx`, the `<header>` element becomes:

```tsx
<header className="sticky top-0 z-50 border-b-[length:var(--pixel-border)] border-foreground bg-background/90 backdrop-blur-md">
```

and the name becomes:

```tsx
<a href={`/${locale}`} className="font-pixel text-[1.25rem] uppercase tracking-[0.12em]">
  {PROFILE.name}
</a>
```

In `src/components/layout/section-nav.tsx`, change the nav link class from
`text-[13px]` to `font-pixel text-label uppercase`. Change nothing else in that
file.

- [ ] **Step 6: Verify**

```bash
npx tsc --noEmit && npx next lint && npx next build
```

Expected: all pass. `Screen` exists but nothing renders it yet, and the old
`Section` still serves every screen — the site looks unchanged apart from the
missing side rules and the wider shell.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add full-height Screen; drop side grid lines"
```

---

### Task 5: Rebuild home screens

**Files:**
- Modify: `src/components/sections/hero.tsx`
- Modify: `src/components/sections/about.tsx`
- Modify: `src/components/sections/experience.tsx`
- Modify: `src/components/sections/contact.tsx`
- Modify: `src/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `Screen`, `PixelButton`, `PixelPanel`, `PixelTag`
- Produces: nothing new — same component names and props

- [ ] **Step 1: Swap `Section` → `Screen` in every section file**

Change the import and the JSX tag. Props are identical, so nothing else moves.

- [ ] **Step 2: Rebuild the hero**

Name at `text-display font-pixel`, positioning line at `text-body` in `font-sans` with `max-w-3xl`, and exactly two controls:

```tsx
<div className="mt-12 flex flex-wrap gap-4">
  <PixelButton href={PROFILE.resumeUrl} external>
    {ui.resume[locale]}
  </PixelButton>
  <PixelButton href="#contact" variant="secondary">
    {ui.contact[locale]}
  </PixelButton>
</div>
```

`PROFILE.resumeUrl` and `ui.resume` do not exist yet — they arrive in Task 8. Until then use `PROFILE.cvUrl` and the existing CV label, and change both in Task 8.

- [ ] **Step 3: Scale the body copy in about / experience / contact**

Replace `text-lg` / `text-body` usages with the new `text-body` token, headings with `text-h2 font-pixel`, and wrap the experience timeline entries in `PixelPanel`.

- [ ] **Step 4: Verify**

```bash
npx tsc --noEmit && npx next lint && npx next build
```

Expected: build now passes again.

- [ ] **Step 5: Measure for horizontal overflow**

Serve the build and, at widths 320, 768 and 1440, assert `document.documentElement.scrollWidth <= clientWidth` on both `/en` and `/vi`. Large type is the most likely cause of a regression here.

Expected: no overflow at any width in either locale.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: rebuild home screens on pixel primitives"
```

---

### Task 6: Stack category filter

**Files:**
- Modify: `src/data/content/tech-stack.ts`
- Create: `src/components/sections/stack-filter.tsx` (client)
- Modify: `src/components/sections/tech-stack.tsx`

**Interfaces:**
- Consumes: `PixelButton`, `PixelTag`
- Produces:
  - `TechGroup` gains no fields; the `languages` group is **split** into `languages` and `frameworks`
  - `StackFilter({ groups, allLabel })` where `groups: { id: string; label: string; note?: string; items: string[] }[]` — note these are **already-translated strings**, not `L`, so the client bundle does not swallow the content tree

- [ ] **Step 1: Split the stack data**

In `src/data/content/tech-stack.ts`, replace the single `languages` group with two:

```ts
    {
      id: "languages",
      label: { en: "Languages", vi: "Ngôn ngữ" },
      note: { en: "Daily driver", vi: "Dùng hằng ngày" },
      items: ["TypeScript", "JavaScript"],
    },
    {
      id: "frameworks",
      label: { en: "Frameworks", vi: "Framework" },
      note: { en: "Daily driver", vi: "Dùng hằng ngày" },
      items: ["Node.js", "Express.js", "NestJS", "React"],
    },
```

- [ ] **Step 2: Add the `all` label to `site.ts`**

In the `ui` object: `all: { en: "All", vi: "Tất cả" },`

- [ ] **Step 3: Write `stack-filter.tsx`**

```tsx
"use client";

import { useState } from "react";

import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelPanel } from "@/components/ui/pixel/pixel-panel";
import { PixelTag } from "@/components/ui/pixel/pixel-tag";

type Group = { id: string; label: string; note?: string; items: string[] };

const ALL = "all";

/**
 * Hàng category + danh sách lọc theo category.
 *
 * Nhãn truyền vào đã dịch sẵn, nên client bundle không phải nuốt cả cây nội
 * dung song ngữ. Trạng thái chọn để cục bộ, cố tình không đẩy lên URL: link
 * tới một tab đã lọc không mang ý nghĩa gì cho người nhận.
 */
export function StackFilter({ groups, allLabel }: { groups: Group[]; allLabel: string }) {
  const [active, setActive] = useState(ALL);
  const shown = active === ALL ? groups : groups.filter((g) => g.id === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {[{ id: ALL, label: allLabel }, ...groups].map((g) => (
          <PixelButton
            key={g.id}
            size="sm"
            variant={active === g.id ? "primary" : "secondary"}
            aria-pressed={active === g.id}
            onClick={() => setActive(g.id)}
          >
            {g.label}
          </PixelButton>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {shown.map((g) => (
          <PixelPanel key={g.id} className="p-6">
            <h3 className="font-pixel text-h3 uppercase">{g.label}</h3>
            {g.note && (
              <p className="mt-1 font-pixel text-label uppercase text-muted-foreground">
                {g.note}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <PixelTag key={item}>{item}</PixelTag>
              ))}
            </div>
          </PixelPanel>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Move `tech-stack.tsx` onto `Screen` and translate there**

Swap its `Section` import for `Screen` (identical props), then map `L` to plain
strings for the active locale before handing them to the client component:

```tsx
<StackFilter
  allLabel={ui.all[locale]}
  groups={techStack.groups.map((g) => ({
    id: g.id,
    label: g.label[locale],
    note: g.note?.[locale],
    items: g.items,
  }))}
/>
```

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx next lint && npx next build
```

- [ ] **Step 6: Measure the filter behaviour**

Serve the build. Assert: `ALL` is active on load and renders 5 panels; clicking `DATABASES` leaves 1 panel and sets `aria-pressed="true"` on exactly one button; the page still has no horizontal overflow with all panels open.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: stack category filter; split languages and frameworks"
```

---

### Task 7: Project detail pages

**Files:**
- Modify: `src/data/content/projects.ts` (add `links`)
- Create: `src/app/[locale]/work/[slug]/page.tsx`
- Create: `src/components/sections/project-row.tsx` (home list row)
- Create: `src/components/sections/project-detail.tsx` (detail body)
- Delete: `src/components/sections/project-entry.tsx`
- Delete: `src/components/ui/section.tsx` (last consumer migrates here)
- Modify: `src/components/sections/projects.tsx`
- Modify: `src/data/content/site.ts` (labels: `viewDetail`, `backToWork`, `links`)

**Interfaces:**
- Consumes: `PixelPanel`, `PixelButton`, `PixelTag`, `ProjectVisuals`, `Screen`
- Produces:
  - `Project` gains `links?: { label: L; href: string; kind: "live" | "repo" | "doc" }[]`
  - `ProjectRow({ project, index, locale })`
  - `ProjectDetail({ project, locale })`

- [ ] **Step 1: Add the `links` field to the `Project` type**

```ts
  /**
   * Link ra sản phẩm thật hoặc mã nguồn. Tuỳ chọn — dự án của khách hàng
   * thường không public. Rỗng thì trang detail KHÔNG vẽ khối links, nên
   * không bao giờ lòi ra một mảng trống.
   */
  links?: { label: L; href: string; kind: "live" | "repo" | "doc" }[];
```

Do not populate it for any project. The owner supplies the URLs.

- [ ] **Step 2: Add the new UI labels to `site.ts`**

```ts
  viewDetail: { en: "View detail", vi: "Xem chi tiết" },
  backToWork: { en: "Back to work", vi: "Quay lại dự án" },
  projectLinks: { en: "Links", vi: "Liên kết" },
```

- [ ] **Step 3: Write `project-row.tsx`**

```tsx
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelPanel } from "@/components/ui/pixel/pixel-panel";
import { PixelTag } from "@/components/ui/pixel/pixel-tag";
import { content, type Project } from "@/data/content";
import type { Locale } from "@/lib/i18n";

/**
 * Mot dong trong bang chon du an tren trang chu.
 *
 * CO Y khong co van xuoi va khong co hinh: ba doan problem/solution/result va
 * diagram deu da chuyen han sang trang detail. Man WORK phai vua mot man hinh.
 */
export function ProjectRow({
  project,
  index,
  locale,
}: {
  project: Project;
  index: string;
  locale: Locale;
}) {
  const { ui } = content;

  return (
    <PixelPanel as="article" className="group p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <span className="font-pixel text-label text-brand">{index}</span>
        <span className="font-pixel text-label text-muted-foreground">
          {project.period[locale]}
        </span>
      </div>

      <h3 className="mt-4 font-pixel text-h3 uppercase">{project.title}</h3>

      <p className="mt-3 max-w-2xl text-body text-muted-foreground">
        {project.tagline[locale]}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <PixelTag>{tag}</PixelTag>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <PixelButton href={`/${locale}/work/${project.id}`} size="sm">
          {ui.viewDetail[locale]}
        </PixelButton>
      </div>
    </PixelPanel>
  );
}
```

- [ ] **Step 4: Write `project-detail.tsx`**

```tsx
import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelTag } from "@/components/ui/pixel/pixel-tag";
import { ProjectVisuals } from "@/components/visuals/project-visual";
import { content, type Project } from "@/data/content";
import type { Locale } from "@/lib/i18n";

/** Trang chi tiet mot du an. Day la noi duy nhat con van xuoi va hinh ve. */
export function ProjectDetail({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const { ui, projects } = content;
  const rows = [
    { key: "problem", label: projects.labels.problem[locale], value: project.problem[locale] },
    { key: "solution", label: projects.labels.solution[locale], value: project.solution[locale] },
    { key: "result", label: projects.labels.result[locale], value: project.result[locale] },
  ];

  return (
    <article className="py-24 md:py-32">
      <p className="font-pixel text-label uppercase text-muted-foreground">
        {project.period[locale]}
      </p>

      <h1 className="mt-4 font-pixel text-display uppercase">{project.title}</h1>

      <p className="mt-6 max-w-3xl text-body text-muted-foreground">
        {project.tagline[locale]}
      </p>

      {/* Khoi links CHI hien khi that su co link. Du an cua khach hang thuong
          khong public, va mot muc rong trong hon la khong co muc nao. */}
      {project.links?.length ? (
        <div className="mt-8">
          <h2 className="font-pixel text-label uppercase text-muted-foreground">
            {ui.projectLinks[locale]}
          </h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <PixelButton key={link.href} href={link.href} external size="sm">
                {link.label[locale]}
              </PixelButton>
            ))}
          </div>
        </div>
      ) : null}

      <dl className="mt-14 space-y-8">
        {rows.map((row) => (
          <div key={row.key} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
            <dt className="font-pixel text-label uppercase text-muted-foreground md:pt-2">
              {row.label}
            </dt>
            <dd className="max-w-3xl text-body">{row.value}</dd>
          </div>
        ))}
      </dl>

      <ProjectVisuals visuals={project.visuals} locale={locale} />

      <ul className="mt-10 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <PixelTag>{tag}</PixelTag>
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <PixelButton href={`/${locale}#work`} variant="secondary">
          {ui.backToWork[locale]}
        </PixelButton>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: Write the route**

```tsx
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/sections/project-detail";
import { content } from "@/data/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    content.projects.items.map((p) => ({ locale, slug: p.id })),
  );
}

export default function WorkDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const project = content.projects.items.find((p) => p.id === params.slug);
  if (!project) notFound();

  return <ProjectDetail project={project} locale={locale} />;
}
```

Add `generateMetadata` mirroring the home page's canonical + `hreflang` treatment, with the project title in the page title.

- [ ] **Step 6: Rewire `projects.tsx`, then delete the last two dead files**

`projects.tsx` swaps `Section` for `Screen` and renders one `ProjectRow` per
project. That was the final `Section` consumer, so both files can now go:

```bash
rm src/components/sections/project-entry.tsx src/components/ui/section.tsx
grep -rn "ui/section\"\|project-entry" src/
```

Expected: no hits. Leave `src/components/ui/separated.tsx` alone — `Separator`
is still used by `locale-toggle.tsx` and `experience.tsx`.

- [ ] **Step 7: Verify**

```bash
npx tsc --noEmit && npx next lint && npx next build
```

Expected: build output lists 8 new static paths — `/en/work/<slug>` and `/vi/work/<slug>` for all four slugs (`aivn-elearning`, `kyc-platform`, `marketplace`, `hedera-esg`).

- [ ] **Step 8: Measure the detail page**

Serve the build. On `/en/work/aivn-elearning`: the diagram renders, `DiagramMotion` still fires with a meaningful fraction of the diagram visible, no links block appears (since `links` is unset), and the back button returns to `/en#work`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: static project detail pages; home work screen becomes a list"
```

---

### Task 8: Resume

**Files:**
- Rename: `public/cv.pdf` → `public/resume.pdf`
- Modify: `src/data/content/profile.ts`
- Modify: `src/data/content/site.ts`
- Modify: `src/components/sections/hero.tsx`, `src/components/sections/contact.tsx`

**Interfaces:**
- Produces: `PROFILE.resumeUrl` replaces `PROFILE.cvUrl`; `ui.resume` replaces the CV label

- [ ] **Step 1: Rename the file**

```bash
git mv public/cv.pdf public/resume.pdf
```

- [ ] **Step 2: Rename the profile field**

```ts
  /** File resume trong /public — sinh từ Thai-Nguyen-Resume.docx. */
  resumeUrl: "/resume.pdf",
```

- [ ] **Step 3: Update the label in `site.ts`**

```ts
  resume: { en: "Resume", vi: "Resume" },
```

- [ ] **Step 4: Update every consumer**

```bash
grep -rn "cvUrl\|downloadCv\|\bCV\b" src/
```

Expected after edits: no hits. The control is a plain link with `external` (new tab), **not** `download` — the request was to open the resume, not force a save.

- [ ] **Step 5: Verify**

```bash
npx tsc --noEmit && npx next lint && npx next build
```

- [ ] **Step 6: Confirm the PDF is reachable**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3100/resume.pdf
```

Expected: `200`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: CV becomes Resume, opens the PDF in a new tab"
```

---

### Task 9: Diagram stroke pass

**Files:**
- Modify: `src/components/visuals/svg-primitives.tsx`

**Interfaces:**
- Consumes: nothing new
- Produces: no API change — only rendered stroke weight changes

- [ ] **Step 1: Capture a before render**

Render the AIVN diagram standalone to PNG for both locales and keep the files for comparison.

- [ ] **Step 2: Thicken the strokes**

In `svg-primitives.tsx` only: `strokeWidth={1}` → `strokeWidth={2}` on `Box`, `Frame`, `Line` and `Arrow`; `BUS_THICKNESS` `12` → `14`; `HEAD` `7` → `9`.

Do not touch coordinates, the label table `T`, `lane()`, or any `.dg-*` class.

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit && npx next lint && npx next build
```

- [ ] **Step 4: Compare renders**

Render both locales again. Expected: strokes visibly heavier, every box and label in the same position as before, no overlap introduced, and the arrowheads still meet their lines.

- [ ] **Step 5: Confirm the self-draw still runs**

Assert that after scrolling to the diagram, 0 animated SVG nodes remain hidden, and with `prefers-reduced-motion` emulated nothing is hidden at 80ms.

- [ ] **Step 6: Commit**

```bash
git add src/components/visuals/svg-primitives.tsx
git commit -m "feat: heavier diagram strokes to match the pixel weight"
```

---

### Task 10: Documentation

**Files:**
- Create: `DESIGN.md`
- Modify: `README.md` (convert to English)

**Interfaces:**
- Consumes: nothing
- Produces: nothing

- [ ] **Step 1: Write `DESIGN.md` in English**

Sections: Principles · Tokens (colors, type scale, spacing, borders, shadows) · Primitives (`PixelButton`, `PixelPanel`, `PixelTag` with prop tables) · Layout (`Screen`, shell width, why no scroll-snap) · Motion (`Reveal`, `DiagramMotion`, the derived `--dg-*` timing chain, reduced-motion contract) · Accessibility (contrast floors, focus, `aria-pressed`, 320px floor) · Content rules (`L` type, the `.ts` extension requirement in `src/data/content/`).

- [ ] **Step 2: Convert `README.md` to English**

Keep the same structure; translate the prose. Record the pnpm-only constraint and the `PROFILE.siteUrl` placeholder as known setup steps.

- [ ] **Step 3: Verify no placeholders shipped**

```bash
npx tsc --noEmit && npx next lint && npx next build && npm run check:todo
```

- [ ] **Step 4: Commit**

```bash
git add DESIGN.md README.md
git commit -m "docs: add DESIGN.md, convert README to English"
```

---

## Final verification

Run against a fresh production build before declaring the redesign done:

| Check | Expected |
|---|---|
| `npx tsc --noEmit` | clean — proves no missing translation |
| `npx next lint` | clean |
| `npx next build` | clean; 10 static paths (2 locales × home + 4 details) |
| Horizontal overflow at 320 / 768 / 1440, both locales, home + one detail | none |
| Accent contrast, both themes | ≥ 4.5:1 |
| Reduced motion at 80ms | nothing hidden |
| Normal motion after full scroll | 0 revealed elements and 0 SVG nodes hidden |
| `/resume.pdf` | 200 |
| `grep -rn "cvUrl" src/` | no hits |

## Known follow-ups, not in this plan

- `PROFILE.siteUrl` is still `https://your-domain.vercel.app`, which makes every canonical URL, `hreflang`, sitemap entry and OG image URL wrong. Needs the real domain.
- `links` is empty for all four projects until the owner supplies URLs.
- `src/components/ui/slider.tsx` and `public/work/examdee/` (848 KB) are reachable only if an `image` visual exists in content; currently none does.
