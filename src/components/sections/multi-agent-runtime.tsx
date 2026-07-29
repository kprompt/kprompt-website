"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AgentModesDiagram } from "@/components/diagrams/agent-modes";
import { CoordinatorHandoffDiagram } from "@/components/diagrams/coordinator-handoff";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAMESPACE = [
  "Observe events",
  "Watch logs",
  "Analyze metrics",
  "Detect anomalies",
  "Explain failures",
  "Recommend actions",
  "Execute approved plans",
] as const;

const COORDINATOR = [
  "Correlate incidents across namespaces",
  "Understand dependencies",
  "Detect blast radius",
  "Optimize cluster-wide operations",
  "Coordinate namespace agents",
  "Share knowledge",
] as const;

export function MultiAgentRuntime() {
  return (
    <section
      id="multi-agent"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Multi-Agent Runtime
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Distributed intelligence inside the cluster
          </h2>
          <p className="mt-3 text-muted-foreground">
            Each namespace can run its own autonomous agent. A Coordinator
            correlates across the fleet. Observe Mode ships today; richer
            Namespace Agent and Coordinator surfaces are building.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal delay={0.05}>
            <h3 className="font-heading text-lg font-semibold tracking-tight">
              Namespace Agent
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAMESPACE.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-heading text-lg font-semibold tracking-tight">
                Coordinator Agent
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Building
              </span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {COORDINATOR.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm text-muted-foreground"
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-border" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-10">
          <AgentModesDiagram />
        </Reveal>

        <Reveal delay={0.14} className="mt-6">
          <CoordinatorHandoffDiagram />
        </Reveal>

        <Reveal delay={0.16} className="mt-8">
          <Link
            href="/docs/agent"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
          >
            Observe agent docs
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
