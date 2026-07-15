import type { Metadata } from "next";
import { CliExamples } from "@/components/sections/cli-examples";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { LiveDemo } from "@/components/sections/live-demo";
import { LookingAhead } from "@/components/sections/looking-ahead";
import { OpenSource } from "@/components/sections/open-source";
import { UsageGuide } from "@/components/sections/usage-guide";
import { WhyKprompt } from "@/components/sections/why-kprompt";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "kprompt.ai — Talk to Your Cluster",
  },
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <CliExamples />
      <LiveDemo />
      <UsageGuide />
      <WhyKprompt />
      <LookingAhead />
      <OpenSource />
      <FinalCta />
    </main>
  );
}
