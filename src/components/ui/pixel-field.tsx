/**
 * Nền lưới pixel trôi rất chậm, nằm dưới toàn bộ nội dung.
 *
 * Server component, KHÔNG có "use client": mọi chuyển động nằm trong CSS
 * (xem .pixel-field trong globals.css), nên phần này không tốn một byte
 * JavaScript nào.
 *
 * Hai lớp vẽ bằng ::before và ::after chứ không phải hai thẻ div — chúng
 * thuần trang trí, không có gì để screen reader hay DOM cần biết.
 */
export function PixelField() {
  return <div aria-hidden="true" className="pixel-field" />;
}
