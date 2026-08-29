import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type FooterProps = { locale: Locale };

export function Footer({ locale }: FooterProps) {
  const { footer, ui } = content;

  return (
    <footer className="border-t border-line py-10">
      <div className="flex flex-col gap-4 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>{footer.rights[locale]}</p>

        <div className="flex items-center gap-6">
          <p>{footer.builtWith[locale]}</p>
          <a href="#top" className="link-underline hover:text-foreground">
            {ui.backToTop[locale]}
          </a>
        </div>
      </div>
    </footer>
  );
}
