import type { Metadata } from "next";
import { CliExamples } from "@/components/sections/cli-examples";
import { Differentiation } from "@/components/sections/differentiation";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Philosophy } from "@/components/sections/philosophy";
import { SupportedStack } from "@/components/sections/supported-stack";
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
      <CliExamples />
      <SupportedStack />
      <Faq />
      <FinalCta />
    </main>
  );
}
