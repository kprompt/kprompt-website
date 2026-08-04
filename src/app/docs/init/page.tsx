import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("init", "/docs/init");

export default function DocsInitPage() {
  return <DocsArticle page={DOCS_PAGES.init} path="/docs/init" />;
}
