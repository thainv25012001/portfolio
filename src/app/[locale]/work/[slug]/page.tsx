import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/sections/project-detail";
import { content, PROFILE } from "@/data/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    content.projects.items.map((p) => ({ locale, slug: p.id })),
  );
}

/* Metadata riêng cho từng dự án, cùng khuôn canonical + hreflang với trang
   chủ ở src/app/[locale]/layout.tsx — chỉ khác title/description lấy theo
   dự án thay vì lấy theo content.meta. */
export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const project = content.projects.items.find((p) => p.id === params.slug);
  if (!project) return {};

  const title = `${project.title} — ${content.meta.title[locale]}`;
  const description = project.tagline[locale];

  return {
    metadataBase: new URL(PROFILE.siteUrl),
    title,
    description,
    alternates: {
      canonical: `/${locale}/work/${project.id}`,
      languages: {
        en: `/en/work/${project.id}`,
        vi: `/vi/work/${project.id}`,
        "x-default": `/en/work/${project.id}`,
      },
    },
    openGraph: {
      type: "article",
      url: `/${locale}/work/${project.id}`,
      siteName: PROFILE.name,
      title,
      description,
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default function WorkDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const project = content.projects.items.find((p) => p.id === params.slug);
  if (!project) notFound();

  return <ProjectDetail project={project} locale={locale} />;
}
