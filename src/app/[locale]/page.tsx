import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { isLocale, type Locale } from "@/lib/i18n";

/**
 * Trang chủ chỉ làm một việc: xếp thứ tự các section.
 * Không có chữ nào ở đây — toàn bộ nội dung nằm trong src/data/content.ts.
 */
export default function HomePage({ params }: { params: { locale: string } }) {
  // Layout đã chặn locale lạ bằng notFound(); ở đây chỉ thu hẹp kiểu.
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <TechStack locale={locale} />
      <Projects locale={locale} />
      <Experience locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
