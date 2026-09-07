import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { GridLines } from "@/components/ui/grid-lines";
import { content, PROFILE } from "@/data/content";
import { isLocale, locales, localeHtmlLang, type Locale } from "@/lib/i18n";

import "../globals.css";

/* --------------------------------------------------------------------------
   FONTS
   Cả hai font đều lấy subset "vietnamese" — bắt buộc, vì các ký tự ệ ự ớ ạ
   nằm ngoài subset latin-ext.
   Lưu ý: Instrument Serif KHÔNG có subset tiếng Việt (thiếu hẳn dải
   U+1EA0–U+1EF1), nên dùng Playfair Display thay thế. Nếu site chỉ chạy
   tiếng Anh và tên không dấu, đổi lại thành:
     import { Instrument_Serif } from "next/font/google";
     const display = Instrument_Serif({ weight: "400", subsets: ["latin"], ... });
   -------------------------------------------------------------------------- */
const sans = Inter({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
  variable: "--font-sans",
});

const display = Playfair_Display({
  subsets: ["latin", "latin-ext", "vietnamese"],
  display: "swap",
  variable: "--font-display",
});

/* --------------------------------------------------------------------------
   ROUTING
   Sinh sẵn /en và /vi lúc build. dynamicParams = false nên mọi locale lạ
   (ví dụ /fr) trả về 404 thay vì render động.
   -------------------------------------------------------------------------- */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

/* --------------------------------------------------------------------------
   SEO / OPEN GRAPH
   Metadata sinh riêng cho từng ngôn ngữ, kèm hreflang để Google hiểu đây là
   hai bản dịch của cùng một trang chứ không phải nội dung trùng lặp.
   -------------------------------------------------------------------------- */
export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const { meta } = content;

  // Ảnh OG là file tĩnh, sinh bởi `npm run og` (tự chạy trong prebuild).
  const ogImage = {
    url: `/og-${locale}.png`,
    width: 1200,
    height: 630,
    alt: meta.ogAlt[locale],
  };

  return {
    metadataBase: new URL(PROFILE.siteUrl),
    title: meta.title[locale],
    description: meta.description[locale],
    applicationName: PROFILE.name,
    authors: [
      {
        name: PROFILE.name,
        url: `https://linkedin.com/in/${PROFILE.linkedin}`,
      },
    ],
    creator: PROFILE.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", vi: "/vi", "x-default": "/en" },
    },
    openGraph: {
      type: "profile",
      url: `/${locale}`,
      siteName: PROFILE.name,
      title: meta.title[locale],
      description: meta.description[locale],
      locale: locale === "vi" ? "vi_VN" : "en_US",
      alternateLocale: locale === "vi" ? "en_US" : "vi_VN",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title[locale],
      description: meta.description[locale],
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  // Light là mặc định của site nên thanh địa chỉ trên mobile lấy luôn màu nền sáng.
  themeColor: "#FAFAF9",
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale;

  // Dữ liệu có cấu trúc cho Google: giúp hiện đúng tên và nghề nghiệp.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: content.hero.role[locale],
    email: `mailto:${PROFILE.email}`,
    url: PROFILE.siteUrl,
    sameAs: content.contact.socials.map((social) => social.href),
  };

  return (
    // suppressHydrationWarning: next-themes gắn class vào <html> trước khi
    // React hydrate, nên server và client chắc chắn lệch nhau ở thẻ này.
    <html
      lang={localeHtmlLang[locale]}
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable}`}
    >
      <body className="min-h-dvh">
        {/* Không có JS thì animation không bao giờ chạy — ép nội dung hiện đầy đủ. */}
        <noscript>
          {/* Không có JS thì data-visible không bao giờ bật, nên mọi trạng thái
              nghỉ phải được đưa về trạng thái cuối. Chỉ cần chặn theo hai gốc
              (Reveal và DiagramMotion) — thêm class động sau này không phải
              nhớ sửa lại chỗ này. */}
          <style>{`[data-reveal],[data-reveal] *,.dg-root,.dg-root *{opacity:1!important;transform:none!important;clip-path:none!important;stroke-dashoffset:0!important}`}</style>
        </noscript>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GridLines />

          {/* Link bỏ qua nav — chỉ hiện khi tab tới, phục vụ điều hướng bàn phím.
              Bọc trong .shell để nó canh theo đúng cột nội dung: đặt left theo
              --content-inset tính từ viewport sẽ lệch khi màn rộng hơn 1100px,
              vì lúc đó container đã bị đẩy vào giữa. */}
          <div className="shell relative">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-content focus:top-4 focus:z-[60] focus:bg-background focus:px-4 focus:py-2 focus:text-sm"
            >
              {content.nav.skipToContent[locale]}
            </a>
          </div>

          <div className="relative z-10">
            <Header locale={locale} />
            <div className="shell">
              <main id="main">{children}</main>
              <Footer locale={locale} />
            </div>
          </div>
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
