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
    extend: {
      maxWidth: { shell: "1100px" },
      // Hai bien le dinh nghia trong globals.css. Dang ky vao spacing scale de
      // dung duoc nhu utility binh thuong (px-content, mx-frame, left-content)
      // thay vi phai viet style={{}} inline.
      spacing: {
        frame: "var(--frame-inset)",
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
        // Heading: serif display. Body: Inter.
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        // Thang chu fluid cho heading, tracking chat set trong globals.css.
        display: ["clamp(2.75rem, 9vw, 5.25rem)", { lineHeight: "0.95" }],
        h2: ["clamp(2rem, 4.5vw, 3rem)", { lineHeight: "1.05" }],
        h3: ["clamp(1.375rem, 2.5vw, 1.75rem)", { lineHeight: "1.2" }],
      },
      letterSpacing: { tightest: "-0.045em" },
      borderRadius: { none: "0" },
      transitionTimingFunction: {
        // Easing dung chung cho moi animation cua site.
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
