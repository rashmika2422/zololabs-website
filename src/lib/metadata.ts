import type { Metadata } from "next";
import { siteName } from "@/data/site";

const socialImage = {
  url: "/branding/backgrounds/social-cover.png",
  width: 1200,
  height: 630,
  alt: `${siteName} — Software Development Company in Sri Lanka`,
};

/** Nested social metadata replaces layout values; each page supplies the full set. */
export function buildPageMetadata(
  title: string | { absolute: string },
  description: string,
  path: `/${string}`,
): Metadata {
  const socialTitle = typeof title === "string" ? `${title} | ${siteName}` : title.absolute;

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
      locale: "en_LK",
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
