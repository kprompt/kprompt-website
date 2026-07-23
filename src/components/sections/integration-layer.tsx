import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { NORTH_STAR_PROMPTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  {
    title: "Kubernetes & Helm",
    blurb: "Generic get/list, deep explain chains, chart install/upgrade with dry-run.",
  },
  {
    title: "Signals & GitOps",
    blurb: "Prometheus, OTel, Grafana, Flux/Argo CD — real backends, one approval loop.",
  },
  {
    title: "Optimize & graphs",
    blurb: "Idle/rightsizing reports and service dependency graphs when tools are present.",
  },
] as const;

export function IntegrationLayer() {
  return (
    <section
      id="integrations"
      className="relative scroll-mt-20 border-y border-border bg-muted/40 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Integration layer
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            One NL layer for your stack
          </h2>
          <p className="mt-3 text-muted-foreground">
            Orchestrate Helm, Argo, Prometheus, and friends through their real
            APIs — not a replacement for them. Detail lives in the docs.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {HIGHLIGHTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div>
                <h3 className="font-heading text-base font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12} className="mt-10">
          <ul className="flex max-w-full flex-wrap gap-2">
            {NORTH_STAR_PROMPTS.map((prompt) => (
              <li
                key={prompt}
                className="max-w-full break-all rounded-md border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground sm:text-xs"
              >
                {prompt}
              </li>
            ))}
          </ul>
          <Link
            href="/docs/integrations"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6 inline-flex")}
          >
            Full integrations guide
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
