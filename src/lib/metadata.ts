import type { Metadata } from "next";
import { siteName } from "@/data/site";

const socialImage = {
  url: "/branding/backgrounds/social-cover.png",
  width: 1200,
  height: 630,
  alt: `${siteName} — Mobile & Web Applications and Business Platforms`,
};

/** Nested social metadata replaces layout values; each page supplies the full set. */
export function buildPageMetadata(
  title: string,
  description: string,
  path: `/${string}`,
): Metadata {
  const socialTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      type: "website",
      siteName,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}
