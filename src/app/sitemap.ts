import type { MetadataRoute } from "next";

import { PROFILE } from "@/data/content";
import { locales } from "@/lib/i18n";

/** Sitemap liệt kê cả hai bản ngôn ngữ, kèm alternates để Google nối chúng lại. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${PROFILE.siteUrl}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${PROFILE.siteUrl}/${l}`]),
      ),
    },
  }));
}
