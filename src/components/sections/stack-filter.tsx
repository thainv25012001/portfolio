"use client";

import { useState } from "react";

import { PixelButton } from "@/components/ui/pixel/pixel-button";
import { PixelPanel } from "@/components/ui/pixel/pixel-panel";
import { PixelTag } from "@/components/ui/pixel/pixel-tag";

type Group = { id: string; label: string; note?: string; items: string[] };

const ALL = "all";

/**
 * Hàng category + danh sách lọc theo category.
 *
 * Nhãn truyền vào đã dịch sẵn, nên client bundle không phải nuốt cả cây nội
 * dung song ngữ. Trạng thái chọn để cục bộ, cố tình không đẩy lên URL: link
 * tới một tab đã lọc không mang ý nghĩa gì cho người nhận.
 */
export function StackFilter({ groups, allLabel }: { groups: Group[]; allLabel: string }) {
  const [active, setActive] = useState(ALL);
  const shown = active === ALL ? groups : groups.filter((g) => g.id === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {[{ id: ALL, label: allLabel }, ...groups].map((g) => (
          <PixelButton
            key={g.id}
            size="sm"
            variant={active === g.id ? "primary" : "secondary"}
            aria-pressed={active === g.id}
            onClick={() => setActive(g.id)}
          >
            {g.label}
          </PixelButton>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {shown.map((g) => (
          <PixelPanel key={g.id} className="p-6">
            <h3 className="font-pixel text-h3 uppercase">{g.label}</h3>
            {g.note && (
              <p className="mt-1 font-pixel text-label uppercase text-muted-foreground">
                {g.note}
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <PixelTag key={item}>{item}</PixelTag>
              ))}
            </div>
          </PixelPanel>
        ))}
      </div>
    </div>
  );
}
