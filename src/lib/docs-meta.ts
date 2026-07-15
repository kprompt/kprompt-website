import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { DOCS_PAGES, type DocsPage } from "@/lib/docs-content";

export function docsMetadata(
  slug: keyof typeof DOCS_PAGES,
  path: string
): Metadata {
  const page: DocsPage = DOCS_PAGES[slug];
  const url = `${SITE.url}${path}`;
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${page.title} · kprompt.ai`,
      description: page.description,
      url,
    },
  };
}
