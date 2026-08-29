import { Button } from "@/components/ui/button";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content, PROFILE } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type HeroProps = { locale: Locale };

export function Hero({ locale }: HeroProps) {
  const { hero } = content;

  return (
    <section id="top" className="py-20 md:py-28 lg:pb-36 lg:pt-32">
      <Reveal>
        <p className="section-label text-brand">{hero.role[locale]}</p>
      </Reveal>

      <Reveal delay={STAGGER}>
        <h1 className="mt-6 text-display">{PROFILE.name}</h1>
      </Reveal>

      <Reveal delay={STAGGER * 2}>
        <hr className="mt-10 border-line" />
      </Reveal>

      <Reveal delay={STAGGER * 3}>
        {/* Câu định vị — dòng quan trọng nhất trang, để cỡ lớn hơn body */}
        <p className="mt-10 max-w-2xl text-balance text-xl leading-snug text-foreground md:text-2xl">
          {hero.positioning[locale]}
        </p>
      </Reveal>

      <Reveal delay={STAGGER * 4}>
        <p className="mt-5 text-sm text-muted-foreground">
          {hero.currentRole[locale]}
        </p>
      </Reveal>

      <Reveal delay={STAGGER * 5}>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild variant="primary">
            <a href="#work">{hero.primaryCta[locale]}</a>
          </Button>
          <Button asChild variant="outline">
            {/* download: tải thẳng file thay vì mở PDF trong tab mới */}
            <a href={PROFILE.cvUrl} download>
              {hero.secondaryCta[locale]}
            </a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
