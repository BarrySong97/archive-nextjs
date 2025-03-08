import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "naver.github.io",
      },
    ],
  },
};

export default nextConfig;
