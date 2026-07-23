import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("roadmap", "/docs/roadmap");

export default function DocsRoadmapPage() {
  return <DocsArticle page={DOCS_PAGES.roadmap} />;
}
