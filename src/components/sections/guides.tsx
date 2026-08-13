import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Homepage guides — runtime positioning + high-signal reads. */
const GUIDES = [
  {
    href: "/blog/ai-runtime-for-kubernetes",
    kicker: "Positioning",
    title: "AI Runtime for Kubernetes",
    blurb:
      "What the category means: intent → context → operate, investigate, recommend — not another AI wrapper.",
  },
  {
    href: "/blog/ai-sre-not-ai-kubectl",
    kicker: "Capability",
    title: "Beyond AI kubectl",
    blurb:
      "Investigation is one runtime lane: investigate → why → timeline → blast → verify — still plan-gated.",
  },
  {
    href: "/blog/optimize-my-cluster",
    kicker: "Analyze",
    title: "Optimize my cluster",
    blurb:
      "Read-only idle / rightsizing / HPA report — proactive analysis without auto-apply.",
  },
  {
    href: "/blog/kubectl-vs-k9s",
    kicker: "Comparison",
    title: "kubectl vs K9s",
    blurb:
      "Not rivals: kubectl is the scriptable API client; K9s is a live terminal UI over it.",
  },
] as const;

export function Guides() {
  return (
    <section
      id="guides"
      className="relative scroll-mt-20 border-y border-border bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Guides
          </h2>
          <p className="mt-3 text-muted-foreground">
            Positioning, investigation depth, and day-2 reads — without reducing
            the product to a single use case.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {GUIDES.map((guide, i) => (
            <Reveal key={guide.href} delay={i * 0.05}>
              <li>
                <Link
                  href={guide.href}
                  className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-brand">
                    {guide.kicker}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight transition-colors group-hover:text-brand">
                    {guide.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {guide.blurb}
                  </p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.2} className="mt-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
          >
            All posts
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
