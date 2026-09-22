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
      id: "core",
      label: { en: "Core", vi: "Nền tảng" },
      note: { en: "Daily driver", vi: "Dùng hằng ngày" },
      items: [
        "JavaScript",
        "TypeScript",
        "Node.js",
        "SQL",
        "NoSQL",
        "Python",
      ],
    },
    {
      id: "frameworks",
      label: {
        en: "Frameworks & Architecture",
        vi: "Framework & Kiến trúc",
      },
      note: { en: "Core of my work", vi: "Trọng tâm công việc" },
      items: [
        "Express.js",
        "NestJS",
        "React.js",
        "Next.js",
        "FastAPI",
        "Microservices",
        "REST APIs",
        "GraphQL",
        "Message Queues",
        "Socket.IO",
      ],
    },
    {
      id: "data",
      label: { en: "Data & Messaging", vi: "Dữ liệu & Messaging" },
      note: { en: "In production", vi: "Đã chạy thực tế" },
      items: [
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Redis",
        "Kafka",
        "RabbitMQ",
        "Docker",
      ],
    },
    {
      id: "cloud",
      label: { en: "Cloud", vi: "Cloud" },
      note: {
        en: "Working knowledge — compute, storage, deployment",
        vi: "Nắm cơ bản — compute, lưu trữ, triển khai",
      },
      items: ["AWS", "AWS S3", "AWS SES", "Azure"],
    },
    {
      id: "security",
      label: { en: "Security", vi: "Bảo mật" },
      items: [
        "JWT",
        "OAuth 2.0",
        "Role-Based Access Control (RBAC)",
        "PII-aware data handling",
      ],
    },
    {
      id: "testing",
      label: { en: "Testing", vi: "Kiểm thử" },
      note: { en: "Unit testing", vi: "Unit test" },
      items: ["Jest"],
    },
    {
      id: "api-design",
      label: { en: "API Design", vi: "Thiết kế API" },
      items: [
        "OpenAPI/Swagger",
        "REST versioning",
        "Request validation",
      ],
    },
    {
      id: "observability",
      label: { en: "Observability", vi: "Observability" },
      note: {
        en: "Logging, monitoring, alerting",
        vi: "Log, giám sát, cảnh báo",
      },
      items: ["Datadog", "Grafana", "AWS CloudWatch"],
    },
    {
      id: "methodologies",
      label: {
        en: "Methodologies & Tools",
        vi: "Quy trình & Công cụ",
      },
      note: { en: "Everyday", vi: "Thường dùng" },
      items: ["Git/GitHub", "Jira", "Agile/Scrum", "CI/CD", "SDLC"],
    },
    {
      id: "ai",
      label: { en: "AI & LLM", vi: "AI & LLM" },
      items: [
        "LLM APIs",
        "Azure OpenAI",
        "Tool Calling",
        "Vector Databases",
        "Prompt Orchestration",
        "Retrieval-Augmented Generation (RAG)",
        "Embeddings",
      ],
    },
  ],
};
