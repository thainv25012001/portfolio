import Image from "next/image";

import { Slider } from "@/components/ui/slider";
import { DiagramMotion } from "@/components/visuals/diagram-motion";
import { DIAGRAMS } from "@/components/visuals/diagrams";
import { content, type ProjectVisual } from "@/data/content";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ProjectVisualsProps = {
  visuals: ProjectVisual[] | undefined;
  locale: Locale;
};

type ImageVisual = Extract<ProjectVisual, { kind: "image" }>;

const DEFAULT_RATIO = 16 / 10;

/** Tỉ lệ thu nhỏ tối đa của diagram trước khi chuyển sang cuộn ngang. */
const MIN_DIAGRAM_SCALE = 0.72;

/** Đổi chuỗi "1918 / 911" trong content.ts thành số để tính toán. */
function parseRatio(ratio: string | undefined): number {
  if (!ratio) return DEFAULT_RATIO;
  const [w, h] = ratio.split("/").map((n) => Number(n.trim()));
  return w > 0 && h > 0 ? w / h : DEFAULT_RATIO;
}

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
  const diagram = DIAGRAMS[visual.id];

  return (
    <figure>
      {/* DiagramMotion lo phần "khi nào bắt đầu vẽ" — nó theo dõi chính khung
          hình này, không phải khối dự án bao ngoài. */}
      <DiagramMotion
        className={cn(
          "overflow-x-auto border border-line px-5 py-6 md:px-7",
          // Lùi trái đúng bằng cột nhãn + khoảng cách của Section, nên hình
          // rộng chiếm hết chiều ngang thay vì bị bó trong cột nội dung.
          diagram.bleed && "md:-ml-bleed",
        )}
      >
        {/* Thẻ <svg> nằm ở đây, không nằm trong từng diagram: chỉ một chỗ viết
            viewBox và quyết định bề rộng tối thiểu. Không cho hình co nhỏ quá
            MIN_DIAGRAM_SCALE — chữ trong SVG co theo hình, nhỏ quá là không
            đọc được — hẹp hơn thì cuộn ngang. */}
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          className="w-full"
          style={{ minWidth: Math.round(diagram.width * MIN_DIAGRAM_SCALE) }}
        >
          {diagram.render(locale)}
        </svg>
      </DiagramMotion>
      {visual.caption && <Caption>{visual.caption[locale]}</Caption>}
    </figure>
  );
}

function ImageFigure({
  visual,
  locale,
  ratio,
}: {
  visual: ImageVisual;
  locale: Locale;
  /** Tỉ lệ của khung. Trong băng ảnh mọi khung dùng chung một giá trị. */
  ratio: number;
}) {
  return (
    <figure>
      {/* aspectRatio giữ chỗ sẵn nên trang không nhảy layout lúc ảnh đang tải. */}
      <div
        className="relative w-full overflow-hidden border border-line bg-secondary"
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={visual.src}
          alt={visual.alt[locale]}
          fill
          // Ảnh luôn chiếm trọn bề ngang cột nội dung.
          sizes="(max-width: 1100px) 100vw, 750px"
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
 *
 * Một ảnh thì hiện thẳng. Từ hai ảnh trở lên thì thành băng ảnh cuộn ngang —
 * xếp lưới nhiều cột sẽ bóp mỗi ảnh còn nửa bề ngang, quá nhỏ để nhìn ra chi
 * tiết giao diện.
 */
export function ProjectVisuals({ visuals, locale }: ProjectVisualsProps) {
  if (!visuals?.length) return null;

  const { ui } = content;
  const diagrams = visuals.filter((v) => v.kind === "diagram");
  const images = visuals.filter((v): v is ImageVisual => v.kind === "image");

  /**
   * Mọi khung ảnh dùng chung tỉ lệ của ảnh CAO nhất (tỉ lệ w/h nhỏ nhất).
   * Ảnh đó vừa khít khung, các ảnh còn lại có viền trên dưới — đổi lại khung
   * không nhảy chiều cao khi chuyển slide, và tỉ lệ co giãn theo bề rộng màn
   * hình thay vì bị chốt cứng bằng một con số pixel.
   */
  const trackRatio = images.length
    ? Math.min(...images.map((v) => parseRatio(v.ratio)))
    : DEFAULT_RATIO;

  return (
    <div className="mt-8 space-y-6">
      {diagrams.map((visual, index) => (
        <DiagramFigure
          key={`diagram-${index}`}
          visual={visual}
          locale={locale}
        />
      ))}

      {images.length === 1 && (
        <ImageFigure visual={images[0]} locale={locale} ratio={trackRatio} />
      )}

      {images.length > 1 && (
        <Slider
          label={ui.gallery[locale]}
          prevLabel={ui.prevSlide[locale]}
          nextLabel={ui.nextSlide[locale]}
        >
          {images.map((visual) => (
            <ImageFigure
              key={visual.src}
              visual={visual}
              locale={locale}
              ratio={trackRatio}
            />
          ))}
        </Slider>
      )}
    </div>
  );
}
