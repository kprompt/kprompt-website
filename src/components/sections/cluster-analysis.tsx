"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SHIPPED = [
  {
    label: "Optimize",
    prompt: 'kprompt "optimize my cluster"',
    detail: "Inventory, idle capacity, rightsizing, HPA hints — read-only report.",
  },
  {
    label: "Audit",
    prompt: 'kprompt "audit my cluster"',
    detail: "Security and hygiene findings on pod templates.",
  },
  {
    label: "Score",
    prompt: 'kprompt "scorecard for the cluster"',
    detail: "MVP rollup of audit + optimize into an overall score.",
  },
] as const;

const DIRECTION = [
  "Critical workloads without PodDisruptionBudgets",
  "Missing topology spread on critical services",
  "Queue-depth scaling mismatches",
  "Dependency-chain health as a first-class scorecard",
] as const;

export function ClusterAnalysis() {
  return (
    <section
      id="cluster-analysis"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Analyze &amp; recommend
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Not only “what is happening?” — “what should I change?”
          </h2>
          <p className="mt-3 text-muted-foreground">
            Proactive cluster analysis is part of the runtime. Start with what
            ships today; richer reliability practice scanners stay labeled as
            direction.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-wider text-brand">
              Shipped today
            </p>
            <ul className="mt-4 divide-y divide-border/80 border-y border-border/80">
              {SHIPPED.map((item) => (
                <li key={item.label} className="py-4">
                  <p className="font-heading text-base font-semibold tracking-tight">
                    {item.label}
                  </p>
                  <p className="mt-1 break-all font-mono text-[13px] text-foreground/90">
                    {item.prompt}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              href="/blog/optimize-my-cluster"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-6 inline-flex"
              )}
            >
              Optimize deep dive
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Direction · conceptual UX
            </p>
            <div className="mt-4 border border-border/80 bg-muted/40 p-5 font-mono text-[12px] leading-relaxed text-muted-foreground sm:text-[13px]">
              <p className="text-foreground/90">Cluster Health · example</p>
              <p className="mt-2 text-brand">78 / 100</p>
              <p className="mt-3">I found issues that may affect reliability.</p>
              <p className="mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
                Illustrative findings (not all scanners ship yet)
              </p>
              <ul className="mt-2 space-y-1.5">
                {DIRECTION.map((line) => (
                  <li key={line}>· {line}</li>
                ))}
              </ul>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Use this as product direction. Do not treat the mock scorecard as a
              shipped feature beyond optimize / audit / score MVP.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
