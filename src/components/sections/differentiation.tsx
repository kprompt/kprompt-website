"use client";

import { Reveal } from "@/components/ui/reveal";

const CONTRASTS = [
  {
    category: "Generic AI chatbot",
    them: "“How do I create a PDB?”",
    us: "Questions about your cluster — which workloads look risky, idle, or misconfigured — using live context, not docs alone.",
  },
  {
    category: "Kubernetes CLI wrapper",
    them: "“restart checkout” → a kubectl command",
    us: "Understand environment state first, then propose a reviewable PlanResult before anything applies.",
  },
  {
    category: "Traditional observability",
    them: "“CPU: 94%”",
    us: "Connect symptoms with related workloads, dependencies, and signals when they are available — not a single chart.",
  },
] as const;

export function Differentiation() {
  return (
    <section
      id="differentiation"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Differentiation
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Context, not commands or charts alone.
          </h2>
          <p className="mt-3 text-muted-foreground">
            kprompt is a runtime that reasons about your Kubernetes environment —
            not a chat REPL, not a thin kubectl wrapper, and not an AIOps
            dashboard.
          </p>
        </Reveal>

        <ul className="mt-12 space-y-0 divide-y divide-border/80 border-y border-border/80">
          {CONTRASTS.map((row, i) => (
            <li key={row.category}>
              <Reveal delay={i * 0.05}>
                <div className="grid gap-4 py-6 lg:grid-cols-[14rem_1fr_1fr] lg:gap-8">
                  <p className="font-heading text-base font-semibold tracking-tight">
                    {row.category}
                  </p>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      They might
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {row.them}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-brand">
                      kprompt
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                      {row.us}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
