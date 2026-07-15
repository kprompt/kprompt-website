"use client";

import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    title: "Prompt",
    description: "Describe what you want in plain English.",
  },
  {
    step: "02",
    title: "AI Planning",
    description: "Intent is parsed into concrete cluster actions.",
  },
  {
    step: "03",
    title: "Execution Plan",
    description: "Review diffs, manifests, and risk before apply.",
  },
  {
    step: "04",
    title: "Kubernetes",
    description: "Safe execution against your live cluster.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 border-y border-border bg-muted/60 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Prompt in. Plan out. Apply with control.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
          {STEPS.map((item, i) => (
            <div key={item.title} className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
              <Reveal delay={i * 0.08} className="flex-1">
                <div
                  className={cn(
                    "h-full rounded-xl border border-border/70 bg-background/80 p-5 transition-colors hover:border-brand/35 hover:bg-brand/[0.04]"
                  )}
                >
                  <p className="font-mono text-xs text-brand">{item.step}</p>
                  <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>

              {i < STEPS.length - 1 && (
                <div
                  className="flex items-center justify-center py-2 text-muted-foreground/60 lg:px-1 lg:py-0"
                  aria-hidden
                >
                  <ArrowDown className="size-4 lg:rotate-[-90deg]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
