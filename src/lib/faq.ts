/**
 * Canonical answers to the questions operators ask before adopting kprompt.
 * The same copy feeds the visible FAQ and the FAQPage structured data, so
 * keep answers plain-text and honest about what does not ship yet.
 */
export type FaqEntry = {
  question: string;
  answer: string;
  /** Optional deeper read — rendered as a link, not part of the schema answer. */
  more?: { label: string; href: string };
};

export const FAQ: FaqEntry[] = [
  {
    question: "Does kprompt apply changes to my cluster automatically?",
    answer:
      "No. Every mutating intent compiles into a PlanResult that lists the resources, diffs, and risk level before anything runs. On a TTY you confirm with y/N; in scripts you pass --approve explicitly. Wipe-class prompts are hard-denied instead of planned, and Autopilot is propose-only by default (ADR-0015) — it never applies silently.",
    more: { label: "Safety model", href: "/docs/safety" },
  },
  {
    question: "How is kprompt different from kubectl-ai?",
    answer:
      "Both turn natural language into Kubernetes actions from the terminal. The difference is the mutate contract: kprompt always compiles intent into a reviewable plan with diffs and a risk verdict, runs a safety engine with hard denies, and emits CI-stable PlanResult JSON you can gate a pipeline on. It is an intent compiler with an approval boundary rather than a chat loop that executes.",
    more: { label: "kprompt vs kubectl-ai", href: "/blog/kprompt-vs-kubectl-ai" },
  },
  {
    question: "Where do my kubeconfig and API keys live?",
    answer:
      "On your machine. kprompt reads your existing kubeconfig locally and uses your own LLM API keys from environment variables (BYOK). Cluster credentials are not uploaded to a control plane by default, and ~/.kprompt/config.yaml never stores API keys — only whether a key is set.",
    more: { label: "Providers and keys", href: "/docs/providers" },
  },
  {
    question: "Which LLM providers does kprompt support?",
    answer:
      "OpenAI, Anthropic, Gemini, Groq, and local models through Ollama, among others. You bring your own key, pick a provider and model with kprompt config set, and switch per command when you want a cheaper or stronger model for a given prompt.",
    more: { label: "Provider matrix", href: "/docs/providers" },
  },
  {
    question: "Can I use kprompt in CI/CD pipelines?",
    answer:
      "Yes, for plan generation and gating. kprompt emits a stable JSON PlanResult with intent, resources, diffs, and risk, so a pipeline can fail on high-risk plans or post the plan to a pull request before a human approves the apply step.",
    more: { label: "CI / PlanResult JSON", href: "/docs/ci" },
  },
  {
    question: "What does the Observe agent actually do?",
    answer:
      "The optional Observe agent (installed with Helm) watches a namespace, turns anomalies into an Incident, and sends gated Slack or webhook notifications. It runs with namespace-scoped Role RBAC and does not mutate your cluster — it is an observer, not a self-healer.",
    more: { label: "Observe agent docs", href: "/docs/agent" },
  },
  {
    question: "Is kprompt production ready?",
    answer:
      "It is labelled experimental on purpose. Plans can be wrong or incomplete outside the hard-deny rules, so read every plan before apply, start on kind or a sandbox cluster, and treat --approve with care. You remain responsible for changes applied with your kubeconfig credentials.",
    more: { label: "Roadmap and honest limits", href: "/docs/roadmap" },
  },
  {
    question: "Is kprompt free and open source?",
    answer:
      "Yes. The CLI is Apache-2.0 licensed on GitHub and stays free. There is an optional Team surface for organisations that already have access, but there is nothing to buy as a public signup product today.",
    more: { label: "Install the CLI", href: "/docs/install" },
  },
];
