"use client";

import { Reveal } from "@/components/ui/reveal";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative scroll-mt-20 border-y border-border bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-wider text-brand">
              For operators who already know Kubernetes
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              You already know Kubernetes. kprompt helps you see more of it.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Experts know kubectl, PDBs, HPA, topology spread, and common failure
              modes. What still hurts at scale is gathering and correlating
              context across every workload, dependency, event, metric, and risk —
              continuously.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              kprompt augments that expertise. It does not pretend to replace it.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="max-w-xl lg:pt-8">
            <p className="font-mono text-xs uppercase tracking-wider text-brand">
              Philosophy
            </p>
            <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Kubernetes is already powerful.
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The problem is the amount of context humans need to understand and
              operate it. kprompt exists to provide that context — so you can
              work at the level of intent: operate, investigate, and improve.
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Not primarily because Kubernetes commands are hard. Because
              clusters are large, related, and noisy — and your time is finite.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
