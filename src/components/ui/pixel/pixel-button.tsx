import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "default" | "sm" | "icon";

const BASE =
  "pixel-press inline-flex items-center justify-center gap-2 border-[length:var(--pixel-border)] font-pixel uppercase tracking-[0.12em] shadow-pixel " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-0 " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANT: Record<Variant, string> = {
  primary: "border-foreground bg-brand text-brand-foreground",
  secondary: "border-foreground bg-transparent text-foreground hover:bg-secondary",
};

const SIZE: Record<Size, string> = {
  default: "h-14 px-8 text-ui",
  sm: "h-10 px-4 text-label",
  // O vuong chi chua icon, khong co chu nen khong khai text-*. 44px la nguong
  // vung cham toi thieu — nho hon nua thi tren dien thoai bam truot.
  icon: "h-11 w-11 p-0",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AnchorProps = CommonProps & {
  href: string;
  external?: boolean;
  /**
   * Ép chọn phần tử render. Bỏ trống thì tự suy ra (xem `resolveAsLink`):
   * - "link" → next/link, điều hướng client-side, không tải lại cả trang
   * - "anchor" → <a> thuần
   */
  navigate?: "link" | "anchor";
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonProps = CommonProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

type Props = AnchorProps | ButtonProps;

/**
 * Chọn next/link hay <a> thuần khi không có `navigate` truyền vào.
 *
 * Chỉ đường dẫn NỘI BỘ trong app router mới đi qua next/link. Cụ thể là href
 * bắt đầu bằng "/" mà không phải "//" (đó là protocol-relative, tức link ra
 * ngoài) và không được đánh dấu `external`. Mọi thứ còn lại — http(s):,
 * mailto:, tel:, "#contact", và cả /resume.pdf mở tab mới bằng `external` —
 * giữ <a> thuần: chúng không phải route của Next, cho next/link prefetch một
 * file tĩnh hay một mailto: chỉ tổ sinh request thừa và 404 trong dev.
 */
function resolveAsLink(href: string, external?: boolean): boolean {
  if (external) return false;
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Nút kiểu game: viền dày, bóng cứng, bấm là lún xuống đúng bằng độ lệch bóng.
 *
 * Có `href` thì render <a> hoặc <Link>, không thì <button>. Không bao giờ
 * dùng <div> gắn onClick — bàn phím và screen reader sẽ không thấy nó là
 * điều khiển.
 *
 * Href nội bộ mặc định render next/link: brief của site là "game feel", mà
 * mỗi lần bấm "Xem chi tiết" lại nháy trắng tải lại cả document thì hỏng hẳn
 * cảm giác đó. `navigate` cho phép ép tay khi cần thoát khỏi suy luận này.
 *
 * Lưu ý triển khai: TypeScript không narrow union này qua rest-spread một
 * cách gọn gàng (rest sau khi tách children/variant/size/className vẫn là
 * union AnchorProps-rest | ButtonProps-rest, và "href" in rest không đủ để
 * ép kiểu union thành từng nhánh cụ thể mà không cast). Nên props được nhận
 * nguyên vẹn dưới dạng `props: Props`, rồi kiểm tra `"href" in props` để
 * rẽ nhánh — cách này giữ đúng API công khai của brief mà vẫn typecheck sạch.
 */
export function PixelButton(props: Props) {
  const { children, variant = "primary", size = "default", className } = props;
  const classes = cn(BASE, VARIANT[variant], SIZE[size], className);

  if ("href" in props && props.href !== undefined) {
    const {
      href,
      external,
      navigate,
      children: _children,
      variant: _v,
      size: _s,
      className: _c,
      ...anchorProps
    } = props;

    const asLink =
      navigate === "link" ||
      (navigate === undefined && resolveAsLink(href, external));

    if (asLink) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const { href: _href, children: _children2, variant: _v2, size: _s2, className: _c2, ...buttonProps } = props;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
