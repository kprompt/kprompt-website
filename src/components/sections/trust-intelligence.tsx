import { Reveal } from "@/components/ui/reveal";

const TRUST = [
  "Reason",
  "Plan",
  "Validate",
  "Approve",
  "Execute",
  "Observe",
  "Learn",
] as const;

const GRAPH = [
  "Services",
  "EndpointSlices",
  "NetworkPolicies",
  "Static consumers",
  "OTel calls (opt)",
  "Memory deps",
] as const;

const INTEL = [
  "This deployment has restarted 14 times.",
  "This service depends on an unhealthy Redis.",
  "This namespace has wasted 64 CPU cores.",
  "This rollout will probably fail.",
  "This incident already happened two weeks ago.",
] as const;

export function TrustIntelligence() {
  return (
    <section
      id="trust"
      className="relative scroll-mt-20 border-y border-border bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Safety is a feature
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Trust is the product
          </h2>
          <p className="mt-3 text-muted-foreground">
            Never “AI automatically fixes everything.” Human approval always
            exists for sensitive operations.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <ol className="flex flex-wrap gap-x-1 gap-y-3">
            {TRUST.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-1 font-mono text-sm uppercase tracking-wider text-foreground"
              >
                {i > 0 && (
                  <span className="mx-1 text-muted-foreground/50" aria-hidden>
                    →
                  </span>
                )}
                {step}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          <Reveal delay={0.08}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-heading text-lg font-semibold tracking-tight">
                Incident Memory
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand">
                Shipped
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Remembers namespace deps, recurring failure signatures, and open
              incidents across restarts — local or in-cluster ConfigMaps only.
              Recommendations improve with “seen before” and outcome learning;
              memory never proves root cause alone and never auto-mutates.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-heading text-lg font-semibold tracking-tight">
                Knowledge Graph
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand">
                Shipped
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Read-only service dependency graph, reverse impact, and remembered
              deps — not a continuous full-cluster topology. OTel call edges when
              available; otherwise degraded honestly.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
              {GRAPH.map((item) => (
                <li
                  key={item}
                  className="font-mono text-[11px] uppercase tracking-wider text-foreground/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <h3 className="font-heading text-lg font-semibold tracking-tight">
              Continuous Intelligence
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Instead of asking “What&apos;s wrong?”, KPrompt already knows.
            </p>
            <ul className="mt-4 space-y-2">
              {INTEL.map((line) => (
                <li
                  key={line}
                  className="border-l border-brand/40 pl-3 font-mono text-xs leading-relaxed text-muted-foreground"
                >
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
