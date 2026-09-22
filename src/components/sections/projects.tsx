import { ProjectRow } from "@/components/sections/project-row";
import { Reveal } from "@/components/ui/reveal";
import { Screen } from "@/components/ui/screen";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type ProjectsProps = { locale: Locale };

export function Projects({ locale }: ProjectsProps) {
  const { projects } = content;

  return (
    <Screen id="work" index="03" heading={projects.heading[locale]}>
      <Reveal>
        <p className="max-w-4xl text-body text-muted-foreground">
          {projects.intro[locale]}
        </p>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.items.map((project, index) => (
          <Reveal key={project.id}>
            <ProjectRow
              project={project}
              index={String(index + 1).padStart(2, "0")}
              locale={locale}
            />
          </Reveal>
        ))}
      </div>
    </Screen>
  );
}
