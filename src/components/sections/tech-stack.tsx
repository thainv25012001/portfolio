import { Screen } from "@/components/ui/screen";
import { content } from "@/data/content";
import type { Locale } from "@/lib/i18n";

import { StackFilter } from "./stack-filter";

type TechStackProps = { locale: Locale };

/**
 * Danh sách công nghệ chia theo category, lọc được qua hàng nút phía trên.
 * Không dùng logo hay icon — chỉ chữ, đúng tinh thần editorial.
 */
export function TechStack({ locale }: TechStackProps) {
  const { techStack, ui } = content;

  return (
    <Screen id="stack" heading={techStack.heading[locale]}>
      <StackFilter
        allLabel={ui.all[locale]}
        groups={techStack.groups.map((g) => ({
          id: g.id,
          label: g.label[locale],
          note: g.note?.[locale],
          items: g.items,
        }))}
      />
    </Screen>
  );
}
