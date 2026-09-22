import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    // Dat o cap theme (khong phai extend) de thay the hoan toan thang mac
    // dinh cua Tailwind — "border-radius: 0 everywhere, no exceptions" nghia
    // la ca cac key khong liet ke o day (xl, 2xl, 3xl, ...) cung khong con
    // ton tai, chu khong chi bi ghi de bang 0.
    borderRadius: { none: "0", DEFAULT: "0", sm: "0", md: "0", lg: "0", full: "0" },
    extend: {
      maxWidth: { shell: "1280px" },
      // Bien le dinh nghia trong globals.css. Dang ky vao spacing scale de
      // dung duoc nhu utility binh thuong (px-content, left-content) thay vi
      // phai viet style={{}} inline.
      spacing: {
        content: "var(--content-inset)",
      },
      colors: {
        // --- Token chuan shadcn/ui (giu nguyen de `npx shadcn add` chay duoc) ---
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        // --- Token rieng cua site ---
        // `brand` la mau accent DUY NHAT cua thiet ke (cam dat).
        // Dat ten khac `accent` vi shadcn da dung `accent` cho mau nen hover.
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
        // Mau duong ke grid manh.
        line: "hsl(var(--line))",
      },
      fontFamily: {
        // Mono cho .meta-label.
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        // Display pixel: Handjet. Body/UI: Inter.
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Thang chu fluid pixel/game, tracking chat set trong globals.css.
        display: [
          "clamp(3.5rem, 12vw, 8.75rem)",
          { lineHeight: "0.92", letterSpacing: "0.01em", fontWeight: "700" },
        ],
        h2: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.0" }],
        h3: ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.1" }],
        // Van xuoi: 22px -> 28px. Thiet ke cu dung 20px co dinh; o co display
        // 8.75rem thi 20px doc nhu chu thich, nen than chu phai len theo.
        body: ["clamp(1.375rem, 1.8vw, 1.75rem)", { lineHeight: "1.55" }],
        // Nhan UI — weight 500 (Handjet 700 qua nang o co nho, 500 doc duoc
        // va van chac khoe). 18px de khong bi than chu 22px nuot mat.
        label: ["1.125rem", { lineHeight: "1.2", letterSpacing: "0.18em", fontWeight: "500" }],
        // Chu tren control pixel (nut, ten o header). CO DINH chu khong fluid
        // nhu `body`: nut cao h-14 = 56px, chu 28px trong do la chat cung.
        // Tracking do chinh call site dat (nut 0.12em) de con dieu chinh duoc.
        ui: ["1.375rem", { lineHeight: "1.2" }],
        // Van xuoi phu (footer). Khong tracking, khong uppercase — no la cau
        // viet thuong, khong phai nhan.
        small: ["1.125rem", { lineHeight: "1.5" }],
        // .meta-label trong globals.css — nhan mono nho nhat con doc duoc.
        meta: ["0.9375rem", { lineHeight: "1.3", letterSpacing: "0.14em" }],
      },
      boxShadow: {
        pixel: "var(--pixel-shadow)",
        "pixel-sm": "var(--pixel-shadow-sm)",
      },
      letterSpacing: { tightest: "-0.045em" },
      transitionTimingFunction: {
        // Easing dung chung cho moi animation cua site.
        editorial: "var(--ease-editorial)",
      },
    },
  },
  plugins: [],
};

export default config;
