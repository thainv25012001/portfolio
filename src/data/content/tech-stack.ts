import type { L } from "@/lib/i18n";

/* ---- 3. Tech Stack (nhóm, dạng text list) ------------------------------
   Chia nhóm theo đúng cách resume của bạn chia.
   ---------------------------------------------------------------------- */

export type TechGroup = {
  id: string;
  label: L;
  /** Tên công nghệ không dịch, giữ nguyên ở cả hai ngôn ngữ. */
  items: string[];
  note?: L;
};

export type TechStack = { heading: L; groups: TechGroup[] };

export const techStack: TechStack = {
  heading: { en: "Stack", vi: "Công nghệ" },
  groups: [
    {
      id: "languages",
      label: { en: "Languages & Frameworks", vi: "Ngôn ngữ & Framework" },
      note: { en: "Daily driver", vi: "Dùng hằng ngày" },
      items: ["Node.js", "Express.js", "NestJS", "React", "JavaScript"],
    },
    {
      id: "databases",
      label: { en: "Databases", vi: "Cơ sở dữ liệu" },
      note: { en: "In production", vi: "Đã chạy thực tế" },
      items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    },
    {
      id: "architecture",
      label: { en: "Architecture & Messaging", vi: "Kiến trúc & Messaging" },
      note: { en: "Core of my work", vi: "Trọng tâm công việc" },
      items: ["Microservices", "RabbitMQ", "Kafka", "Socket.IO", "REST APIs"],
    },
    {
      id: "tools",
      label: { en: "Tools", vi: "Công cụ" },
      note: { en: "Everyday", vi: "Thường dùng" },
      items: ["Git", "Docker", "Jira", "AWS (familiar)"],
    },
  ],
};
