import { Screen } from "@/components/ui/screen";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { PixelPanel } from "@/components/ui/pixel/pixel-panel";
import { Separated } from "@/components/ui/separated";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type EducationProps = { locale: Locale };

/**
 * Bằng cấp và chứng chỉ. Dùng lại đúng khuôn của phần Kinh nghiệm — cùng
 * PixelPanel, cùng thứ tự đọc (mốc thời gian → tên trường → bằng) — vì hai
 * section này nằm cạnh nhau và trông khác nhau sẽ đọc như hai trang khác.
 */
export function Education({ locale }: EducationProps) {
  const { education } = content;

  return (
    <Screen id="education" heading={education.heading[locale]}>
      <ol className="grid gap-6 md:grid-cols-2">
        {education.items.map((item, index) => (
          <li key={item.id}>
            <Reveal delay={index * STAGGER} className="h-full">
              <PixelPanel as="article" className="flex h-full flex-col p-6 md:p-8">
                <p className="meta-label">
                  <Separated
                    items={[item.period[locale], item.location?.[locale]]}
                    separator="/"
                  />
                </p>

                <h3 className="mt-3 text-h3">{item.school}</h3>

                <p className="mt-2 text-body text-brand">
                  {item.degree[locale]}
                </p>

                {item.note && (
                  <p className="mt-4 text-body text-muted-foreground">
                    {item.note[locale]}
                  </p>
                )}
              </PixelPanel>
            </Reveal>
          </li>
        ))}
      </ol>
    </Screen>
  );
}
