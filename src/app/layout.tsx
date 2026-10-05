import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SiteExperience } from "@/components/layout/SiteExperience";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteDescription, siteName, siteUrl } from "@/data/site";
import "./globals.css";
import "@/components/layout/internal-pages.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const ogImage = {
  url: "/branding/backgrounds/social-cover.png",
  width: 1200,
  height: 630,
  alt: `${siteName} — Mobile & Web Applications and Business Platforms`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: `${siteName} | Mobile & Web Applications | Business Platforms`,
    template: `%s | ${siteName}`,
  },

  description: siteDescription,

  applicationName: siteName,

  icons: {
    icon: "/branding/logos/zololabs-mark.png",
    shortcut: "/branding/logos/zololabs-mark.png",
    apple: "/branding/logos/zololabs-mark.png",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: `${siteName} | Mobile & Web Applications | Business Platforms`,
    description: siteDescription,
    images: [ogImage],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Mobile & Web Applications | Business Platforms`,
    description: siteDescription,
    images: [ogImage.url],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        <SiteExperience>
          <a href="#main" className="skip-link">
            Skip to content
          </a>

          <SiteHeader />

          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>

          <SiteFooter />
        </SiteExperience>
      </body>
    </html>
  );
}