import { Reveal } from "@/components/ui/reveal";
import { nav } from "@/data/content/site";
import { cn } from "@/lib/utils";

type ScreenProps = {
  /** Trùng NavItem.id trong content để anchor link chạy. */
  id: string;
  heading: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Số thứ tự hiển thị trên đầu màn, suy ra từ vị trí trong `nav.items`.
 *
 * KHÔNG nhận qua prop: thứ tự các màn đã là dữ liệu ở content/site.ts rồi, và
 * mỗi section tự khai thêm một con số nghĩa là chèn một màn mới phải sửa lại
 * tay tất cả những màn đứng sau — quên một cái là trang có hai số trùng nhau
 * mà chẳng có gì báo. Id nào không nằm trong nav (nếu có) thì không đánh số.
 */
function ordinal(id: string): string | null {
  const at = nav.items.findIndex((item) => item.id === id);
  return at < 0 ? null : String(at + 1).padStart(2, "0");
}

/**
 * Một "màn" chiếm trọn chiều cao viewport.
 *
 * Cố tình KHÔNG dùng scroll-snap: màn Stack cao hơn viewport sau khi mở một
 * category, snap sẽ khoá người đọc ở giữa và phá cuộn bằng bàn phím.
 * min-h-dvh (không phải min-h-screen) để thanh địa chỉ trên mobile không làm
 * màn bị hụt.
 *
 * Căn giữa bằng `my-auto` trên khối con chứ KHÔNG dùng `justify-center`:
 * vài màn (Stack sau khi mở category, Work, Experience) cao hơn viewport, và
 * `justify-center` khi nội dung tràn sẽ đẩy phần đầu lên trên mép khung —
 * vùng đó không cuộn tới được nên chữ bị cắt mất. Auto margin tự về 0 khi
 * hết chỗ, nên còn chỗ thì căn giữa, hết chỗ thì bám mép trên và cuộn bình
 * thường.
 *
 * Tiêu đề là <h2> thật: trang chủ có đúng một <h1> (tên ở Hero), rồi tới các
 * <h2> này, rồi <h3> trong từng khối — cây heading liền mạch, không nhảy bậc.
 */
export function Screen({ id, heading, children, className }: ScreenProps) {
  const index = ordinal(id);

  return (
    <section
      id={id}
      className={cn(
        "flex min-h-dvh scroll-mt-20 flex-col py-20 md:py-24",
        className,
      )}
    >
      <div className="my-auto w-full min-w-0">
        <Reveal className="mb-8 md:mb-12">
          {index && (
            <p className="font-pixel text-label uppercase text-brand">{index}</p>
          )}
          <h2 className="mt-2 font-pixel text-h2 uppercase">{heading}</h2>
        </Reveal>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
