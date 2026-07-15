import { CliExamples } from "@/components/sections/cli-examples";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { OpenSource } from "@/components/sections/open-source";
import { UsageGuide } from "@/components/sections/usage-guide";
import { WhyKprompt } from "@/components/sections/why-kprompt";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <CliExamples />
      <UsageGuide />
      <WhyKprompt />
      <OpenSource />
      <FinalCta />
    </main>
  );
}
