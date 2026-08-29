import { Fragment } from "react";

import { Section } from "@/components/ui/section";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type TechStackProps = { locale: Locale };

/**
 * Danh sách công nghệ dạng chữ, chia ba nhóm Frontend / Backend / Tools.
 * Không dùng logo hay icon — chỉ chữ và dấu phân cách, đúng tinh thần editorial.
 */
export function TechStack({ locale }: TechStackProps) {
  const { techStack } = content;

  return (
    <Section id="stack" index="02" heading={techStack.heading[locale]}>
      <div className="divide-y divide-line border-y border-line">
        {techStack.groups.map((group, groupIndex) => (
          <Reveal key={group.id} delay={groupIndex * STAGGER}>
            <div className="grid gap-3 py-6 sm:grid-cols-[9rem_1fr] sm:gap-8">
              <div>
                <h3 className="text-base tracking-normal">
                  {group.label[locale]}
                </h3>
                {group.note && (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {group.note[locale]}
                  </p>
                )}
              </div>

              <ul className="flex flex-wrap items-baseline text-[15px] leading-relaxed text-muted-foreground">
                {group.items.map((item, itemIndex) => (
                  <Fragment key={item}>
                    {itemIndex > 0 && (
                      <li
                        aria-hidden="true"
                        className="select-none px-2.5 text-muted-foreground/40"
                      >
                        &middot;
                      </li>
                    )}
                    <li className="transition-colors duration-200 ease-editorial hover:text-foreground">
                      {item}
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
