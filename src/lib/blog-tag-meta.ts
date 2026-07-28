/**
 * Search-oriented descriptions for blog tag hubs.
 * Keys are the raw tag strings used on posts (not URL slugs).
 */
export const BLOG_TAG_DESCRIPTIONS: Record<string, string> = {
  agent:
    "Observe agent notes: namespace watch, Incidents, gated Slack alerts, and propose-only Autopilot.",
  ai: "Practical AI-for-Kubernetes writing: intent compilers, plan gates, and honest product limits.",
  aiops:
    "AIOps for cluster operators — what to automate, what still needs a human approve step.",
  announcement: "Product announcements and release notes from the kprompt team.",
  automation:
    "Approval-bounded automation for Kubernetes — PlanResult gates, CI hooks, and what stays human.",
  "ci/cd":
    "CI/CD with kprompt PlanResult JSON: fail high-risk plans before a human approves apply.",
  demo: "Hands-on demos and walkthroughs you can reproduce on kind or a sandbox cluster.",
  devops:
    "Day-2 DevOps with natural language: scale, explain, optimize, and review before apply.",
  gitops:
    "GitOps status and sync through the same plan → approve loop as the rest of your cluster work.",
  helm: "Day-2 Helm workflows through kprompt — install, upgrade, and preview before apply.",
  kind: "kind-based demos that break workloads on purpose so you can practice Observe and explain flows.",
  kubectl:
    "Natural-language alternatives to common kubectl workflows, with a reviewable plan in between.",
  "kubernetes cli":
    "Kubernetes CLI tooling that compiles intent into plans instead of free-form chat execution.",
  kubernetes:
    "Kubernetes operations with natural language: plan → safety → approve → apply.",
  llm: "BYOK LLM providers for cluster work: OpenAI, Anthropic, Gemini, Groq, Moonshot/Kimi, Ollama, and gateways.",
  observe:
    "Always-on Observe agent: correlation, health scores, memory/patterns, and gated notifications.",
  "open source":
    "Open-source Kubernetes CLI notes: Apache-2.0 licensing, contribute paths, and local-first design.",
  "platform engineering":
    "Platform engineering with an intent compiler — shared plans, CI gates, and tighter day-2 loops.",
  "prompt engineering":
    "Prompt catalogues for CrashLoopBackOff, OOMKilled, ImagePullBackOff, and other cluster failures.",
  prometheus:
    "Prometheus-backed performance prompts through kprompt — read-only diagnosis under the same CLI.",
  release: "What shipped in each kprompt release — and what still stays experimental.",
  safety:
    "Plan safety, hard denies, risk levels, and why --approve is never a substitute for review.",
  security:
    "Credentials, BYOK keys, and the mutate contract that keeps cluster changes reviewable.",
  sre: "Building toward AI SRE: investigate, why, timeline, and approval-bounded automation.",
  troubleshooting:
    "Kubernetes troubleshooting playbooks: CrashLoopBackOff, ImagePullBackOff, OOMKilled, and more.",
  tutorial:
    "Step-by-step tutorials for installing kprompt and running your first reviewable plans.",
};

export function blogTagDescription(tag: string): string {
  return (
    BLOG_TAG_DESCRIPTIONS[tag] ??
    `Articles about ${tag}, Kubernetes operations, and the kprompt CLI.`
  );
}
