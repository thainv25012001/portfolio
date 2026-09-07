/* --------------------------------------------------------------------------
   THÔNG TIN CÁ NHÂN
   Lấy từ Thai-Nguyen-Resume.docx. Đây là file nên sửa đầu tiên.
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

/**
 * Hai con số xuất hiện ở cả phần dự án lẫn phần kinh nghiệm. Gom về đây vì
 * chúng đã từng lệch nhau: một chỗ ghi "200,000+", chỗ khác "200,000" — hai
 * mức chính xác khác nhau cho cùng một con số, trên cùng một trang.
 */
export const METRICS = {
  activeUsers: { en: "200,000", vi: "200.000" },
  dailyMessages: { en: "100,000", vi: "100.000" },
} as const;
