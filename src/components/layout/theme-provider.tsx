"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Bọc next-themes. Cấu hình đặt ở layout: light là mặc định, đổi theme bằng
 * class trên thẻ <html>, và không tự bám theo cài đặt hệ điều hành
 * (enableSystem={false}) để light luôn là trạng thái đầu tiên người dùng thấy.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
