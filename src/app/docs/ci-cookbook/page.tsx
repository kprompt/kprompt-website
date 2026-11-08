import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("ci-cookbook", "/docs/ci-cookbook");

export default function DocsCiCookbookPage() {
  return <DocsArticle page={DOCS_PAGES["ci-cookbook"]} path="/docs/ci-cookbook" />;
}
