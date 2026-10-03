import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SiteExperience } from "@/components/layout/SiteExperience";
import ChatWidget from "@/components/ChatWidget";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteDescription, siteName, siteUrl } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const ogImage = {
  url: "/branding/backgrounds/social-cover.png",
  width: 1200,
  height: 630,
  alt: `${siteName} — software studio`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} · Custom software, AI automation and SaaS`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "custom software development",
    "AI automation",
    "web applications",
    "SaaS development",
    "SME software",
    "retail software",
    "hospitality software",
    "education software",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} · Software engineered to fit your business`,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} · Software engineered to fit your business`,
    description: siteDescription,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f7fa",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        <SiteExperience>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-ink"
          >
            Skip to content
          </a>
          <SiteHeader />
          {/* Page components render sections; the layout owns the landmark. */}
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
          <ChatWidget />
        </SiteExperience>
      </body>
    </html>
  );
}

