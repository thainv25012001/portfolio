"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  /** Độ trễ (giây) — dùng để tạo stagger giữa các phần tử cùng nhóm. */
  delay?: number;
  className?: string;
};

/**
 * Animation DUY NHẤT của site: fade + trượt lên 16px khi phần tử lọt vào viewport.
 *
 * Dùng Intersection Observer thuần (xem lib/use-in-view.ts) để quyết định thời điểm,
 * Framer Motion chỉ lo phần chuyển động. Chạy một lần, không animate lại khi cuộn ngược.
 * Nếu người dùng bật "reduce motion" ở hệ điều hành thì bỏ hẳn animation.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const [ref, isInView] = useInView<HTMLDivElement>();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      // data-reveal: móc cho <noscript> trong layout ép hiện nội dung khi không có JS.
      // Framer Motion render cả `initial` ở phía server, nên nếu thiếu móc này thì
      // trang gần như trắng trơn với người tắt JS.
      data-reveal=""
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Khoảng cách giữa các phần tử trong cùng một nhóm stagger (giây). */
export const STAGGER = 0.06;
