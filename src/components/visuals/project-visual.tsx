import Image from "next/image";

import { DIAGRAMS } from "@/components/visuals/diagrams";
import { VIEWBOX_WIDTH } from "@/components/visuals/svg-primitives";
import type { ProjectVisual } from "@/data/content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ProjectVisualsProps = {
  visuals: ProjectVisual[] | undefined;
  locale: Locale;
};

type ImageVisual = Extract<ProjectVisual, { kind: "image" }>;

const DEFAULT_RATIO = "16 / 10";

/** Tỉ lệ thu nhỏ tối đa của diagram trước khi chuyển sang cuộn ngang. */
const MIN_DIAGRAM_SCALE = 0.72;

/**
 * Chú thích dưới hình. Dùng chung cho cả diagram lẫn ảnh.
 *
 * Cố tình KHÔNG dùng .meta-label: chú thích là câu hoàn chỉnh, viết hoa toàn
 * bộ theo kiểu nhãn thì cả dòng dài gần như không đọc nổi.
 */
function Caption({ children }: { children: string }) {
  return (
    <figcaption className="mt-3 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
      {children}
    </figcaption>
  );
}

function DiagramFigure({
  visual,
  locale,
}: {
  visual: Extract<ProjectVisual, { kind: "diagram" }>;
  locale: Locale;
}) {
  const Diagram = DIAGRAMS[visual.id];

  return (
    <figure>
      {/* Diagram chỉ nhắc lại điều ba gạch đầu dòng bên dưới đã nói, nên ẩn khỏi
          screen reader thay vì bắt viết alt text cho từng hình, từng ngôn ngữ. */}
      <div
        aria-hidden="true"
        className="overflow-x-auto border border-line px-5 py-6 md:px-7"
      >
        {/* Không cho hình co nhỏ quá MIN_DIAGRAM_SCALE, hẹp hơn thì cuộn ngang:
            chữ trong SVG co theo hình, nhỏ quá là không đọc được. */}
        <div style={{ minWidth: VIEWBOX_WIDTH * MIN_DIAGRAM_SCALE }}>
          <Diagram />
        </div>
      </div>
      {visual.caption && <Caption>{visual.caption[locale]}</Caption>}
    </figure>
  );
}

function ImageFigure({
  visual,
  locale,
  /**
   * true  — ảnh đứng một mình: kéo hết bề ngang cột, chiều cao suy từ `ratio`.
   * false — ảnh nằm trong lưới nhiều ảnh: mọi ô CÙNG một kích thước, ảnh fit
   *         vào giữa. Cách này chịu được mọi kiểu tỉ lệ trộn lẫn — ảnh ngang
   *         cạnh ảnh dọc vẫn thành một hàng phẳng, không lệch không hụt.
   */
  standalone,
}: {
  visual: ImageVisual;
  locale: Locale;
  standalone: boolean;
}) {
  // Báo đúng bề rộng thật để Next chọn kích thước ảnh tối ưu. Suy thẳng từ
  // `standalone` nên không cần truyền thành prop riêng.
  const sizes = standalone
    ? "(max-width: 1100px) 100vw, 750px"
    : "(max-width: 640px) 100vw, 375px";

  return (
    <figure>
      <div
        className={cn(
          "relative w-full overflow-hidden border border-line bg-secondary",
          !standalone && "h-48 md:h-[260px]",
        )}
        // Chỉ ảnh đứng một mình mới cần tỉ lệ: giữ chỗ sẵn để trang không nhảy
        // layout lúc ảnh đang tải. Trong lưới thì chiều cao đã cố định rồi.
        style={
          standalone
            ? { aspectRatio: visual.ratio ?? DEFAULT_RATIO }
            : undefined
        }
      >
        <Image
          src={visual.src}
          alt={visual.alt[locale]}
          fill
          sizes={sizes}
          // object-contain: fit trọn ảnh vào khung, không cắt mất phần nào của
          // giao diện. Với screenshot thì việc bị cắt mất một góc là hỏng.
          className="object-contain"
        />
      </div>
      {visual.caption && <Caption>{visual.caption[locale]}</Caption>}
    </figure>
  );
}

/**
 * Cụm hình của một dự án.
 *
 * Thứ tự cố định, không phụ thuộc thứ tự khai báo: diagram kiến trúc luôn nằm
 * trên (mỗi cái full width), ảnh sản phẩm nằm dưới.
 */
export function ProjectVisuals({ visuals, locale }: ProjectVisualsProps) {
  if (!visuals?.length) return null;

  const diagrams = visuals.filter((v) => v.kind === "diagram");
  const images = visuals.filter((v): v is ImageVisual => v.kind === "image");
  const standalone = images.length === 1;

  return (
    <div className="mt-8 space-y-6">
      {diagrams.map((visual, index) => (
        <DiagramFigure
          key={`diagram-${index}`}
          visual={visual}
          locale={locale}
        />
      ))}

      {images.length > 0 && (
        <div className={cn("grid gap-6", !standalone && "sm:grid-cols-2")}>
          {images.map((visual) => (
            <ImageFigure
              key={visual.src}
              visual={visual}
              locale={locale}
              standalone={standalone}
            />
          ))}
        </div>
      )}
    </div>
  );
}
