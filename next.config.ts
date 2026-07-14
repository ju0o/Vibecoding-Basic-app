import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Firebase 정적 호스팅(firebase.json public: "out")용 정적 내보내기.
  output: "export",
  // Large static export (lessons + atlas + studio) can exceed default 60s/page under load.
  staticPageGenerationTimeout: 180,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
