import Image from "next/image";

import { DIAGRAMS } from "@/components/visuals/diagrams";
import type { ProjectVisual as Visual } from "@/data/content";
import type { Locale } from "@/lib/i18n";

type ProjectVisualProps = {
  visual: Visual | undefined;
  locale: Locale;
};

/**
 * Hình minh hoạ của một dự án. Không có `visual` thì không render gì cả —
 * khối dự án lùi về dạng chỉ có chữ và layout vẫn đúng.
 */
export function ProjectVisual({ visual, locale }: ProjectVisualProps) {
  if (!visual) return null;

  if (visual.kind === "image") {
    return (
      <figure className="relative mt-8 aspect-[16/9] w-full overflow-hidden border border-line">
        <Image
          src={visual.src}
          alt={visual.alt[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 830px"
          className="object-cover"
        />
      </figure>
    );
  }

  const Diagram = DIAGRAMS[visual.id];

  return (
    // Diagram chỉ nhắc lại điều ba gạch đầu dòng bên dưới đã nói, nên ẩn khỏi
    // screen reader thay vì bắt người dùng viết alt text cho từng hình, từng ngôn ngữ.
    <figure
      aria-hidden="true"
      className="mt-8 overflow-x-auto border border-line px-5 py-6 md:px-7"
    >
      {/* min-width giữ cỡ chữ trong hình đủ lớn; hẹp hơn thì cuộn ngang. */}
      <div className="min-w-[520px]">
        <Diagram />
      </div>
    </figure>
  );
}
