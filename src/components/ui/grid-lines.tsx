/**
 * Hai đường kẻ dọc 1px chạy suốt chiều cao viewport, đóng khung nội dung.
 * Thuần trang trí — điểm nhấn kiểu bản vẽ kỹ thuật, không chứa nội dung nên
 * ẩn khỏi screen reader.
 *
 * Là một khối có `border-x` chứ không phải hai div đặt tuyệt đối: lề ngang
 * `mx-frame` đẩy hai viền vào đúng vị trí, nên chỉ còn một node và một giá trị
 * để chỉnh. `frame` là biến `--frame-inset`, đăng ký trong tailwind.config.ts.
 */
export function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 flex justify-center"
    >
      <div className="h-full w-full max-w-shell">
        <div className="mx-frame h-full border-x border-line" />
      </div>
    </div>
  );
}
