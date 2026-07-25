import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("agent", "/docs/agent");

export default function DocsAgentPage() {
  return <DocsArticle page={DOCS_PAGES.agent} />;
}
