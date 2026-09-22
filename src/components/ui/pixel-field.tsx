/**
 * Nền lưới pixel trôi rất chậm, nằm dưới toàn bộ nội dung.
 *
 * Server component, KHÔNG có "use client": mọi chuyển động nằm trong CSS
 * (xem .pixel-field trong globals.css), nên phần này không tốn một byte
 * JavaScript nào.
 *
 * Hai lớp chấm vẽ bằng ::before và ::after chứ không phải hai thẻ div — chúng
 * thuần trang trí, không có gì để screen reader hay DOM cần biết. Lớp scanline
 * tĩnh nằm ngay trên chính thẻ này (`background-image` của `.pixel-field`).
 *
 * Dải quét là thẻ thật vì hai pseudo-element đã dùng hết và nó cần một trục
 * transform riêng — không ghép vào lớp nào có sẵn được. Vẫn nằm trong vùng
 * `aria-hidden` của cha nên vẫn vô hình với screen reader.
 */
export function PixelField() {
  return (
    <div aria-hidden="true" className="pixel-field">
      <span className="pixel-scan" />
    </div>
  );
}
