"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ObservePipelineDiagram } from "@/components/diagrams/observe-pipeline";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const POINTS = [
  {
    title: "Watch",
    body: "Namespace-scoped watch on Pods, Events, and workloads — Role RBAC, not ClusterRole god-mode.",
  },
  {
    title: "Correlate",
    body: "Turns API noise into Incidents with evidence, health, and confidence — not a chat scroll.",
  },
  {
    title: "Gate & alert",
    body: "Slack / Discord / webhook only when severity and confidence clear the bar.",
  },
  {
    title: "Propose, never silent mutate",
    body: "Default Observe never applies. Optional Autopilot propose emits a PlanResult; apply stays human-gated.",
  },
] as const;

const SURFACES = [
  {
    label: "Laptop CLI",
    detail: "Reactive — you ask, it plans",
  },
  {
    label: "Observe agent",
    detail: "Always-on — watch → Incident → notify",
  },
] as const;

const AGENT_LINES = [
  "$ kprompt agent run -n payments --analyze --fetch-logs --health --heuristic",
  "Observe: watching namespace payments",
  "Incident: CrashLoopBackOff ×3 correlated",
  "Evidence: OOMKilled · last restarts in 8m",
  "Confidence: high · severity: warning",
  "Alert gated — no mutate (Observe mode)",
] as const;

export function Agent() {
  return (
    <section
      id="agent"
      className="relative scroll-mt-20 overflow-hidden border-y border-border bg-muted/35 py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Observe agent
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Always-on in the namespace. Same approval DNA.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The laptop CLI is reactive: you ask, it plans. The optional
            in-cluster Observe agent is continuous — watch, correlate, gated
            alert — without silent auto-heal. First AI Runtime surface inside
            Kubernetes.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-8">
            {SURFACES.map((surface) => (
              <li
                key={surface.label}
                className="flex items-baseline gap-3 border-l-2 border-brand/40 pl-3"
              >
                <span className="font-heading text-sm font-semibold tracking-tight">
                  {surface.label}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {surface.detail}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-start">
          <Reveal>
            <ul className="divide-y divide-border/80 border-y border-border/80">
              {POINTS.map((item) => (
                <li key={item.title} className="py-4">
                  <p className="font-heading text-base font-semibold tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/agent"
                className={cn(buttonVariants(), "inline-flex")}
              >
                Observe agent docs
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/docs/demo"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "inline-flex"
                )}
              >
                $0 kind demo
              </Link>
              <a
                href={SITE.examples}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "inline-flex"
                )}
              >
                kprompt-examples
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-xl border border-navy/20 bg-navy">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="ml-3 font-mono text-[11px] text-white/45">
                  kprompt agent · Observe
                </span>
              </div>
              <div className="bg-grid-dark px-4 py-5 font-mono text-[13px] leading-relaxed text-white/85 sm:px-5 sm:text-sm">
                {AGENT_LINES.map((line, i) => (
                  <p
                    key={line}
                    className={cn(
                      "break-all",
                      i === 0 && "text-white/95",
                      line.startsWith("Alert") && "text-bright"
                    )}
                  >
                    {i === 0 ? (
                      <>
                        <span className="text-bright">›</span>{" "}
                        {line.replace(/^\$ /, "")}
                      </>
                    ) : (
                      line
                    )}
                  </p>
                ))}
              </div>
            </div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              Laptop smoke:{" "}
              <code className="text-foreground/80">
                kprompt agent run -n payments --analyze --health --heuristic
              </code>
              {" · "}
              <Link
                href="/blog/observe-agent-kind-demo"
                className="text-brand underline-offset-2 hover:underline"
              >
                kind walkthrough
              </Link>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-14">
          <ObservePipelineDiagram />
        </Reveal>
      </div>
    </section>
  );
}
