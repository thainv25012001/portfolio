/**
 * Mảnh dựng hình dùng chung cho các diagram dự án.
 *
 * Nguyên tắc:
 * - Màu lấy từ Tailwind token (stroke-line, fill-brand…) nên tự đổi theo theme,
 *   không hardcode mã màu nào.
 * - Mũi tên vẽ bằng <path> chứ không dùng <marker>, vì marker cần id duy nhất
 *   mà trên trang có nhiều SVG cùng lúc — dễ trùng id.
 * - Toạ độ tính theo hệ viewBox rộng 720, cỡ chữ 14 để khi thu nhỏ vẫn đọc được.
 */

export const VIEWBOX_WIDTH = 720;

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Dòng chữ nhỏ thứ hai bên trong khung. */
  sub?: string;
  /** Tô viền và chữ bằng màu accent — mỗi diagram chỉ nên có một khối như vậy. */
  accent?: boolean;
};

export function Box({ x, y, w, h, label, sub, accent }: BoxProps) {
  const cx = x + w / 2;
  const cy = y + h / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        strokeWidth={1}
        className={accent ? "stroke-brand" : "stroke-line"}
      />
      <text
        x={cx}
        y={sub ? cy - 3 : cy + 5}
        textAnchor="middle"
        className={`font-mono text-[14px] ${accent ? "fill-brand" : "fill-foreground"}`}
      >
        {label}
      </text>
      {sub && (
        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          className="fill-muted-foreground font-mono text-[12px]"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

/** Nhãn chữ rời, không có khung. */
export function Label({
  x,
  y,
  children,
  anchor = "start",
  accent,
  size = 12,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  accent?: boolean;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      style={{ fontSize: size }}
      className={`font-mono tracking-[0.08em] ${
        accent ? "fill-brand" : "fill-muted-foreground"
      }`}
    >
      {children}
    </text>
  );
}

const HEAD = 7;

type ArrowProps = {
  x: number;
  y: number;
  length: number;
  accent?: boolean;
};

/**
 * Mũi tên một hướng. Ba hướng trước đây là ba bản sao gần như giống hệt nhau,
 * chỉ khác dấu và trục — hình đầu mũi tên bị viết lại ba lần. Giờ dựng một lần
 * ở đây, ba hàm dưới chỉ là lớp bọc mỏng.
 */
function Arrow({
  x,
  y,
  length,
  accent,
  dx,
  dy,
}: ArrowProps & { dx: number; dy: number }) {
  const tipX = x + dx * length;
  const tipY = y + dy * length;
  // Lùi lại một đoạn HEAD để thân không đâm xuyên qua đầu mũi tên.
  const baseX = tipX - dx * HEAD;
  const baseY = tipY - dy * HEAD;
  // Hai cánh vuông góc với hướng đi.
  const wingX = dy * 4;
  const wingY = dx * 4;

  return (
    <g className={accent ? "stroke-brand" : "stroke-line"}>
      <line x1={x} y1={y} x2={baseX} y2={baseY} strokeWidth={1} />
      <path
        d={`M${tipX} ${tipY} L${baseX - wingX} ${baseY - wingY} L${baseX + wingX} ${baseY + wingY} Z`}
        strokeWidth={0}
        className={accent ? "fill-brand" : "fill-line"}
      />
    </g>
  );
}

/** Mũi tên nằm ngang, chạy từ (x, y) sang phải một đoạn `length`. */
export function ArrowRight(props: ArrowProps) {
  return <Arrow {...props} dx={1} dy={0} />;
}

/** Mũi tên thẳng đứng, chạy từ (x, y) xuống dưới một đoạn `length`. */
export function ArrowDown(props: ArrowProps) {
  return <Arrow {...props} dx={0} dy={1} />;
}

/** Mũi tên thẳng đứng, chạy từ (x, y) lên trên một đoạn `length`. */
export function ArrowUp(props: ArrowProps) {
  return <Arrow {...props} dx={0} dy={-1} />;
}

/** Đường kẻ mảnh, dùng làm nhánh rẽ hoặc trục ngang. */
export function Line({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      strokeWidth={1}
      className="stroke-line"
    />
  );
}
