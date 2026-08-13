"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHAIN = ["checkout-api", "Redis", "RabbitMQ", "MySQL"] as const;

const SIGNALS = [
  "Kubernetes state",
  "Events",
  "Logs",
  "Metrics",
  "Traces",
  "App signals",
] as const;

export function Dependencies() {
  return (
    <section
      id="dependencies"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Dependencies &amp; signals
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Don&apos;t just inspect the failing pod.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Failures are often downstream. kprompt connects the dots across
            relationships and the operational signals already in your
            environment — not a bespoke connector for every database.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Conceptual dependency chain
            </p>
            <ol className="mt-4 flex flex-col gap-2">
              {CHAIN.map((name, i) => (
                <li key={name} className="flex items-center gap-3">
                  <span className="font-mono text-sm text-foreground/90">
                    {name}
                  </span>
                  {i < CHAIN.length - 1 && (
                    <ArrowDown
                      className="size-3.5 text-muted-foreground/50"
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-muted-foreground">
              Shipped today: service dependency graph from Kubernetes (+ optional
              OTel edges when configured).
            </p>
            <p className="mt-2 break-all font-mono text-[13px] text-foreground/90">
              kprompt &quot;show service dependency graph&quot; -n payments
            </p>
            <Link
              href="/docs/integrations"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-6 inline-flex"
              )}
            >
              Integrations &amp; graph
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Signals enrich the runtime
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SIGNALS.map((s) => (
                <li
                  key={s}
                  className="border border-border/80 px-3 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 text-muted-foreground/60">
              <ArrowDown className="size-4" aria-hidden />
              <span className="font-mono text-xs uppercase tracking-wider">
                kprompt runtime
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Prometheus, Loki, OpenTelemetry, and similar backends are optional
              inputs when present. The value is correlation — not a marketplace of
              fifty product integrations.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
