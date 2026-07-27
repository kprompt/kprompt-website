"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AiSreDualPathDiagram } from "@/components/diagrams/ai-sre-dual-path";
import { IntentPipelineDiagram } from "@/components/diagrams/intent-pipeline";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ArchitectureStory() {
  return (
    <section
      id="architecture"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            How it thinks
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Intent compiler + AI SRE
          </h2>
          <p className="mt-3 text-muted-foreground">
            Day-2 mutations stay plan-gated. Investigation and the optional
            Observe agent add structured thinking — still never silent apply.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <IntentPipelineDiagram />
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <AiSreDualPathDiagram showDocsLink />
        </Reveal>

        <Reveal delay={0.14} className="mt-8">
          <Link
            href="/docs/architecture"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
          >
            Architecture diagrams
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
