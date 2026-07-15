import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("commands", "/docs/commands");

export default function DocsCommandsPage() {
  return <DocsArticle page={DOCS_PAGES.commands} />;
}
