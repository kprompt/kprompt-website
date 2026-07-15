import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("install", "/docs/install");

export default function DocsInstallPage() {
  return <DocsArticle page={DOCS_PAGES.install} />;
}
