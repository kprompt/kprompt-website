import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "chat-with-kubernetes-cluster",
    title:
      "Chat with your Kubernetes cluster: what actually works safely",
    description:
      "What “chat with your Kubernetes cluster” means in practice: local NL CLIs, hosted consoles, and analyzers — and how to keep credentials and apply behind a human gate.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: ["kubernetes", "ai", "devops", "sre", "kubernetes cli"],
    keywords: [
      "chat with kubernetes cluster",
      "chat with your kubernetes cluster",
      "talk to kubernetes cluster",
      "kubernetes chatbot",
      "ai chat kubernetes",
      "natural language kubernetes",
      "ask kubernetes questions",
      "kubernetes ai chat",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "“Chat with your Kubernetes cluster” is a marketing phrase for a real job: ask questions in English and get answers grounded in live cluster state. The products that show up look similar in a screenshot. Underneath, some only read, some generate kubectl, some run agents in-cluster, and some send credentials to a hosted console. Safety is the product difference.",
      },
      {
        type: "p",
        text: "This page is the buyer’s filter for that phrase — not a feature checklist. For the wider tool map, see Kubernetes AI tools. For Pod-level triage, see AI for Kubernetes Pods.",
        links: [
          {
            label: "Kubernetes AI tools",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "AI for Kubernetes Pods",
            href: "/blog/ai-kubernetes-pod-diagnose",
          },
        ],
      },
      {
        type: "h2",
        text: "Three shapes of “chat”",
      },
      {
        type: "table",
        headers: ["Shape", "What you get", "Watch for"],
        rows: [
          [
            "Local intent CLI",
            "NL on your laptop over kubeconfig (kubectl-ai, kprompt, …)",
            "Does mutate print a plan you can refuse?",
          ],
          [
            "Analyzer / scan",
            "Findings + optional LLM explain (K8sGPT)",
            "Diagnosis ≠ permission to auto-heal",
          ],
          [
            "Hosted console / agent platform",
            "Managed UI or in-cluster agents",
            "Where credentials live; who owns agent lifecycle",
          ],
        ],
      },
      {
        type: "h2",
        text: "What “works” should mean",
      },
      {
        type: "ul",
        items: [
          "Answers cite real objects (namespace, Deployment, events) — not generic blog advice",
          "Reads are cheap; writes are explicit and reviewable",
          "Your RBAC still bounds what the tool can see or change",
          "You can paste the same investigation into a ticket without replaying a chat UI",
        ],
      },
      {
        type: "h2",
        text: "A safe chat session (local CLI)",
      },
      {
        type: "code",
        caption: "Ask first; mutate only with a plan gate",
        code: `kprompt "list deployments that are not ready" -n staging
kprompt "explain why api is not ready" -n staging

# Mutate only after you would sign the plan:
kprompt "scale api to 3" -n staging   # Apply? [y/N]`,
      },
      {
        type: "p",
        text: "kprompt’s bet in this lane is plan → safety → approve before apply, using your kubeconfig and your own LLM key. kubectl-ai optimizes for REPL fluency in the same NL CLI category — compare contracts, not slogans.",
        links: [
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          {
            label: "kubectl-ai alternatives",
            href: "/blog/kubectl-ai-alternatives",
          },
          { label: "safety model", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "When chat is the wrong interface",
      },
      {
        type: "ul",
        items: [
          "CI and runbooks need kubectl (or PlanResult JSON), not a chat transcript",
          "Live watching of twenty Pods is still faster in K9s than in a chat loop",
          "Steady-state desired state belongs in GitOps, not in a conversation history",
        ],
      },
      {
        type: "p",
        text: "For non-AI interfaces, see kubectl vs K9s and kubectl alternatives. For category vocabulary (kubernetes ai, k8s ai tools), see What is Kubernetes AI?",
        links: [
          { label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" },
          {
            label: "kubectl alternatives",
            href: "/blog/kubectl-alternatives",
          },
          {
            label: "What is Kubernetes AI?",
            href: "/blog/what-is-kubernetes-ai",
          },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  };

export default post;
