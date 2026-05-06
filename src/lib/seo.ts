import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

type BuildPageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

export function buildPageMetadata(input: BuildPageMetadataInput = {}): Metadata {
  const title = input.title ?? siteConfig.title;
  const description = input.description ?? siteConfig.description;
  const canonicalPath = input.path ?? "/";
  const canonical = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: new URL(canonical, siteConfig.url).toString(),
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1024,
          height: 1024,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [siteConfig.ogImage],
    },
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  };
}
