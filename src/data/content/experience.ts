import type { L, LList } from "@/lib/i18n";

import { METRICS } from "./profile.ts";

/* ---- 5. Experience (timeline dọc) -------------------------------------- */

export type ExperienceItem = {
  id: string;
  company: string;
  role: L;
  period: L;
  /** Bỏ trống nếu không muốn hiện nơi làm việc. */
  location?: L;
  /**
   * Một câu mô tả vai trò, hiện trên các gạch đầu dòng. Dùng cho vị trí cần
   * nói rõ bối cảnh trước khi đi vào việc cụ thể. Bỏ trống thì không render.
   */
  summary?: L;
  points: LList;
};

export type Experience = { heading: L; items: ExperienceItem[] };

export const experience: Experience = {
  heading: { en: "Experience", vi: "Kinh nghiệm" },
  items: [
    {
      id: "aivn",
      company: "AIVN",
      role: { en: "Full-Stack Developer", vi: "Full-Stack Developer" },
      period: { en: "Nov 2024 — Present", vi: "11/2024 — nay" },
      summary: {
        en: "One of the early members, responsible for building the system from the ground up and contributing to product research and direction.",
        vi: "Một trong những thành viên đầu tiên, phụ trách dựng hệ thống từ đầu và tham gia nghiên cứu, định hướng sản phẩm.",
      },
      points: {
        en: [
          `Design and build ExpressJS APIs and ReactJS features in TypeScript, integrating Python-based AI services for ${METRICS.activeUsers.en} active users.`,
          "Research new methods and technologies that can be applied to or improve the product.",
          "Own the UI/UX, business logic and database schema for each feature I pick up.",
          "Maintain and monitor every change that could affect the running system.",
          `Maintain the RabbitMQ messaging and Socket.IO real-time channels inside a microservices architecture, carrying around ${METRICS.dailyMessages.en} messages a day.`,
          "Troubleshoot and resolve production hotfixes and critical issues to cut incident response time, and modernise legacy code.",
          "Lead code reviews for a team of 6 developers and manage CI/CD workflows on GitHub to keep releases stable.",
          "Optimise core business logic and database query performance to bring down workflow processing time.",
        ],
        vi: [
          `Thiết kế và xây API ExpressJS cùng tính năng ReactJS bằng TypeScript, tích hợp các service AI viết bằng Python cho ${METRICS.activeUsers.vi} người dùng hoạt động.`,
          "Nghiên cứu phương pháp và công nghệ mới có thể áp dụng hoặc cải thiện sản phẩm.",
          "Tự làm cả UI/UX, logic nghiệp vụ và thiết kế cơ sở dữ liệu cho từng tính năng mình nhận.",
          "Theo dõi và kiểm soát mọi thay đổi có thể ảnh hưởng tới hệ thống đang chạy.",
          `Duy trì hệ thống messaging RabbitMQ và các kênh realtime Socket.IO trong kiến trúc microservice, tải khoảng ${METRICS.dailyMessages.vi} thông điệp mỗi ngày.`,
          "Xử lý hotfix production và các sự cố nghiêm trọng để giảm thời gian phản ứng, đồng thời hiện đại hoá phần code cũ.",
          "Dẫn dắt review code cho nhóm 6 người và quản lý luồng CI/CD trên GitHub để giữ độ ổn định mỗi lần phát hành.",
          "Tối ưu logic nghiệp vụ lõi và hiệu năng truy vấn cơ sở dữ liệu để giảm thời gian xử lý của các luồng công việc.",
        ],
      },
    },
    {
      id: "vmo",
      company: "VMO Holdings",
      role: { en: "Back-End Developer", vi: "Back-End Developer" },
      period: { en: "Sep 2023 — Nov 2024", vi: "09/2023 — 11/2024" },
      points: {
        en: [
          "Built ExpressJS APIs for a US client's KYC platform on a RabbitMQ microservice architecture, integrating third-party identity-verification providers.",
          "Engineered NestJS APIs for admin order and store management on a Kafka-based marketplace for a Malaysian client.",
        ],
        vi: [
          "Xây API ExpressJS cho nền tảng KYC của khách hàng Mỹ trên kiến trúc microservice dùng RabbitMQ, tích hợp dịch vụ xác thực danh tính bên thứ ba.",
          "Xây API NestJS cho phần quản trị đơn hàng và gian hàng của một sàn thương mại điện tử dựa trên Kafka cho khách hàng Malaysia.",
        ],
      },
    },
    {
      id: "fpt-software",
      company: "FPT Software",
      role: {
        en: "Software Development Intern",
        vi: "Thực tập sinh Phát triển phần mềm",
      },
      period: { en: "Jun 2022 — Sep 2022", vi: "06/2022 — 09/2022" },
      points: {
        en: [
          "Front-end fundamentals (HTML, CSS, JavaScript, jQuery, AJAX) and back-end basics (MySQL, Java web).",
          "Completed introductory Japanese language training as part of the programme.",
        ],
        vi: [
          "Nền tảng front-end (HTML, CSS, JavaScript, jQuery, AJAX) và cơ bản back-end (MySQL, Java web).",
          "Hoàn thành khoá tiếng Nhật nhập môn trong chương trình thực tập.",
        ],
      },
    },
  ],
};
