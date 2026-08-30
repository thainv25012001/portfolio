"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separated";
import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LocaleToggleProps = {
  current: Locale;
  /** Nhãn cho screen reader, lấy từ content.ts. */
  label: string;
};

/**
 * Chuyển ngôn ngữ bằng cách đổi segment đầu của URL (/en <-> /vi).
 * Là <Link> thật chứ không phải state, nên link chia sẻ ra ngoài giữ đúng
 * ngôn ngữ và bot tìm kiếm index được cả hai bản.
 */
export function LocaleToggle({ current, label }: LocaleToggleProps) {
  const pathname = usePathname() ?? "/";

  // Bỏ segment locale ở đầu, giữ nguyên phần còn lại của đường dẫn.
  const restOfPath = pathname.replace(/^\/[^/]+/, "");

  return (
    <div role="group" aria-label={label} className="flex items-center">
      {locales.map((locale, index) => (
        <Fragment key={locale}>
          {index > 0 && <Separator className="px-1.5">/</Separator>}
          <Link
            href={`/${locale}${restOfPath}`}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "meta-label transition-colors duration-200 ease-editorial",
              locale === current
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {localeLabels[locale]}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
