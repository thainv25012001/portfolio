import type { LucideIcon } from "lucide-react";
import { Github, Linkedin } from "lucide-react";

import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

/**
 * Icon cho từng mạng xã hội, tra theo `id` trong contact.socials.
 *
 * Danh sách link nằm ở data/content/contact.ts chứ không lặp lại ở đây —
 * dock chỉ quyết định VẼ BẰNG GÌ. Id nào không có icon thì bị bỏ qua thay vì
 * render một ô trống: một nút vuông không hình chẳng nói được nó dẫn đi đâu.
 */
const ICONS: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
};

type SocialDockProps = { locale: Locale };

/**
 * Cụm nút mạng xã hội dán cố định ở góc dưới bên phải màn hình.
 *
 * Nằm ngoài .shell và dùng `fixed` nên nó bám viewport, không trôi theo
 * nội dung. z-40: trên lưới pixel nền (z-0) và khối nội dung (z-10), nhưng
 * vẫn dưới skip-link (z-60) để link bàn phím không bị che.
 *
 * Trên mobile thu nhỏ lại và nép sát mép hơn: màn hẹp thì 2 ô 48px ở góc
 * ăn mất một mảng đáng kể vùng đọc.
 */
export function SocialDock({ locale }: SocialDockProps) {
  const { contact, ui } = content;

  const links = contact.socials.filter((social) => social.id in ICONS);
  if (links.length === 0) return null;

  return (
    <nav
      aria-label={ui.socialLinks[locale]}
      className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      <ul className="flex flex-col gap-3">
        {links.map((social) => {
          const Icon = ICONS[social.id];

          return (
            <li key={social.id}>
              {/* Viền, bóng cứng, vòng focus và cú lún khi bấm đều lấy từ
                  PixelButton chứ không chép tay lại: đổi ngôn ngữ nút ở đó thì
                  dock đổi theo. Chỉ đè đúng hai chỗ thật sự khác — nền đục vì
                  nút nổi trên nội dung, và cỡ to hơn một nấc từ sm. */}
              <PixelButton
                href={social.href}
                external
                variant="secondary"
                size="icon"
                aria-label={social.label}
                title={social.label}
                className="flex bg-background hover:bg-brand hover:text-brand-foreground sm:h-12 sm:w-12"
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </PixelButton>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
