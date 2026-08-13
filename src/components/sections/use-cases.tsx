"use client";

import { Reveal } from "@/components/ui/reveal";

const USE_CASES = [
  {
    lane: "Operate",
    prompt: 'kprompt "scale checkout-api to 10"',
    note: "Intent → plan → approve → apply",
  },
  {
    lane: "Agent",
    prompt: "kprompt agent run -n payments --analyze --health",
    note: "Always-on Observe — watch, correlate, gated alert; no silent mutate",
  },
  {
    lane: "Investigate",
    prompt: "kprompt why checkout-api",
    note: "Evidence-backed findings, not chat guesses",
  },
  {
    lane: "Analyze",
    prompt: 'kprompt "optimize my cluster"',
    note: "Inventory, idle, rightsizing, HPA hints",
  },
] as const;

export function UseCases() {
  return (
    <section id="use-cases" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            What you can do
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            One runtime. Many outcomes.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Investigation is a capability — not the whole product. Operate with
            the CLI, keep an Observe agent on the namespace, analyze with the
            same approval DNA.
          </p>
        </Reveal>

        <ul className="mt-12 divide-y divide-border/80 border-y border-border/80">
          {USE_CASES.map((item, i) => (
            <li key={item.lane}>
              <Reveal delay={i * 0.04}>
                <div className="grid gap-2 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6">
                  <p className="font-heading text-base font-semibold tracking-tight">
                    {item.lane}
                  </p>
                  <div className="min-w-0">
                    <p className="break-all font-mono text-[13px] text-foreground/90 sm:text-sm">
                      {item.prompt}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand/80">
                    Shipped
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
