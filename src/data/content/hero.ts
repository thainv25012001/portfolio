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
    en: "Full-Stack Developer at AIVN · Harrisburg, PA",
    vi: "Full-Stack Developer tại AIVN · Harrisburg, PA",
  },
  positioning: {
    en: "One of the first engineers on an AI education startup — I work across the backend services, the front end, and the message queues in between.",
    vi: "Một trong những thành viên đầu tiên của một startup giáo dục AI — tôi làm xuyên suốt từ service backend, giao diện, tới những hàng đợi thông điệp ở giữa.",
  },
  primaryCta: { en: "View projects", vi: "Xem dự án" },
  secondaryCta: { en: "Download CV", vi: "Tải CV" },
};
