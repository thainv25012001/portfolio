/**
 * Cau hinh da ngon ngu.
 * Chi khai bao o day - content.ts va cac component deu doc tu day ra,
 * nen them mot ngon ngu moi la them vao mang `locales` roi sua content.ts.
 */

export const locales = ["en", "vi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Nhan hien thi cua tung ngon ngu tren nut chuyen doi. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
};

/** The `lang` va `hreflang` dung cho HTML/SEO. */
export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  vi: "vi",
};

/** Type guard: dung de chan param locale khong hop le tu URL. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Chuoi song ngu. Thieu mot ban dich se bao loi ngay luc compile,
 * khong doi den runtime.
 */
export type L = Record<Locale, string>;

/** Danh sach chuoi song ngu (dung cho bullet point, doan van nhieu cau). */
export type LList = Record<Locale, string[]>;
