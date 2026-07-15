import { SITE } from "@/lib/constants";

/** JSON-LD for the marketing site (SoftwareApplication + Organization). */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/kprompt-logo.png`,
        sameAs: [SITE.github],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "kprompt",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows",
        url: SITE.url,
        downloadUrl: SITE.github,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: SITE.description,
        softwareVersion: "0.2.0",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
