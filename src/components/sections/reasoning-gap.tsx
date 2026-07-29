import { Reveal } from "@/components/ui/reveal";

const HAS = [
  "Pods",
  "Deployments",
  "Controllers",
  "Operators",
  "Schedulers",
] as const;

const WATCHES = [
  "Events",
  "Logs",
  "Metrics",
  "Deployments",
  "Services",
  "Ingresses",
  "Nodes",
  "PVCs",
  "Jobs",
  "CronJobs",
  "Autoscalers",
] as const;

export function ReasoningGap() {
  return (
    <section
      id="reasoning"
      className="relative scroll-mt-20 border-y border-border bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Messaging
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Kubernetes already schedules.
            <span className="block text-muted-foreground">
              It still lacks reasoning.
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Kubernetes schedules containers. Argo schedules workflows. Operators
            reconcile state. KPrompt reasons about infrastructure.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal delay={0.05}>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Kubernetes already has
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {HAS.map((item) => (
                <li
                  key={item}
                  className="font-mono text-sm text-foreground/90 before:mr-2 before:text-border before:content-['·'] first:before:content-none"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Controllers reconcile. Schedulers place pods. Operators encode
              domain logic. None of them reason about incidents across signals.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="font-mono text-xs uppercase tracking-wider text-brand">
              KPrompt brings
            </p>
            <p className="mt-4 font-heading text-2xl font-semibold tracking-tight">
              Reasoning.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Continuously watches the cluster, understands relationships, plans
              safe actions, and improves from previous incidents — with humans
              gating sensitive operations.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14} className="mt-14">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Continuous observation
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Infrastructure today is reactive. KPrompt makes it proactive —
            watching signals before you ask what&apos;s wrong.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {WATCHES.map((item) => (
              <li
                key={item}
                className="font-mono text-xs uppercase tracking-wider text-foreground/80"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
