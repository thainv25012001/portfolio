import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    // Container canh giua, max-width 1100px theo yeu cau thiet ke.
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2rem" },
      screens: { "2xl": "1100px" },
    },
    // Dat o cap theme (khong phai extend) de thay the hoan toan thang mac
    // dinh cua Tailwind — "border-radius: 0 everywhere, no exceptions" nghia
    // la ca cac key khong liet ke o day (xl, 2xl, 3xl, ...) cung khong con
    // ton tai, chu khong chi bi ghi de bang 0.
    borderRadius: { none: "0", DEFAULT: "0", sm: "0", md: "0", lg: "0", full: "0" },
    extend: {
      maxWidth: { shell: "1100px" },
      // Hai bien le dinh nghia trong globals.css. Dang ky vao spacing scale de
      // dung duoc nhu utility binh thuong (px-content, mx-frame, left-content)
      // thay vi phai viet style={{}} inline.
      spacing: {
        frame: "var(--frame-inset)",
        content: "var(--content-inset)",
        "section-gap": "var(--section-gap)",
        // Be rong cot nhan + khoang cach: hinh ve rong lui trai dung bang
        // day la tran het chieu ngang cua section.
        bleed: "calc(var(--section-label-w) + var(--section-gap))",
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
        // Heading (con lai tu ban thiet ke cu, cho toi khi component doi sang
        // pixel/sans o task sau) va mono cho .meta-label.
        display: ["var(--font-display)", "Georgia", "serif"],
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
        body: ["clamp(1.125rem, 1.4vw, 1.375rem)", { lineHeight: "1.6" }],
        // Nhan UI nho — weight 500 theo phan xu type specimen (Handjet 700
        // qua nang o co nho, 500 doc duoc va van chac khoe).
        label: ["0.875rem", { lineHeight: "1.2", letterSpacing: "0.18em", fontWeight: "500" }],
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
