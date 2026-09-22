import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content, PROFILE } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type HeroProps = { locale: Locale };

export function Hero({ locale }: HeroProps) {
  const { hero, ui } = content;

  return (
    <section
      id="top"
      // Cùng cách căn giữa như Screen: `my-auto` trên khối con chứ không phải
      // `justify-center`, để màn cao hơn viewport không bị cắt mất phần đầu.
      className="flex min-h-dvh scroll-mt-20 flex-col py-20 md:py-24"
    >
      <div className="my-auto w-full min-w-0">
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
          <p className="mt-8 max-w-4xl text-balance font-sans text-body text-muted-foreground">
            {hero.positioning[locale]}
          </p>
        </Reveal>

        <Reveal delay={STAGGER * 3}>
          <div className="mt-12 flex flex-wrap gap-4">
            <PixelButton href={PROFILE.resumeUrl} external>
              {ui.resume[locale]}
            </PixelButton>
            <PixelButton href="#contact" variant="secondary">
              {ui.contact[locale]}
            </PixelButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
