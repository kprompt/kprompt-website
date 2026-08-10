import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("mcp", "/docs/mcp");

export default function DocsMcpPage() {
  return <DocsArticle page={DOCS_PAGES.mcp} path="/docs/mcp" />;
}
