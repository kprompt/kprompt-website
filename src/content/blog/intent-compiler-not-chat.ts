import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "intent-compiler-not-chat",
    title:
      "kprompt is an intent compiler, not a Kubernetes chat REPL",
    description:
      "Why we compile natural language into a gated PlanResult instead of racing kubectl-ai on agentic chat — same NL CLI lane, different contract: typed plans, hard denies, CI JSON, multi-tool day-2 under one approval loop.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "kubernetes cli",
      "platform engineering",
      "devops",
    ],
    keywords: [
      "kubernetes intent compiler",
      "plan before apply kubernetes",
      "kubectl-ai alternative",
      "kubernetes ai cli",
      "planresult",
      "natural language kubernetes safety",
      "ai ops approval gate",
      "byok kubernetes cli",
      "kprompt vs kubectl-ai",
      "kprompt",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "Most Kubernetes AI demos look the same in a screenshot: a prompt box, some English, something that resembles kubectl. Underneath, products diverge. Some scan the cluster. Some run agents inside it. Some host chat in a SaaS control plane. And in the local CLI lane — where kubectl-ai and kprompt both sit — the important question is not who has the slicker REPL. It is what the tool emits before anything hits the apiserver.",
      },
      {
        type: "p",
        text: "Our locked bet: kprompt is an intent compiler. Plain English compiles into a typed, reviewable PlanResult — actions, risk, hard denies — that a human or CI can gate, then apply. It is not a free-form agent chat optimized for “keep talking until the cluster moves.” That difference is the product.",
        links: [
          {
            label: "AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
        ],
      },
      {
        type: "h2",
        text: "Same lane, different contract",
      },
      {
        type: "p",
        text: "We do not claim a unique category against every Kubernetes AI tool. The map is simpler:",
      },
      {
        type: "ul",
        items: [
          "K8sGPT — analyzer-first diagnosis (scan → explain). We are not a fleet scanner.",
          "Kagent — in-cluster agent framework. We ship an optional Observe-only agent, not a multi-agent platform.",
          "Hosted chat — managed control planes. We are BYOK and local by default.",
          "kubectl-ai — natural-language kubectl fluency. Same lane as us; different mutate contract.",
        ],
      },
      {
        type: "p",
        text: "Trying to out-chat kubectl-ai on agentic REPL features is a losing strategy. Google can ship conversation quality and tool-calling surface area faster than a small OSS project. Competing there means forever second place. Competing on a printable, policy-shaped plan artifact is a fight worth picking.",
        links: [
          {
            label: "kubectl-ai",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
        ],
      },
      {
        type: "h2",
        text: "What “intent compiler” means in practice",
      },
      {
        type: "p",
        text: "A chat REPL optimizes for turn-taking: the model calls tools, narrates, maybe runs kubectl. An intent compiler optimizes for an artifact you can refuse:",
      },
      {
        type: "code",
        caption: "Compile → review → apply (or abort)",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N] n
Aborted.`,
      },
      {
        type: "ul",
        items: [
          "LLM proposes intent; Go packages own planning, safety, and execution",
          "Mutations default to plan-only until y/N or an explicit --approve",
          "Wipe-class prompts hard-deny before a useful apply path exists",
          "CI consumes the same PlanResult JSON humans see summarized in the terminal",
        ],
      },
      {
        type: "code",
        caption: "Same prompt, machine-readable gate",
        code: `kprompt "scale api to 3" -n staging -o json | \\
  jq '{intent:.plan.intent, risk:.risk, denied:.risk.denied}'`,
      },
      {
        type: "h2",
        text: "Why the artifact matters more than the chat",
      },
      {
        type: "p",
        text: "Platform teams already distrust “AI applied something.” They trust diffs, PRs, admission policy, and change tickets. A scrollback of model narration does not fit that muscle memory. A PlanResult does: intent, ordered actions, risk level, denied flag, applied boolean — something you can jq, archive, and teach juniors to read before they type y.",
      },
      {
        type: "table",
        headers: ["Chat REPL instinct", "Intent compiler instinct"],
        rows: [
          [
            "Keep the session going until it works",
            "Emit one plan; refuse or approve",
          ],
          [
            "Tool calls are the product",
            "The gated plan is the product",
          ],
          [
            "Speed to first kubectl",
            "Speed to a reviewable change",
          ],
          [
            "Hard to put in CI without scraping text",
            "JSON PlanResult is a first-class gate",
          ],
        ],
      },
      {
        type: "p",
        text: "Neither instinct is “wrong.” If you want kubectl fluency in an interactive session, a chat-shaped CLI is rational. If you want NL day-2 ops that behave like a change you would put in a pipeline, compile to a plan.",
      },
      {
        type: "h2",
        text: "One contract across tools",
      },
      {
        type: "p",
        text: "The compiler model only pays off if it stretches past kubectl scale. kprompt routes day-2 backends — Helm install/upgrade previews, Prometheus performance explains, trace adapters, Workflow generation — through the same plan → safety → approve loop. The LLM does not become a second control plane; it proposes steps against real CLIs and APIs you already run.",
      },
      {
        type: "code",
        caption: "Different backends, same gate",
        code: `kprompt "install redis" -n cache
kprompt "why is my api slow?" -n production
kprompt "explain why api is crashing" -n staging
# Mutating suggestions still show a plan before apply`,
      },
      {
        type: "p",
        text: "Post-v1 originality we are building toward — not shipping as vapor demos — is cluster-level NL ops on that same contract: optimize my cluster style reports with optional approved fixes, and service dependency graphs grounded in Kubernetes (and traces when available). Still plan-before-apply. Never a silent controller.",
      },
      {
        type: "h2",
        text: "What we are not selling today",
      },
      {
        type: "p",
        text: "Honesty is part of the positioning. The Apache-2.0 CLI is free, local, and BYOK. Org policy sync, shared audit, and Team enrollment are explored for later — there is nothing to buy on the site today, and this post is not a pricing page. When governance ships, it should attach to the same PlanResult artifact, not invent a parallel chatbot product.",
      },
      {
        type: "ul",
        items: [
          "Not a hosted agent in your cluster (OSS path)",
          "Not “unique NL kubectl” — kubectl-ai shares that job",
          "Not a replacement for RBAC, admission, or GitOps",
          "Experimental — hard denies help; they are not a production certificate",
        ],
      },
      {
        type: "h2",
        text: "How to evaluate us in one afternoon",
      },
      {
        type: "p",
        text: "Do not score kprompt on who tells a better joke in a 40-turn chat. Score the contract:",
      },
      {
        type: "ul",
        items: [
          "Same mutate prompt in kubectl-ai and kprompt — what prints before apply?",
          "Wipe-class prompt — does it fail closed?",
          "JSON gate — can CI reject denied/high-risk without scraping ANSI?",
          "Wrong namespace / scale to zero — does the plan make the blast radius obvious?",
        ],
      },
      {
        type: "code",
        caption: "Thirty-minute drill",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging
kprompt "scale api to 0" -n staging -o json | jq .risk
kprompt "scale api to 2" -n staging
# read plan → n or y`,
      },
      {
        type: "h2",
        text: "Design principle we will not trade away",
      },
      {
        type: "p",
        text: "Compile to PlanResult, not chat scroll. The LLM proposes; the product artifact is a structured plan humans and policy can gate. Feature parity with agentic REPLs is explicitly out of scope as a north star. If a future feature cannot show up in a reviewable plan (or a clear read-only report), it probably is not a kprompt feature.",
      },
      {
        type: "p",
        text: "For the peer map, read the AI tools comparison. For a direct head-to-head, see kprompt vs kubectl-ai. For the safety loop, read plan → approve. For CI schema, read PlanResult JSON deep dive and PlanResult gates. Talk to your cluster — but make the cluster change look like something you would sign.",
        links: [
          {
            label: "AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          {
            label: "plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
          {
            label: "PlanResult gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
    ],
  };

export default post;
