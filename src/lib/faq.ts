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
    question: "What is kprompt?",
    answer:
      "kprompt is the AI Runtime for Kubernetes: a reasoning layer that observes your cluster, plans safe actions, and executes only after approval. The open-source CLI compiles natural language into a reviewable PlanResult; the optional Observe agent watches a namespace and notifies without mutating. It is not a ChatGPT wrapper, a workflow engine, or a silent auto-healer.",
    more: { label: "Architecture", href: "/docs/architecture" },
  },
  {
    question: "Does kprompt apply changes to my cluster automatically?",
    answer:
      "No. Every mutating intent compiles into a PlanResult that lists the resources, diffs, and risk level before anything runs. On a TTY you confirm with y/N; in scripts you pass --approve explicitly. Wipe-class prompts are hard-denied instead of planned, and Autopilot is propose-only by default (ADR-0015) — it never applies silently.",
    more: { label: "Safety model", href: "/docs/safety" },
  },
  {
    question: "How is kprompt different from other Kubernetes AI tools?",
    answer:
      "Most peers optimize for one job: K8sGPT diagnoses, kubectl-ai is an NL kubectl REPL, Kagent/ARK host agents on the cluster. kprompt is a plan-before-apply ops CLI — reviewable PlanResult, hard denies, CI JSON — plus optional Observe. Same word “AI,” different contract.",
    more: {
      label: "Kubernetes AI tools compared",
      href: "/blog/kubernetes-ai-tools-comparison",
    },
  },
  {
    question: "Should I replace kubectl or K9s with kprompt?",
    answer:
      "No. kubectl remains the precise API client and scripting language; K9s remains the best live terminal UI for watching rollouts and hopping between Pods. kprompt sits beside them when the bottleneck is reasoning about intent — not exact flags or a resource browser.",
    more: {
      label: "kubectl vs K9s",
      href: "/blog/kubectl-vs-k9s",
    },
  },
  {
    question: "Where do my kubeconfig and LLM keys live?",
    answer:
      "On your machine. kprompt reads your existing kubeconfig locally. For NL plans use local Ollama ($0, no key) or your own cloud provider key (BYOK). Cluster credentials are not uploaded to a control plane by default.",
    more: { label: "Providers and keys", href: "/docs/providers" },
  },
  {
    question: "Can I use kprompt in CI/CD pipelines?",
    answer:
      "Yes, for plan generation and gating. kprompt emits a stable JSON PlanResult with intent, resources, diffs, and risk, so a pipeline can fail on high-risk plans or post the plan to a pull request before a human approves apply.",
    more: { label: "CI / PlanResult JSON", href: "/docs/ci" },
  },
  {
    question: "Is kprompt production ready?",
    answer:
      "It is labelled experimental on purpose. Plans can be wrong or incomplete outside the hard-deny rules, so read every plan before apply, start on kind or a sandbox cluster, and treat --approve with care.",
    more: { label: "Roadmap and honest limits", href: "/docs/roadmap" },
  },
  {
    question: "Is kprompt free and open source?",
    answer:
      "Yes. The CLI is Apache-2.0 licensed on GitHub and stays free. There is an optional Team surface for organisations that already have access, but there is nothing to buy as a public signup product today.",
    more: { label: "Install the CLI", href: "/docs/install" },
  },
];
