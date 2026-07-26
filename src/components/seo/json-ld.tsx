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
        email: SITE.email,
        sameAs: [SITE.github, SITE.twitter, SITE.linkedin],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: SITE.email,
            url: `${SITE.url}/docs`,
            availableLanguage: ["en"],
          },
        ],
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
        "@id": `${SITE.url}/#software`,
        name: "kprompt",
        alternateName: "kprompt CLI",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "Kubernetes CLI",
        operatingSystem: "macOS, Linux, Windows",
        url: SITE.url,
        downloadUrl: SITE.releases,
        installUrl: `${SITE.url}/docs/install`,
        softwareHelp: { "@type": "CreativeWork", url: `${SITE.url}/docs` },
        codeRepository: SITE.github,
        programmingLanguage: "Go",
        license: SITE.licenseUrl,
        isAccessibleForFree: true,
        author: { "@id": `${SITE.url}/#organization` },
        publisher: { "@id": `${SITE.url}/#organization` },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: SITE.description,
        softwareVersion: SITE.version,
        featureList: [
          "Natural language to reviewable Kubernetes plan",
          "Plan → safety checks → approve → apply",
          "BYOK LLM providers (OpenAI, Anthropic, Gemini, Groq, Ollama)",
          "CI-stable PlanResult JSON for pipeline gates",
          "Optional in-cluster Observe agent with gated notifications",
        ],
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
