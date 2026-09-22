import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type ScreenProps = {
  /** Trùng NavItem.id trong content để anchor link chạy. */
  id: string;
  /** Số thứ tự, ví dụ "01". */
  index: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Một "màn" chiếm trọn chiều cao viewport.
 *
 * Cố tình KHÔNG dùng scroll-snap: màn Stack cao hơn viewport sau khi mở một
 * category, snap sẽ khoá người đọc ở giữa và phá cuộn bằng bàn phím.
 * min-h-dvh (không phải min-h-screen) để thanh địa chỉ trên mobile không làm
 * màn bị hụt.
 */
export function Screen({ id, index, heading, children, className }: ScreenProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-dvh scroll-mt-20 flex-col justify-center py-24 md:py-32",
        className,
      )}
    >
      <Reveal>
        <p className="mb-8 font-pixel text-label uppercase text-muted-foreground md:mb-12">
          <span className="text-brand">{index}</span>
          <span className="px-3 text-line">/</span>
          {heading}
        </p>
      </Reveal>

      <div className="min-w-0">{children}</div>
    </section>
  );
}
