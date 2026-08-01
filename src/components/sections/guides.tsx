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
    href: "/blog/what-is-a-kubernetes-deployment",
    kicker: "Beginner",
    title: "What is a Deployment?",
    blurb:
      "Desired Pod count, rollouts, and the kubectl commands that stick for beginners.",
  },
  {
    href: "/blog/kubectl-get-pods-explained",
    kicker: "Beginner",
    title: "kubectl get pods explained",
    blurb:
      "READY, STATUS, RESTARTS — what the table means and which command to run next.",
  },
  {
    href: "/blog/best-ai-tools-kubernetes-troubleshooting",
    kicker: "Playbook",
    title: "Best AI tools for troubleshooting",
    blurb:
      "Phase-based shortlist: K8sGPT for scans, intent CLIs for explain/plan, kubectl for evidence.",
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
            kubectl vs K9s, beginner Deployments and get pods, plus AI
            troubleshooting — what operators already search for.
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
