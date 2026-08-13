import type { Metadata } from "next";
import { AiSre } from "@/components/sections/ai-sre";
import { CliExamples } from "@/components/sections/cli-examples";
import { ClusterAnalysis } from "@/components/sections/cluster-analysis";
import { Dependencies } from "@/components/sections/dependencies";
import { Differentiation } from "@/components/sections/differentiation";
import { Drift } from "@/components/sections/drift";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Guides } from "@/components/sections/guides";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IdePlanResult } from "@/components/sections/ide-planresult";
import { MultiCluster } from "@/components/sections/multi-cluster";
import { Philosophy } from "@/components/sections/philosophy";
import { RuntimeSurfaces } from "@/components/sections/runtime-surfaces";
import { SupportedStack } from "@/components/sections/supported-stack";
import { UsageGuide } from "@/components/sections/usage-guide";
import { UseCases } from "@/components/sections/use-cases";
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
      <UseCases />
      <Differentiation />
      <Philosophy />
      <ClusterAnalysis />
      <Dependencies />
      <RuntimeSurfaces />
      <IdePlanResult />
      <CliExamples />
      <AiSre />
      <Drift />
      <MultiCluster />
      <SupportedStack />
      <UsageGuide />
      <Guides />
      <Faq />
      <FinalCta />
    </main>
  );
}
