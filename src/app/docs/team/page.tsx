import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("team", "/docs/team");

export default function DocsTeamPage() {
  return <DocsArticle page={DOCS_PAGES.team} />;
}
