import type { L } from "@/lib/i18n";

/* ---- 1. Hero ----------------------------------------------------------- */

export type Hero = {
  role: L;
  /** Dòng trạng thái dưới tên ở Hero. Bỏ trống thì không render. */
  availability?: L;
  positioning: L;
};

export const hero: Hero = {
  role: { en: "Full-Stack Developer", vi: "Full-Stack Developer" },
  // Cố tình ngắn, KHÔNG lặp lại câu ở phần Liên hệ: chữ ở đây là nhãn
  // uppercase 18px giãn 0.18em nằm dưới cái tên cỡ display — một câu dài sẽ
  // xuống dòng gãy và tranh chỗ với tên.
  availability: {
    en: "Open to work in the US",
    vi: "Đang tìm việc tại Mỹ",
  },
  positioning: {
    en: "Full Stack JavaScript Developer specializing in MERN Stack, PERN Stack, and Next.js, building fast, scalable, and modern web applications with clean UI and high-performance backend systems.",
    vi: "Full Stack JavaScript Developer specializing in MERN Stack, PERN Stack, and Next.js, building fast, scalable, and modern web applications with clean UI and high-performance backend systems.",
  },
};
