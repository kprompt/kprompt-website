import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "media-src 'self' data: blob:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://vitals.vercel-insights.com https://*.vercel-insights.com https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  outputFileTracingIncludes: {
    "/og/docs": ["./public/kprompt-logo.png"],
    "/blog/[slug]/opengraph-image": [
      "./public/kprompt-logo.png",
      "./public/blog/**/*",
    ],
    "/blog/[slug]/share-image": [
      "./public/kprompt-logo.png",
      "./public/fonts/share/**/*",
      "./public/**/*",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
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
