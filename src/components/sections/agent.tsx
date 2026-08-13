"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const POINTS = [
  {
    title: "Watch",
    body: "Namespace-scoped watch on Pods, Events, and workloads — Role, not ClusterRole god-mode.",
  },
  {
    title: "Correlate",
    body: "Turns noisy API noise into Incidents with evidence, health, and confidence — not a chat scroll.",
  },
  {
    title: "Alert",
    body: "Gated Slack / Discord / webhook when severity and confidence clear the bar.",
  },
  {
    title: "Propose",
    body: "Optional Autopilot propose emits a PlanResult. Default Observe never mutates. Apply stays human-gated.",
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
      className="relative scroll-mt-20 border-y border-border bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            kprompt agent
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Always-on Observe for the namespace.
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The laptop CLI is reactive: you ask, it plans. The optional in-cluster
            agent is continuous: it watches, correlates, and notifies — with the
            same plan-before-apply DNA. Not a silent auto-healer. Not a fleet
            scanner.
          </p>
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
                Agent docs
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={SITE.examples}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "inline-flex"
                )}
              >
                kind walkthrough
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
                  kprompt agent
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
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
