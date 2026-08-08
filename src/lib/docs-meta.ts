import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { DOCS_PAGES, type DocsPage } from "@/lib/docs-content";
import { DOCS_NAV_SECTIONS } from "@/lib/docs-nav";

/** Minimal, client-safe shape for the navbar search palette (no heavy blocks). */
export type DocsSearchItem = {
  href: string;
  title: string;
  description: string;
  section: string;
};

/** Map a docs href to its `DOCS_PAGES` key (e.g. "/docs/multi-cluster" -> "multiCluster"). */
function docsKeyFromHref(href: string): string {
  if (href === "/docs") return "overview";
  return href
    .replace("/docs/", "")
    .replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

/**
 * Lightweight docs index for the navbar search palette. Derives titles and
 * descriptions from `DOCS_PAGES` while excluding the large `blocks` payload.
 */
export function getDocsSearchIndex(): DocsSearchItem[] {
  return DOCS_NAV_SECTIONS.flatMap((section) =>
    section.items.map((item) => {
      const page = DOCS_PAGES[docsKeyFromHref(item.href)];
      return {
        href: item.href,
        title: page?.title ?? item.label,
        description: page?.description ?? "",
        section: section.title,
      };
    })
  );
}

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
