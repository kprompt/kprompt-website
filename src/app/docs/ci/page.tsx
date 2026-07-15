import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("ci", "/docs/ci");

export default function DocsCiPage() {
  return <DocsArticle page={DOCS_PAGES.ci} />;
}
