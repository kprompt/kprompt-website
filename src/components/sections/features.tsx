import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Capability = {
  title: string;
  status: "shipped" | "building";
};

const CAPABILITIES: Capability[] = [
  { title: "Plan → approve mutations", status: "shipped" },
  { title: "Observe agent (namespace watch)", status: "shipped" },
  { title: "Policy hard-denies", status: "shipped" },
  { title: "Natural-language CLI", status: "shipped" },
  { title: "Optimize & rightsizing reports", status: "shipped" },
  { title: "Multi-context kubeconfig", status: "shipped" },
  { title: "CI PlanResult JSON", status: "shipped" },
  { title: "Helm / signals / GitOps backends", status: "shipped" },
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
            High-signal surfaces shipping today. Full detail lives in the docs.
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

        <Reveal delay={0.15} className="mt-10">
          <Link
            href="/docs"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
          >
            Full list in docs
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
