import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("safety", "/docs/safety");

export default function DocsSafetyPage() {
  return <DocsArticle page={DOCS_PAGES.safety} />;
}
