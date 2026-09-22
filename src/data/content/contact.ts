import type { L } from "@/lib/i18n";

import { PROFILE } from "./profile.ts";

/* ---- 6. Contact -------------------------------------------------------- */

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export type Contact = {
  heading: L;
  blurb: L;
  emailLabel: L;
  socials: SocialLink[];
};

export const contact: Contact = {
  heading: { en: "Contact", vi: "Liên hệ" },
  blurb: {
    en: "Open to full-stack and back-end roles in the US. Email is the fastest way to reach me.",
    vi: "Sẵn sàng cho các vị trí full-stack và back-end tại Mỹ. Nhanh nhất là gửi email.",
  },
  emailLabel: { en: "Email", vi: "Email" },
  /**
   * Danh sách này là NGUỒN DUY NHẤT cho cả ba nơi: section Liên hệ, thẻ
   * JSON-LD `sameAs` trong layout, và cụm nút dán ở góc phải màn hình
   * (SocialDock). Thêm một mạng xã hội ở đây là cả ba chỗ cùng có; riêng
   * SocialDock chỉ hiện những `id` mà nó có sẵn icon.
   */
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: `https://github.com/${PROFILE.github}`,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/in/${PROFILE.linkedin}`,
    },
  ],
};
