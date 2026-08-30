# Portfolio

Portfolio cá nhân song ngữ EN/VI. Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000 -> tự chuyển sang /en
```

## Sửa nội dung

Toàn bộ chữ hiện trên site nằm trong [`src/data/content/`](src/data/content/). Component chỉ render, không hardcode chữ nào — sửa nội dung không cần đụng JSX.

Mỗi file ứng với đúng một section trên trang:

| File | Phần |
|---|---|
| [`profile.ts`](src/data/content/profile.ts) | tên, email, LinkedIn, CV, domain — **sửa đầu tiên** |
| [`hero.ts`](src/data/content/hero.ts) | 1. Hero |
| [`about.ts`](src/data/content/about.ts) | 2. About |
| [`tech-stack.ts`](src/data/content/tech-stack.ts) | 3. Stack |
| [`projects.ts`](src/data/content/projects.ts) | 4. Selected Work — file dài nhất |
| [`experience.ts`](src/data/content/experience.ts) | 5. Experience |
| [`contact.ts`](src/data/content/contact.ts) | 6. Contact |
| [`site.ts`](src/data/content/site.ts) | metadata, điều hướng, footer, nhãn screen reader |

`index.ts` chỉ gom lại — component vẫn import `@/data/content` như cũ.

> Import **giữa các file trong thư mục này** phải ghi rõ đuôi `.ts`. `scripts/generate-og.ts` nạp thẳng chúng bằng type-stripping của Node, mà Node ESM không tự đoán đuôi file. Bỏ `.ts` đi là script sinh ảnh OG chết lặng (nó nuốt lỗi để không làm hỏng build).

`PROFILE` đã điền theo `Thai-Nguyen-Resume.docx`. Chỉ còn `siteUrl` cần thay sau khi deploy:

```bash
npm run check:todo   # liệt kê các chỗ còn để trống
```

Mỗi chuỗi là một cặp `{ en, vi }`. Thiếu một bản dịch sẽ báo lỗi lúc compile chứ không đợi tới runtime.

> **Cần bạn đọc lại:** phần `problem` của mỗi dự án là cách tôi diễn đạt lại bối cảnh từ resume — resume chỉ nêu giải pháp và kết quả, không nêu vấn đề. Mọi con số (200.000 người dùng, 100.000 thông điệp/ngày) đều lấy nguyên từ resume, không có số nào tự bịa.

Thay CV: sửa `public/Thai-Nguyen-Resume.docx` rồi convert lại sang `public/cv.pdf` (bản hiện tại đã convert bằng Word).

## Cấu trúc

```
src/
  app/[locale]/     layout.tsx (root layout, SEO/OG), page.tsx (xếp section)
  app/globals.css   design token cho hai theme
  components/
    layout/         header, footer, theme toggle, locale toggle
    sections/       hero, about, tech-stack, projects, experience, contact
    ui/             button (shadcn), section, reveal, grid-lines, separated
    visuals/        diagram SVG của từng dự án
  data/content/     nội dung, tách theo từng section
  lib/              i18n, useInView, cn
scripts/
  generate-og.ts    sinh ảnh Open Graph tĩnh
```

## Song ngữ

Mỗi ngôn ngữ có URL riêng: `/en` và `/vi`. `/` chuyển hướng về `/en`.

Cách này (thay vì toggle bằng React state) cho phép mỗi ngôn ngữ có metadata, Open Graph và `hreflang` riêng — Google index được cả hai bản, và link chia sẻ ra ngoài giữ đúng ngôn ngữ.

Thêm một ngôn ngữ: thêm mã vào `locales` trong [`src/lib/i18n.ts`](src/lib/i18n.ts), TypeScript sẽ chỉ ra mọi chỗ trong `content/` cần bổ sung bản dịch.

## Thiết kế

| | |
|---|---|
| Nền | `#FAFAF9` light (mặc định) · `#0A0A0A` dark |
| Accent | `#EA580C` ở dark, `#C2410C` ở light |
| Font | Playfair Display (heading) · Inter (body) |
| Layout | max-width 1100px, hai đường kẻ dọc 1px đóng khung nội dung |

**Căn lề:** hai biến `--frame-inset` (vị trí đường kẻ dọc) và `--content-inset` (lề chữ) trong [`globals.css`](src/app/globals.css) điều khiển toàn bộ căn lề của header, main và footer. Chữ luôn thụt vào sâu hơn đường kẻ nên không bao giờ dính vào nó. Sửa hai dòng đó là đổi lề cả site.

Accent dùng hai sắc độ vì `#C2410C` trên nền `#0A0A0A` chỉ đạt tương phản 3.8:1 — không đủ WCAG AA cho chữ nhỏ. Bản sáng hơn ở dark mode đạt 5.6:1.

**Về font:** yêu cầu ban đầu là Instrument Serif, nhưng font đó không có glyph tiếng Việt — subset `latin-ext` của nó bỏ trống đúng dải `U+1EA0–U+1EF1` (ệ ự ớ ạ ễ…). Playfair Display có subset `vietnamese` đầy đủ. Nếu site chỉ chạy tiếng Anh và tên không dấu, xem hướng dẫn đổi lại trong comment ở đầu [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx).

## Hình minh hoạ dự án

Mỗi dự án có field `visuals` tuỳ chọn trong `content/projects.ts` — một **danh sách**, nên một dự án có thể vừa có sơ đồ kiến trúc vừa có ảnh sản phẩm:

```ts
visuals: [
  { kind: "diagram", id: "ai-pipeline" },
  {
    kind: "image",
    src: "/work/aivn-dashboard.png",   // ảnh đặt trong public/work/
    alt: { en: "Teacher dashboard", vi: "Bảng điều khiển giáo viên" },
    caption: { en: "Teacher dashboard", vi: "Bảng điều khiển giáo viên" },
    ratio: "16 / 10",                 // chỉ dùng khi dự án có đúng 1 ảnh
  },
]
// bỏ trống -> khối dự án chỉ có chữ, layout vẫn đúng
```

### Thêm ảnh sản phẩm

1. Bỏ file vào `public/work/`.
2. Thêm một mục `{ kind: "image", ... }` vào `visuals` của dự án tương ứng — trong `content/projects.ts` đã có sẵn khối ví dụ, chỉ cần bỏ comment.

Cách bố trí: diagram luôn vẽ full width trước, ảnh nằm dưới. **Một ảnh** kéo hết bề ngang cột, chiều cao theo `ratio`. **Từ hai ảnh trở lên** xếp lưới hai cột, mọi ô cùng một kích thước và ảnh fit vào giữa — nhờ vậy ảnh ngang đứng cạnh ảnh dọc (screenshot điện thoại) vẫn thành một hàng phẳng. Trên mobile thì xếp dọc, mỗi ảnh full width.

Ảnh luôn `object-contain` chứ không `cover`: screenshot bị cắt mất một góc giao diện là hỏng. `alt` là bắt buộc theo type.

Cả ba dự án dùng **diagram SVG** vẽ trong [`src/components/visuals/diagrams.tsx`](src/components/visuals/diagrams.tsx) — sơ đồ nguyên lý: API Node đẩy việc sang service AI qua RabbitMQ, luồng KYC tự động trước / người duyệt ngoại lệ, và trục sự kiện Kafka giữ tồn kho khớp lịch sử đơn. Chúng tự đổi màu theo theme, không cần file ảnh, và không lộ giao diện hay dữ liệu thật của khách hàng.

**Quy tắc của diagram:** trong SVG chỉ có tên công nghệ và tên service — thứ giữ nguyên ở mọi ngôn ngữ — nên một hình dùng chung cho cả EN và VI. Mọi câu giải thích nằm ở `caption` trong `content/projects.ts` để còn dịch được. Đừng viết câu tiếng Anh thẳng vào SVG: bản tiếng Việt sẽ hiện nguyên tiếng Anh mà không ai phát hiện. Con số (lượng người dùng, thông lượng) cũng không vẽ vào hình vì chúng đã nằm trong `result` của dự án — viết hai nơi thì sớm muộn cũng lệch.

Khi có screenshot công bố được, đổi `kind` sang `"image"` — không phải sửa JSX. Muốn vẽ thêm diagram: thêm id vào `DiagramId` trong `content/projects.ts`, TypeScript sẽ báo lỗi ở registry `DIAGRAMS` cho tới khi bạn vẽ hình tương ứng.

## Animation

Một component duy nhất: [`Reveal`](src/components/ui/reveal.tsx) — fade + trượt lên 16px khi phần tử vào viewport, chạy một lần. Dùng `IntersectionObserver` thuần để bắt thời điểm, Framer Motion lo chuyển động.

Tự tắt khi người dùng bật *reduce motion* ở hệ điều hành. Nếu trình duyệt tắt JS, thẻ `<noscript>` trong layout ép nội dung hiện đầy đủ — không có nó thì trang sẽ trắng trơn vì Framer Motion render cả trạng thái `initial` ở phía server.

## Ảnh Open Graph

`npm run og` sinh `public/og-en.png` và `public/og-vi.png` từ chính `content/` (đã gắn vào `prebuild` nên mỗi lần build là tự cập nhật).

Sinh tĩnh thay vì dùng `opengraph-image.tsx` của Next vì hai lý do: `@vercel/og` đóng gói trong Next 14 dựng sai đường dẫn font trên Windows nên route đó crash khi chạy local, và font mặc định của nó chỉ có Latin — chữ tiếng Việt sẽ ra ô vuông. Sinh sẵn PNG tránh cả hai và không tốn gì lúc chạy thật.

Script cần mạng để tải font. Nếu build không có mạng, nó giữ nguyên PNG đang có và build vẫn chạy tiếp.

## Deploy lên Vercel

1. Push repo lên GitHub.
2. Vercel → **New Project** → chọn repo. Framework tự nhận là Next.js, không cần chỉnh gì.
3. Sau khi có domain, sửa `PROFILE.siteUrl` trong `content/profile.ts` rồi deploy lại — `siteUrl` là gốc của canonical URL, `hreflang`, sitemap và thẻ `og:image`.

## Scripts

| Lệnh | Việc |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | build production (chạy `og` trước) |
| `npm run og` | sinh lại ảnh Open Graph |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run check:todo` | liệt kê chỗ nội dung còn để trống |
