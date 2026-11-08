import { DocsArticle } from "@/components/docs/docs-article";
import { DOCS_PAGES } from "@/lib/docs-content";
import { docsMetadata } from "@/lib/docs-meta";

export const metadata = docsMetadata("daily-driver", "/docs/daily-driver");

export default function DocsDailyDriverPage() {
  return <DocsArticle page={DOCS_PAGES["daily-driver"]} path="/docs/daily-driver" />;
}
