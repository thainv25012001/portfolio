import { Screen } from "@/components/ui/screen";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content, PROFILE } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type ContactProps = { locale: Locale };

export function Contact({ locale }: ContactProps) {
  const { contact } = content;

  return (
    <Screen id="contact" heading={contact.heading[locale]}>
      <Reveal>
        <p className="max-w-3xl text-body text-muted-foreground">
          {contact.blurb[locale]}
        </p>
      </Reveal>

      <Reveal delay={STAGGER}>
        {/* Email cỡ lớn — điểm kết của trang, cũng là CTA chính */}
        <a
          href={`mailto:${PROFILE.email}`}
          // pixel-jog tự lo cả transition màu lẫn cú dịch một nấc khi hover,
          // nên ở đây KHÔNG dùng transition-colors của Tailwind: utility nằm
          // sau trong source order và sẽ ghi đè mất transform.
          className="pixel-jog mt-10 block break-words font-pixel text-[clamp(1.75rem,6vw,3.5rem)] leading-none tracking-tightest hover:text-brand"
        >
          {PROFILE.email}
        </a>
      </Reveal>

      <Reveal delay={STAGGER * 2}>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {contact.socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline meta-label hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Screen>
  );
}
