import type { L } from "@/lib/i18n";

/* ---- 6. Education ------------------------------------------------------ */

export type EducationItem = {
  id: string;
  school: string;
  degree: L;
  period: L;
  /** Bỏ trống nếu không muốn hiện nơi học. */
  location?: L;
  /** Dòng phụ: GPA, luận văn, học bổng… Bỏ trống thì không render. */
  note?: L;
};

export type Education = { heading: L; items: EducationItem[] };

/**
 * Xếp mới nhất lên trước, giống phần Kinh nghiệm.
 *
 * Phần CERTIFICATIONS trong resume hiện chưa có mục nào, nên section này chỉ
 * có bằng cấp. Khi có chứng chỉ, thêm một `items` nữa ở đây là hiện ngay —
 * không phải đụng tới component.
 */
export const education: Education = {
  heading: { en: "Education", vi: "Học vấn" },
  items: [
    {
      id: "harrisburg",
      school: "Harrisburg University",
      degree: {
        en: "Master of Science, Computer Science",
        vi: "Thạc sĩ Khoa học Máy tính",
      },
      period: { en: "2026 — Present", vi: "2026 — nay" },
      location: { en: "Harrisburg, US", vi: "Harrisburg, Mỹ" },
    },
    {
      id: "fpt-university",
      school: "FPT University",
      degree: {
        en: "Bachelor of Science, Software Engineering",
        vi: "Cử nhân Kỹ thuật Phần mềm",
      },
      period: { en: "Sep 2019 — Sep 2023", vi: "09/2019 — 09/2023" },
      location: { en: "Hanoi, Vietnam", vi: "Hà Nội, Việt Nam" },
      note: { en: "GPA 3.2/4", vi: "GPA 3.2/4" },
    },
  ],
};
