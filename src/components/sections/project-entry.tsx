import { Fragment } from "react";

import { Separator } from "@/components/ui/separated";
import { ProjectVisuals } from "@/components/visuals/project-visual";
import { content, type Project } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type ProjectEntryProps = {
  project: Project;
  /** Số thứ tự hiển thị, ví dụ "01". */
  index: string;
  locale: Locale;
};

/**
 * Một khối dự án: số thứ tự + khoảng thời gian, tiêu đề, một dòng mô tả,
 * ba gạch đầu dòng (vấn đề / giải pháp / kết quả) và hàng tag công nghệ.
 *
 * Cố tình KHÔNG dùng card bo tròn — chỉ đường kẻ ngang phân cách các khối.
 */
export function ProjectEntry({ project, index, locale }: ProjectEntryProps) {
  const { labels } = content.projects;

  // Ba gạch đầu dòng dùng chung một khuôn, khai báo thành mảng cho gọn.
  const rows = [
    { key: "problem", label: labels.problem[locale], value: project.problem[locale] },
    { key: "solution", label: labels.solution[locale], value: project.solution[locale] },
    { key: "result", label: labels.result[locale], value: project.result[locale] },
  ];

  return (
    <article className="group py-10 md:py-14">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.18em] text-brand transition-transform duration-500 ease-editorial group-hover:-translate-y-0.5">
          {index}
        </span>
        <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
          {project.period[locale]}
        </span>
      </div>

      <h3 className="mt-4 text-h3 transition-colors duration-300 ease-editorial group-hover:text-brand md:text-h2">
        {project.title}
      </h3>

      {/* Hairline chạy từ trái sang khi trỏ vào khối — hover state duy nhất
          ở cấp khối, thay cho việc đổi màu nền. */}
      <div aria-hidden="true" className="project-rule mt-4 h-px bg-brand" />

      <p className="mt-3 max-w-2xl text-body text-muted-foreground">
        {project.tagline[locale]}
      </p>

      <ProjectVisuals visuals={project.visuals} locale={locale} />

      <dl className="mt-8 space-y-4 border-l border-line pl-5 md:space-y-3 md:pl-6">
        {rows.map((row) => (
          <div
            key={row.key}
            className="grid gap-1 md:grid-cols-[6rem_1fr] md:gap-6"
          >
            <dt className="meta-label md:pt-1">
              {row.label}
            </dt>
            <dd className="max-w-2xl text-body">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-8 flex flex-wrap items-baseline meta-label">
        {project.tags.map((tag, tagIndex) => (
          <Fragment key={tag}>
            {tagIndex > 0 && <Separator as="li" />}
            <li>{tag}</li>
          </Fragment>
        ))}
      </ul>
    </article>
  );
}
