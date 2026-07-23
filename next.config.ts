import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    qualities: [75, 90, 92],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "d3"],
  },
};

export default nextConfig;
