import type { DiagramId } from "@/data/content";

import {
  ArrowDown,
  ArrowRight,
  Box,
  Label,
  Line,
  VIEWBOX_WIDTH,
} from "@/components/visuals/svg-primitives";

/**
 * Bốn hình vẽ minh hoạ cơ chế của từng dự án.
 *
 * Cố tình chỉ dùng tên công nghệ và con số — không có câu chữ nào cần dịch,
 * nên một hình dùng chung cho cả bản EN và VI.
 *
 * Không vẽ dữ liệu thật của hệ thống nội bộ: chỉ là sơ đồ nguyên lý.
 */

/* -------------------------------------------------------------------------
   TradeFlow — chuỗi 5 cấp duyệt L/C, và thời gian xử lý trước/sau
   ------------------------------------------------------------------------- */
function LcWorkflow() {
  const steps = [40, 200, 360, 520, 680];
  const stepY = 34;

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} 200`} className="w-full">
      {/* Trục ngang nối 5 mốc duyệt */}
      <Line x1={steps[0]} y1={stepY} x2={steps[4]} y2={stepY} />

      {steps.map((x, index) => {
        // Mốc thứ 3 là chỗ hồ sơ hay tắc nhất — tô accent cho nổi.
        const isBottleneck = index === 2;
        return (
          <g key={x}>
            <rect
              x={x - 5}
              y={stepY - 5}
              width={10}
              height={10}
              className={isBottleneck ? "fill-brand" : "fill-line"}
            />
            <Label x={x} y={stepY + 24} anchor="middle" accent={isBottleneck}>
              {`0${index + 1}`}
            </Label>
          </g>
        );
      })}

      <Label x={0} y={80}>UCP 600 VALIDATION AT EACH STAGE</Label>

      {/* So sánh thời gian xử lý: thanh dài = trước, thanh ngắn accent = sau */}
      <Label x={0} y={124}>BEFORE</Label>
      <rect x={110} y={113} width={500} height={12} className="fill-line" />
      <Label x={624} y={124}>3 DAYS</Label>

      <Label x={0} y={162} accent>AFTER</Label>
      <rect x={110} y={151} width={150} height={12} className="fill-brand" />
      <Label x={274} y={162} accent>&lt; 1 DAY</Label>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   VCBS Trading Terminal — luồng giá đi vòng qua React state, lưới ảo hoá
   ------------------------------------------------------------------------- */
function PriceFeed() {
  const cols = 10;
  const rows = 3;
  const cellW = 68;
  const cellH = 22;
  const gap = 4;
  const gridY = 104;

  // Vài ô tô accent để gợi ý các mã đang nhảy giá.
  const live = new Set(["0-2", "1-5", "1-8", "2-1", "2-6"]);

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} 210`} className="w-full">
      <Box x={0} y={12} w={168} h={48} label="WebSocket" sub="TICK FEED" />
      <ArrowRight x={176} y={36} length={40} />
      <Box x={224} y={12} w={168} h={48} label="ref write" sub="NO RE-RENDER" />
      <ArrowRight x={400} y={36} length={40} />
      <Box x={448} y={12} w={168} h={48} label="rAF batch" accent />

      {/* Từ khối batch rẽ xuống lưới giá */}
      <ArrowDown x={532} y={60} length={36} accent />

      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={col * (cellW + gap)}
            y={gridY + row * (cellH + gap)}
            width={cellW}
            height={cellH}
            className={live.has(`${row}-${col}`) ? "fill-brand" : "fill-line"}
          />
        )),
      )}

      <Label x={0} y={196}>1,700 SYMBOLS VIRTUALISED</Label>
      <Label x={VIEWBOX_WIDTH} y={196} anchor="end" accent>
        60 FPS AT PEAK
      </Label>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   VCBS Mobile — một lõi TypeScript dùng chung cho web và hai nền tảng mobile
   ------------------------------------------------------------------------- */
function SharedCore() {
  const targets = [
    { cx: 110, label: "Web" },
    { cx: 360, label: "iOS" },
    { cx: 610, label: "Android" },
  ];
  const boxW = 160;
  const targetY = 132;

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} 208`} className="w-full">
      <Box
        x={180}
        y={8}
        w={360}
        h={52}
        label="@vcbs/core"
        sub="PRICING · ORDER VALIDATION · TYPES"
        accent
      />

      {/* Thân rẽ ba nhánh xuống ba đích */}
      <Line x1={360} y1={60} x2={360} y2={92} />
      <Line x1={targets[0].cx} y1={92} x2={targets[2].cx} y2={92} />
      {targets.map((target) => (
        <ArrowDown
          key={target.label}
          x={target.cx}
          y={92}
          length={targetY - 92}
        />
      ))}

      {targets.map((target) => (
        <Box
          key={target.label}
          x={target.cx - boxW / 2}
          y={targetY}
          w={boxW}
          h={44}
          label={target.label}
        />
      ))}

      <Label x={360} y={198} anchor="middle">
        EXPO · EAS · OTA UPDATES
      </Label>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Auth & Event Gateway — định danh gom về Keycloak, sự kiện phát qua Kafka
   ------------------------------------------------------------------------- */
function EventBus() {
  const services = [340, 480, 620];
  const busY = 104;

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} 210`} className="w-full">
      <Box x={0} y={8} w={200} h={44} label="Keycloak" />
      <ArrowDown x={100} y={52} length={32} />
      <Label x={112} y={74}>OIDC · ROTATING REFRESH</Label>
      <Box x={0} y={84} w={248} h={44} label="Gateway" sub="SPRING BOOT" />

      <ArrowRight x={256} y={busY + 2} length={40} accent />

      {/* Trục sự kiện: một thanh accent, ba service cùng tiêu thụ */}
      <rect x={304} y={busY - 4} width={396} height={12} className="fill-brand" />
      <Label x={304} y={busY - 14} accent>KAFKA · DOMAIN EVENTS</Label>

      {services.map((x) => (
        <ArrowDown key={x} x={x} y={busY + 8} length={38} />
      ))}
      {services.map((x, index) => (
        <Box
          key={x}
          x={x - 58}
          y={busY + 46}
          w={116}
          h={40}
          label={`svc ${String.fromCharCode(65 + index)}`}
        />
      ))}

      <Label x={0} y={196}>ONE PLACE TO REVOKE A SESSION</Label>
    </svg>
  );
}

/**
 * Bảng tra diagram. Kiểu Record<DiagramId, …> nên khi thêm một id vào
 * `DiagramId` trong content.ts mà quên vẽ hình, TypeScript sẽ báo lỗi ngay.
 */
export const DIAGRAMS: Record<DiagramId, () => JSX.Element> = {
  "lc-workflow": LcWorkflow,
  "price-feed": PriceFeed,
  "shared-core": SharedCore,
  "event-bus": EventBus,
};
