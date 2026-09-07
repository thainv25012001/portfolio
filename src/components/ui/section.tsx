import { Reveal } from "@/components/ui/reveal";
import { Separator } from "@/components/ui/separated";
import { cn } from "@/lib/utils";

type SectionProps = {
  /** Trùng với NavItem.id trong content.ts để anchor link hoạt động. */
  id: string;
  /** Số thứ tự hiển thị ở cột trái, ví dụ "01". */
  index: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Khung chung cho mọi section: đường kẻ ngang phân cách, cột nhãn bên trái
 * (số thứ tự + tên section) và cột nội dung bên phải.
 *
 * Trên mobile hai cột xếp chồng; từ md trở lên là lưới 2 cột, cột nhãn dính
 * theo cuộn để luôn nhìn thấy mình đang ở phần nào.
 */
export function Section({
  id,
  index,
  heading,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-t border-line py-20 md:py-28 lg:py-32",
        className,
      )}
    >
      <div className="grid gap-8 md:grid-cols-[var(--section-label-w)_1fr] md:gap-y-12 md:gap-x-section-gap">
        <Reveal>
          {/* Không dính theo cuộn: hình vẽ rộng tràn ngược qua đúng cột này,
              nhãn dính lại sẽ bị hình đè lên. */}
          <div>
            <p className="section-label">
              <span className="text-brand">{index}</span>
              <Separator>/</Separator>
              {heading}
            </p>
          </div>
        </Reveal>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
