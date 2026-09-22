import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelPanel } from "@/components/ui/pixel/pixel-panel";
import { PixelTag } from "@/components/ui/pixel/pixel-tag";
import { content, type Project } from "@/data/content";
import type { Locale } from "@/lib/i18n";

/**
 * Mot dong trong bang chon du an tren trang chu.
 *
 * CO Y khong co van xuoi va khong co hinh: ba doan problem/solution/result va
 * diagram deu da chuyen han sang trang detail. Man WORK phai vua mot man hinh.
 */
export function ProjectRow({
  project,
  index,
  locale,
}: {
  project: Project;
  index: string;
  locale: Locale;
}) {
  const { ui } = content;

  return (
    <PixelPanel as="article" className="group p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <span className="font-pixel text-label text-brand">{index}</span>
        <span className="font-pixel text-label text-muted-foreground">
          {project.period[locale]}
        </span>
      </div>

      <h3 className="mt-4 font-pixel text-h3 uppercase">{project.title}</h3>

      <p className="mt-3 max-w-2xl text-body text-muted-foreground">
        {project.tagline[locale]}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li key={tag}>
            <PixelTag>{tag}</PixelTag>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <PixelButton href={`/${locale}/work/${project.id}`} size="sm">
          {ui.viewDetail[locale]}
        </PixelButton>
      </div>
    </PixelPanel>
  );
}
