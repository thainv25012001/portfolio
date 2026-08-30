import { Fragment } from "react";

import { cn } from "@/lib/utils";

/**
 * Dấu phân cách giữa các phần tử của một danh sách.
 *
 * Trước đây mỗi chỗ tự viết lại đoạn `index > 0 && <span aria-hidden …>` —
 * năm bản sao, và khoảng cách đã lệch nhau bốn kiểu. Gom về đây để dấu phân
 * cách, độ mờ và thuộc tính `aria-hidden` chỉ còn một nguồn duy nhất.
 *
 * `aria-hidden` là chi tiết dễ quên nhất mà lại quan trọng nhất: dấu phân cách
 * là trang trí, screen reader đọc lên chỉ gây nhiễu.
 *
 * `as="li"` dùng khi danh sách là <ul>/<ol> — con trực tiếp của chúng bắt buộc
 * phải là <li>, không được là <span>.
 */
export function Separator({
  children = "·",
  as: Tag = "span",
  className,
}: {
  children?: string;
  as?: "span" | "li";
  className?: string;
}) {
  return (
    <Tag
      aria-hidden="true"
      className={cn("select-none px-2 text-muted-foreground/40", className)}
    >
      {children}
    </Tag>
  );
}

type SeparatedProps = {
  /** Giá trị rỗng/undefined bị loại bỏ, nên phần tuỳ chọn cứ truyền thẳng vào. */
  items: Array<string | undefined | null | false>;
  separator?: string;
  className?: string;
};

/**
 * Nối một danh sách chuỗi bằng dấu phân cách, bỏ qua phần tử rỗng.
 * Dùng cho các dòng meta ngắn, ví dụ "khoảng thời gian / nơi làm việc".
 */
export function Separated({ items, separator, className }: SeparatedProps) {
  const present = items.filter((item): item is string => Boolean(item));

  return (
    <>
      {present.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <Separator className={className}>{separator}</Separator>
          )}
          {item}
        </Fragment>
      ))}
    </>
  );
}
