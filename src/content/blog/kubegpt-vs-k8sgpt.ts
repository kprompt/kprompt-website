import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubegpt-vs-k8sgpt",
    title: "Kubegpt vs K8sGPT: same search, different tools (and what to use)",
    description:
      "People searching Kubegpt usually mean K8sGPT — the analyzer-first Kubernetes AI tool. How it differs from kubectl-ai and plan-before-apply CLIs, and when each job fits.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: ["kubernetes", "ai", "devops", "sre", "kubernetes cli"],
    keywords: [
      "kubegpt",
      "k8sgpt",
      "kubegpt vs k8sgpt",
      "what is kubegpt",
      "k8sgpt alternatives",
      "k8sgpt vs kubectl-ai",
      "kubernetes ai tools",
      "ai kubernetes troubleshooting",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "If you typed Kubegpt into Google, you almost certainly meant K8sGPT — the open-source analyzer that scans a cluster and can explain findings with an LLM. “Kubegpt” is a common misspelling and a search collision, not a separate mainstream CNCF-adjacent product in the same lane. Looking for kubectl-ai alternatives or Pod-level AI triage instead? Use those landings after you clear the name.",
        links: [
          { label: "K8sGPT", href: "https://k8sgpt.ai/" },
          {
            label: "GitHub repository",
            href: "https://github.com/k8sgpt-ai/k8sgpt",
          },
          {
            label: "kubectl-ai alternatives",
            href: "/blog/kubectl-ai-alternatives",
          },
          {
            label: "Pod-level AI triage",
            href: "/blog/ai-kubernetes-pod-diagnose",
          },
        ],
      },
      {
        type: "p",
        text: "This page clears the name, then places K8sGPT next to intent CLIs so you do not buy a chatbot when you needed a scanner — or enable silent apply when you needed a plan gate.",
      },
      {
        type: "h2",
        text: "What is Kubegpt? (people mean K8sGPT)",
      },
      {
        type: "ul",
        items: [
          "K8sGPT runs analyzers over live Kubernetes resources and surfaces problems in plain language",
          "Optional --explain enriches findings with an LLM; local models are supported",
          "Core value is diagnose-first — optional remediation is not the default story",
          "It is not kubectl, not K9s, and not a full in-cluster agent platform like Kagent",
        ],
      },
      {
        type: "h2",
        text: "K8sGPT vs intent CLIs",
      },
      {
        type: "table",
        headers: ["Job", "Reach for", "Why"],
        rows: [
          [
            "What is broken right now?",
            "K8sGPT",
            "Analyzer catalog + explain",
          ],
          [
            "Turn a sentence into kubectl-shaped actions",
            "kubectl-ai or kprompt",
            "Intent CLI lane — check mutation contract",
          ],
          [
            "Long-running agents on the cluster",
            "Kagent-class platforms",
            "Different ops burden; not a laptop scan",
          ],
        ],
      },
      {
        type: "p",
        text: "kprompt sits in the same natural-language CLI lane as kubectl-ai, with a stricter default: structured plan → safety → human approve before apply. Use K8sGPT when the bottleneck is finding issues; use an intent CLI when you already know the outcome and need a reviewable change.",
        links: [
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          {
            label: "What is Kubernetes AI?",
            href: "/blog/what-is-kubernetes-ai",
          },
        ],
      },
      {
        type: "h2",
        text: "Try diagnose and intent on the same broken namespace",
      },
      {
        type: "code",
        caption: "Scan, then ask for a gated plan",
        code: `# Analyzer-first (K8sGPT — install from upstream)
k8sgpt analyze --explain

# Intent CLI with approval (kprompt)
kprompt "explain why api is crashing" -n payments
kprompt "rollback api" -n payments   # review plan → y or n`,
      },
      {
        type: "p",
        text: "For the full peer map (K8sGPT, kubectl-ai, Kagent, hosted chat), see the Kubernetes AI tools comparison. For a phase-based troubleshooting shortlist, see Best AI tools for Kubernetes troubleshooting. For product shapes behind “chat with your cluster,” see that landing. For the category definition behind searches like kubernetes ai and k8s ai tools, see What is Kubernetes AI?",
        links: [
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "Best AI tools for Kubernetes troubleshooting",
            href: "/blog/best-ai-tools-kubernetes-troubleshooting",
          },
          {
            label: "chat with your cluster",
            href: "/blog/chat-with-kubernetes-cluster",
          },
          {
            label: "What is Kubernetes AI?",
            href: "/blog/what-is-kubernetes-ai",
          },
          { label: "Safety model", href: "/docs/safety" },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  };

export default post;
