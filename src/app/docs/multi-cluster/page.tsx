import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("multiCluster", "/docs/multi-cluster");

export default function DocsMultiClusterPage() {
  return <DocsArticle page={DOCS_PAGES.multiCluster} />;
}
