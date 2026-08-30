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
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://linkedin.com/in/${PROFILE.linkedin}`,
    },
    // Resume không có GitHub nên tôi không đưa vào. Muốn thêm thì bỏ comment
    // dòng dưới và thay bằng username thật:
    // { id: "github", label: "GitHub", href: "https://github.com/USERNAME" },
  ],
};
