import type { NextConfig } from "next";

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
    return [
      ...["retail", "hospitality", "education", "smes"].map((slug) => ({
        source: `/solutions/${slug}`,
        destination: "/solutions#business-platforms",
        permanent: true,
      })),
      { source: "/branding/logo.png", destination: "/branding/logos/zololabs-wordmark.png", permanent: true },
      { source: "/branding/logo_only.png", destination: "/branding/logos/zololabs-mark.png", permanent: true },
      { source: "/branding/01.png", destination: "/branding/backgrounds/dark-tech-background.png", permanent: true },
      { source: "/branding/02.png", destination: "/branding/backgrounds/dark-network-background.png", permanent: true },
      { source: "/branding/03.png", destination: "/branding/backgrounds/light-tech-background.png", permanent: true },
      { source: "/branding/04.png", destination: "/branding/services/technology-network-orb.png", permanent: true },
      { source: "/branding/05.png", destination: "/branding/decorative/technology-ring.png", permanent: true },
      { source: "/branding/06.png", destination: "/branding/services/digital-network.png", permanent: true },
      { source: "/branding/07.png", destination: "/branding/hero/hero-glass-sculpture.png", permanent: true },
      { source: "/branding/08.png", destination: "/branding/decorative/glass-orb.png", permanent: true },
      { source: "/branding/og-cover.png", destination: "/branding/backgrounds/social-cover.png", permanent: true },
      { source: "/assets/zololabs/zololabs-website.png", destination: "/projects/zololabs/website-preview.png", permanent: true },
    ];
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
