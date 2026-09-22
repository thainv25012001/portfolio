import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content, PROFILE } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type HeroProps = { locale: Locale };

export function Hero({ locale }: HeroProps) {
  const { hero, contact } = content;

  return (
    <section
      id="top"
      className="flex min-h-dvh scroll-mt-20 flex-col justify-center py-24 md:py-32"
    >
      <Reveal>
        <p className="font-pixel text-label uppercase text-brand">
          {hero.role[locale]}
        </p>
      </Reveal>

      {/* mask: tên trồi lên từ sau đường kẻ, không bay vào — chất in ấn hơn */}
      <Reveal delay={STAGGER} variant="mask">
        <h1 className="mt-6 text-display font-pixel">{PROFILE.name}</h1>
      </Reveal>

      <Reveal delay={STAGGER * 2}>
        {/* Câu định vị — dòng quan trọng nhất trang, để font-sans cho dễ đọc
            ở đoạn văn dài, khác với font-pixel dùng cho tiêu đề/nhãn. */}
        <p className="mt-8 max-w-3xl text-balance font-sans text-body text-muted-foreground">
          {hero.positioning[locale]}
        </p>
      </Reveal>

      <Reveal delay={STAGGER * 3}>
        {/* PROFILE.resumeUrl / ui.resume chưa tồn tại — dùng cvUrl và nhãn CV
            hiện có, đổi cả hai ở Task 8. */}
        <div className="mt-12 flex flex-wrap gap-4">
          <PixelButton href={PROFILE.cvUrl} external>
            {hero.secondaryCta[locale]}
          </PixelButton>
          <PixelButton href="#contact" variant="secondary">
            {contact.heading[locale]}
          </PixelButton>
        </div>
      </Reveal>
    </section>
  );
}
