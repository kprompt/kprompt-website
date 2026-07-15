import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("overview", "/docs");

export default function DocsOverviewPage() {
  return <DocsArticle page={DOCS_PAGES.overview} />;
}
