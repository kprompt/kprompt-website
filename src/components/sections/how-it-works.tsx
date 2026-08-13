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
      "State the outcome — scale a workload, ask why something is failing, or analyze the cluster. You are not writing kubectl.",
  },
  {
    step: "02",
    title: "Understand",
    description:
      "KPrompt reads Kubernetes state, relationships, events, and available signals (logs, metrics, traces) in context.",
  },
  {
    step: "03",
    title: "Reason",
    description:
      "It decides what matters, what is related, what looks abnormal, and what is worth investigating or improving.",
  },
  {
    step: "04",
    title: "Act / recommend",
    description:
      "Execute operations, investigate problems, explain findings, or surface risks — with a reviewable plan before apply.",
  },
] as const;

const FLOW = [
  "Human intent",
  "KPrompt runtime",
  "Kubernetes",
  "Workloads · deps · signals",
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
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Runtime story
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Understand. Investigate. Change. Improve.
          </h2>
          <p className="mt-3 text-muted-foreground">
            An intelligent runtime between your intent and the cluster — not a
            chatbot that emits kubectl, and not a monitoring dashboard.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
            {FLOW.map((label, i) => (
              <li key={label} className="flex items-center gap-2">
                <span className="font-mono text-xs text-foreground/90 sm:text-sm">
                  {label}
                </span>
                {i < FLOW.length - 1 && (
                  <ArrowDown
                    className="size-3.5 shrink-0 text-muted-foreground/50 sm:-rotate-90"
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>
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
                  <ArrowDown className="size-4 lg:-rotate-90" />
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
