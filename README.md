# Portfolio

Portfolio cá nhân song ngữ EN/VI. Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000 -> tự chuyển sang /en
```

## Sửa nội dung

Toàn bộ chữ hiện trên site nằm trong [`src/data/content.ts`](src/data/content.ts). Component chỉ render, không hardcode chữ nào — sửa nội dung không cần đụng JSX.

**Bắt đầu từ khối `PROFILE` ở đầu file** (tên, số năm kinh nghiệm, email, GitHub, LinkedIn, domain). Sau khi điền xong:

```bash
npm run check:todo   # liệt kê các chỗ còn để trống
```

Mỗi chuỗi là một cặp `{ en, vi }`. Thiếu một bản dịch sẽ báo lỗi lúc compile chứ không đợi tới runtime.

> **Bốn dự án trong `content.ts` là bản nháp** — số liệu ("giảm từ ba ngày xuống dưới một ngày", "60fps", "70%") là ví dụ tôi đặt cho đúng khuôn. Sửa lại theo dự án thật trước khi publish.

Thay CV: ghi đè `public/cv.pdf` (file hiện tại chỉ là placeholder).

## Cấu trúc

```
src/
  app/[locale]/     layout.tsx (root layout, SEO/OG), page.tsx (xếp section)
  app/globals.css   design token cho hai theme
  components/
    layout/         header, footer, theme toggle, locale toggle
    sections/       hero, about, tech-stack, projects, experience, contact
    ui/             button (shadcn), section, reveal, grid-lines
  data/content.ts   toàn bộ nội dung
  lib/              i18n, useInView, cn
scripts/
  generate-og.ts    sinh ảnh Open Graph tĩnh
```

## Song ngữ

Mỗi ngôn ngữ có URL riêng: `/en` và `/vi`. `/` chuyển hướng về `/en`.

Cách này (thay vì toggle bằng React state) cho phép mỗi ngôn ngữ có metadata, Open Graph và `hreflang` riêng — Google index được cả hai bản, và link chia sẻ ra ngoài giữ đúng ngôn ngữ.

Thêm một ngôn ngữ: thêm mã vào `locales` trong [`src/lib/i18n.ts`](src/lib/i18n.ts), TypeScript sẽ chỉ ra mọi chỗ trong `content.ts` cần bổ sung bản dịch.

## Thiết kế

| | |
|---|---|
| Nền | `#FAFAF9` light (mặc định) · `#0A0A0A` dark |
| Accent | `#EA580C` ở dark, `#C2410C` ở light |
| Font | Playfair Display (heading) · Inter (body) |
| Layout | max-width 1100px, hai đường kẻ dọc 1px ở mép container |

Accent dùng hai sắc độ vì `#C2410C` trên nền `#0A0A0A` chỉ đạt tương phản 3.8:1 — không đủ WCAG AA cho chữ nhỏ. Bản sáng hơn ở dark mode đạt 5.6:1.

**Về font:** yêu cầu ban đầu là Instrument Serif, nhưng font đó không có glyph tiếng Việt — subset `latin-ext` của nó bỏ trống đúng dải `U+1EA0–U+1EF1` (ệ ự ớ ạ ễ…). Playfair Display có subset `vietnamese` đầy đủ. Nếu site chỉ chạy tiếng Anh và tên không dấu, xem hướng dẫn đổi lại trong comment ở đầu [`src/app/[locale]/layout.tsx`](src/app/[locale]/layout.tsx).

## Hình minh hoạ dự án

Mỗi dự án có một field `visual` tuỳ chọn trong `content.ts`:

```ts
visual: { kind: "diagram", id: "price-feed" }              // SVG dựng sẵn
visual: { kind: "image", src: "/work/abc.png", alt: {…} }  // ảnh thật trong /public
// bỏ trống -> khối dự án chỉ có chữ, layout vẫn đúng
```

Mặc định cả bốn dự án dùng **diagram SVG** vẽ trong [`src/components/visuals/diagrams.tsx`](src/components/visuals/diagrams.tsx) — sơ đồ nguyên lý (luồng duyệt L/C, đường đi của tick giá, lõi TS dùng chung, trục sự kiện Kafka). Chúng tự đổi màu theo theme, không cần file ảnh, và không lộ dữ liệu thật — hợp với hệ thống nội bộ ngân hàng không được phép chụp màn hình.

Trong hình chỉ có tên công nghệ và con số, không có câu chữ cần dịch, nên một hình dùng chung cho cả EN và VI.

Khi có screenshot công bố được, đổi `kind` sang `"image"` — không phải sửa JSX. Muốn vẽ thêm diagram: thêm id vào `DiagramId` trong `content.ts`, TypeScript sẽ báo lỗi ở registry `DIAGRAMS` cho tới khi bạn vẽ hình tương ứng.

## Animation

Một component duy nhất: [`Reveal`](src/components/ui/reveal.tsx) — fade + trượt lên 16px khi phần tử vào viewport, chạy một lần. Dùng `IntersectionObserver` thuần để bắt thời điểm, Framer Motion lo chuyển động.

Tự tắt khi người dùng bật *reduce motion* ở hệ điều hành. Nếu trình duyệt tắt JS, thẻ `<noscript>` trong layout ép nội dung hiện đầy đủ — không có nó thì trang sẽ trắng trơn vì Framer Motion render cả trạng thái `initial` ở phía server.

## Ảnh Open Graph

`npm run og` sinh `public/og-en.png` và `public/og-vi.png` từ chính `content.ts` (đã gắn vào `prebuild` nên mỗi lần build là tự cập nhật).

Sinh tĩnh thay vì dùng `opengraph-image.tsx` của Next vì hai lý do: `@vercel/og` đóng gói trong Next 14 dựng sai đường dẫn font trên Windows nên route đó crash khi chạy local, và font mặc định của nó chỉ có Latin — chữ tiếng Việt sẽ ra ô vuông. Sinh sẵn PNG tránh cả hai và không tốn gì lúc chạy thật.

Script cần mạng để tải font. Nếu build không có mạng, nó giữ nguyên PNG đang có và build vẫn chạy tiếp.

## Deploy lên Vercel

1. Push repo lên GitHub.
2. Vercel → **New Project** → chọn repo. Framework tự nhận là Next.js, không cần chỉnh gì.
3. Sau khi có domain, sửa `PROFILE.siteUrl` trong `content.ts` rồi deploy lại — `siteUrl` là gốc của canonical URL, `hreflang`, sitemap và thẻ `og:image`.

## Scripts

| Lệnh | Việc |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | build production (chạy `og` trước) |
| `npm run og` | sinh lại ảnh Open Graph |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run check:todo` | liệt kê chỗ nội dung còn để trống |
