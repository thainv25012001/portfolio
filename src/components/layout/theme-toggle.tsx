"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  /** Nhãn cho screen reader, lấy từ content.ts theo ngôn ngữ hiện tại. */
  label: string;
};

export function ThemeToggle({ label }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Theme chỉ biết được ở phía client. Chờ mount xong mới render icon,
  // nếu không server và client sẽ render lệch nhau (hydration mismatch).
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" strokeWidth={1.5} />
        ) : (
          <Moon className="h-4 w-4" strokeWidth={1.5} />
        )
      ) : (
        // Giữ chỗ đúng kích thước icon để header không bị nhảy layout.
        <span className="h-4 w-4" />
      )}
    </Button>
  );
}
