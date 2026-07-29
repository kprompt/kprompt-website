import type { Metadata } from "next";
import { ArchitectureStory } from "@/components/sections/architecture-story";
import { CliExamples } from "@/components/sections/cli-examples";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Guides } from "@/components/sections/guides";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IntegrationLayer } from "@/components/sections/integration-layer";
import { LookingAhead } from "@/components/sections/looking-ahead";
import { MultiAgentRuntime } from "@/components/sections/multi-agent-runtime";
import { OpenSource } from "@/components/sections/open-source";
import { ReasoningGap } from "@/components/sections/reasoning-gap";
import { TrustIntelligence } from "@/components/sections/trust-intelligence";
import { UsageGuide } from "@/components/sections/usage-guide";
import { WhyKprompt } from "@/components/sections/why-kprompt";
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
      <ReasoningGap />
      <HowItWorks />
      <ArchitectureStory />
      <MultiAgentRuntime />
      <TrustIntelligence />
      <Features />
      <WhyKprompt />
      <CliExamples />
      <IntegrationLayer />
      <UsageGuide />
      <Guides />
      <Faq />
      <LookingAhead />
      <OpenSource />
      <FinalCta />
    </main>
  );
}
