"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SURFACES = [
  {
    title: "Intent → execute",
    prompt: "kprompt run · NL operate (scale, deploy, rollback)",
    story: "State the outcome; get a PlanResult; approve before apply.",
  },
  {
    title: "Understand & reason",
    prompt: 'kprompt "explain why payment-api is crashing"',
    story: "Read cluster state and narrate what matters — not a chat essay.",
  },
  {
    title: "Investigate",
    prompt: "kprompt investigate · why · timeline · logs",
    story: "Evidence-backed investigation as one runtime capability.",
  },
  {
    title: "Relationships",
    prompt: 'kprompt "show service dependency graph"',
    story: "Context and consumers — who depends on what.",
  },
] as const;

export function RuntimeSurfaces() {
  return (
    <section id="surfaces" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            One runtime · many interfaces
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Same approval DNA everywhere.
          </h2>
          <p className="mt-3 text-muted-foreground">
            CLI, IDE PlanResult, MCP, and Observe are interfaces into one
            runtime — not unrelated products.
          </p>
        </Reveal>

        <ul className="mt-12 divide-y divide-border/80 border-y border-border/80">
          {SURFACES.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 0.04}>
                <div className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <p className="font-heading text-base font-semibold tracking-tight">
                    {item.title}
                  </p>
                  <div className="min-w-0">
                    <p className="break-all font-mono text-[13px] text-foreground/90 sm:text-sm">
                      {item.prompt}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.story}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.16} className="mt-8">
          <Link
            href="/docs/commands"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
          >
            Command reference
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
