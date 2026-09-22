import { Screen } from "@/components/ui/screen";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type AboutProps = { locale: Locale };

export function About({ locale }: AboutProps) {
  const { about } = content;

  return (
    <Screen id="about" heading={about.heading[locale]}>
      <div className="max-w-4xl space-y-6">
        {about.paragraphs[locale].map((paragraph, index) => (
          <Reveal key={index} delay={index * STAGGER}>
            <p className="text-body text-muted-foreground">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </Screen>
  );
}
