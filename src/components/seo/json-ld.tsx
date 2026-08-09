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
        sameAs: [
          SITE.github,
          SITE.twitter,
          SITE.linkedin,
          SITE.bluesky,
          SITE.youtube,
          SITE.instagram,
        ],
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
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE.url}/#software`,
        name: "kprompt",
        alternateName: ["kprompt CLI", "The AI Runtime for Kubernetes"],
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "AI Runtime for Kubernetes",
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
          "AI Runtime for Kubernetes — observe, reason, plan, execute, learn",
          "Natural language intent → reviewable PlanResult",
          "Reason → Plan → Validate → Approve → Execute",
          "BYOK LLM providers (OpenAI, Anthropic, Gemini, Groq, xAI/Grok, Moonshot/Kimi, Ollama)",
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
