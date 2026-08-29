/**
 * Hai đường kẻ dọc 1px chạy suốt chiều cao viewport, canh đúng mép trong của
 * container 1100px. Thuần trang trí — điểm nhấn kiểu bản vẽ kỹ thuật, không
 * chứa nội dung nên ẩn khỏi screen reader.
 */
export function GridLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 flex justify-center"
    >
      <div className="relative h-full w-full max-w-shell px-6 md:px-8">
        <div className="absolute inset-y-0 left-6 w-px bg-line md:left-8" />
        <div className="absolute inset-y-0 right-6 w-px bg-line md:right-8" />
      </div>
    </div>
  );
}
