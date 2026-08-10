import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "best-ai-tools-kubernetes-troubleshooting",
    title:
      "Best AI tools for Kubernetes troubleshooting (2026)",
    description:
      "Practical shortlist of AI tools for Kubernetes troubleshooting: K8sGPT for scans, intent CLIs for explain/plan, kubectl for evidence — with an honest mutation checklist.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: ["kubernetes", "ai", "devops", "sre", "troubleshooting"],
    keywords: [
      "best ai tools for kubernetes troubleshooting",
      "kubernetes ai troubleshooting",
      "ai kubernetes troubleshooting",
      "k8s ai tools",
      "kubernetes ai tools",
      "ai tools for kubernetes",
      "best kubernetes ai tools 2026",
      "troubleshoot kubernetes with ai",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "“Best AI tools for Kubernetes troubleshooting” is not a single winner. Incidents have phases: notice, gather evidence, form a hypothesis, change something, verify. Different tools own different phases — ranking them as if they compete for one slot is how teams buy a chatbot when they needed a scanner.",
      },
      {
        type: "p",
        text: "This is a phase-based shortlist for 2026, aligned with searches like k8s ai tools and kubernetes ai tooling. For the full peer map, keep the Kubernetes AI tools comparison open in another tab.",
        links: [
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "What is Kubernetes AI?",
            href: "/blog/what-is-kubernetes-ai",
          },
        ],
      },
      {
        type: "h2",
        text: "Shortlist by phase",
      },
      {
        type: "table",
        headers: ["Phase", "Reach for", "Why"],
        rows: [
          [
            "Notice / watch",
            "K9s, alerts, dashboards",
            "Live state beats chatting about state",
          ],
          [
            "Evidence",
            "kubectl describe / logs / events",
            "Copy-pasteable artifacts for the incident channel",
          ],
          [
            "Hypothesis / scan",
            "K8sGPT (+ --explain)",
            "Analyzer catalog + plain-language findings",
          ],
          [
            "Explain in English",
            "Intent CLI (kubectl-ai or kprompt)",
            "You already know the question; need structured help",
          ],
          [
            "Bounded fix",
            "Reviewed plan or hand-typed kubectl",
            "No silent apply; blast radius stays human-sized",
          ],
          [
            "Verify",
            "kubectl / metrics / GitOps sync",
            "Confirm Ready, error rate, rollback if needed",
          ],
        ],
      },
      {
        type: "h2",
        text: "1. K8sGPT — best default for “what is wrong?”",
      },
      {
        type: "p",
        text: "When the cluster is noisy and you need triage, K8sGPT (searches often say Kubegpt) is the strongest diagnose-first peer. Use it before you invent a mutate story.",
        links: [
          { label: "Kubegpt vs K8sGPT", href: "/blog/kubegpt-vs-k8sgpt" },
          { label: "K8sGPT", href: "https://k8sgpt.ai/" },
        ],
      },
      {
        type: "h2",
        text: "2. Intent CLIs — best when the question is already clear",
      },
      {
        type: "p",
        text: "kubectl-ai and kprompt both turn English into cluster help on your laptop. Prefer kubectl-ai for REPL fluency; prefer kprompt when every mutate should print a plan with risk checks and an approval step. See kubectl-ai alternatives and the head-to-head.",
        links: [
          {
            label: "kubectl-ai alternatives",
            href: "/blog/kubectl-ai-alternatives",
          },
          {
            label: "head-to-head",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
        ],
      },
      {
        type: "code",
        caption: "Troubleshoot with a gate on the fix",
        code: `kprompt "explain why api is crashing" -n payments
kprompt "show events for api" -n payments
kprompt "rollback api" -n payments   # review plan → y or n`,
      },
      {
        type: "h2",
        text: "3. kubectl (+ K9s) — still mandatory",
      },
      {
        type: "p",
        text: "AI does not replace the evidence layer. Keep kubectl for tickets and CI; keep K9s for live navigation. AI tools that cannot show you the same describe/logs path are demos, not runbooks.",
        links: [
          { label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" },
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
        ],
      },
      {
        type: "h2",
        text: "Failure playbooks to pair with AI",
      },
      {
        type: "ul",
        items: [
          "CrashLoopBackOff — restart loops and exit codes",
          "ImagePullBackOff — registry/auth/tag mistakes",
          "OOMKilled — memory limits and requests",
          "AI for Kubernetes Pods — the diagnose loop without silent apply",
        ],
      },
      {
        type: "p",
        text: "Deep dives: CrashLoopBackOff, ImagePullBackOff, OOMKilled, and AI for Kubernetes Pods. For “chat with the cluster” product shapes, see that landing. For non-AI interface swaps, see kubectl alternatives.",
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
            label: "AI for Kubernetes Pods",
            href: "/blog/ai-kubernetes-pod-diagnose",
          },
          {
            label: "chat with the cluster",
            href: "/blog/chat-with-kubernetes-cluster",
          },
          {
            label: "kubectl alternatives",
            href: "/blog/kubectl-alternatives",
          },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  };

export default post;
