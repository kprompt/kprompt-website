import { SITE } from "@/lib/constants";
import type { HowTo } from "@/lib/howto";

/** HowTo structured data for step-by-step docs pages (install, quickstart). */
export function HowToJsonLd({ howto, path }: { howto: HowTo; path: string }) {
  const url = `${SITE.url}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howto.name,
    description: howto.description,
    url,
    inLanguage: "en-US",
    totalTime: howto.totalTime,
    tool: howto.tools?.map((name) => ({ "@type": "HowToTool", name })),
    step: howto.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: `${url}#step-${index + 1}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
