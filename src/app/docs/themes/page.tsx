import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("themes", "/docs/themes");

export default function DocsThemesPage() {
  return <DocsArticle page={DOCS_PAGES.themes} />;
}
