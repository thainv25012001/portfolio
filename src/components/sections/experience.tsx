import { Section } from "@/components/ui/section";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type ExperienceProps = { locale: Locale };

/**
 * Timeline dọc. Đường kẻ là border-l của <ol>, mỗi mốc có một ô vuông nhỏ
 * màu accent đè lên đường kẻ (vuông chứ không tròn, cho khớp ngôn ngữ thiết kế).
 */
export function Experience({ locale }: ExperienceProps) {
  const { experience } = content;

  return (
    <Section id="experience" index="04" heading={experience.heading[locale]}>
      <ol className="relative border-l border-line">
        {experience.items.map((item, index) => (
          <li key={item.id} className="relative pb-12 pl-8 last:pb-0 md:pl-10">
            {/* Điểm mốc: đặt ngoài <Reveal> để đường timeline luôn liền mạch */}
            <span
              aria-hidden="true"
              className="absolute -left-[3.5px] top-[7px] h-[7px] w-[7px] bg-brand"
            />

            <Reveal delay={index * STAGGER}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {item.period[locale]}
                <span aria-hidden="true" className="mx-2 text-muted-foreground/40">
                  /
                </span>
                {item.location[locale]}
              </p>

              <h3 className="mt-3 text-h3">{item.company}</h3>

              <p className="mt-1.5 text-[15px] text-brand">
                {item.role[locale]}
              </p>

              <ul className="mt-5 max-w-2xl space-y-2.5">
                {item.points[locale].map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="relative pl-5 text-[15px] leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-line"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
