import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("integrations", "/docs/integrations");

export default function DocsIntegrationsPage() {
  return <DocsArticle page={DOCS_PAGES.integrations} />;
}
