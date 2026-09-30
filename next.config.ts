import type { NextConfig } from "next";
import { industries } from "./src/data/industries";

const nextConfig: NextConfig = {
  // Nothing in this site needs the framework fingerprint in every response.
  poweredByHeader: false,
  images: {
    // AVIF first, WebP fallback; both are smaller than the source PNG.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // The four industry detail pages were folded into /solutions#<slug>.
    // Permanent redirects keep old links, bookmarks and search results working.
    return industries.map((industry) => ({
      source: `/solutions/${industry.slug}`,
      destination: `/solutions#${industry.slug}`,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;

