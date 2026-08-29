"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /** Phan tram phan tu phai lot vao viewport moi kich hoat. */
  threshold?: number;
  /** Kich hoat truoc khi cham day viewport mot chut cho muot. */
  rootMargin?: string;
};

/**
 * Intersection Observer thuan, chay mot lan roi tu ngat ket noi.
 * Tra ve [ref, isInView] de gan vao phan tu can theo doi.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
}: Options = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Trinh duyet cu / moi truong khong ho tro: hien noi dung ngay.
    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // chi chay mot lan, khong animate lai khi scroll nguoc
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isInView] as const;
}
