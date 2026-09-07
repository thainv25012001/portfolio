"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /**
   * Độ trễ (giây) để tạo stagger giữa các phần tử cùng nhóm.
   * Truyền xuống CSS qua biến --reveal-delay.
   */
  delay?: number;
  /**
   * "fade" — mờ dần + trượt lên. Mặc định, dùng cho khối nội dung.
   * "mask" — chữ trồi lên từ sau một đường kẻ vô hình. Dành cho tiêu đề lớn:
   *          nó đọc ra như chữ được in lên trang, không phải bay vào.
   */
  variant?: "fade" | "mask";
  className?: string;
};

/**
 * Bật chuyển động khi phần tử lọt vào viewport. Chạy một lần, không animate lại.
 *
 * JS ở đây CHỈ làm một việc: bật `data-visible`. Toàn bộ chuyển động nằm trong
 * CSS (xem globals.css). Nhờ vậy:
 * - không cần thư viện animation nào (bỏ được framer-motion, ~34 kB)
 * - SVG do server render vẫn animate được, chỉ cần CSS chọn theo `data-visible`
 * - `prefers-reduced-motion` xử lý một chỗ trong CSS, không rải rác trong JS
 */
export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  className,
}: RevealProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      data-reveal={variant}
      // Vắng attribute = chưa hiện. Server render không có, client bật sau khi
      // observer bắn — không lệch hydration vì cả hai lượt đầu đều chưa có.
      data-visible={isInView ? "" : undefined}
      style={delay ? { "--reveal-delay": `${delay}s` } as React.CSSProperties : undefined}
      className={cn(className)}
    >
      {children}
    </div>
  );
}

/** Khoảng cách giữa các phần tử trong cùng một nhóm stagger (giây). */
export const STAGGER = 0.06;
