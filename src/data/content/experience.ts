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
      period: { en: "Nov 2024 — Aug 2026", vi: "11/2024 — 08/2026" },
      location: { en: "Ha Noi, Vietnam", vi: "Hà Nội, Việt Nam" },
      summary: {
        en: "Early core member of the engineering team — helped build the system architecture from the ground up and contributed to product research and direction.",
        vi: "Thành viên nòng cốt từ những ngày đầu của đội kỹ thuật — dựng kiến trúc hệ thống từ con số không và tham gia nghiên cứu, định hướng sản phẩm.",
      },
      points: {
        en: [
          `Designed and built Node.js and ExpressJS REST APIs and ReactJS features in TypeScript, integrating Python-based AI microservices and LLM APIs with Azure OpenAI to evaluate users for a platform serving more than ${METRICS.activeUsers.en} users.`,
          "Integrated Retrieval-Augmented Generation (RAG), embeddings, vector databases, prompt orchestration and tool calling into AI-enabled backend workflows.",
          `Implement and maintain RabbitMQ messaging and Socket.IO real-time communication within a microservices architecture, processing around ${METRICS.dailyMessages.en} messages daily.`,
          "Own UI/UX, business logic and database schema design end-to-end for new features.",
          "Write unit tests with Jest to validate business logic and reduce regressions across core features.",
          "Lead code reviews for a team of 6 developers and manage GitHub-based CI/CD workflows to maintain release quality and stability.",
          "Troubleshoot and resolve production hotfixes and critical issues, working to minimise incident response time and modernise legacy codebases.",
          "Optimise core business logic and database query performance to reduce workflow processing time and improve system responsiveness.",
          "Direct experience with AI and agentic coding tools such as Claude Code, OpenAI Codex and Cursor.",
        ],
        vi: [
          `Thiết kế và xây REST API bằng Node.js, ExpressJS cùng tính năng ReactJS viết bằng TypeScript, tích hợp các microservice AI viết bằng Python và LLM API qua Azure OpenAI để đánh giá người dùng cho nền tảng phục vụ hơn ${METRICS.activeUsers.vi} người dùng.`,
          "Đưa Retrieval-Augmented Generation (RAG), embedding, vector database, điều phối prompt và tool calling vào các luồng backend tích hợp AI.",
          `Triển khai và duy trì hệ thống messaging RabbitMQ cùng kênh realtime Socket.IO trong kiến trúc microservice, xử lý khoảng ${METRICS.dailyMessages.vi} thông điệp mỗi ngày.`,
          "Tự làm trọn vẹn UI/UX, logic nghiệp vụ và thiết kế lược đồ cơ sở dữ liệu cho các tính năng mới.",
          "Viết unit test bằng Jest để kiểm chứng logic nghiệp vụ và giảm lỗi hồi quy ở các tính năng lõi.",
          "Dẫn dắt review code cho nhóm 6 lập trình viên và quản lý luồng CI/CD trên GitHub để giữ chất lượng và độ ổn định mỗi lần phát hành.",
          "Xử lý hotfix production và các sự cố nghiêm trọng, rút ngắn thời gian phản ứng sự cố và hiện đại hoá phần code cũ.",
          "Tối ưu logic nghiệp vụ lõi và hiệu năng truy vấn cơ sở dữ liệu để giảm thời gian xử lý của các luồng công việc.",
          "Làm việc trực tiếp với các công cụ AI và agentic coding như Claude Code, OpenAI Codex, Cursor.",
        ],
      },
    },
    {
      id: "vmo",
      company: "VMO Holdings",
      role: { en: "Back-End Developer", vi: "Back-End Developer" },
      period: { en: "Sep 2023 — Nov 2024", vi: "09/2023 — 11/2024" },
      location: { en: "Hanoi, Vietnam", vi: "Hà Nội, Việt Nam" },
      points: {
        en: [
          "Engineered Node.js and ExpressJS REST APIs for user verification and admin management within an enterprise microservices architecture for a US-based KYC platform.",
          "Implemented authentication and authorisation using JWT, OAuth 2.0 and role-based access control (RBAC) to secure identity-verification workflows handling sensitive PII.",
          "Integrated third-party identity-verification services via REST APIs, cutting manual document review time through automated workflows.",
          "Documented and maintained APIs with OpenAPI/Swagger to standardise request/response contracts across services.",
          "Monitored application health and diagnosed issues using Datadog, Grafana and AWS CloudWatch for logging and alerting.",
          "Optimised admin management efficiency and SQL data retrieval by refactoring legacy logic and improving query structures.",
          "Designed NestJS APIs for order and store management on a Kafka-based microservices architecture in an Agile environment.",
          "Reduced data mismatches by 15% by redesigning core order-history and stock-tracking logic for high-throughput e-commerce workflows.",
        ],
        vi: [
          "Xây REST API bằng Node.js và ExpressJS cho phần xác minh người dùng và quản trị, trong kiến trúc microservice doanh nghiệp của một nền tảng KYC tại Mỹ.",
          "Triển khai xác thực và phân quyền bằng JWT, OAuth 2.0 và phân quyền theo vai trò (RBAC) để bảo vệ các luồng xác minh danh tính có xử lý dữ liệu cá nhân nhạy cảm.",
          "Tích hợp dịch vụ xác minh danh tính bên thứ ba qua REST API, giảm thời gian duyệt giấy tờ thủ công nhờ luồng tự động.",
          "Viết và duy trì tài liệu API bằng OpenAPI/Swagger để chuẩn hoá hợp đồng request/response giữa các service.",
          "Theo dõi sức khoẻ ứng dụng và chẩn đoán sự cố bằng Datadog, Grafana và AWS CloudWatch cho phần log và cảnh báo.",
          "Tối ưu hiệu quả quản trị và tốc độ truy xuất dữ liệu SQL bằng cách refactor logic cũ và cải thiện cấu trúc truy vấn.",
          "Thiết kế API NestJS cho quản lý đơn hàng và gian hàng trên kiến trúc microservice dùng Kafka, làm theo quy trình Agile.",
          "Giảm 15% sai lệch dữ liệu nhờ thiết kế lại logic lịch sử đơn hàng và theo dõi tồn kho cho các luồng thương mại điện tử lưu lượng cao.",
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
      location: { en: "Hanoi, Vietnam", vi: "Hà Nội, Việt Nam" },
      points: {
        en: [
          "Built front-end and back-end components using JavaScript, jQuery and MySQL, following Software Development Lifecycle (SDLC) standards.",
          "Practised enterprise-level development methodologies and took part in technical training programmes supporting streamlined software delivery.",
        ],
        vi: [
          "Xây các thành phần front-end và back-end bằng JavaScript, jQuery và MySQL, theo chuẩn vòng đời phát triển phần mềm (SDLC).",
          "Thực hành quy trình phát triển ở quy mô doanh nghiệp và tham gia các khoá đào tạo kỹ thuật phục vụ việc bàn giao phần mềm trơn tru hơn.",
        ],
      },
    },
  ],
};
