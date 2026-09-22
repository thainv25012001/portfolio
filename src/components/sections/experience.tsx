import { Screen } from "@/components/ui/screen";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { PixelPanel } from "@/components/ui/pixel/pixel-panel";
import { Separated } from "@/components/ui/separated";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type ExperienceProps = { locale: Locale };

/**
 * Danh sách mốc kinh nghiệm, mỗi mốc là một PixelPanel riêng — khung viền
 * dày, bóng cứng, đúng ngôn ngữ thiết kế pixel thay cho đường timeline mảnh
 * trước đây.
 */
export function Experience({ locale }: ExperienceProps) {
  const { experience } = content;

  return (
    <Screen id="experience" index="04" heading={experience.heading[locale]}>
      <ol className="space-y-6">
        {experience.items.map((item, index) => (
          <li key={item.id}>
            <Reveal delay={index * STAGGER}>
              <PixelPanel as="article" className="p-6 md:p-8">
                <p className="meta-label">
                  {/* location là tuỳ chọn — Separated tự bỏ phần trống và dấu
                      phân cách thừa, khỏi cần lồng thêm điều kiện */}
                  <Separated
                    items={[item.period[locale], item.location?.[locale]]}
                    separator="/"
                  />
                </p>

                <h3 className="mt-3 text-h3">{item.company}</h3>

                <p className="mt-2 text-body text-brand">
                  {item.role[locale]}
                </p>

                {/* Câu mô tả vai trò — chỉ vài vị trí cần, nên là tuỳ chọn */}
                {item.summary && (
                  <p className="mt-4 max-w-4xl text-body">
                    {item.summary[locale]}
                  </p>
                )}

                <ul className="mt-5 max-w-4xl space-y-3">
                  {item.points[locale].map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="relative pl-5 text-body text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-line"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </PixelPanel>
            </Reveal>
          </li>
        ))}
      </ol>
    </Screen>
  );
}
