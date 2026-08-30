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
    en: "I build event-driven web platforms — Node.js services, React front ends, and the message queues that keep them in sync.",
    vi: "Tôi xây nền tảng web hướng sự kiện — service Node.js, giao diện React, và những hàng đợi thông điệp giữ chúng đồng bộ.",
  },
  primaryCta: { en: "View projects", vi: "Xem dự án" },
  secondaryCta: { en: "Download CV", vi: "Tải CV" },
};
