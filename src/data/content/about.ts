import type { L, LList } from "@/lib/i18n";

import { PROFILE } from "./profile.ts";

/* ---- 2. About (3 câu ngắn) --------------------------------------------- */

export type About = { heading: L; paragraphs: LList };

export const about: About = {
  heading: { en: "About", vi: "Giới thiệu" },
  paragraphs: {
    en: [
      `${PROFILE.yearsOfExperience}+ years building microservice platforms for e-learning, KYC and e-commerce clients across Vietnam, the US and Malaysia.`,
      "Most of my work sits where services meet: RabbitMQ and Kafka queues, Socket.IO channels, and the Python AI services my Node APIs hand work off to.",
      "Now in Harrisburg, Pennsylvania, starting a Master's in Computer Science while continuing to ship.",
    ],
    vi: [
      `Hơn ${PROFILE.yearsOfExperience} năm xây nền tảng microservice cho khách hàng e-learning, KYC và thương mại điện tử ở Việt Nam, Mỹ và Malaysia.`,
      "Phần lớn công việc của tôi nằm ở chỗ các service gặp nhau: hàng đợi RabbitMQ và Kafka, kênh realtime Socket.IO, và những service AI viết bằng Python mà API Node của tôi đẩy việc sang.",
      "Hiện ở Harrisburg, Pennsylvania — vừa bắt đầu chương trình Thạc sĩ Khoa học Máy tính vừa tiếp tục làm sản phẩm.",
    ],
  },
};
