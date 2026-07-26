import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { DOCS_PAGES, type DocsPage } from "@/lib/docs-content";

export function docsOgImagePath(path: string): string {
  return `/og/docs?path=${encodeURIComponent(path)}`;
}

export function docsMetadata(
  slug: keyof typeof DOCS_PAGES,
  path: string
): Metadata {
  const page: DocsPage = DOCS_PAGES[slug];
  const url = `${SITE.url}${path}`;
  const ogImage = docsOgImagePath(path);
  const title = `${page.title} · kprompt.ai`;

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: page.description,
      url,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [ogImage],
    },
  };
}
