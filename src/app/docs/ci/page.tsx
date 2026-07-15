import type { Metadata } from "next";
import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";

const page = DOCS_PAGES.ci;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function DocsCiPage() {
  return <DocsArticle page={page} />;
}
