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

const defaultTitle = `${siteName} Solutions | Software Development Company in Sri Lanka`;

const ogImage = {
  url: "/branding/backgrounds/social-cover.png",
  width: 1200,
  height: 630,
  alt: `${siteName} — Software Development Company in Sri Lanka`,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: `${siteName} Solutions`,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/icon.png`,
      description:
        "ZoloLabs is a software development company in Sri Lanka specializing in custom software, mobile applications, web applications and business platforms.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: `${siteName} Solutions`,
      alternateName: siteName,
      url: `${siteUrl}/`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },

  description: siteDescription,

  applicationName: `${siteName} Solutions`,

  alternates: { canonical: "/" },

  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,

  icons: {
    icon: "/icon.png",
    apple: "/branding/logos/zololabs-mark.png",
  },

  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    siteName: `${siteName} Solutions`,
    locale: "en_LK",
    title: defaultTitle,
    description: siteDescription,
    images: [ogImage],
  },

  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: siteDescription,
    images: [ogImage.url],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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

          <main id="main" tabIndex={-1} className="flex flex-1 flex-col">
            {children}
          </main>

          <SiteFooter />
        </SiteExperience>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
