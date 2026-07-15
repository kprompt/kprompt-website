import {
  MessageSquare,
  Brain,
  Workflow,
  Radar,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Natural Language",
    description:
      "Ask for deploys, rollbacks, and scale-ups in plain English — no kubectl flags to memorize.",
  },
  {
    icon: Brain,
    title: "AI Planning",
    description:
      "Intent is parsed into a concrete plan before anything touches the cluster.",
  },
  {
    icon: Workflow,
    title: "Workflow Generation",
    description:
      "Produces Argo Workflows and manifests automatically from your prompt.",
  },
  {
    icon: Radar,
    title: "Cluster Intelligence",
    description:
      "Explains resources, events, and failures with context from live cluster state.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Execution",
    description:
      "Approval mode lets you review diffs and risk before applying changes.",
  },
  {
    icon: Code2,
    title: "Open Source",
    description:
      "Inspect the code, extend the agents, and contribute — no black box.",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for real cluster work.
          </h2>
          <p className="mt-3 text-muted-foreground">
            From deploy to debug — one interface, grounded in Kubernetes.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.05}>
              <div className="group">
                <feature.icon
                  className="mb-4 size-5 text-brand transition-colors group-hover:text-indigo"
                  strokeWidth={1.75}
                />
                <h3 className="font-heading text-base font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
