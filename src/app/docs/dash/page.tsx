import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("dash", "/docs/dash");

export default function DocsDashPage() {
  return <DocsArticle page={DOCS_PAGES.dash} />;
}
