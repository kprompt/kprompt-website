"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AiSreDualPathDiagram } from "@/components/diagrams/ai-sre-dual-path";
import {
  IntentPipelineDiagram,
  RuntimePipelineDiagram,
} from "@/components/diagrams/intent-pipeline";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ArchitectureStory() {
  return (
    <section
      id="architecture"
      className="relative scroll-mt-20 border-y border-border bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            The Runtime
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Not an app. A runtime.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Developer → natural language → planning engine → execution graph →
            policy validation → Kubernetes → continuous observation → learning.
            Mutations stay plan-gated.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <RuntimePipelineDiagram />
        </Reveal>

        <Reveal delay={0.1} className="mt-6">
          <IntentPipelineDiagram />
        </Reveal>

        <Reveal delay={0.12} className="mt-6">
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
