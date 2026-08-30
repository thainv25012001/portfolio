import type { DiagramId } from "@/data/content";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Box,
  Label,
  Line,
  VIEWBOX_WIDTH,
} from "@/components/visuals/svg-primitives";

/**
 * Hình vẽ minh hoạ kiến trúc của từng dự án.
 *
 * QUY TẮC: trong hình chỉ có tên công nghệ và tên service — thứ giữ nguyên ở
 * mọi ngôn ngữ. Mọi câu chữ giải thích đều nằm ở `caption` trong content.ts để
 * còn dịch được; đừng viết câu tiếng Anh thẳng vào SVG, vì bản tiếng Việt sẽ
 * hiện nguyên tiếng Anh mà không ai phát hiện ra.
 *
 * Con số (lượng người dùng, thông lượng) cũng không vẽ vào hình: chúng đã nằm
 * trong `result` của dự án, viết hai nơi thì sớm muộn cũng lệch nhau.
 *
 * Đây là sơ đồ nguyên lý, không vẽ dữ liệu hay giao diện thật của khách hàng.
 */

/* -------------------------------------------------------------------------
   AIVN — API Node đẩy việc sang service AI qua RabbitMQ, Socket.IO trả kết quả
   ------------------------------------------------------------------------- */
function AiPipeline() {
  const boxY = 16;
  const boxH = 48;
  const midY = boxY + boxH / 2;
  const returnY = 104;

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} 130`} className="w-full">
      <Box x={0} y={boxY} w={120} h={boxH} label="React" />
      <ArrowRight x={128} y={midY} length={36} />

      <Box x={172} y={boxY} w={156} h={boxH} label="Express API" />
      <ArrowRight x={336} y={midY} length={36} />

      <Box x={380} y={boxY} w={140} h={boxH} label="RabbitMQ" accent />
      <ArrowRight x={528} y={midY} length={36} />

      <Box x={572} y={boxY} w={148} h={boxH} label="Python AI" />

      {/* Kết quả chạy ngược về client: xuống, sang trái, rồi lên vào ô React */}
      <Line x1={646} y1={boxY + boxH} x2={646} y2={returnY} />
      <Line x1={60} y1={returnY} x2={646} y2={returnY} />
      <ArrowUp x={60} y={returnY} length={returnY - (boxY + boxH)} />
      <Label x={352} y={returnY - 10} anchor="middle">
        Socket.IO
      </Label>
    </svg>
  );
}

/* -------------------------------------------------------------------------
   KYC — hàng đợi tách việc ra hai nhánh: máy kiểm tra và người duyệt
   ------------------------------------------------------------------------- */
function KycFlow() {
  const busY = 96;

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} 200`} className="w-full">
      <Box x={240} y={8} w={240} h={48} label="Express API" />
      <ArrowDown x={360} y={56} length={32} />

      <Label x={140} y={busY - 10} accent>
        RabbitMQ
      </Label>
      <rect x={140} y={busY} width={440} height={12} className="fill-brand" />

      <ArrowDown x={250} y={busY + 12} length={34} />
      <ArrowDown x={470} y={busY + 12} length={34} />

      <Box x={160} y={146} w={180} h={44} label="3rd-party IDV" />
      <Box x={380} y={146} w={180} h={44} label="Admin review" />
    </svg>
  );
}

/* -------------------------------------------------------------------------
   Marketplace — tồn kho và lịch sử đơn cùng đọc một luồng sự kiện Kafka
   ------------------------------------------------------------------------- */
function KafkaOrders() {
  const busX = 236;

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} 150`} className="w-full">
      <Box x={0} y={52} w={180} h={48} label="Order svc" sub="NESTJS" />
      <ArrowRight x={188} y={76} length={40} accent />

      {/* Trục sự kiện dựng đứng, hai consumer cùng đọc */}
      <Label x={busX} y={14} accent>
        Kafka
      </Label>
      <rect x={busX} y={22} width={12} height={118} className="fill-brand" />

      <ArrowRight x={busX + 12} y={50} length={56} />
      <ArrowRight x={busX + 12} y={114} length={56} />

      <Box x={312} y={26} w={230} h={48} label="Inventory" />
      <Box x={312} y={90} w={230} h={48} label="Order history" />
    </svg>
  );
}

/**
 * Bảng tra diagram. Kiểu Record<DiagramId, …> nên khi thêm một id vào
 * `DiagramId` trong content.ts mà quên vẽ hình, TypeScript sẽ báo lỗi ngay.
 */
export const DIAGRAMS: Record<DiagramId, () => JSX.Element> = {
  "ai-pipeline": AiPipeline,
  "kyc-flow": KycFlow,
  "kafka-orders": KafkaOrders,
};
