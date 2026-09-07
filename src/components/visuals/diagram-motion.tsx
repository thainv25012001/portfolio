"use client";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

/**
 * Khung bọc quanh <svg> của diagram, tự bật `data-visible` khi CHÍNH diagram
 * lọt vào màn hình.
 *
 * Trước đây animation ăn theo `[data-visible]` của <Reveal> bọc cả khối dự án.
 * Khối đó cao hơn viewport nhiều, nên lúc nó bật thì diagram còn nằm dưới màn
 * hình: đo được chỉ 4% diagram hiện ra khi hoạt cảnh bắt đầu, 7% khi kết thúc.
 * Cả chuỗi tự vẽ chạy cho không ai xem.
 *
 * Class `dg-root` vừa là mốc neo cho CSS, vừa là hợp đồng: chỉ diagram nằm
 * trong khung này mới bị ẩn lúc đầu. Diagram vẽ ở nơi khác vẫn hiện bình
 * thường thay vì trắng trơn không rõ lý do.
 */
export function DiagramMotion({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Ngưỡng cao hơn Reveal: diagram cần lộ ra một mảng đáng kể rồi mới vẽ,
  // chứ không phải vừa ló mép trên.
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.25,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <div
      ref={ref}
      // Diagram chỉ nhắc lại điều ba gạch đầu dòng bên dưới đã nói, nên ẩn khỏi
      // screen reader thay vì bắt viết alt text cho từng hình, từng ngôn ngữ.
      aria-hidden="true"
      data-visible={isInView ? "" : undefined}
      className={cn("dg-root", className)}
    >
      {children}
    </div>
  );
}
