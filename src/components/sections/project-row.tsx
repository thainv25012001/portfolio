import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelPanel } from "@/components/ui/pixel/pixel-panel";
import { PixelTag } from "@/components/ui/pixel/pixel-tag";
import { content, type Project } from "@/data/content";
import type { Locale } from "@/lib/i18n";

/** So the toi da hien tren card trang chu — phan du gop thanh "+N". */
const CARD_TAG_LIMIT = 6;

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

  // Dự án nhiều công nghệ (AIVN có 11 thẻ) sẽ kéo cao cả hàng lưới, vì các thẻ
  // dự án dùng chung chiều cao. Card chỉ khoe vài thẻ đầu rồi gộp phần còn lại
  // thành "+N"; trang detail vẫn liệt kê đủ.
  const shown = project.tags.slice(0, CARD_TAG_LIMIT);
  const hidden = project.tags.length - shown.length;

  return (
    // flex h-full flex-col: lấp đầy chiều cao Reveal đã được grid kéo giãn, và
    // cho phép nút ở dưới dùng mt-auto để ghim xuống đáy.
    <PixelPanel
      as="article"
      className="pixel-lift group flex h-full flex-col p-6 md:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <span className="font-pixel text-label text-brand">{index}</span>
        <span className="font-pixel text-label text-muted-foreground">
          {project.period[locale]}
        </span>
      </div>

      <h3 className="mt-4 font-pixel text-h3 uppercase">{project.title}</h3>

      <p className="mt-3 max-w-3xl text-body text-muted-foreground">
        {project.tagline[locale]}
      </p>

      {/* tag-sweep: hover cả khối thì hàng thẻ sáng lên lần lượt từ trái sang */}
      <ul className="tag-sweep mt-5 flex flex-wrap gap-2">
        {shown.map((tag, i) => (
          <li key={tag} style={{ "--i": i } as React.CSSProperties}>
            <PixelTag>{tag}</PixelTag>
          </li>
        ))}
        {hidden > 0 && (
          <li style={{ "--i": shown.length } as React.CSSProperties}>
            <PixelTag>{`+${hidden}`}</PixelTag>
          </li>
        )}
      </ul>

      {/* mt-auto: dồn khoảng trống thừa lên trên nút, nên 4 nút VIEW DETAIL
          thẳng hàng ngang qua cả lưới thay vì so le theo độ dài tagline. */}
      <div className="mt-auto pt-6">
        <PixelButton href={`/${locale}/work/${project.id}`} navigate="link" size="sm">
          {ui.viewDetail[locale]}
        </PixelButton>
      </div>
    </PixelPanel>
  );
}
