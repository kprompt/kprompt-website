import type { Metadata } from "next";
import { CliExamples } from "@/components/sections/cli-examples";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Guides } from "@/components/sections/guides";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { OpenSource } from "@/components/sections/open-source";
import { TrustIntelligence } from "@/components/sections/trust-intelligence";
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
      <HowItWorks />
      <CliExamples />
      <TrustIntelligence />
      <Features />
      <UsageGuide />
      <Guides />
      <Faq />
      <OpenSource />
      <FinalCta />
    </main>
  );
}
