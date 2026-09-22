import * as React from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "default" | "sm";

const BASE =
  "pixel-press inline-flex items-center justify-center gap-2 border-[length:var(--pixel-border)] font-pixel uppercase tracking-[0.12em] shadow-pixel " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-0 " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANT: Record<Variant, string> = {
  primary: "border-foreground bg-brand text-brand-foreground",
  secondary: "border-foreground bg-transparent text-foreground hover:bg-secondary",
};

const SIZE: Record<Size, string> = {
  default: "h-14 px-8 text-[1.375rem]",
  sm: "h-10 px-4 text-[1rem]",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AnchorProps = CommonProps & { href: string; external?: boolean } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type ButtonProps = CommonProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

type Props = AnchorProps | ButtonProps;

/**
 * Nút kiểu game: viền dày, bóng cứng, bấm là lún xuống đúng bằng độ lệch bóng.
 *
 * Có `href` thì render <a>, không thì <button>. Không bao giờ dùng <div> gắn
 * onClick — bàn phím và screen reader sẽ không thấy nó là điều khiển.
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
    const { href, external, children: _children, variant: _v, size: _s, className: _c, ...anchorProps } = props;
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
