import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { Portrait } from "@/components/ui/portrait";
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
        {/* Lưới 2 cột: chữ trái, ảnh chiếm trọn cột phải và căn giữa trong đó.
            Ảnh phải `row-span-2` thì mới căn giữa được theo chiều cao CẢ khối
            hero, chứ nằm cùng hàng với tên thì nó chỉ ngang tầm tên.

            Thứ tự trong DOM là tên → ảnh → mô tả, nên khi lưới xếp thành một
            cột ở mobile, ảnh rơi vào giữa tên và đoạn mô tả — tiêu đề vẫn là
            thứ đầu tiên đọc được. */}
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-[7fr_3fr] md:gap-y-8">
          <div className="min-w-0 md:col-start-1 md:row-start-1">
            <Reveal>
              <p className="font-pixel text-label uppercase text-brand">
                {hero.role[locale]}
              </p>
            </Reveal>

            {/* mask: tên trồi lên từ sau đường kẻ, không bay vào — chất in ấn hơn */}
            <Reveal delay={STAGGER} variant="mask">
              <h1 className="mt-6 text-display font-pixel">{PROFILE.name}</h1>
            </Reveal>

            {/* Dòng trạng thái — tuỳ chọn, bỏ khỏi content là biến mất luôn.
                Chấm nhỏ bên trái thay cho chữ "đang": tín hiệu sẵn sàng đọc
                được ngay mà không phải thêm một nhãn nữa cạnh nhãn vai trò.
                Nó nhấp nháy theo nhịp con trỏ dòng lệnh (pixel-blink) — chấm
                đứng yên đọc ra là chấm trang trí, chấm nháy đọc ra là đèn. */}
            {hero.availability && (
              <Reveal delay={STAGGER * 1.5}>
                <p className="mt-6 flex items-center gap-3 font-pixel text-label uppercase text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="pixel-blink h-2.5 w-2.5 shrink-0 bg-brand"
                  />
                  {hero.availability[locale]}
                </p>
              </Reveal>
            )}
          </div>

          <Reveal
            delay={STAGGER * 2}
            className="md:col-start-2 md:row-start-1 md:row-span-2 md:flex md:items-center md:justify-center"
          >
            <Portrait src={PROFILE.avatarUrl} alt={ui.portraitAlt[locale]} />
          </Reveal>

          <div className="min-w-0 md:col-start-1 md:row-start-2">
            <Reveal delay={STAGGER * 3}>
              {/* Câu định vị — dòng quan trọng nhất trang, để font-sans cho dễ đọc
                  ở đoạn văn dài, khác với font-pixel dùng cho tiêu đề/nhãn. */}
              <p className="text-balance font-sans text-body text-muted-foreground">
                {hero.positioning[locale]}
              </p>
            </Reveal>

            <Reveal delay={STAGGER * 4}>
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
        </div>
      </div>
    </section>
  );
}
