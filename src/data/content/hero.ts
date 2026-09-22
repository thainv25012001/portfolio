import type { L } from "@/lib/i18n";

/* ---- 1. Hero ----------------------------------------------------------- */

export type Hero = {
  role: L;
  currentRole: L;
  positioning: L;
  primaryCta: L;
  secondaryCta: L;
};

export const hero: Hero = {
  role: { en: "Full-Stack Developer", vi: "Full-Stack Developer" },
  currentRole: {
    en: "Full-Stack Developer",
    vi: "Full-Stack Developer",
  },
  positioning: {
    en: "Full Stack JavaScript Developer specializing in MERN Stack, PERN Stack, and Next.js, building fast, scalable, and modern web applications with clean UI and high-performance backend systems.",
    vi: "Full Stack JavaScript Developer specializing in MERN Stack, PERN Stack, and Next.js, building fast, scalable, and modern web applications with clean UI and high-performance backend systems.",
  },
  primaryCta: { en: "View projects", vi: "Xem dự án" },
  secondaryCta: { en: "Download CV", vi: "Tải CV" },
};
