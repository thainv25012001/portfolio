import type { L } from "@/lib/i18n";

import { METRICS } from "./profile.ts";

/* ---- 4. Projects --------------------------------------------------------
   Dự án AIVN: nội dung do chính bạn viết, tôi chỉ diễn đạt lại cho gọn.
   Hai dự án KYC và Marketplace: phần "vấn đề" vẫn là cách tôi suy ra từ
   resume — bạn đọc lại xem có đúng thực tế không rồi sửa cho khớp.
   Mọi con số đều lấy từ resume, không có số nào tự bịa.
   ----------------------------------------------------------------------- */

/** Id của hình vẽ dựng sẵn — xem src/components/visuals/diagrams.tsx */
export type DiagramId =
  | "rag-pipeline"
  | "aivn-architecture"
  | "kyc-flow"
  | "kafka-orders";

/**
 * Một hình minh hoạ của dự án.
 *
 * - `diagram`: SVG dựng sẵn trong repo. Tự đổi màu theo theme, không cần file
 *   ảnh, và không lộ dữ liệu thật — hợp với sản phẩm của khách hàng không được
 *   phép chụp màn hình.
 * - `image`: ảnh thật trong /public. Dùng khi bạn có screenshot công bố được.
 */
export type ProjectVisual =
  | { kind: "diagram"; id: DiagramId; caption?: L }
  | {
    kind: "image";
    /** Đường dẫn từ /public, ví dụ "/work/examdee/student-home.png". */
    src: string;
    /** Mô tả cho screen reader — bắt buộc, ảnh không có alt là ảnh vô hình. */
    alt: L;
    /** Chú thích hiện dưới ảnh. */
    caption?: L;
    /**
     * Tỉ lệ khung, mặc định "16 / 10". Ghi đúng kích thước pixel của ảnh
     * (ví dụ "1918 / 911") thì ảnh vừa khít, không thừa viền.
     * Nhiều ảnh: cả băng ảnh lấy tỉ lệ của ảnh CAO nhất, nên khung không nhảy
     * chiều cao khi chuyển slide. Ảnh được fit trọn, không bao giờ bị cắt.
     */
    ratio?: string;
  };

export type Project = {
  id: string;
  /** Tên riêng của dự án — không dịch. */
  title: string;
  period: L;
  /** Một dòng mô tả dự án. */
  tagline: L;
  problem: L;
  solution: L;
  result: L;
  tags: string[];
  /**
   * Danh sách hình của dự án. Diagram luôn vẽ full width trước, ảnh xếp lưới
   * sau (1 ảnh = full width, từ 2 ảnh trở lên = 2 cột). Bỏ trống thì khối dự
   * án chỉ có chữ, layout vẫn đúng.
   */
  visuals?: ProjectVisual[];
  /**
   * Link ra sản phẩm thật hoặc mã nguồn. Tuỳ chọn — dự án của khách hàng
   * thường không public. Rỗng thì trang detail KHÔNG vẽ khối links, nên
   * không bao giờ lòi ra một mảng trống.
   *
   * TODO(owner): hiện chỉ `saas-ai` (repo GitHub) và `aivn-elearning`
   * (https://examdee.vn/) có `links`, cả hai đều do bạn cung cấp. Ba dự án còn
   * lại vẫn để trống — không có URL nào tra ra được từ resume, và tôi không
   * bịa link. Bạn điền tiếp theo mẫu:
   *   links: [
   *     { kind: "live", href: "https://...",
   *       label: { en: "Live site", vi: "Sản phẩm thật" } },
   *     { kind: "repo", href: "https://github.com/...",
   *       label: { en: "Source", vi: "Mã nguồn" } },
   *   ]
   * Dự án nào không công khai được thì cứ bỏ trống — trang detail tự ẩn
   * khối links, không lòi ra mục rỗng.
   */
  links?: { label: L; href: string; kind: "live" | "repo" | "doc" }[];
};

export type Projects = {
  heading: L;
  intro: L;
  labels: { problem: L; solution: L; result: L };
  items: Project[];
};

export const projects: Projects = {
  heading: { en: "Selected Work", vi: "Dự án tiêu biểu" },
  intro: {
    en: "The platforms I have spent the most time inside.",
    vi: "Những nền tảng tôi dành nhiều thời gian nhất.",
  },
  labels: {
    problem: { en: "Problem", vi: "Vấn đề" },
    solution: { en: "Approach", vi: "Giải pháp" },
    result: { en: "Outcome", vi: "Kết quả" },
  },
  items: [
    /* TODO(owner): dự án solo, viết theo đúng mô tả bạn gửi — không có con số
       vận hành nào nên `result` chỉ nói tới phần đã ship được.
       Framework cụ thể của API và của web KHÔNG có trong mô tả nên không nằm
       trong `tags`; bạn tự thêm cho khớp repo. */
    {
      id: "saas-ai",
      title: "AI Sales Agent",
      period: { en: "2026", vi: "2026" },
      tagline: {
        en: "Solo project — a multi-tenant B2B SaaS where a business configures an AI sales assistant over its own knowledge base, and that assistant answers its customers with grounded, cited answers.",
        vi: "Dự án cá nhân — SaaS B2B multi-tenant, nơi doanh nghiệp tự cấu hình một trợ lý bán hàng AI chạy trên kho tri thức của chính mình, và trợ lý đó trả lời khách hàng bằng câu trả lời có căn cứ, có trích dẫn.",
      },
      problem: {
        en: "A general-purpose model asked about a company's products answers confidently and wrongly. The knowledge that would make it right is scattered across documents, catalogues and prompts that change over time — and every tenant needs its own isolated copy of all of it.",
        vi: "Một mô hình phổ thông khi được hỏi về sản phẩm của một doanh nghiệp sẽ trả lời rất tự tin và rất sai. Kiến thức để nó trả lời đúng lại nằm rải rác trong tài liệu, danh mục sản phẩm và những prompt thay đổi theo thời gian — mà mỗi khách hàng còn cần một bản riêng, tách biệt hẳn với nhau.",
      },
      solution: {
        en: "Built it end to end: an upload drops a document into a background arq worker that extracts PDF/DOCX/HTML, chunks it and embeds it into pgvector; retrieval then fuses vector similarity with Postgres full-text search through Reciprocal Rank Fusion, so every answer is grounded in that tenant's own documents and cites them. Above that sits a multi-step tool-calling loop where the model decides when to search the knowledge base or capture a lead, with a per-turn tool registry driven by per-agent grants. Every model call goes through one provider-agnostic interface — OpenAI, Anthropic, and a network-free fake for tests — with token and cost accounted per message, and tokens and tool events streamed to the browser on a single SSE channel.",
        vi: "Làm trọn từ đầu đến cuối: tài liệu tải lên được đẩy sang worker nền arq — bóc chữ từ PDF/DOCX/HTML, chia đoạn rồi nhúng vào pgvector; lúc truy hồi thì gộp độ tương đồng vector với full-text search của Postgres bằng Reciprocal Rank Fusion, nên mọi câu trả lời đều dựa trên tài liệu của chính khách hàng đó và có trích dẫn. Trên nền ấy là vòng lặp tool calling nhiều bước: mô hình tự quyết khi nào tra kho tri thức, khi nào ghi nhận một khách hàng tiềm năng, với danh sách công cụ dựng lại theo từng lượt dựa trên quyền cấp cho từng agent. Mọi lời gọi mô hình đều đi qua một giao diện chung không phụ thuộc nhà cung cấp — OpenAI, Anthropic, và một bản giả không cần mạng để chạy test — có đếm token và chi phí theo từng tin nhắn, token cùng sự kiện công cụ đẩy về trình duyệt trên cùng một kênh SSE.",
      },
      result: {
        en: "Ships through a GitHub Actions pipeline — API to Render, web to Vercel, and database migrations to Neon as a separate one-shot job, with the rollout gated on a readiness check. Source is public.",
        vi: "Triển khai bằng pipeline GitHub Actions — API lên Render, web lên Vercel, migration cơ sở dữ liệu thành một job riêng chạy một lần trên Neon, và chỉ mở rollout khi kiểm tra sẵn sàng đã qua. Mã nguồn công khai.",
      },
      tags: [
        "Python",
        "PostgreSQL",
        "pgvector",
        "arq",
        "RAG",
        "Hybrid Search",
        "Tool Calling",
        "SSE",
        "OpenAI",
        "Anthropic",
        "Multi-tenant SaaS",
        "GitHub Actions",
        "Render",
        "Vercel",
        "Neon",
      ],
      links: [
        {
          kind: "repo",
          href: "https://github.com/thainv25012001/saas-ai",
          label: { en: "Source — github.com", vi: "Mã nguồn — github.com" },
        },
      ],
      visuals: [
        {
          kind: "diagram",
          id: "rag-pipeline",
          caption: {
            en: "Documents are indexed once in the background. At question time the same tenant's vector index and full-text index are searched together and their rankings fused, so the model answers from passages it actually retrieved — and the answer streams back token by token.",
            vi: "Tài liệu được đánh chỉ mục một lần ở nền. Đến lúc có câu hỏi, chỉ mục vector và chỉ mục toàn văn của đúng khách hàng đó cùng được tìm rồi gộp thứ hạng lại, nên mô hình trả lời dựa trên những đoạn thật sự lấy về — và câu trả lời đẩy về dần theo từng token.",
          },
        },
      ],
    },
    {
      id: "aivn-elearning",
      title: "AIVN E-learning Platform",
      period: { en: "2024 — 2026", vi: "2024 — 2026" },
      tagline: {
        en: "Startup e-learning platform for Vietnamese students and teachers — AI grading, question generation and speaking assessment.",
        vi: "Nền tảng e-learning của một startup, cho học sinh và giáo viên Việt Nam — chấm điểm bằng AI, tự sinh câu hỏi và đánh giá kỹ năng nói.",
      },
      problem: {
        en: "Handling student interaction by hand collapses at scale: it eats a teacher's day, and there is no accurate way to assess progress or manage a cohort that size.",
        vi: "Quản lý tương tác với học sinh một cách thủ công không trụ được ở quy mô lớn: ngốn gần hết thời gian của giáo viên, và không có cách nào đánh giá năng lực hay quản lý một lượng học sinh lớn cho chính xác.",
      },
      solution: {
        en: "Built a system meant to hold load: ExpressJS APIs and React features that hand grading and ability assessment off to Python AI services over RabbitMQ, with Socket.IO pushing results and notifications back as they land. On top of that, a management layer — oversight and monitoring for institutions, AI-assisted prep so teachers spend less time building material, and a simpler path through it for students.",
        vi: "Xây một hệ thống chịu được tải: API ExpressJS và tính năng React đẩy phần chấm điểm, đánh giá năng lực sang các service AI viết bằng Python qua RabbitMQ, dùng Socket.IO trả kết quả và thông báo về ngay khi có. Trên nền đó là lớp quản lý — tổ chức giáo dục theo dõi và giám sát được, giáo viên soạn bài nhanh hơn nhờ AI, học sinh học dễ hơn.",
      },
      result: {
        en: `Serves ${METRICS.activeUsers.en} active users, with around ${METRICS.dailyMessages.en} messages a day moving between services. Schools and teachers rate it highly, students use it by choice, and the platform now runs competitions at city and national scale.`,
        vi: `Phục vụ ${METRICS.activeUsers.vi} người dùng hoạt động, khoảng ${METRICS.dailyMessages.vi} thông điệp mỗi ngày chạy giữa các service. Các tổ chức và giáo viên đánh giá cao, học sinh chủ động dùng, và nền tảng giờ tổ chức các cuộc thi ở cấp thành phố và toàn quốc.`,
      },
      tags: [
        "Express.js",
        "Next.js",
        "React",
        "RabbitMQ",
        "Redis",
        "Socket.IO",
        "Python AI",
        "LLM APIs",
        "AWS S3",
        "AWS SES",
        "Azure",
      ],
      links: [
        {
          kind: "live",
          href: "https://examdee.vn/",
          label: { en: "Live site — examdee.vn", vi: "Sản phẩm thật — examdee.vn" },
        },
      ],
      visuals: [
        {
          kind: "diagram",
          id: "aivn-architecture",
          caption: {
            en: "Requests come in through one API layer; the queue keeps the heavy work — AI grading, background jobs, notifications — off the request path, and Socket.IO pushes results back to the client.",
            vi: "Request đi vào qua một lớp API; hàng đợi gánh phần việc nặng — chấm điểm bằng AI, job nền, thông báo — ra khỏi luồng request, và Socket.IO đẩy kết quả về client.",
          },
        },
      ],
    },
    {
      id: "kyc-platform",
      title: "KYC Identity Verification",
      period: { en: "2023 — 2024", vi: "2023 — 2024" },
      tagline: {
        en: "Identity document validation and verification for a US client, integrated with third-party providers.",
        vi: "Hệ thống xác thực và kiểm tra giấy tờ tuỳ thân cho khách hàng Mỹ, tích hợp nhà cung cấp bên thứ ba.",
      },
      problem: {
        en: "Every submitted document waited on a human reviewer, and the admin tooling around that queue made it slower than it needed to be.",
        vi: "Mọi giấy tờ gửi lên đều phải chờ người duyệt, và công cụ quản trị quanh hàng đợi đó làm quy trình chậm hơn mức cần thiết.",
      },
      solution: {
        en: "Built ExpressJS APIs for the verification and admin workflows on a RabbitMQ microservice architecture, and integrated third-party identity-verification providers to run the checks automatically.",
        vi: "Xây API ExpressJS cho luồng xác thực và luồng quản trị trên kiến trúc microservice dùng RabbitMQ, tích hợp dịch vụ xác thực danh tính bên thứ ba để chạy kiểm tra tự động.",
      },
      result: {
        en: "Manual document review time down, and admin workflows measurably faster after reworking the business logic and queries.",
        vi: "Giảm thời gian duyệt giấy tờ thủ công, và luồng quản trị nhanh lên rõ rệt sau khi viết lại logic nghiệp vụ và tối ưu truy vấn.",
      },
      tags: ["Express.js", "RabbitMQ", "Microservices", "Third-party IDV"],
      visuals: [
        {
          kind: "diagram",
          id: "kyc-flow",
          caption: {
            en: "Automated checks run first; a person only sees the exceptions.",
            vi: "Kiểm tra tự động chạy trước; người chỉ nhìn tới những trường hợp ngoại lệ.",
          },
        },
      ],
    },
    {
      id: "marketplace",
      title: "Shopee-style Marketplace",
      period: { en: "2024", vi: "2024" },
      tagline: {
        en: "E-commerce marketplace for a Malaysian client — admin order and store management.",
        vi: "Sàn thương mại điện tử cho khách hàng Malaysia — quản lý đơn hàng và gian hàng phía quản trị.",
      },
      problem: {
        en: "Order history and stock tracking drifted apart, so the numbers admins saw did not always match what had actually been sold.",
        vi: "Lịch sử đơn hàng và tồn kho lệch nhau, nên con số quản trị viên nhìn thấy không phải lúc nào cũng khớp với thực tế đã bán.",
      },
      solution: {
        en: "Engineered NestJS APIs for order and store management inside a Kafka-based microservice architecture, and redesigned the core order-history and stock-tracking logic.",
        vi: "Xây API NestJS cho quản lý đơn hàng và gian hàng trong kiến trúc microservice dựa trên Kafka, đồng thời thiết kế lại phần lõi xử lý lịch sử đơn và theo dõi tồn kho.",
      },
      result: {
        en: "Order and inventory data mismatches reduced.",
        vi: "Giảm tình trạng lệch dữ liệu giữa đơn hàng và tồn kho.",
      },
      tags: ["NestJS", "Kafka", "Microservices", "REST APIs"],
      visuals: [
        {
          kind: "diagram",
          id: "kafka-orders",
          caption: {
            en: "Stock and order history are rebuilt from the same event log, so they cannot drift apart.",
            vi: "Tồn kho và lịch sử đơn cùng dựng lại từ một luồng sự kiện, nên không thể lệch nhau.",
          },
        },
      ],
    },

    /* TODO(owner): tagline/problem/solution của mục hedera-esg dưới đây được
       viết ra KHÔNG có nguồn thật — chỉ suy ra từ tên chính thức của hackathon
       ("Crafting ESG Solutions on Hedera Guardian"), không có chi tiết kỹ
       thuật nào khác để đối chiếu. Bạn PHẢI đọc lại và xác nhận (hoặc viết lại
       cho đúng thực tế) trước khi deploy — đừng để nội dung chưa kiểm chứng
       lên trang công khai. */
    {
      id: "hedera-esg",
      title: "ESG on Hedera Guardian",
      period: { en: "2023", vi: "2023" },
      tagline: {
        en: "Hackathon entry building an ESG data solution on Hedera Guardian — top 5 finish.",
        vi: "Sản phẩm hackathon xây giải pháp dữ liệu ESG trên Hedera Guardian — lọt top 5.",
      },
      problem: {
        en: "ESG reporting is easy to claim and hard to verify — data usually comes from a single party with no independently checkable trail.",
        vi: "Báo cáo ESG dễ công bố nhưng khó kiểm chứng — dữ liệu thường chỉ đến từ một phía, không có dấu vết để bên khác kiểm tra độc lập.",
      },
      solution: {
        en: "Prototyped an ESG data solution on Hedera Guardian during the hackathon.",
        vi: "Dựng thử một giải pháp dữ liệu ESG trên Hedera Guardian trong khuôn khổ hackathon.",
      },
      result: {
        en: "Top 5 — Crafting ESG Solutions on Hedera Guardian hackathon.",
        vi: "Top 5 — hackathon Crafting ESG Solutions on Hedera Guardian.",
      },
      tags: ["Hedera Guardian", "Blockchain", "ESG"],
    },
  ],
};
