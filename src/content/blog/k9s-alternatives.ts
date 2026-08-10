import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "k9s-alternatives",
    title:
      "K9s alternatives in 2026: kubectl, Lens, Headlamp, and AI CLIs",
    description:
      "Best K9s alternatives by job: stick with kubectl for scripts, Lens or Headlamp for visual multi-cluster, or a plan-before-apply AI CLI when intent is the bottleneck — not the TUI.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "kubectl",
      "kubernetes cli",
      "devops",
      "platform engineering",
    ],
    keywords: [
      "k9s alternatives",
      "k9s alternative",
      "alternatives to k9s",
      "k9s vs lens",
      "k9s vs headlamp",
      "k9s vs kubectl",
      "best kubernetes terminal ui",
      "kubernetes tui alternatives",
      "kubernetes dashboard alternative to k9s",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "Searching for k9s alternatives usually means one of three jobs failed: the TUI feels heavy, you need something scriptable, or you want a visual multi-cluster IDE instead of a terminal. K9s remains excellent at live keyboard navigation — alternatives should be chosen by the job you are hiring for, not by a generic “best tool” list.",
        links: [{ label: "K9s", href: "https://github.com/derailed/k9s" }],
      },
      {
        type: "p",
        text: "This guide is the K9s-centered sibling of our broader kubectl alternatives survey. If your question is really kubectl vs K9s, read that first.",
        links: [
          {
            label: "kubectl alternatives survey",
            href: "/blog/kubectl-alternatives",
          },
          { label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" },
        ],
      },
      {
        type: "h2",
        text: "Quick map",
      },
      {
        type: "table",
        headers: ["Alternative", "Best when", "Trade-off"],
        rows: [
          [
            "kubectl",
            "Scripts, CI, copy-pasteable evidence",
            "More typing for live navigation",
          ],
          [
            "Lens",
            "Desktop multi-cluster visual workflows",
            "Not shell-native; another app to manage",
          ],
          [
            "Headlamp",
            "Web/desktop extensible cluster UI",
            "Needs deploy or local app setup",
          ],
          [
            "Other TUIs (e.g. lazydocker-style tools)",
            "You want a different keyboard UX",
            "Smaller community than K9s for K8s day-2",
          ],
          [
            "AI CLI (kubectl-ai / kprompt)",
            "Intent → change is the bottleneck",
            "Not a live TUI; review plans before apply",
          ],
        ],
      },
      {
        type: "h2",
        text: "Stay on kubectl",
      },
      {
        type: "p",
        text: "If you outgrew K9s because you need reproducible commands, tickets, or pipelines, the alternative is not another TUI — it is kubectl (which you already have). Keep K9s for watching; use kubectl for anything that must be automated or audited.",
      },
      {
        type: "code",
        caption: "Same evidence, shareable as a command",
        code: `kubectl get pods -n payments -o wide
kubectl describe pod -l app=api -n payments
kubectl logs -l app=api -n payments --tail=200`,
      },
      {
        type: "h2",
        text: "Lens and Headlamp",
      },
      {
        type: "p",
        text: "Pick a dashboard when the bottleneck is seeing multiple clusters, RBAC-scoped views, or explaining the cluster to people who do not live in a terminal. Lens leans desktop IDE; Headlamp leans extensible web UI. Neither replaces kubectl for CI.",
      },
      {
        type: "h2",
        text: "When an AI CLI is the better “alternative”",
      },
      {
        type: "p",
        text: "K9s does not translate “scale api to three and roll back if Ready drops” into a reviewable change. That is a different job: intent CLI. kubectl-ai and kprompt sit there. kprompt’s bet is plan → safety → approve before apply, using your kubeconfig and your own LLM key.",
        links: [
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
        ],
      },
      {
        type: "code",
        caption: "Intent with an approval gate",
        code: `$ kprompt "scale api to 3" -n payments

Plan
  1. scale Deployment/api replicas → 3

Risk: medium
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "Decision rule",
      },
      {
        type: "ul",
        items: [
          "Need live keyboard navigation → keep K9s (or try another TUI)",
          "Need scripts / CI / tickets → kubectl",
          "Need visual multi-cluster → Lens or Headlamp",
          "Need English → reviewable mutate plan → AI CLI with an approval gate",
          "Confused k9s vs k8s? → read the myth-bust post first",
        ],
      },
      {
        type: "p",
        text: "Clear the platform vs TUI confusion in K9s vs Kubernetes. For the kubectl head-to-head, see kubectl vs K9s. For the wider interface survey, see kubectl alternatives. For AI peers, see the tools comparison.",
        links: [
          {
            label: "K9s vs Kubernetes",
            href: "/blog/k9s-vs-kubernetes",
          },
          { label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" },
          {
            label: "kubectl alternatives",
            href: "/blog/kubectl-alternatives",
          },
          {
            label: "tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  };

export default post;
