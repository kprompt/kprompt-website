import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("demo", "/docs/demo");

export default function DocsDemoPage() {
  return <DocsArticle page={DOCS_PAGES.demo} path="/docs/demo" />;
}
