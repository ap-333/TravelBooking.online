import type { Metadata } from "next";
import { site } from "./site";

type Args = { title: string; description: string; path: string; absoluteTitle?: boolean };

// Per-page metadata: canonical, Open Graph and Twitter all stay in sync.
export function pageMeta({ title, description, path, absoluteTitle }: Args): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, type: "website", locale: "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: independent flight booking assistance` }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/twitter-image"] },
  };
}
