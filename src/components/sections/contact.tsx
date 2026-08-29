import { Section } from "@/components/ui/section";
import { Reveal, STAGGER } from "@/components/ui/reveal";
import { content, PROFILE } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type ContactProps = { locale: Locale };

export function Contact({ locale }: ContactProps) {
  const { contact } = content;

  return (
    <Section id="contact" index="05" heading={contact.heading[locale]}>
      <Reveal>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          {contact.blurb[locale]}
        </p>
      </Reveal>

      <Reveal delay={STAGGER}>
        {/* Email cỡ lớn — điểm kết của trang, cũng là CTA chính */}
        <a
          href={`mailto:${PROFILE.email}`}
          className="mt-10 block break-words font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-none tracking-tightest transition-colors duration-300 ease-editorial hover:text-brand"
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
                className="link-underline font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
