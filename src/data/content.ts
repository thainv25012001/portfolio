import type { L, LList } from "@/lib/i18n";

/* ==========================================================================
   NỘI DUNG SITE
   Mọi chữ hiện trên màn hình đều nằm trong file này. Component chỉ render.
   Sửa nội dung => sửa file này, không cần đụng vào JSX.
   ========================================================================== */

/* --------------------------------------------------------------------------
   THÔNG TIN CÁ NHÂN
   Lấy từ Thai-Nguyen-Resume.docx.
   -------------------------------------------------------------------------- */
export const PROFILE = {
  name: "Nguyen Viet Thai",
  yearsOfExperience: 3,
  email: "thainv2501@gmail.com",
  /** Username LinkedIn (chỉ username, không kèm https://). */
  linkedin: "thainv2501",
  /** File CV trong /public — sinh từ Thai-Nguyen-Resume.docx. */
  cvUrl: "/cv.pdf",
  /** TODO: domain thật sau khi deploy — dùng cho SEO và Open Graph. */
  siteUrl: "https://your-domain.vercel.app",
} as const;

/* ==========================================================================
   TYPES
   ========================================================================== */

export type NavItem = {
  /** Trùng với id của thẻ <section> để anchor link chạy đúng. */
  id: string;
  label: L;
};

export type TechGroup = {
  id: string;
  label: L;
  /** Tên công nghệ không dịch, giữ nguyên ở cả hai ngôn ngữ. */
  items: string[];
  note?: L;
};

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
    /** Đường dẫn từ /public, ví dụ "/work/aivn-speaking.png". */
    src: string;
    /** Mô tả cho screen reader — bắt buộc, ảnh không có alt là ảnh vô hình. */
    alt: L;
    /** Chú thích hiện dưới ảnh. */
    caption?: L;
    /**
     * Tỉ lệ khung, mặc định "16 / 10". Ảnh được fit trọn vào khung
     * (không cắt xén), nên chọn tỉ lệ gần với ảnh thật để đỡ viền thừa.
     * Screenshot điện thoại thì dùng "9 / 16".
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

export type ExperienceItem = {
  id: string;
  company: string;
  role: L;
  period: L;
  /** Bỏ trống nếu không muốn hiện nơi làm việc. */
  location?: L;
  points: LList;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export type SiteContent = {
  meta: { title: L; description: L; ogAlt: L };
  nav: { items: NavItem[]; skipToContent: L };
  hero: {
    role: L;
    currentRole: L;
    positioning: L;
    primaryCta: L;
    secondaryCta: L;
  };
  about: { heading: L; paragraphs: LList };
  techStack: { heading: L; groups: TechGroup[] };
  projects: {
    heading: L;
    intro: L;
    labels: { problem: L; solution: L; result: L };
    items: Project[];
  };
  experience: { heading: L; items: ExperienceItem[] };
  contact: { heading: L; blurb: L; emailLabel: L; socials: SocialLink[] };
  footer: { rights: L; builtWith: L };
  ui: { toggleTheme: L; switchLanguage: L; backToTop: L };
};

/* ==========================================================================
   NỘI DUNG
   ========================================================================== */

export const content: SiteContent = {
  /* ---- SEO / Open Graph ------------------------------------------------ */
  meta: {
    title: {
      en: `${PROFILE.name} — Full-Stack Developer`,
      vi: `${PROFILE.name} — Full-Stack Developer`,
    },
    description: {
      en: `Full-stack developer with ${PROFILE.yearsOfExperience}+ years building microservice web platforms with Node.js, Express, NestJS and React. E-learning, KYC and e-commerce across Vietnam, the US and Malaysia.`,
      vi: `Full-stack developer hơn ${PROFILE.yearsOfExperience} năm xây nền tảng web microservice với Node.js, Express, NestJS và React. E-learning, KYC và thương mại điện tử ở Việt Nam, Mỹ và Malaysia.`,
    },
    ogAlt: {
      en: `${PROFILE.name} — Full-Stack Developer portfolio`,
      vi: `${PROFILE.name} — Portfolio Full-Stack Developer`,
    },
  },

  /* ---- Điều hướng ------------------------------------------------------ */
  nav: {
    items: [
      { id: "about", label: { en: "About", vi: "Giới thiệu" } },
      { id: "stack", label: { en: "Stack", vi: "Công nghệ" } },
      { id: "work", label: { en: "Work", vi: "Dự án" } },
      { id: "experience", label: { en: "Experience", vi: "Kinh nghiệm" } },
      { id: "contact", label: { en: "Contact", vi: "Liên hệ" } },
    ],
    skipToContent: {
      en: "Skip to content",
      vi: "Bỏ qua, tới nội dung chính",
    },
  },

  /* ---- 1. Hero --------------------------------------------------------- */
  hero: {
    role: { en: "Full-Stack Developer", vi: "Full-Stack Developer" },
    currentRole: {
      en: "Full-Stack Developer at AIVN · Harrisburg, PA",
      vi: "Full-Stack Developer tại AIVN · Harrisburg, PA",
    },
    positioning: {
      en: "I build event-driven web platforms — Node.js services, React front ends, and the message queues that keep them in sync.",
      vi: "Tôi xây nền tảng web hướng sự kiện — service Node.js, giao diện React, và những hàng đợi thông điệp giữ chúng đồng bộ.",
    },
    primaryCta: { en: "View projects", vi: "Xem dự án" },
    secondaryCta: { en: "Download CV", vi: "Tải CV" },
  },

  /* ---- 2. About (3 câu ngắn) ------------------------------------------- */
  about: {
    heading: { en: "About", vi: "Giới thiệu" },
    paragraphs: {
      en: [
        `${PROFILE.yearsOfExperience}+ years building microservice platforms for e-learning, KYC and e-commerce clients across Vietnam, the US and Malaysia.`,
        "Most of my work sits where services meet: RabbitMQ and Kafka queues, Socket.IO channels, and the Python AI services my Node APIs hand work off to.",
        "Now in Harrisburg, Pennsylvania, starting a Master's in Computer Science while continuing to ship.",
      ],
      vi: [
        `Hơn ${PROFILE.yearsOfExperience} năm xây nền tảng microservice cho khách hàng e-learning, KYC và thương mại điện tử ở Việt Nam, Mỹ và Malaysia.`,
        "Phần lớn công việc của tôi nằm ở chỗ các service gặp nhau: hàng đợi RabbitMQ và Kafka, kênh realtime Socket.IO, và những service AI viết bằng Python mà API Node của tôi đẩy việc sang.",
        "Hiện ở Harrisburg, Pennsylvania — vừa bắt đầu chương trình Thạc sĩ Khoa học Máy tính vừa tiếp tục làm sản phẩm.",
      ],
    },
  },

  /* ---- 3. Tech Stack (nhóm, dạng text list) ----------------------------
     Chia nhóm theo đúng cách resume của bạn chia.
     --------------------------------------------------------------------- */
  techStack: {
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
        items: [
          "Microservices",
          "RabbitMQ",
          "Kafka",
          "Socket.IO",
          "REST APIs",
        ],
      },
      {
        id: "tools",
        label: { en: "Tools", vi: "Công cụ" },
        note: { en: "Everyday", vi: "Thường dùng" },
        items: ["Git", "Docker", "Jira", "AWS (familiar)"],
      },
    ],
  },

  /* ---- 4. Projects ------------------------------------------------------
     Ba dự án lấy thẳng từ resume. Phần "vấn đề" là cách tôi diễn đạt lại bối
     cảnh — bạn đọc lại xem có đúng thực tế không rồi sửa cho khớp.
     Không có con số nào tôi tự bịa: chỉ dùng số có sẵn trong resume.
     --------------------------------------------------------------------- */
  projects: {
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
         khối dưới và điền nội dung thật. Chưa có `visual` thì khối vẫn hiển thị
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
  },

  /* ---- 5. Experience (timeline dọc) ------------------------------------ */
  experience: {
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
  },

  /* ---- 6. Contact ------------------------------------------------------ */
  contact: {
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
  },

  /* ---- Footer ---------------------------------------------------------- */
  footer: {
    rights: {
      en: `© ${new Date().getFullYear()} ${PROFILE.name}`,
      vi: `© ${new Date().getFullYear()} ${PROFILE.name}`,
    },
    builtWith: {
      en: "Built with Next.js and Tailwind CSS",
      vi: "Dựng bằng Next.js và Tailwind CSS",
    },
  },

  /* ---- Nhãn cho screen reader ------------------------------------------ */
  ui: {
    toggleTheme: { en: "Toggle theme", vi: "Đổi giao diện sáng tối" },
    switchLanguage: { en: "Switch language", vi: "Đổi ngôn ngữ" },
    backToTop: { en: "Back to top", vi: "Lên đầu trang" },
  },
};
