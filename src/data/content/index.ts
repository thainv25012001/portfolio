/* ==========================================================================
   NỘI DUNG SITE
   Mọi chữ hiện trên màn hình đều nằm trong thư mục này. Component chỉ render.
   Sửa nội dung => sửa file tương ứng, không cần đụng vào JSX.

   Mỗi file ứng với đúng một section trên trang:

     profile.ts      thông tin cá nhân  (sửa đầu tiên)
     hero.ts         1. Hero
     about.ts        2. About
     tech-stack.ts   3. Stack
     projects.ts     4. Selected Work   (file dài nhất)
     experience.ts   5. Experience
     contact.ts      6. Contact
     site.ts         metadata, điều hướng, footer, nhãn screen reader

   File này chỉ gom lại. Mọi import cũ dạng `@/data/content` vẫn chạy nguyên.

   LƯU Ý: import giữa các file trong thư mục này phải ghi rõ đuôi `.ts`.
   scripts/generate-og.ts nạp thẳng chỗ này bằng type-stripping của Node, mà
   Node ESM không tự đoán đuôi file. Bỏ `.ts` đi là script sinh ảnh OG chết.
   ========================================================================== */

import { about, type About } from "./about.ts";
import { contact, type Contact } from "./contact.ts";
import { experience, type Experience } from "./experience.ts";
import { hero, type Hero } from "./hero.ts";
import { projects, type Projects } from "./projects.ts";
import {
  footer,
  meta,
  nav,
  ui,
  type Footer,
  type Meta,
  type Nav,
  type Ui,
} from "./site.ts";
import { techStack, type TechStack } from "./tech-stack.ts";

export type SiteContent = {
  meta: Meta;
  nav: Nav;
  hero: Hero;
  about: About;
  techStack: TechStack;
  projects: Projects;
  experience: Experience;
  contact: Contact;
  footer: Footer;
  ui: Ui;
};

export const content: SiteContent = {
  meta,
  nav,
  hero,
  about,
  techStack,
  projects,
  experience,
  contact,
  footer,
  ui,
};

export { PROFILE } from "./profile.ts";

/* Type công khai — component import từ "@/data/content" như trước. */
export type { About } from "./about.ts";
export type { Contact, SocialLink } from "./contact.ts";
export type { Experience, ExperienceItem } from "./experience.ts";
export type { Hero } from "./hero.ts";
export type {
  DiagramId,
  Project,
  ProjectVisual,
  Projects,
} from "./projects.ts";
export type { Footer, Meta, Nav, NavItem, Ui } from "./site.ts";
export type { TechGroup, TechStack } from "./tech-stack.ts";
