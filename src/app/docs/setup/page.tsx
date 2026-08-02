import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("setup", "/docs/setup");

export default function DocsSetupPage() {
  return <DocsArticle page={DOCS_PAGES.setup} path="/docs/setup" />;
}
