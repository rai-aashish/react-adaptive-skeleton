import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/react-adaptive-skeleton",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
