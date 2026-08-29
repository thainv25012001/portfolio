/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Root "/" khong co page rieng: dieu huong ve locale mac dinh.
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
