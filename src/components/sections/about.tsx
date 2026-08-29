import { Section } from "@/components/ui/section";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type AboutProps = { locale: Locale };

export function About({ locale }: AboutProps) {
  const { about } = content;

  return (
    <Section id="about" index="01" heading={about.heading[locale]}>
      <div className="max-w-2xl space-y-6">
        {about.paragraphs[locale].map((paragraph, index) => (
          <Reveal key={index} delay={index * STAGGER}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
