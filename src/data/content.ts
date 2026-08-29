import type { L, LList } from "@/lib/i18n";

/* ==========================================================================
   NỘI DUNG SITE
   Mọi chữ hiện trên màn hình đều nằm trong file này. Component chỉ render.
   Sửa nội dung => sửa file này, không cần đụng vào JSX.
   ========================================================================== */

/* --------------------------------------------------------------------------
   >>> SỬA KHỐI NÀY TRƯỚC TIÊN <<<
   Sau khi điền xong, chạy `npm run check:todo` để chắc chắn không bỏ sót.
   -------------------------------------------------------------------------- */
export const PROFILE = {
  /** TODO: họ tên đầy đủ, hiện ở hero và header. */
  name: "Your Name",
  /** TODO: số năm kinh nghiệm — được chèn tự động vào phần About. */
  yearsOfExperience: 5,
  /** TODO: email thật — hiển thị thành link lớn ở section Contact. */
  email: "you@example.com",
  /** TODO: username GitHub (chỉ username, không kèm https://). */
  github: "your-github",
  /** TODO: username LinkedIn (chỉ username, không kèm https://). */
  linkedin: "your-linkedin",
  /** Đường dẫn file CV trong thư mục /public. */
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
export type DiagramId =
  | "lc-workflow"
  | "price-feed"
  | "shared-core"
  | "event-bus";

/**
 * Hình minh hoạ của dự án. Bỏ trống thì khối dự án chỉ có chữ, layout vẫn đúng.
 *
 * - `diagram`: hình SVG dựng sẵn trong repo. Tự đổi màu theo theme, không cần
 *   file ảnh, và không lộ dữ liệu thật — hợp với hệ thống nội bộ không được
 *   phép chụp màn hình.
 * - `image`: ảnh thật đặt trong /public. Dùng khi bạn có screenshot công bố được.
 *
 * Đổi từ diagram sang ảnh thật chỉ là sửa dòng này, không đụng JSX.
 */
export type ProjectVisual =
  | { kind: "diagram"; id: DiagramId }
  | { kind: "image"; src: string; alt: L };

export type Project = {
  id: string;
  /** Tên riêng của dự án — không dịch. */
  title: string;
  period: string;
  /** Một dòng mô tả dự án. */
  tagline: L;
  problem: L;
  solution: L;
  result: L;
  tags: string[];
  visual?: ProjectVisual;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: L;
  period: L;
  location: L;
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
      en: `${PROFILE.name} — Frontend Developer`,
      vi: `${PROFILE.name} — Frontend Developer`,
    },
    description: {
      en: `Frontend developer with ${PROFILE.yearsOfExperience} years building banking, trade finance and securities trading interfaces. React, TypeScript, Next.js, React Native.`,
      vi: `Frontend developer ${PROFILE.yearsOfExperience} năm kinh nghiệm xây giao diện cho ngân hàng, trade finance và giao dịch chứng khoán. React, TypeScript, Next.js, React Native.`,
    },
    ogAlt: {
      en: `${PROFILE.name} — Frontend Developer portfolio`,
      vi: `${PROFILE.name} — Portfolio Frontend Developer`,
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
    role: { en: "Frontend Developer", vi: "Frontend Developer" },
    currentRole: {
      en: "Software Developer at Vietcombank Securities",
      vi: "Software Developer tại Vietcombank Securities",
    },
    positioning: {
      en: "I build trading and banking interfaces that stay fast when the numbers move.",
      vi: "Tôi xây giao diện giao dịch và ngân hàng — thứ phải chạy mượt đúng lúc thị trường biến động.",
    },
    primaryCta: { en: "View projects", vi: "Xem dự án" },
    secondaryCta: { en: "Download CV", vi: "Tải CV" },
  },

  /* ---- 2. About (3 câu ngắn) ------------------------------------------- */
  about: {
    heading: { en: "About", vi: "Giới thiệu" },
    paragraphs: {
      en: [
        `${PROFILE.yearsOfExperience} years writing frontend for systems where a wrong number is a real problem — trade finance at FPT IS, then securities trading at VCBS.`,
        "I care most about the unglamorous parts: render performance under live data, forms that survive a bank approval chain, and code the next person can read.",
        "Lately I have been working down the stack — Spring Boot, Kafka, Keycloak — so I can design the contract instead of only consuming it.",
      ],
      vi: [
        `${PROFILE.yearsOfExperience} năm viết frontend cho những hệ thống mà một con số sai là vấn đề thật — trade finance ở FPT IS, rồi giao dịch chứng khoán ở VCBS.`,
        "Tôi quan tâm nhất tới những phần không hào nhoáng: hiệu năng render khi dữ liệu chạy realtime, form đủ chắc để đi qua chuỗi phê duyệt của ngân hàng, và code người sau đọc được.",
        "Gần đây tôi đi xuống phía dưới stack — Spring Boot, Kafka, Keycloak — để có thể thiết kế hợp đồng dữ liệu chứ không chỉ tiêu thụ nó.",
      ],
    },
  },

  /* ---- 3. Tech Stack (nhóm, dạng text list) ---------------------------- */
  techStack: {
    heading: { en: "Stack", vi: "Công nghệ" },
    groups: [
      {
        id: "frontend",
        label: { en: "Frontend", vi: "Frontend" },
        note: { en: "Daily driver", vi: "Dùng hằng ngày" },
        items: [
          "React",
          "TypeScript",
          "Next.js (App Router)",
          "React Native",
          "Expo",
          "Tailwind CSS",
          "Zustand",
          "TanStack Query",
          "React Hook Form",
          "Zod",
          "Vite",
        ],
      },
      {
        id: "backend",
        label: { en: "Backend", vi: "Backend" },
        note: { en: "Actively expanding", vi: "Đang mở rộng" },
        items: [
          "Spring Boot",
          "Java",
          "Node.js",
          "PostgreSQL",
          "Apache Kafka",
          "Keycloak (OIDC)",
          "Redis",
          "REST / OpenAPI",
        ],
      },
      {
        id: "tools",
        label: { en: "Tools", vi: "Công cụ" },
        note: { en: "Everyday", vi: "Thường dùng" },
        items: [
          "Git",
          "Docker",
          "GitLab CI",
          "GitHub Actions",
          "Vitest",
          "Playwright",
          "Figma",
          "Jira",
          "Sentry",
        ],
      },
    ],
  },

  /* ---- 4. Projects ------------------------------------------------------
     CẢNH BÁO: bốn dự án dưới đây là BẢN NHÁP, số liệu chỉ là ví dụ.
     Sửa lại theo dự án thật trước khi publish.
     --------------------------------------------------------------------- */
  projects: {
    heading: { en: "Selected Work", vi: "Dự án tiêu biểu" },
    intro: {
      en: "Four projects that shaped how I work.",
      vi: "Bốn dự án định hình cách tôi làm việc.",
    },
    labels: {
      problem: { en: "Problem", vi: "Vấn đề" },
      solution: { en: "Approach", vi: "Giải pháp" },
      result: { en: "Outcome", vi: "Kết quả" },
    },
    items: [
      {
        id: "tradeflow",
        title: "TradeFlow",
        period: "2021 — 2023",
        tagline: {
          en: "Trade finance processing for a commercial bank corporate desk — letters of credit, guarantees, collections.",
          vi: "Hệ thống xử lý trade finance cho khối khách hàng doanh nghiệp của một ngân hàng thương mại — L/C, bảo lãnh, nhờ thu.",
        },
        problem: {
          en: "Letter-of-credit files moved on paper forms and spreadsheets through five levels of approval, with no way to see where a file was stuck.",
          vi: "Hồ sơ L/C chạy trên form giấy và Excel qua năm cấp phê duyệt, không ai truy được hồ sơ đang tắc ở khâu nào.",
        },
        solution: {
          en: "Rebuilt the workflow as a multi-step form with UCP 600 validation at each stage, plus an operations board showing every file current owner and age.",
          vi: "Dựng lại luồng nghiệp vụ thành form nhiều bước có validation theo UCP 600 ở từng chặng, kèm bảng điều hành hiển thị hồ sơ đang ở tay ai và tồn bao lâu.",
        },
        result: {
          en: "Turnaround on a standard L/C dropped from three days to under one. Around 200 tellers use it daily.",
          vi: "Thời gian xử lý một hồ sơ L/C tiêu chuẩn giảm từ ba ngày xuống dưới một ngày. Khoảng 200 giao dịch viên dùng hằng ngày.",
        },
        tags: ["React", "TypeScript", "Redux Toolkit", "Ant Design", "Spring Boot"],
        visual: { kind: "diagram", id: "lc-workflow" },
      },
      {
        id: "trading-terminal",
        title: "VCBS Trading Terminal",
        period: "2023 — 2026",
        tagline: {
          en: "Web trading platform: live price board, order entry, portfolio management.",
          vi: "Nền tảng giao dịch chứng khoán trên web: bảng giá realtime, đặt lệnh, quản lý danh mục.",
        },
        problem: {
          en: "The legacy price board re-rendered the whole table on every tick and fell to roughly 20fps in the first minutes after market open.",
          vi: "Bảng giá cũ render lại toàn bộ bảng mỗi tick, tụt xuống khoảng 20fps trong những phút đầu sau giờ mở cửa.",
        },
        solution: {
          en: "Moved the WebSocket feed out of React state entirely — writes go straight to cells through refs, batched per animation frame — and virtualised the 1,700-symbol list.",
          vi: "Đưa luồng WebSocket ra khỏi React state hoàn toàn — ghi thẳng vào ô qua ref, gom theo từng animation frame — và ảo hoá danh sách 1.700 mã.",
        },
        result: {
          en: "Holds 60fps through peak session. Main-thread scripting time down about 70%.",
          vi: "Giữ 60fps suốt phiên cao điểm. Thời gian chạy JS trên main thread giảm khoảng 70%.",
        },
        tags: ["Next.js", "TypeScript", "WebSocket", "TanStack Virtual", "Zustand"],
        visual: { kind: "diagram", id: "price-feed" },
      },
      {
        id: "vcbs-mobile",
        title: "VCBS Mobile",
        period: "2024 — 2026",
        tagline: {
          en: "iOS and Android trading app sharing its business core with the web platform.",
          vi: "App giao dịch iOS và Android, dùng chung lõi nghiệp vụ với bản web.",
        },
        problem: {
          en: "Web and mobile were written separately, so every rule change had to be implemented twice — and the two implementations drifted apart.",
          vi: "Web và mobile viết tách rời, mỗi thay đổi nghiệp vụ phải làm hai lần — và hai bản luôn lệch nhau.",
        },
        solution: {
          en: "Extracted pricing, order validation and shared types into a TypeScript package consumed by both. Built the app on Expo with EAS and over-the-air updates.",
          vi: "Tách phần định giá, kiểm tra lệnh và kiểu dữ liệu dùng chung ra một package TypeScript cho cả hai bên dùng. App dựng trên Expo với EAS và cập nhật OTA.",
        },
        result: {
          en: "Release cycle for non-native fixes went from two weeks to a few hours.",
          vi: "Chu kỳ phát hành cho các sửa lỗi không đụng native rút từ hai tuần xuống vài giờ.",
        },
        tags: ["React Native", "Expo", "EAS", "TypeScript", "Reanimated"],
        visual: { kind: "diagram", id: "shared-core" },
      },
      {
        id: "auth-gateway",
        title: "Auth & Event Gateway",
        period: "2025 — 2026",
        tagline: {
          en: "Central identity layer and domain event bus for internal services.",
          vi: "Lớp định danh tập trung và trục sự kiện nghiệp vụ cho các dịch vụ nội bộ.",
        },
        problem: {
          en: "Each service handled its own login and permissions. The logic diverged between them and there was no reliable way to revoke a session everywhere.",
          vi: "Mỗi service tự xử lý đăng nhập và phân quyền. Logic mỗi nơi một khác và không có cách nào thu hồi phiên đồng loạt.",
        },
        solution: {
          en: "Consolidated identity into Keycloak with OIDC and rotating refresh tokens, behind a Spring Boot gateway that publishes domain events to Kafka for other services to consume.",
          vi: "Gom định danh về Keycloak với OIDC và refresh token luân chuyển, đặt sau một gateway Spring Boot phát sự kiện nghiệp vụ lên Kafka cho các service khác tiêu thụ.",
        },
        result: {
          en: "One place to manage identity. Onboarding a new internal service is now a few hours of configuration.",
          vi: "Chỉ còn một nơi quản lý định danh. Đưa một service nội bộ mới vào hệ thống giờ chỉ mất vài giờ cấu hình.",
        },
        tags: ["Spring Boot", "Keycloak", "Kafka", "PostgreSQL", "Docker"],
        visual: { kind: "diagram", id: "event-bus" },
      },
    ],
  },

  /* ---- 5. Experience (timeline dọc, 2 mốc) ----------------------------- */
  experience: {
    heading: { en: "Experience", vi: "Kinh nghiệm" },
    items: [
      {
        id: "vcbs",
        company: "Vietcombank Securities (VCBS)",
        role: { en: "Software Developer", vi: "Software Developer" },
        period: { en: "2023 — Present", vi: "2023 — nay" },
        location: { en: "Hanoi", vi: "Hà Nội" },
        points: {
          en: [
            "Own the frontend of the web trading terminal and the Expo mobile app, from the realtime price layer to order entry.",
            "Extended into backend work: Spring Boot services, Kafka event streams and Keycloak-based authentication.",
          ],
          vi: [
            "Phụ trách frontend của web trading terminal và app mobile Expo, từ tầng giá realtime tới màn đặt lệnh.",
            "Mở rộng sang backend: service Spring Boot, luồng sự kiện Kafka và xác thực trên nền Keycloak.",
          ],
        },
      },
      {
        id: "fpt-is",
        company: "FPT Information System (FPT IS)",
        role: { en: "Frontend Developer", vi: "Frontend Developer" },
        period: { en: "2020 — 2023", vi: "2020 — 2023" },
        location: { en: "Hanoi", vi: "Hà Nội" },
        points: {
          en: [
            "Built trade finance and core banking interfaces delivered to commercial banks.",
            "Turned dense paper-based banking workflows into forms operators could complete without training.",
          ],
          vi: [
            "Xây giao diện trade finance và core banking bàn giao cho các ngân hàng thương mại.",
            "Chuyển những quy trình ngân hàng nặng giấy tờ thành form mà giao dịch viên hoàn thành được không cần đào tạo.",
          ],
        },
      },
    ],
  },

  /* ---- 6. Contact ------------------------------------------------------ */
  contact: {
    heading: { en: "Contact", vi: "Liên hệ" },
    blurb: {
      en: "Open to frontend and full-stack work in fintech. Email is the fastest way to reach me.",
      vi: "Sẵn sàng cho công việc frontend và full-stack trong lĩnh vực fintech. Nhanh nhất là gửi email.",
    },
    emailLabel: { en: "Email", vi: "Email" },
    socials: [
      { id: "github", label: "GitHub", href: `https://github.com/${PROFILE.github}` },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: `https://linkedin.com/in/${PROFILE.linkedin}`,
      },
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
