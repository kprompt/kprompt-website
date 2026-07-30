import { Reveal } from "@/components/ui/reveal";

type Capability = {
  title: string;
  status: "shipped" | "building";
};

const CAPABILITIES: Capability[] = [
  { title: "Continuous Cluster Observation", status: "shipped" },
  { title: "AI Planning Engine", status: "shipped" },
  { title: "Execution Graph", status: "shipped" },
  { title: "Namespace Agents", status: "shipped" },
  { title: "Coordinator Agent", status: "shipped" },
  { title: "Policy Engine", status: "shipped" },
  { title: "Knowledge Graph", status: "shipped" },
  { title: "Incident Memory", status: "shipped" },
  { title: "Automatic RCA", status: "shipped" },
  { title: "Slack Integration", status: "shipped" },
  { title: "GitHub Integration", status: "shipped" },
  { title: "Approval Workflow", status: "shipped" },
  { title: "Cost Intelligence", status: "shipped" },
  { title: "Simulation", status: "shipped" },
  { title: "Cluster Explainability", status: "shipped" },
];

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Capabilities
          </h2>
          <p className="mt-3 text-muted-foreground">
            Runtime surfaces — shipped today, or clearly marked as building.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.03}>
              <div className="flex items-baseline justify-between gap-3 border-t border-border/70 pt-4">
                <h3 className="font-heading text-sm font-semibold tracking-tight">
                  {cap.title}
                </h3>
                <span
                  className={
                    cap.status === "shipped"
                      ? "shrink-0 font-mono text-[10px] uppercase tracking-wider text-brand"
                      : "shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  }
                >
                  {cap.status === "shipped" ? "Shipped" : "Building"}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
