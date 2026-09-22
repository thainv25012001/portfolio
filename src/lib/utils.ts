import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge KHONG doc tailwind.config.ts — no chi biet cac class-group
// dung san cua Tailwind. Cac token font-size tuy bien (text-ui, text-label, ...)
// khai bao trong theme.extend.fontSize bi no doan nham la mau chu (text color)
// va am tham xoa mat class mau dung truoc do trong cung mot lan merge (vd:
// "text-brand-foreground text-ui" -> chi con "text-ui"). Loi khong bao gio bao
// error, class chi bien mat, nen phai khai bao lai danh sach nay o day.
export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display", "h2", "h3", "body", "ui", "label", "small", "meta"] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
