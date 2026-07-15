import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("providers", "/docs/providers");

export default function DocsProvidersPage() {
  return <DocsArticle page={DOCS_PAGES.providers} />;
}
