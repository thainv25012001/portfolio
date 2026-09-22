/* --------------------------------------------------------------------------
   THÔNG TIN CÁ NHÂN
   Lấy từ resume. Đây là file nên sửa đầu tiên.
   -------------------------------------------------------------------------- */
export const PROFILE = {
  name: "Nguyen Viet Thai",
  yearsOfExperience: 3,
  email: "thainv2501@gmail.com",
  /** Username LinkedIn (chỉ username, không kèm https://). */
  linkedin: "thainv2501",
  /** Username GitHub (chỉ username, không kèm https://). */
  github: "thainv25012001",
  /** File resume trong /public. Bản .docx gốc KHÔNG nằm trong repo. */
  resumeUrl: "/resume.pdf",
  /**
   * Ảnh chân dung cho khung tròn ở Hero — bản cắt vuông vùng đầu–vai từ
   * /avt.jpg. Ảnh gốc là toàn thân, cắt tròn nguyên khung thì mặt quá nhỏ.
   * Muốn đổi khung hình: cắt lại từ /avt.jpg rồi ghi đè file này.
   */
  avatarUrl: "/avatar.jpg",
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
