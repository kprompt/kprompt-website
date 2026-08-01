"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: "01",
    title: "Intent",
    description:
      "Describe the goal in plain English — or let an agent observe continuously. You are not writing workflows.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "Planning engine maps intent to a concrete execution graph with diffs and risk.",
  },
  {
    step: "03",
    title: "Validate",
    description:
      "Policy and safety hard-denies run before anything touches the cluster.",
  },
  {
    step: "04",
    title: "Approve",
    description:
      "Sensitive operations need TTY y/N or --approve. Trust is the product.",
  },
  {
    step: "05",
    title: "Execute",
    description:
      "Apply against live Kubernetes. Then observe outcomes and learn.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Reason before act. Plan before apply. Never silent mutate by
            default.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-2">
          {STEPS.map((item, i) => (
            <div
              key={item.title}
              className="flex flex-1 flex-col lg:flex-row lg:items-stretch"
            >
              <Reveal delay={i * 0.06} className="flex-1">
                <div className="h-full border-t border-border/80 pt-5 lg:border-t-0 lg:border-l lg:pl-4 lg:pt-0">
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
                  className="flex items-center justify-center py-2 text-muted-foreground/60 lg:px-0.5 lg:py-0"
                  aria-hidden
                >
                  <ArrowDown className="size-4 lg:rotate-[-90deg]" />
                </div>
              )}
            </div>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <Link
            href="/docs/architecture"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
          >
            Architecture
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
