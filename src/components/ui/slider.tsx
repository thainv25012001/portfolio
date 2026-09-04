"use client";

import { Children, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type SliderProps = {
  children: React.ReactNode;
  /** Nhãn cho screen reader, lấy từ content.ts. */
  label: string;
  prevLabel: string;
  nextLabel: string;
};

/**
 * Băng ảnh cuộn ngang, mỗi lần một ảnh.
 *
 * Việc cuộn do CSS scroll-snap lo, không phải JS: vuốt trên điện thoại, hai
 * ngón trên trackpad và phím mũi tên đều chạy sẵn, và nếu JS chết thì băng ảnh
 * vẫn cuộn được bình thường. JS ở đây chỉ thêm hai nút bấm và số thứ tự cho
 * người dùng chuột — thứ mà scroll-snap không tự cho.
 *
 * `motion-safe:scroll-smooth` để nút bấm cuộn mượt, nhưng tự tắt khi người
 * dùng bật reduce motion ở hệ điều hành.
 */
export function Slider({ children, label, prevLabel, nextLabel }: SliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const slides = Children.toArray(children);
  const count = slides.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Mỗi slide rộng đúng bằng khung nhìn nên chỉ cần chia là ra thứ tự.
    const onScroll = () =>
      setIndex(Math.round(track.scrollLeft / track.clientWidth));

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: next * track.clientWidth });
  };

  return (
    <div role="group" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={trackRef}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto motion-safe:scroll-smooth"
      >
        {slides.map((slide, i) => (
          <li
            key={i}
            className="w-full shrink-0 snap-start"
            aria-label={`${i + 1} / ${count}`}
          >
            {slide}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <p className="meta-label">
          <span className="text-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(count).padStart(2, "0")}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label={prevLabel}
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={nextLabel}
            disabled={index === count - 1}
            onClick={() => goTo(index + 1)}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>
    </div>
  );
}
