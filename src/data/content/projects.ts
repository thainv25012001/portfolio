import type { L } from "@/lib/i18n";

/* ---- 4. Projects --------------------------------------------------------
   Ba dự án lấy thẳng từ resume. Phần "vấn đề" là cách tôi diễn đạt lại bối
   cảnh — bạn đọc lại xem có đúng thực tế không rồi sửa cho khớp.
   Không có con số nào tôi tự bịa: chỉ dùng số có sẵn trong resume.
   ----------------------------------------------------------------------- */

/** Id của hình vẽ dựng sẵn — xem src/components/visuals/diagrams.tsx */
export type DiagramId = "ai-pipeline" | "kyc-flow" | "kafka-orders";

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
       * Tỉ lệ khung, mặc định "16 / 10". Ảnh được fit trọn vào khung
       * (không cắt xén), nên chọn tỉ lệ đúng bằng kích thước ảnh để đỡ viền thừa.
       * Chỉ có tác dụng khi dự án có đúng một ảnh — nhiều ảnh thì các ô dùng
       * chung một chiều cao cố định để đứng cạnh nhau cho phẳng.
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
    {
      id: "aivn-elearning",
      title: "AIVN E-learning Platform",
      period: { en: "2024 — Present", vi: "2024 — nay" },
      tagline: {
        en: "E-learning platform for Vietnamese students and teachers, with AI grading, question generation and speaking assessment.",
        vi: "Nền tảng e-learning cho học sinh và giáo viên Việt Nam, có chấm điểm bằng AI, tự sinh câu hỏi và đánh giá kỹ năng nói.",
      },
      problem: {
        en: "Grading speaking practice and writing question banks by hand does not scale to a platform with 200,000 active users.",
        vi: "Chấm bài nói và soạn ngân hàng câu hỏi thủ công không thể theo kịp một nền tảng có 200.000 người dùng hoạt động.",
      },
      solution: {
        en: "Built ExpressJS APIs and React features that hand this work to Python AI services — speaking assessment, difficulty grading, automatic question generation — connected over RabbitMQ, with Socket.IO pushing results back to the client as they land.",
        vi: "Xây API ExpressJS và tính năng React đẩy phần việc đó sang các service AI viết bằng Python — đánh giá kỹ năng nói, chấm độ khó, tự sinh câu hỏi — nối với nhau qua RabbitMQ, và dùng Socket.IO trả kết quả về client ngay khi có.",
      },
      result: {
        en: "Serves 200,000 active users, with around 100,000 messages a day moving between services.",
        vi: "Phục vụ 200.000 người dùng hoạt động, khoảng 100.000 thông điệp mỗi ngày chạy giữa các service.",
      },
      tags: ["Express.js", "React", "RabbitMQ", "Socket.IO", "Python AI"],
      visuals: [
        {
          kind: "diagram",
          id: "ai-pipeline",
          caption: {
            en: "Speaking assessment, difficulty grading and question generation run as Python services behind the queue.",
            vi: "Đánh giá kỹ năng nói, chấm độ khó và sinh câu hỏi chạy như các service Python phía sau hàng đợi.",
          },
        },
        {
          kind: "image",
          src: "/work/examdee/student-home.png",
          alt: { en: "Student home", vi: "Trang chủ học sinh" },
          caption: { en: "Student home", vi: "Trang chủ học sinh" },
          ratio: "1918 / 911",
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

    /* Muốn thêm dự án hackathon Hedera Guardian (Top 5, 2023) thì bỏ comment
       khối dưới và điền nội dung thật. Chưa có `visuals` thì khối vẫn hiển thị
       bình thường, chỉ là không có hình.

    {
      id: "hedera-esg",
      title: "ESG on Hedera Guardian",
      period: { en: "2023", vi: "2023" },
      tagline: { en: "", vi: "" },
      problem: { en: "", vi: "" },
      solution: { en: "", vi: "" },
      result: { en: "Top 5 — Crafting ESG Solutions on Hedera Guardian hackathon.", vi: "Top 5 — hackathon Crafting ESG Solutions on Hedera Guardian." },
      tags: [],
    },
    */
  ],
};
