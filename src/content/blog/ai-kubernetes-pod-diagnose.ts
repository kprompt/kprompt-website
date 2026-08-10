import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "ai-kubernetes-pod-diagnose",
    title:
      "AI for Kubernetes Pods: diagnose CrashLoop without silent apply",
    description:
      "How to use AI on Kubernetes Pods safely: explain CrashLoopBackOff and ImagePullBackOff with kubectl, K8sGPT, or an intent CLI — without piping model output straight into apply.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: ["kubernetes", "ai", "devops", "sre", "troubleshooting"],
    keywords: [
      "ai api kubernetes pod",
      "ai kubernetes pod",
      "ai api kubernetes",
      "kubernetes ai pod",
      "ai crashloopbackoff",
      "chat with kubernetes pod",
      "explain pod kubernetes ai",
      "kubectl ai pod",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "Queries like ai api kubernetes pod usually mean: “I have a bad Pod — can AI tell me why without me memorizing every kubectl flag?” Yes — if you separate diagnosis from mutation. The unsafe pattern is model text piped into apply. The safe pattern is evidence first, then a reviewable plan if you must change the cluster.",
      },
      {
        type: "p",
        text: "This guide is a practical loop for Pod failures (CrashLoopBackOff, ImagePullBackOff, OOMKilled) using kubectl, optional K8sGPT, and an intent CLI with an approval gate.",
        links: [
          {
            label: "CrashLoopBackOff",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          {
            label: "ImagePullBackOff",
            href: "/blog/kubernetes-imagepullbackoff",
          },
          {
            label: "OOMKilled",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
      },
      {
        type: "h2",
        text: "The safe loop",
      },
      {
        type: "ul",
        items: [
          "Collect evidence with kubectl (describe, logs, events) — copy-pasteable for tickets",
          "Optionally scan with K8sGPT when you want analyzer-shaped findings",
          "Ask an intent CLI to explain — treat the answer as a hypothesis",
          "If you mutate, require a plan you can refuse (no silent Autopilot)",
        ],
      },
      {
        type: "h2",
        text: "Step 1 — kubectl evidence",
      },
      {
        type: "code",
        caption: "Minimum Pod triage",
        code: `kubectl get pods -n payments
kubectl describe pod -l app=api -n payments
kubectl logs -l app=api -n payments --tail=200 --previous
kubectl get events -n payments --sort-by=.lastTimestamp | tail -30`,
      },
      {
        type: "p",
        text: "If you prefer a live terminal UI while watching restarts, use K9s for navigation — then return to kubectl for anything you need in a ticket. See kubectl vs K9s.",
        links: [{ label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" }],
      },
      {
        type: "h2",
        text: "Step 2 — analyzer AI (optional)",
      },
      {
        type: "p",
        text: "K8sGPT (often searched as Kubegpt) is built for “what is wrong in this namespace/cluster?” It does not replace understanding Pod status fields, but it shortens triage. Keep remediation optional and reviewed.",
        links: [
          { label: "Kubegpt vs K8sGPT", href: "/blog/kubegpt-vs-k8sgpt" },
          {
            label: "Kubernetes AI tools",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
        ],
      },
      {
        type: "h2",
        text: "Step 3 — intent CLI explain (gated mutate)",
      },
      {
        type: "p",
        text: "Natural-language CLIs help when you already know the question (“why is api crashing?”) and want a structured answer or a proposed fix. With kprompt, reads explain; mutates still print a plan with risk checks before apply.",
        links: [
          { label: "safety", href: "/docs/safety" },
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
        ],
      },
      {
        type: "code",
        caption: "Explain first; mutate only after review",
        code: `kprompt "explain why api is crashing" -n payments
kprompt "show recent events for api" -n payments

# Only if the plan matches what you would type by hand:
kprompt "rollback api" -n payments   # Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "What “AI API for Pods” is not",
      },
      {
        type: "ul",
        items: [
          "Not a substitute for RBAC — the tool uses your kubeconfig permissions",
          "Not a guarantee the model’s root cause is correct — verify with logs/events",
          "Not Autopilot-by-default — silent heal loops are how you get surprising blast radius",
        ],
      },
      {
        type: "h2",
        text: "Related playbooks",
      },
      {
        type: "p",
        text: "Failure-specific deep dives: CrashLoopBackOff, ImagePullBackOff, OOMKilled. Tooling choice: kubectl-ai alternatives and What is Kubernetes AI?. Beginner object basics: Pods vs Deployments.",
        links: [
          {
            label: "CrashLoopBackOff",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          {
            label: "ImagePullBackOff",
            href: "/blog/kubernetes-imagepullbackoff",
          },
          {
            label: "OOMKilled",
            href: "/blog/kubernetes-oomkilled",
          },
          {
            label: "kubectl-ai alternatives",
            href: "/blog/kubectl-ai-alternatives",
          },
          {
            label: "What is Kubernetes AI?",
            href: "/blog/what-is-kubernetes-ai",
          },
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  };

export default post;
