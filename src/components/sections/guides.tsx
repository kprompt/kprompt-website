import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GUIDES = [
  {
    href: "/blog/ai-runtime-for-kubernetes",
    kicker: "Positioning",
    title: "The AI Runtime for Kubernetes",
    blurb:
      "Not another AI wrapper — observe, reason, plan, approve. Honest shipped vs building.",
  },
  {
    href: "/blog/what-is-kubernetes-ai",
    kicker: "Guide",
    title: "What is Kubernetes AI?",
    blurb:
      "Analyzers, intent CLIs, agents, copilots — which job you are actually buying.",
  },
  {
    href: "/blog/kubernetes-ai-tools-comparison",
    kicker: "Comparison",
    title: "Kubernetes AI tools, compared",
    blurb:
      "kubectl-ai, K8sGPT, Kagent, kprompt — what each one actually does to your cluster.",
  },
  {
    href: "/blog/kprompt-vs-kubectl-ai",
    kicker: "Comparison",
    title: "kprompt vs kubectl-ai",
    blurb:
      "Same natural-language CLI lane, different mutate contract: plan, safety, then approve.",
  },
  {
    href: "/blog/kubectl-vs-k9s",
    kicker: "Comparison",
    title: "kubectl vs K9s",
    blurb:
      "Not rivals: one is the scriptable API client, the other is a live terminal UI over it.",
  },
  {
    href: "/blog/kubernetes-crashloopbackoff",
    kicker: "Playbook",
    title: "Fixing CrashLoopBackOff",
    blurb:
      "Read the exit code, get the logs of the container that actually died, then fix the real cause.",
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
            Guides and comparisons
          </h2>
          <p className="mt-3 text-muted-foreground">
            How kprompt lines up against other Kubernetes AI tooling, plus
            playbooks for the failures you actually page on.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((guide, i) => (
            <Reveal key={guide.href} delay={Math.min(i, 4) * 0.05}>
              <Link href={guide.href} className="group block">
                <p className="font-mono text-xs uppercase tracking-wider text-brand">
                  {guide.kicker}
                </p>
                <h3 className="mt-2 font-heading text-base font-semibold tracking-tight group-hover:text-brand">
                  {guide.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {guide.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            All guides
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
