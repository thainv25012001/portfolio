import { cn } from "@/lib/utils";

/** Thẻ tên công nghệ. KHÔNG có bóng — nó không bấm được, không được trông như nút. */
export function PixelTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-line px-3 py-1 font-pixel text-label uppercase tracking-[0.1em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
