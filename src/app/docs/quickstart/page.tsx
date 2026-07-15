import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("quickstart", "/docs/quickstart");

export default function DocsQuickstartPage() {
  return <DocsArticle page={DOCS_PAGES.quickstart} />;
}
