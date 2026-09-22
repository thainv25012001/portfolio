import Image from "next/image";

import { cn } from "@/lib/utils";

type PortraitProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Khung tròn duy nhất của site.
 *
 * Bán kính viết bằng giá trị tuỳ biến chứ không dùng `rounded-full`: thiết kế
 * pixel ép MỌI khoá borderRadius — kể cả `full` — về 0 trong tailwind.config,
 * nên `rounded-full` ở đây sẽ ra hình vuông. Hình tròn là ngoại lệ có chủ đích
 * giữa một trang toàn góc vuông: nó tách ảnh chân dung khỏi các khối chữ.
 *
 * Viền dày + bóng cứng lấy đúng ngôn ngữ của PixelPanel và PixelButton, nên
 * khung vẫn thuộc về hệ thiết kế dù hình dạng là ngoại lệ.
 */
export function Portrait({ src, alt, className }: PortraitProps) {
  return (
    <div
      className={cn(
        // Mobile: cỡ cố định. Từ md trở lên ảnh nằm trong cột 3/10 của Hero —
        // cột đó hẹp hơn 288px ở khổ md, nên cho ảnh co theo bề rộng cột và
        // chỉ chặn trần, thay vì đặt cứng từng mốc rồi tràn ra ngoài.
        "relative aspect-square w-44 shrink-0 overflow-hidden rounded-[50%] md:w-full md:max-w-72",
        // portrait-flip: hover thì bóng nhảy sang góc đối diện — xem globals.css
        "portrait-flip border-[length:var(--pixel-border)] border-foreground shadow-pixel",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        // Ảnh nằm ngay màn hình đầu: tải sớm thay vì lazy-load.
        priority
        sizes="(min-width: 1280px) 288px, (min-width: 768px) 30vw, 176px"
        className="object-cover"
      />
    </div>
  );
}
