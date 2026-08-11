import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("adopt", "/docs/adopt");

export default function DocsAdoptPage() {
  return <DocsArticle page={DOCS_PAGES.adopt} path="/docs/adopt" />;
}
