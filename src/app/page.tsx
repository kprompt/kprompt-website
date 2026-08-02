import type { Metadata } from "next";
import { AiSre } from "@/components/sections/ai-sre";
import { CliExamples } from "@/components/sections/cli-examples";
import { Drift } from "@/components/sections/drift";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Guides } from "@/components/sections/guides";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IdePlanResult } from "@/components/sections/ide-planresult";
import { MultiCluster } from "@/components/sections/multi-cluster";
import { UsageGuide } from "@/components/sections/usage-guide";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { SITE } from "@/lib/constants";
import { FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: {
    absolute: "kprompt.ai — The AI Runtime for Kubernetes",
  },
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
};

export default function HomePage() {
  return (
    <main>
      <FaqJsonLd entries={FAQ} />
      <Hero />
      <AiSre />
      <HowItWorks />
      <IdePlanResult />
      <Drift />
      <MultiCluster />
      <CliExamples />
      <UsageGuide />
      <Guides />
      <Faq />
      <FinalCta />
    </main>
  );
}
