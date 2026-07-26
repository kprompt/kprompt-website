import { SITE } from "@/lib/constants";
import { DOCS_CONTENT_UPDATED_AT } from "@/lib/llms-full";

/** TechArticle structured data for docs pages (freshness + citation hints). */
export function TechArticleJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${SITE.url}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    dateModified: DOCS_CONTENT_UPDATED_AT,
    datePublished: DOCS_CONTENT_UPDATED_AT,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    author: { "@id": `${SITE.url}/#organization` },
    publisher: { "@id": `${SITE.url}/#organization` },
    about: { "@id": `${SITE.url}/#software` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
