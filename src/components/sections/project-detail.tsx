import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelTag } from "@/components/ui/pixel/pixel-tag";
import { ProjectVisuals } from "@/components/visuals/project-visual";
import { content, type Project } from "@/data/content";
import type { Locale } from "@/lib/i18n";

/** Trang chi tiet mot du an. Day la noi duy nhat con van xuoi va hinh ve. */
export function ProjectDetail({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const { ui, projects } = content;
  const rows = [
    { key: "problem", label: projects.labels.problem[locale], value: project.problem[locale] },
    { key: "solution", label: projects.labels.solution[locale], value: project.solution[locale] },
    { key: "result", label: projects.labels.result[locale], value: project.result[locale] },
  ];

  return (
    <article className="py-24 md:py-32">
      <p className="font-pixel text-label uppercase text-muted-foreground">
        {project.period[locale]}
      </p>

      <h1 className="mt-4 font-pixel text-display uppercase">{project.title}</h1>

      <p className="mt-6 max-w-3xl text-body text-muted-foreground">
        {project.tagline[locale]}
      </p>

      {/* Khoi links CHI hien khi that su co link. Du an cua khach hang thuong
          khong public, va mot muc rong trong hon la khong co muc nao. */}
      {project.links?.length ? (
        <div className="mt-8">
          <h2 className="font-pixel text-label uppercase text-muted-foreground">
            {ui.projectLinks[locale]}
          </h2>
          <div className="mt-4 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <PixelButton key={link.href} href={link.href} external size="sm">
                {link.label[locale]}
              </PixelButton>
            ))}
          </div>
        </div>
      ) : null}

      <dl className="mt-14 space-y-8">
        {rows.map((row) => (
          <div key={row.key} className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
            <dt className="font-pixel text-label uppercase text-muted-foreground md:pt-2">
              {row.label}
            </dt>
            <dd className="max-w-3xl text-body">{row.value}</dd>
          </div>
        ))}
      </dl>

      <ProjectVisuals visuals={project.visuals} locale={locale} />

      <ul className="mt-10 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <PixelTag>{tag}</PixelTag>
          </li>
        ))}
      </ul>

      <div className="mt-16">
        <PixelButton href={`/${locale}#work`} variant="secondary">
          {ui.backToWork[locale]}
        </PixelButton>
      </div>
    </article>
  );
}
