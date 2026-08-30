import type { L, LList } from "@/lib/i18n";

/* ---- 5. Experience (timeline dọc) -------------------------------------- */

export type ExperienceItem = {
  id: string;
  company: string;
  role: L;
  period: L;
  /** Bỏ trống nếu không muốn hiện nơi làm việc. */
  location?: L;
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
      points: {
        en: [
          "Own core features and production hotfixes on an e-learning platform serving 200,000 active users.",
          "Designed and maintain the RabbitMQ messaging and Socket.IO real-time channels between microservices, carrying around 100,000 messages a day.",
          "Review code across a team of 6 developers, and optimise business logic and query performance on the slowest workflows.",
        ],
        vi: [
          "Phụ trách các tính năng lõi và hotfix production của một nền tảng e-learning phục vụ 200.000 người dùng hoạt động.",
          "Thiết kế và duy trì hệ thống messaging RabbitMQ cùng các kênh realtime Socket.IO giữa các microservice, tải khoảng 100.000 thông điệp mỗi ngày.",
          "Review code cho nhóm 6 người, tối ưu logic nghiệp vụ và hiệu năng truy vấn ở những luồng chậm nhất.",
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
