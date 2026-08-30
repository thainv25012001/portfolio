/**
 * Sinh ảnh Open Graph tĩnh cho từng ngôn ngữ: public/og-en.png, public/og-vi.png
 *
 * Chạy: npm run og   (đã gắn vào prebuild nên mỗi lần build là tự cập nhật)
 *
 * Vì sao sinh tĩnh thay vì dùng opengraph-image.tsx của Next:
 * @vercel/og đóng gói sẵn trong Next 14 dựng sai đường dẫn font trên Windows
 * (path.win32.join áp lên một file:// URL) nên route đó crash khi chạy máy local.
 * Ngoài ra font mặc định của nó chỉ có Latin — chữ tiếng Việt có dấu sẽ ra ô vuông.
 * Sinh sẵn ra PNG thì tránh cả hai, lại không tốn gì lúc chạy thật.
 *
 * Script đọc thẳng src/data/content.ts nên nội dung ảnh luôn khớp với nội dung site.
 */
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

import { content, PROFILE } from "../src/data/content/index.ts";
import { locales, type Locale } from "../src/lib/i18n.ts";

const WIDTH = 1200;
const HEIGHT = 630;

/**
 * Bảng màu của ảnh OG, khớp với token trong globals.css.
 * Đổi THEME sang "dark" nếu muốn thẻ social nền đen thay vì nền sáng.
 */
const THEME: "light" | "dark" = "light";

const PALETTE = {
  light: {
    bg: "#FAFAF9",
    fg: "#0A0A0A",
    muted: "#666666",
    brand: "#C2410C",
    line: "#DEDEDE",
  },
  dark: {
    bg: "#0A0A0A",
    fg: "#EDEDED",
    muted: "#949494",
    brand: "#EA580C",
    line: "#262626",
  },
};

const COLORS = PALETTE[THEME];

/**
 * Tải font Google dạng WOFF (satori không đọc được WOFF2).
 * - User-Agent kiểu IE11 để Google trả WOFF thay vì WOFF2.
 * - Tham số `text` để Google chỉ đóng gói đúng ký tự cần dùng, file chỉ vài KB.
 */
async function loadGoogleFont(
  family: string,
  text: string,
  weight: number,
): Promise<Buffer> {
  const cssUrl =
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}` +
    `&text=${encodeURIComponent(text)}`;

  const css = await fetch(cssUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
    },
  }).then((res) => {
    if (!res.ok) throw new Error(`${family}: CSS HTTP ${res.status}`);
    return res.text();
  });

  const match = css.match(/src: url\((.+?)\) format\('(?:woff|truetype|opentype)'\)/);
  if (!match) throw new Error(`${family}: không tìm thấy URL font trong CSS trả về`);

  const res = await fetch(match[1]);
  if (!res.ok) throw new Error(`${family}: font HTTP ${res.status}`);

  return Buffer.from(await res.arrayBuffer());
}

/**
 * Cây JSX viết tay — satori nhận đúng shape này nên script khỏi cần bước biên dịch.
 *
 * Mặc định gắn display:flex cho mọi node. Satori bắt buộc điều này với bất kỳ div
 * nào có nhiều hơn một node con — và một chuỗi text nhiều từ cũng được nó tách
 * thành nhiều node, nên gần như div nào cũng cần. Style truyền vào vẫn ghi đè được.
 */
function h(type: string, props: Record<string, unknown>, ...children: unknown[]) {
  const style = (props.style ?? {}) as Record<string, unknown>;
  return {
    type,
    props: {
      ...props,
      style: { display: "flex", ...style },
      children: children.flat(),
    },
  };
}

function template(locale: Locale) {
  const { hero } = content;

  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: COLORS.bg,
        padding: "72px 80px",
        fontFamily: "Body",
      },
    },
    // Hàng trên: vạch accent + chức danh
    h(
      "div",
      { style: { display: "flex", alignItems: "center" } },
      h("div", {
        style: { width: 40, height: 4, backgroundColor: COLORS.brand, marginRight: 20 },
      }),
      // Tách từng chữ thành node riêng: với letterSpacing lớn, dấu cách thường
      // bị nuốt và "FULL-STACK DEVELOPER" đọc thành một chữ dính liền.
      h(
        "div",
        {
          style: {
            display: "flex",
            gap: 14,
            fontSize: 22,
            letterSpacing: 4,
            color: COLORS.brand,
          },
        },
        ...hero.role[locale]
          .toUpperCase()
          .split(" ")
          .map((word) => h("div", { style: { display: "flex" } }, word)),
      ),
    ),
    // Giữa: tên + câu định vị
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h(
        "div",
        {
          style: {
            display: "flex",
            fontFamily: "Display",
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: -3,
            color: COLORS.fg,
          },
        },
        PROFILE.name,
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.4,
            color: COLORS.muted,
            maxWidth: 920,
          },
        },
        hero.positioning[locale],
      ),
    ),
    // Hàng dưới: email + mã ngôn ngữ
    h(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${COLORS.line}`,
          paddingTop: 28,
          fontSize: 22,
          color: COLORS.muted,
        },
      },
      h("div", { style: { display: "flex" } }, PROFILE.email),
      h("div", { style: { display: "flex" } }, locale.toUpperCase()),
    ),
  );
}

async function main() {
  // Gom mọi ký tự sẽ xuất hiện trên ảnh để Google subset font cho đúng.
  const headingText = PROFILE.name;
  const bodyText = locales
    .flatMap((locale) => [
      content.hero.role[locale],
      content.hero.role[locale].toUpperCase(),
      content.hero.positioning[locale],
      locale.toUpperCase(),
    ])
    .concat(PROFILE.email)
    .join(" ");

  const [displayFont, bodyFont] = await Promise.all([
    loadGoogleFont("Playfair Display", headingText, 500),
    loadGoogleFont("Inter", bodyText, 400),
  ]);

  for (const locale of locales) {
    const svg = await satori(template(locale) as never, {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: "Display", data: displayFont, weight: 500, style: "normal" },
        { name: "Body", data: bodyFont, weight: 400, style: "normal" },
      ],
    });

    const png = new Resvg(svg, {
      fitTo: { mode: "width", value: WIDTH },
    })
      .render()
      .asPng();

    const out = join(process.cwd(), "public", `og-${locale}.png`);
    writeFileSync(out, png);
    console.log(`  og-${locale}.png  ${(png.length / 1024).toFixed(1)} KB`);
  }
}

main().catch((error) => {
  const existing = locales.every((locale) =>
    existsSync(join(process.cwd(), "public", `og-${locale}.png`)),
  );

  console.warn(`\n  Không sinh được ảnh OG: ${error.message}`);
  if (existing) {
    console.warn("  Giữ nguyên các file PNG đang có, build tiếp.\n");
    // Không làm hỏng build chỉ vì lúc build không có mạng.
    process.exit(0);
  }
  console.warn("  Chưa có file PNG nào — thẻ og:image sẽ trỏ vào ảnh thiếu.\n");
  process.exit(0);
});
