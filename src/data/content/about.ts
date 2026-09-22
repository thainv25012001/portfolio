import type { L, LList } from "@/lib/i18n";

import { PROFILE } from "./profile.ts";

/* ---- 2. About (4 đoạn ngắn) -------------------------------------------- */

export type About = { heading: L; paragraphs: LList };

export const about: About = {
  heading: { en: "About", vi: "Giới thiệu" },
  paragraphs: {
    en: [
      `${PROFILE.yearsOfExperience}+ years building scalable Node.js and TypeScript applications — REST APIs and microservices for enterprise and startup platforms: an education startup I joined as one of its first engineers, plus KYC and e-commerce products for clients in the US and Malaysia.`,
      "Lately most of it is AI-enabled services: Azure OpenAI and the Python microservices my Node APIs hand work off to, with RabbitMQ, Kafka and Socket.IO carrying work between them.",
      "The rest is what keeps a system standing — API security, testing, observability, cloud deployment — designing reliable backends across the full delivery lifecycle.",
      "Now in Harrisburg, Pennsylvania, reading for a Master's in Computer Science and open to full-stack and back-end roles in the US.",
    ],
    vi: [
      `Hơn ${PROFILE.yearsOfExperience} năm xây ứng dụng Node.js và TypeScript có khả năng mở rộng — REST API và microservice cho cả nền tảng doanh nghiệp lẫn startup: một startup giáo dục tôi tham gia từ những ngày đầu, cùng các sản phẩm KYC và thương mại điện tử cho khách hàng ở Mỹ và Malaysia.`,
      "Gần đây phần lớn công việc là các service tích hợp AI: Azure OpenAI và những service Python mà API Node của tôi đẩy việc sang, nối với nhau qua RabbitMQ, Kafka và Socket.IO.",
      "Phần còn lại là những thứ giữ cho hệ thống đứng vững — bảo mật API, kiểm thử, observability, triển khai cloud — thiết kế backend đáng tin cậy xuyên suốt vòng đời phát triển.",
      "Hiện ở Harrisburg, Pennsylvania — đang học Thạc sĩ Khoa học Máy tính và tìm vị trí full-stack hoặc back-end tại Mỹ.",
    ],
  },
};
