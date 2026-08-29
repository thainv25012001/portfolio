import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button theo cấu trúc shadcn/ui nhưng đã restyle cho thiết kế editorial:
 * góc vuông tuyệt đối (rounded-none), viền 1px, không đổ bóng, không scale khi hover.
 * Giữ đúng API của shadcn để `npx shadcn add ...` sau này vẫn tương thích.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border text-sm font-medium tracking-tight transition-colors duration-200 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Nút chính: viền accent, hover thì đổ đầy màu accent vào nền.
        primary:
          "border-brand text-brand hover:bg-brand hover:text-brand-foreground",
        // Nút phụ: viền xám, hover thì viền sáng lên.
        outline:
          "border-border text-foreground hover:border-foreground hover:bg-secondary",
        // Dùng cho nút icon trên header.
        ghost:
          "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        icon: "h-9 w-9 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render thẻ con thay vì <button> — dùng khi bọc <Link> hoặc <a>. */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
