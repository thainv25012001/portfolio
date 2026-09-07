import Link from "next/link";

import { LocaleToggle } from "@/components/layout/locale-toggle";
import { SectionNav } from "@/components/layout/section-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { content, PROFILE } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type HeaderProps = { locale: Locale };

export function Header({ locale }: HeaderProps) {
  const { nav, ui } = content;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between">
        {/* Tên rút gọn, bấm vào quay lại đầu trang của đúng ngôn ngữ hiện tại */}
        <Link
          href={`/${locale}`}
          className="font-display text-lg tracking-tightest transition-colors duration-200 ease-editorial hover:text-brand"
        >
          {PROFILE.name}
        </Link>

        <div className="flex items-center gap-6">
          <SectionNav
            items={nav.items.map((item) => ({
              id: item.id,
              label: item.label[locale],
            }))}
          />

          <div className="flex items-center gap-3">
            <LocaleToggle current={locale} label={ui.switchLanguage[locale]} />
            <span aria-hidden="true" className="h-4 w-px bg-line" />
            <ThemeToggle label={ui.toggleTheme[locale]} />
          </div>
        </div>
      </div>
    </header>
  );
}
