import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/documentation",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/documentation/:path*",
        destination: "/docs/:path*",
        permanent: true,
      },
      {
        source: "/doc",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/get-started",
        destination: "/docs/quickstart",
        permanent: true,
      },
      {
        source: "/quickstart",
        destination: "/docs/quickstart",
        permanent: true,
      },
      {
        source: "/install-docs",
        destination: "/docs/install",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
