import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Ordered for Search Console demand: comparisons people already query. */
const GUIDES = [
  {
    href: "/blog/kubectl-vs-k9s",
    kicker: "Comparison",
    title: "kubectl vs K9s",
    blurb:
      "Not rivals: kubectl is the scriptable API client; K9s is a live terminal UI over it.",
  },
  {
    href: "/blog/kubectl-alternatives",
    kicker: "Comparison",
    title: "Kubectl alternatives",
    blurb:
      "K9s, Headlamp, Lens, and AI CLIs — which interface fits navigation, dashboards, and plan-before-apply.",
  },
  {
    href: "/blog/best-ai-tools-kubernetes-troubleshooting",
    kicker: "Playbook",
    title: "Best AI tools for troubleshooting",
    blurb:
      "Phase-based shortlist: K8sGPT for scans, intent CLIs for explain/plan, kubectl for evidence.",
  },
  {
    href: "/blog/chat-with-kubernetes-cluster",
    kicker: "Guide",
    title: "Chat with your cluster",
    blurb:
      "What “chat with Kubernetes” actually means — and how to keep apply behind a human gate.",
  },
  {
    href: "/blog/kubernetes-ai-tools-comparison",
    kicker: "Comparison",
    title: "Kubernetes AI tools, compared",
    blurb:
      "kubectl-ai, K8sGPT, Kagent, kprompt — what each one actually does to your cluster.",
  },
  {
    href: "/blog/ai-kubernetes-pod-diagnose",
    kicker: "Playbook",
    title: "AI for Kubernetes Pods",
    blurb:
      "Diagnose CrashLoop and friends with kubectl, K8sGPT, or an intent CLI — without silent apply.",
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
            kubectl vs K9s, AI troubleshooting shortlists, and safe “chat with
            your cluster” — what operators already search for.
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
