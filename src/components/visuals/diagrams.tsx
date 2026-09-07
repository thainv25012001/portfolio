import type { DiagramId } from "@/data/content";
import type { L, Locale } from "@/lib/i18n";

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Box,
  Bus,
  busFar,
  Frame,
  Label,
  Line,
  lane,
} from "@/components/visuals/svg-primitives";

/**
 * Hình vẽ minh hoạ kiến trúc của từng dự án.
 *
 * QUY TẮC VỀ CHỮ
 * - Tên công nghệ và tên riêng (RabbitMQ, Socket.IO, Express API…) viết thẳng
 *   vào hình: chúng giữ nguyên ở mọi ngôn ngữ.
 * - Nhãn cấu trúc hạ tầng (Client, Database, Workers…) KHÔNG giữ nguyên được,
 *   nên nằm trong bảng `T` dưới đây dưới dạng cặp {en, vi} và diagram nhận
 *   `locale`. Trước đây chúng bị viết cứng bằng tiếng Anh, khiến trang tiếng
 *   Việt hiện hình toàn tiếng Anh mà không ai phát hiện.
 * - CÂU giải thích thì tuyệt đối không vẽ vào hình — nó nằm ở `caption` của dự
 *   án trong content, nơi người sửa nội dung tìm thấy được.
 *
 * Con số (lượng người dùng, thông lượng) cũng không vẽ vào hình: chúng đã nằm
 * trong `result` của dự án, viết hai nơi thì sớm muộn cũng lệch nhau.
 *
 * Đây là sơ đồ nguyên lý, không vẽ dữ liệu hay giao diện thật của khách hàng.
 */
const T = {
  client: { en: "Client", vi: "Máy khách" },
  webApp: { en: "Web app", vi: "Ứng dụng web" },
  mobileApp: { en: "Mobile app", vi: "Di động" },
  admin: { en: "Admin", vi: "Quản trị" },
  gateway: { en: "API Gateway", vi: "API Gateway" },
  loadBalancer: { en: "Load Balancer", vi: "Cân bằng tải" },
  security: { en: "Security", vi: "Bảo mật" },
  firewall: { en: "Firewall", vi: "Tường lửa" },
  appServers: { en: "Application servers", vi: "Máy chủ ứng dụng" },
  databases: { en: "Databases", vi: "Cơ sở dữ liệu" },
  pythonAi: { en: "Python AI", vi: "Python AI" },
  auth: { en: "Auth", vi: "Xác thực" },
  users: { en: "Users", vi: "Người dùng" },
  exams: { en: "Exams", vi: "Kỳ thi" },
  content: { en: "Content", vi: "Nội dung" },
  primary: { en: "Primary", vi: "Chính" },
  replica: { en: "Replica", vi: "Bản sao" },
  cache: { en: "Cache", vi: "Cache" },
  fileStorage: { en: "File storage", vi: "Lưu trữ tệp" },
  workers: { en: "Workers", vi: "Tiến trình nền" },
  notifications: { en: "Notifications", vi: "Thông báo" },
  email: { en: "Email", vi: "Email" },
  external: { en: "External", vi: "Bên ngoài" },
  monitoring: { en: "Monitoring", vi: "Giám sát" },
  logs: { en: "Logs", vi: "Log" },
  metrics: { en: "Metrics", vi: "Chỉ số" },
  alerts: { en: "Alerts", vi: "Cảnh báo" },
  dashboard: { en: "Dashboard", vi: "Bảng theo dõi" },
} satisfies Record<string, L>;

/** Kích thước và hàm vẽ của một diagram. DiagramFigure lo phần <svg> bọc ngoài. */
export type Diagram = {
  width: number;
  height: number;
  /**
   * Hình rộng thì tràn ngược qua cột nhãn để chiếm hết chiều ngang section.
   * Không có cờ này, hình 1160 đơn vị luôn phải cuộn ngang trong cột 748px.
   */
  bleed?: boolean;
  render: (locale: Locale) => React.ReactNode;
};

/* -------------------------------------------------------------------------
   AIVN — kiến trúc phân lớp đầy đủ: client + CDN, gateway, cân bằng tải, lớp
   bảo mật, cụm service, dữ liệu (DB + bản đọc + cache), lưu trữ tệp, hàng đợi
   tách việc nặng sang AI/worker/thông báo, và lớp giám sát ở dưới cùng.

   ĐÃ XÁC NHẬN: MongoDB (replica set) là cơ sở dữ liệu thật của hệ thống.

   CHƯA XÁC NHẬN — suy ra từ mô tả, sửa hoặc bỏ cho khớp hệ thống thật:
   bốn tên service (Auth / Users / Exams / Content), Redis, và các lớp
   Security / CDN / Monitoring.
   ------------------------------------------------------------------------- */
const AIVN_W = 1240;
const AIVN_H = 720;

function aivnArchitecture(locale: Locale): React.ReactNode {
  const t = <K extends keyof typeof T>(key: K) => T[key][locale];

  const boxH = 44;
  const pad = 16;

  // --- Cột client + CDN ---
  const clientNames = ["webApp", "mobileApp", "admin"] as const;
  const clientX = 40;
  const clientW = 160;
  const clients = lane({ start: 90, size: boxH, gap: 16, count: clientNames.length });
  const clientLast = clientNames.length - 1;
  const clientFrameY = clients.at(0) - pad;
  const clientFrameH = clients.span + pad * 2;
  const cdnY = clientFrameY + clientFrameH + 16;

  // Nhánh gộp mọi client, cũng là nơi rẽ xuống lớp bảo mật.
  const fanX = clientX + clientW + 16;
  const fanMid = clients.at(0) + clients.span / 2;

  // --- Gateway → cân bằng tải ---
  const gwH = 48;
  const gwY = fanMid - gwH / 2;
  const gw = lane({ start: 246, size: 150, gap: 38, count: 2 });

  // --- Cụm application server ---
  const svcNames = ["auth", "users", "exams", "content"] as const;
  const svcH = 32;
  const svcPitch = 52;
  // Duong ghi tep di ra tu service Content. Tra chi so theo TEN chu khong
  // viet 3: doi thu tu svcNames se ve sai duong ma khong ai bao loi.
  const contentSvc = svcNames.indexOf("content");
  const svcX = 650;
  const svcW = 210;
  const svcFrameY = 60;
  const svc = lane({
    start: svcFrameY + pad,
    size: svcH,
    gap: svcPitch - svcH,
    count: svcNames.length,
  });
  const svcFrameH = svc.span + pad * 2;
  // Đường phân phối: cân bằng tải toả ra từng service, không phải một mũi tên
  // duy nhất vào khung — đúng như sơ đồ tham chiếu.
  const distX = 616;

  // --- Ba khối lưu trữ, mỗi khối một section riêng như sơ đồ tham chiếu ---
  const storeX = 900;
  const storeW = 300;
  const store = lane({ start: svcFrameY, size: 76, gap: 40, count: 3 });
  const db = lane({ start: storeX + 14, size: 130, gap: 12, count: 2 });
  const storeMid = (i: number) => store.at(i) + pad + boxH / 2;

  // --- Lớp bảo mật: Firewall → Auth → SSL nối chuỗi ---
  const secX = 246;
  const secY = 250;
  const sec = lane({ start: secX + 14, size: 110, gap: 16, count: 3 });
  const secW = sec.span + 28;
  const secH = boxH + pad * 2;
  const secMid = secY + pad + boxH / 2;

  // --- Hàng đợi + lớp tiêu thụ ---
  const busY = 440;
  const consumerY = 480;
  const consumerH = 48;
  const consumers = lane({ start: 246, size: 220, gap: 20, count: 4 });

  // --- Lớp giám sát ---
  const monY = 620;
  const mon = lane({ start: clientX + 14, size: 272, gap: 14, count: 4 });

  // --- Đường hồi tiếp Socket.IO ---
  const returnLane = 20;
  const returnY = 580;

  return (
    <>
      {/* Client + CDN */}
      <Frame
        x={clientX}
        y={clientFrameY}
        w={clientW}
        h={clientFrameH}
        label={t("client")}
      >
        {clientNames.map((key, i) => (
          <Box
            key={key}
            x={clientX + 12}
            y={clients.at(i)}
            w={clientW - 24}
            h={boxH}
            label={t(key)}
          />
        ))}
      </Frame>
      <Box x={clientX + 12} y={cdnY} w={clientW - 24} h={boxH} label="CDN" />
      {/* Nét đứt: CDN phục vụ tài nguyên tĩnh, không nằm trên luồng request */}
      <ArrowUp
        x={clientX + clientW / 2}
        y={cdnY}
        length={cdnY - (clientFrameY + clientFrameH)}
        dashed
      />

      {/* Gộp mọi client, vào gateway, sang cân bằng tải */}
      {clientNames.map((key, i) => (
        <Line
          key={key}
          x1={clientX + clientW}
          y1={clients.mid(i)}
          x2={fanX}
          y2={clients.mid(i)}
        />
      ))}
      <Line x1={fanX} y1={clients.mid(0)} x2={fanX} y2={clients.mid(clientLast)} />
      <ArrowRight x={fanX} y={fanMid} length={gw.at(0) - fanX} />

      <Box x={gw.at(0)} y={gwY} w={gw.size} h={gwH} label={t("gateway")} />
      <ArrowRight
        x={gw.at(0) + gw.size}
        y={fanMid}
        length={gw.at(1) - (gw.at(0) + gw.size)}
      />
      <Box x={gw.at(1)} y={gwY} w={gw.size} h={gwH} label={t("loadBalancer")} />

      {/* Cân bằng tải toả ra từng service */}
      <Line x1={gw.at(1) + gw.size} y1={fanMid} x2={distX} y2={fanMid} />
      <Line x1={distX} y1={svc.mid(0)} x2={distX} y2={svc.mid(svcNames.length - 1)} />
      {svcNames.map((key, i) => (
        <ArrowRight key={key} x={distX} y={svc.mid(i)} length={svcX - distX} />
      ))}

      <Frame
        x={svcX}
        y={svcFrameY}
        w={svcW}
        h={svcFrameH}
        label={t("appServers")}
      >
        {svcNames.map((key, i) => (
          <Box
            key={key}
            x={svcX + 14}
            y={svc.at(i)}
            w={svcW - 28}
            h={svcH}
            label={t(key)}
          />
        ))}
      </Frame>

      {/* Databases — Auth service ghi vào DB chính, bản đọc nhân từ đó */}
      <Frame
        x={storeX}
        y={store.at(0)}
        w={storeW}
        h={store.size}
        label={t("databases")}
      >
        <Box
          x={db.at(0)}
          y={store.at(0) + pad}
          w={db.size}
          h={boxH}
          label="MongoDB"
          sub={t("primary").toUpperCase()}
        />
        <ArrowRight
          x={db.at(0) + db.size}
          y={storeMid(0)}
          length={db.at(1) - (db.at(0) + db.size)}
          dashed
        />
        <Box
          x={db.at(1)}
          y={store.at(0) + pad}
          w={db.size}
          h={boxH}
          label="MongoDB"
          sub={t("replica").toUpperCase()}
        />
      </Frame>
      <ArrowRight x={svcX + svcW} y={storeMid(0)} length={storeX - (svcX + svcW)} />

      {/* Cache — service đọc/ghi Redis */}
      <Frame
        x={storeX}
        y={store.at(1)}
        w={storeW}
        h={store.size}
        label={t("cache")}
      >
        <Box
          x={storeX + 14}
          y={store.at(1) + pad}
          w={storeW - 28}
          h={boxH}
          label="Redis"
        />
      </Frame>
      <ArrowRight x={svcX + svcW} y={storeMid(1)} length={storeX - (svcX + svcW)} />

      {/* File storage — nét đứt: ghi tệp bất đồng bộ, không trên luồng request */}
      <Frame
        x={storeX}
        y={store.at(2)}
        w={storeW}
        h={store.size}
        label={t("fileStorage")}
      >
        <Box
          x={storeX + 14}
          y={store.at(2) + pad}
          w={storeW - 28}
          h={boxH}
          label="S3"
        />
      </Frame>
      <Line x1={svcX + svcW} y1={svc.mid(contentSvc)} x2={880} y2={svc.mid(contentSvc)} dashed />
      <Line x1={880} y1={svc.mid(contentSvc)} x2={880} y2={storeMid(2)} dashed />
      <ArrowRight x={880} y={storeMid(2)} length={storeX - 880} dashed />

      {/* Bảo mật: client rẽ xuống, ba chặng nối chuỗi */}
      <Line x1={fanX} y1={clients.mid(clientLast)} x2={fanX} y2={secMid} />
      <ArrowRight x={fanX} y={secMid} length={sec.at(0) - fanX} />
      <Frame x={secX} y={secY} w={secW} h={secH} label={t("security")}>
        <Box x={sec.at(0)} y={secY + pad} w={sec.size} h={boxH} label={t("firewall")} />
        <Box
          x={sec.at(1)}
          y={secY + pad}
          w={sec.size}
          h={boxH}
          label="Auth"
          sub="JWT / OAUTH"
        />
        <Box x={sec.at(2)} y={secY + pad} w={sec.size} h={boxH} label="SSL" />
      </Frame>
      {[0, 1].map((i) => (
        <ArrowRight
          key={i}
          x={sec.at(i) + sec.size}
          y={secMid}
          length={sec.at(i + 1) - (sec.at(i) + sec.size)}
        />
      ))}

      {/* Hàng đợi: cụm service và chặng cuối của lớp bảo mật đều đổ vào */}
      <ArrowDown
        x={svcX + svcW / 2}
        y={svcFrameY + svcFrameH}
        length={busY - (svcFrameY + svcFrameH)}
      />
      <ArrowDown x={sec.mid(2)} y={secY + secH} length={busY - (secY + secH)} />
      <Bus x={consumers.at(0)} y={busY} length={consumers.span} label="RabbitMQ" />

      {/* Lớp tiêu thụ */}
      {(["pythonAi", "workers", "notifications", "email"] as const).map((key, i) => (
        <g key={key}>
          <ArrowDown
            x={consumers.mid(i)}
            y={busFar(busY)}
            length={consumerY - busFar(busY)}
          />
          <Box
            x={consumers.at(i)}
            y={consumerY}
            w={consumers.size}
            h={consumerH}
            label={key === "pythonAi" ? "Python AI" : t(key)}
            sub={key === "email" ? t("external").toUpperCase() : undefined}
          />
        </g>
      ))}

      {/* Giám sát là mối quan tâm xuyên suốt: nó thu log/chỉ số từ MỌI thành
          phần. Vẽ mũi tên từ một thành phần bất kỳ là nói sai — nên để nó là
          một lớp ở dưới cùng, không có cạnh vào. */}
      <Frame
        x={clientX}
        y={monY}
        w={mon.span + 28}
        h={boxH + pad * 2}
        label={t("monitoring")}
      >
        {(["logs", "metrics", "alerts", "dashboard"] as const).map((key, i) => (
          <Box
            key={key}
            x={mon.at(i)}
            y={monY + pad}
            w={mon.size}
            h={boxH}
            label={t(key)}
          />
        ))}
      </Frame>

      {/* Socket.IO đẩy kết quả ngược về client */}
      <Line
        x1={consumers.mid(2)}
        y1={consumerY + consumerH}
        x2={consumers.mid(2)}
        y2={returnY}
      />
      <Line x1={returnLane} y1={returnY} x2={consumers.mid(2)} y2={returnY} />
      <Line x1={returnLane} y1={fanMid} x2={returnLane} y2={returnY} />
      <ArrowRight x={returnLane} y={fanMid} length={clientX - returnLane} />
      <Label
        x={(returnLane + consumers.mid(2)) / 2}
        y={returnY - 10}
        anchor="middle"
      >
        Socket.IO
      </Label>
    </>
  );
}

/* -------------------------------------------------------------------------
   KYC — hàng đợi tách việc ra hai nhánh: máy kiểm tra và người duyệt
   ------------------------------------------------------------------------- */
const KYC_W = 720;
const KYC_H = 200;

function kycFlow(locale: Locale): React.ReactNode {
  const busY = 96;
  const bus = lane({ start: 160, size: 180, gap: 40, count: 2 });

  return (
    <>
      <Box x={240} y={8} w={240} h={48} label="Express API" />
      <ArrowDown x={360} y={56} length={32} />

      <Bus x={140} y={busY} length={440} label="RabbitMQ" />

      <ArrowDown x={bus.mid(0)} y={busFar(busY)} length={146 - busFar(busY)} />
      <ArrowDown x={bus.mid(1)} y={busFar(busY)} length={146 - busFar(busY)} />

      <Box x={bus.at(0)} y={146} w={bus.size} h={44} label="3rd-party IDV" />
      <Box
        x={bus.at(1)}
        y={146}
        w={bus.size}
        h={44}
        label={T.admin[locale]}
      />
    </>
  );
}

/* -------------------------------------------------------------------------
   Marketplace — tồn kho và lịch sử đơn cùng đọc một luồng sự kiện Kafka
   ------------------------------------------------------------------------- */
const MKT_W = 720;
const MKT_H = 150;

function kafkaOrders(locale: Locale): React.ReactNode {
  const busX = 236;
  const consumers = lane({ start: 26, size: 48, gap: 16, count: 2 }); // theo trục dọc

  return (
    <>
      <Box x={0} y={52} w={180} h={48} label="Order svc" sub="NESTJS" />
      <ArrowRight x={188} y={76} length={40} accent />

      <Bus x={busX} y={22} length={118} label="Kafka" vertical />

      {(["inventory", "orderHistory"] as const).map((key, index) => (
        <g key={key}>
          <ArrowRight
            x={busFar(busX)}
            y={consumers.mid(index) + 24}
            length={312 - busFar(busX)}
          />
          <Box
            x={312}
            y={consumers.at(index)}
            w={230}
            h={48}
            label={
              key === "inventory"
                ? MKT_LABELS.inventory[locale]
                : MKT_LABELS.orderHistory[locale]
            }
          />
        </g>
      ))}
    </>
  );
}

/** Hai nhãn riêng của diagram marketplace. */
const MKT_LABELS = {
  inventory: { en: "Inventory", vi: "Tồn kho" },
  orderHistory: { en: "Order history", vi: "Lịch sử đơn" },
} satisfies Record<string, L>;

/**
 * Bảng tra diagram. Kiểu Record<DiagramId, …> nên khi thêm một id vào
 * `DiagramId` trong content mà quên vẽ hình, TypeScript sẽ báo lỗi ngay.
 */
export const DIAGRAMS: Record<DiagramId, Diagram> = {
  "aivn-architecture": {
    width: AIVN_W,
    height: AIVN_H,
    bleed: true,
    render: aivnArchitecture,
  },
  "kyc-flow": { width: KYC_W, height: KYC_H, render: kycFlow },
  "kafka-orders": { width: MKT_W, height: MKT_H, render: kafkaOrders },
};
