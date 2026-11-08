import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("planresult-parity", "/docs/planresult-parity");

export default function DocsPlanresultParityPage() {
  return (
    <DocsArticle page={DOCS_PAGES["planresult-parity"]} path="/docs/planresult-parity" />
  );
}
