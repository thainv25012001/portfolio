import { cn } from "@/lib/utils";

/** Khung có viền dày và bóng cứng. Dùng cho dòng dự án, khối stack, khối detail. */
export function PixelPanel({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  return (
    <Tag
      className={cn(
        "border-[length:var(--pixel-border)] border-foreground bg-background shadow-pixel",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
