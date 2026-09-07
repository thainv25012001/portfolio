"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Item = { id: string; label: string };

/**
 * Nav trên header, biết mình đang ở đâu.
 *
 * Hai việc:
 * 1. Section nào đang chiếm dải trên của viewport thì mục nav tương ứng sáng
 *    lên màu accent — người đọc luôn biết mình đang ở phần nào.
 * 2. Một vạch 1px màu accent ở đáy header chạy theo tiến độ cuộn trang.
 *
 * Nhãn được truyền vào dưới dạng chuỗi đã dịch sẵn, nên client bundle không
 * phải nuốt cả cây nội dung.
 */
export function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    // rootMargin bó vùng quan tâm vào dải trên của viewport, nên "đang xem"
    // là section vừa chạm mép trên chứ không phải section to nhất trên màn.
    const observer = new IntersectionObserver(
      (entries) => {
        const last = entries.findLast((entry) => entry.isIntersecting);
        if (last) setActive(last.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    let frame = 0;
    let max = 0;

    // Chiều cao trang và viewport chỉ đổi khi resize. Đọc chúng trong vòng
    // rAF sẽ ép trình duyệt tính lại layout mỗi khung — mà lúc đang cuộn thì
    // DOM luôn "bẩn" vì các Reveal vừa setState, nên đó là layout đồng bộ trên
    // cả trang. Đo một lần, chỉ đo lại khi resize.
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
    };

    // Ghi tiến độ vào CSS var thay vì setState: cuộn không kéo React render lại.
    const write = () => {
      frame = 0;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      barRef.current?.style.setProperty("--progress", String(progress));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    // Đo và vẽ lượt đầu trong rAF, không phải giữa lúc hydrate — gọi thẳng ở
    // đây là ép reflow ngay trong commit đầu tiên.
    frame = requestAnimationFrame(() => {
      measure();
      write();
    });

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <nav aria-label="Section navigation" className="hidden md:block">
        <ul className="flex items-center gap-6">
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "link-underline text-[13px] transition-colors duration-300 ease-editorial",
                    isActive
                      ? "text-brand"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div ref={barRef} aria-hidden="true" className="header-progress" />
    </>
  );
}
