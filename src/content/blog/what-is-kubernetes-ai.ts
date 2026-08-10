import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "what-is-kubernetes-ai",
    title:
      "What is Kubernetes AI? Tools, jobs, and what “AI for K8s” actually means",
    description:
      "A plain-language map of Kubernetes AI: analyzers like K8sGPT, intent CLIs like kubectl-ai and kprompt, in-cluster agents, and what belongs in CI vs on your laptop — for searches like kubernetes ai, k8s ai, and k8s ai tools.",
    publishedAt: "2026-07-26",
    updatedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: ["kubernetes", "ai", "devops", "sre", "kubernetes cli"],
    keywords: [
      "what is kubernetes ai",
      "kubernetes ai",
      "k8s ai",
      "k8s ai tools",
      "ai for kubernetes",
      "ai kubernetes tools",
      "kubernetes artificial intelligence",
      "aiops kubernetes",
      "kubectl ai",
      "k8sgpt",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "“Kubernetes AI” is not one product. It is a messy label for anything that uses a model near a cluster: scanning for misconfigs, chatting about Pods, drafting manifests, watching namespaces, or compiling natural language into kubectl-shaped plans. If you searched for kubernetes ai, k8s ai, or k8s ai tools, this page is the map — jobs first, logos second.",
      },
      {
        type: "p",
        text: "The useful question is not “which AI is best?” It is “which job am I buying?” An analyzer, an intent CLI, an in-cluster agent, and a hosted console solve different problems. Mixing them up is how teams buy a chatbot when they needed a scan — or enable silent apply when they needed a plan gate.",
      },
      {
        type: "h2",
        text: "The short definition",
      },
      {
        type: "p",
        text: "Kubernetes AI means software that uses an LLM (or similar model) to help humans operate, diagnose, or change Kubernetes workloads — while still living inside real cluster constraints: RBAC, admission, GitOps, and the fact that apply is irreversible.",
      },
      {
        type: "ul",
        items: [
          "It is not a replacement for kubectl literacy or RBAC design",
          "It is not automatically safe because the UI says “AI”",
          "It is useful when it shortens evidence gathering or intent → change under a human gate",
        ],
      },
      {
        type: "h2",
        text: "Four jobs people mean by “Kubernetes AI”",
      },
      {
        type: "table",
        headers: ["Job", "What you want", "Typical tools"],
        rows: [
          [
            "Find what’s wrong",
            "Fleet or namespace scan → ranked findings",
            "K8sGPT (and similar analyzers)",
          ],
          [
            "Say what you want",
            "Natural language → concrete cluster actions",
            "kubectl-ai, kprompt, other intent CLIs",
          ],
          [
            "Watch continuously",
            "Always-on signals → correlated incidents / alerts",
            "Observe-style agents, AIOps add-ons",
          ],
          [
            "Draft manifests / runbooks",
            "Editor or chat help; apply still yours",
            "IDE copilots, chat UIs",
          ],
        ],
      },
      {
        type: "p",
        text: "Strong teams often use more than one job. An analyzer for “what’s broken in staging,” an intent CLI for “scale api to three,” GitOps for steady state, and a terminal UI like K9s for live watching. AI does not collapse those into a single app.",
        links: [
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" },
        ],
      },
      {
        type: "h2",
        text: "Analyzers vs intent CLIs",
      },
      {
        type: "p",
        text: "K8sGPT-class tools walk resources and emit findings (CrashLoopBackOff, bad Services, and similar). Intent CLIs start from a sentence you already know the outcome of — explain why payment-api is crashing, scale api to 10 — and must decide how mutations reach the apiserver.",
      },
      {
        type: "ul",
        items: [
          "Analyzer first when you do not know which object is sick",
          "Intent CLI first when you already named the workload and the outcome",
          "Inside the intent-CLI lane, compare mutate contracts: free-form shell vs plan → approve",
        ],
      },
      {
        type: "p",
        text: "kprompt sits in the intent-CLI lane with a stricter default: natural language compiles into a reviewable PlanResult, safety checks run, and nothing applies until you confirm. Same peer class as kubectl-ai; different gate.",
        links: [
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          { label: "safety model", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "What “AI SRE” is (and is not)",
      },
      {
        type: "p",
        text: "Marketing will say AI SRE for anything with a chatbot. Operationally it should mean investigate / why / timeline style workflows that still respect approval — not an unsupervised healer that patches production at 03:00. Autopilot that proposes is different from Autopilot that applies.",
        links: [
          {
            label: "AI SRE direction",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
          { label: "Observe agent", href: "/docs/agent" },
        ],
      },
      {
        type: "h2",
        text: "Where credentials should live",
      },
      {
        type: "p",
        text: "A serious Kubernetes AI path keeps kubeconfig on your side of the trust boundary and uses bring-your-own LLM keys (or a local model). Uploading cluster credentials to a hosted “AI ops” console is a different product category — evaluate residency and blast radius explicitly.",
        links: [
          { label: "Providers / BYOK", href: "/docs/providers" },
          {
            label: "LLM providers guide",
            href: "/blog/kubernetes-llm-providers-byok",
          },
        ],
      },
      {
        type: "h2",
        text: "A realistic starter stack",
      },
      {
        type: "ul",
        items: [
          "kubectl for scripts, CI, and copy-pasteable truth",
          "K9s or a dashboard for live navigation",
          "One analyzer (e.g. K8sGPT) when you need a scan",
          "One intent CLI with a mutate contract you accept",
          "GitOps (Argo CD / Flux) for desired state",
          "Optional Observe agent for gated always-on alerts — not a chat loop on prod",
        ],
      },
      {
        type: "h2",
        text: "Try the contract, not the buzzword",
      },
      {
        type: "code",
        caption: "Read first, mutate only after a plan",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "list deployments" -n staging
kprompt "explain why api is not ready" -n staging
kprompt "scale api to 2" -n staging   # review plan → y or n`,
      },
      {
        type: "p",
        text: "For day-2 failure ladders that AI explains should still follow, see CrashLoopBackOff, ImagePullBackOff, and OOMKilled. For the peer map of tools, see the full comparison.",
        links: [
          {
            label: "CrashLoopBackOff",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          {
            label: "ImagePullBackOff",
            href: "/blog/kubernetes-imagepullbackoff",
          },
          { label: "OOMKilled", href: "/blog/kubernetes-oomkilled" },
          {
            label: "full comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "Quickstart", href: "/docs/quickstart" },
        ],
      },
    ],
  };

export default post;
