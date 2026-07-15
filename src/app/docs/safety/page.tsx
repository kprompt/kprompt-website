import type { Metadata } from "next";
import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";

const page = DOCS_PAGES.safety;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function DocsSafetyPage() {
  return <DocsArticle page={page} />;
}
