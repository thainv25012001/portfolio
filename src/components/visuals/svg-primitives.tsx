/**
 * Mảnh dựng hình dùng chung cho các diagram dự án.
 *
 * Nguyên tắc:
 * - Màu lấy từ Tailwind token (stroke-line, fill-brand…) nên tự đổi theo theme,
 *   không hardcode mã màu nào.
 * - Mũi tên vẽ bằng <path> chứ không dùng <marker>, vì marker cần id duy nhất
 *   mà trên trang có nhiều SVG cùng lúc — dễ trùng id.
 * - Cỡ chữ 14 cho nhãn trong khung, 12 cho nhãn rời. Mỗi diagram tự khai bề
 *   rộng viewBox của mình; DiagramFigure suy ra bề rộng tối thiểu từ đó.
 */

/** Độ dày của thanh hàng đợi/trục sự kiện. Một chỗ duy nhất. */
const BUS_THICKNESS = 12;

/** Khoảng cách từ nhãn xuống phần tử nó gọi tên. */
const LABEL_GAP = 8;

/** Kiểu nét đứt cho quan hệ phụ (ghi/đọc bất đồng bộ, luồng phụ trợ). */
const DASH = "4 4";

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  /** Bỏ trống để vẽ khung rỗng — dùng cho khung nhóm (xem Frame). */
  label?: string;
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
      {label && (
        <text
          x={cx}
          y={sub ? cy - 3 : cy + 5}
          textAnchor="middle"
          className={`font-mono text-[14px] ${accent ? "fill-brand" : "fill-foreground"}`}
        >
          {label}
        </text>
      )}
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
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  accent?: boolean;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`font-mono text-[12px] tracking-[0.08em] ${
        accent ? "fill-brand" : "fill-muted-foreground"
      }`}
    >
      {children}
    </text>
  );
}

/**
 * Khung nhóm: viền rỗng kèm nhãn phía trên. Gom nhiều khối thành một lớp.
 * Dùng chung đúng một định nghĩa viền với Box, nên đổi style khung là đổi cả hai.
 */
export function Frame({
  x,
  y,
  w,
  h,
  label,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <g>
      <Label x={x} y={y - LABEL_GAP}>
        {label}
      </Label>
      <Box x={x} y={y} w={w} h={h} />
      {children}
    </g>
  );
}

/**
 * Thanh hàng đợi / trục sự kiện: dải màu accent kèm nhãn.
 * Sở hữu độ dày và vị trí nhãn, nên ba diagram không còn tự vẽ mỗi nơi một kiểu.
 */
export function Bus({
  x,
  y,
  length,
  label,
  vertical,
}: {
  x: number;
  y: number;
  length: number;
  label: string;
  /** true = trục dựng đứng (nhãn nằm trên đầu trục). */
  vertical?: boolean;
}) {
  return (
    <g>
      <Label x={x} y={y - LABEL_GAP} accent>
        {label}
      </Label>
      <rect
        x={x}
        y={y}
        width={vertical ? BUS_THICKNESS : length}
        height={vertical ? length : BUS_THICKNESS}
        className="fill-brand"
      />
    </g>
  );
}

/** Cạnh đối diện của thanh bus — nơi các mũi tên rẽ ra. */
export const busFar = (edge: number) => edge + BUS_THICKNESS;

const HEAD = 7;

type ArrowProps = {
  x: number;
  y: number;
  length: number;
  accent?: boolean;
  /** Nét đứt: quan hệ phụ, không phải luồng request chính. */
  dashed?: boolean;
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
  dashed,
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
      <line
        x1={x}
        y1={y}
        x2={baseX}
        y2={baseY}
        strokeWidth={1}
        strokeDasharray={dashed ? DASH : undefined}
      />
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
  dashed,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      strokeWidth={1}
      strokeDasharray={dashed ? DASH : undefined}
      className="stroke-line"
    />
  );
}

/**
 * Một dãy phần tử cách đều nhau trên MỘT trục — dùng được cho cả hàng ngang
 * lẫn cột dọc, nên tham số đặt tên trung tính (start/size) chứ không phải x/w.
 *
 * Trả về toạ độ suy ra từ một nguồn duy nhất, nên mũi tên, thanh bus và đường
 * hồi tiếp không thể lệch khỏi các khối nữa.
 */
export function lane({
  start,
  size,
  gap,
  count,
}: {
  start: number;
  size: number;
  gap: number;
  count: number;
}) {
  const at = (i: number) => start + i * (size + gap);
  return {
    at,
    mid: (i: number) => at(i) + size / 2,
    /** Từ mép đầu của phần tử đầu tới mép cuối của phần tử cuối. */
    span: at(count - 1) + size - start,
    size,
  };
}
