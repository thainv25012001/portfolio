import type { L } from "@/lib/i18n";

import { PROFILE } from "./profile.ts";

/* ==========================================================================
   PHẦN KHUNG CỦA SITE
   Metadata, điều hướng, footer và các nhãn cho screen reader — thứ không
   thuộc về một section nội dung nào cả. Ít phải sửa nhất.
   ========================================================================== */

/* ---- SEO / Open Graph -------------------------------------------------- */

export type Meta = { title: L; description: L; ogAlt: L };

export const meta: Meta = {
  title: {
    en: `${PROFILE.name} — Full-Stack Developer`,
    vi: `${PROFILE.name} — Full-Stack Developer`,
  },
  description: {
    en: `Full-stack developer with ${PROFILE.yearsOfExperience}+ years building microservice web platforms with Node.js, Express, NestJS and React. E-learning, KYC and e-commerce across Vietnam, the US and Malaysia.`,
    vi: `Full-stack developer hơn ${PROFILE.yearsOfExperience} năm xây nền tảng web microservice với Node.js, Express, NestJS và React. E-learning, KYC và thương mại điện tử ở Việt Nam, Mỹ và Malaysia.`,
  },
  ogAlt: {
    en: `${PROFILE.name} — Full-Stack Developer portfolio`,
    vi: `${PROFILE.name} — Portfolio Full-Stack Developer`,
  },
};

/* ---- Điều hướng -------------------------------------------------------- */

export type NavItem = {
  /** Trùng với id của thẻ <section> để anchor link chạy đúng. */
  id: string;
  label: L;
};

export type Nav = { items: NavItem[]; skipToContent: L };

export const nav: Nav = {
  items: [
    { id: "about", label: { en: "About", vi: "Giới thiệu" } },
    { id: "stack", label: { en: "Stack", vi: "Công nghệ" } },
    { id: "work", label: { en: "Work", vi: "Dự án" } },
    { id: "experience", label: { en: "Experience", vi: "Kinh nghiệm" } },
    { id: "contact", label: { en: "Contact", vi: "Liên hệ" } },
  ],
  skipToContent: {
    en: "Skip to content",
    vi: "Bỏ qua, tới nội dung chính",
  },
};

/* ---- Footer ------------------------------------------------------------ */

export type Footer = { rights: L; builtWith: L };

export const footer: Footer = {
  rights: {
    en: `© ${new Date().getFullYear()} ${PROFILE.name}`,
    vi: `© ${new Date().getFullYear()} ${PROFILE.name}`,
  },
  builtWith: {
    en: "Built with Next.js and Tailwind CSS",
    vi: "Dựng bằng Next.js và Tailwind CSS",
  },
};

/* ---- Nhãn cho screen reader -------------------------------------------- */

export type Ui = {
  toggleTheme: L;
  switchLanguage: L;
  backToTop: L;
  gallery: L;
  prevSlide: L;
  nextSlide: L;
};

export const ui: Ui = {
  toggleTheme: { en: "Toggle theme", vi: "Đổi giao diện sáng tối" },
  switchLanguage: { en: "Switch language", vi: "Đổi ngôn ngữ" },
  backToTop: { en: "Back to top", vi: "Lên đầu trang" },
  gallery: { en: "Project screenshots", vi: "Ảnh màn hình dự án" },
  prevSlide: { en: "Previous image", vi: "Ảnh trước" },
  nextSlide: { en: "Next image", vi: "Ảnh sau" },
};
