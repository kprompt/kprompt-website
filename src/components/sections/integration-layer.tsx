import { Reveal } from "@/components/ui/reveal";
import { INTEGRATION_ROADMAP, NORTH_STAR_PROMPTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function IntegrationLayer() {
  return (
    <section
      id="integrations"
      className="relative scroll-mt-20 border-y border-border bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Integration layer
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            One natural-language layer for your stack
          </h2>
          <p className="mt-3 text-muted-foreground">
            kprompt is not here to replace Helm, Argo, or Prometheus — it
            orchestrates them through their real APIs and CLIs. You describe the
            outcome; kprompt checks what is installed, shows the plan, and keeps
            mutations behind approval.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-10">
          <div className="rounded-lg border border-border bg-background/80 p-5 font-mono text-[11px] leading-relaxed text-muted-foreground sm:p-6 sm:text-xs">
            <p className="text-center text-brand">kprompt</p>
            <p className="text-center text-muted-foreground/70">
              NL · plan · safety · approve
            </p>
            <div className="my-4 flex flex-wrap justify-center gap-2 sm:gap-3">
              {["Helm", "Argo", "Prometheus", "OpenTelemetry", "Grafana"].map(
                (tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-border/80 bg-muted/60 px-2.5 py-1 text-foreground/80"
                  >
                    {tool}
                  </span>
                )
              )}
            </div>
            <p className="text-center text-muted-foreground/70">
              ↓ Kubernetes API (client-go) ↓
            </p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-10">
          {INTEGRATION_ROADMAP.map((phase, pi) => (
            <Reveal key={phase.id} delay={pi * 0.05}>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {phase.label}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold tracking-tight">
                  {phase.title}
                </h3>
                <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {phase.items.map((item) => (
                    <div
                      key={item.name}
                      className={cn(
                        "min-w-0 rounded-lg border border-border/80 bg-background/70 p-4",
                        "transition-colors hover:border-brand/25"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading text-sm font-semibold">
                          {item.name}
                        </h4>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide",
                            item.status === "Shipped"
                              ? "bg-brand/10 text-brand"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="mt-3 break-all font-mono text-[11px] text-brand/90 sm:text-xs">
                        {item.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-12 max-w-2xl">
          <h3 className="font-heading text-base font-semibold tracking-tight">
            North-star prompts
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The end state: you stop thinking about which tool to open.
          </p>
          <ul className="mt-4 flex max-w-full flex-wrap gap-2">
            {NORTH_STAR_PROMPTS.map((prompt) => (
              <li
                key={prompt}
                className="max-w-full break-all rounded-md border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground sm:text-xs"
              >
                {prompt}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
