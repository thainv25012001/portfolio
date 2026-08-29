import { ProjectEntry } from "@/components/sections/project-entry";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type ProjectsProps = { locale: Locale };

export function Projects({ locale }: ProjectsProps) {
  const { projects } = content;

  return (
    <Section id="work" index="03" heading={projects.heading[locale]}>
      <Reveal>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {projects.intro[locale]}
        </p>
      </Reveal>

      <div className="mt-4 divide-y divide-line border-t border-line">
        {projects.items.map((project, index) => (
          // Mỗi dự án là một khối lớn, tự fade-up khi cuộn tới.
          <Reveal key={project.id}>
            <ProjectEntry
              project={project}
              index={String(index + 1).padStart(2, "0")}
              locale={locale}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
