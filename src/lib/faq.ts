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
    question: "What is an AI Runtime for Kubernetes?",
    answer:
      "kprompt is an AI-powered runtime that understands your Kubernetes environment and turns intent into context-aware operations, investigations, and recommendations. You describe the outcome; it gathers relevant cluster context, reasons about what matters, and produces a reviewable PlanResult before any mutation. It is not a ChatGPT wrapper, a kubectl command generator, a monitoring-only AIOps dashboard, or a silent auto-healer.",
    more: { label: "Architecture", href: "/docs/architecture" },
  },
  {
    question: "Is kprompt only for incidents and AI SRE?",
    answer:
      "No. Investigation (investigate / why / timeline / impact) and the optional Observe agent are one capability lane. The same runtime also covers day-2 operate (deploy, scale, rollback), explain/read, optimize and audit reports, dependency graphs, and multi-tool routes — always under plan → approve for mutations.",
    more: { label: "Overview", href: "/docs" },
  },
  {
    question: "Why would an experienced Kubernetes engineer use it?",
    answer:
      "You already know kubectl, PDBs, HPA, and failure modes. What still hurts at scale is gathering and correlating context across workloads, dependencies, events, metrics, and risks. kprompt augments that expertise by reducing manual correlation — it does not pretend to replace it.",
    more: {
      label: "Beyond AI kubectl",
      href: "/blog/ai-sre-not-ai-kubectl",
    },
  },
  {
    question: "How is kprompt different from a chatbot, CLI wrapper, or dashboard?",
    answer:
      "A chatbot answers how-to docs; kprompt reasons about your live cluster. A CLI wrapper translates English into kubectl; kprompt understands environment state before proposing a PlanResult. A dashboard shows isolated signals; kprompt connects related evidence when signals are available. Same word “AI,” different contract.",
    more: {
      label: "Kubernetes AI tools compared",
      href: "/blog/kubernetes-ai-tools-comparison",
    },
  },
  {
    question: "Do I need Prometheus, Loki, or OpenTelemetry?",
    answer:
      "No for core Kubernetes operate and many reads. When Prom, OTel, Grafana, or similar backends are configured, they enrich understanding (perf explain, optional graph edges, dashboards). Missing backends degrade honestly — kprompt does not invent metrics or claim per-database product connectors.",
    more: { label: "Integrations", href: "/docs/integrations" },
  },
  {
    question: "What is the kprompt agent?",
    answer:
      "An optional in-cluster Observe agent that watches a namespace, correlates Pods/Events into Incidents, and sends gated Slack/Discord/webhook alerts. Default mode never mutates. Optional Autopilot propose emits a PlanResult; apply stays human-gated. The laptop CLI still works without any agent.",
    more: { label: "Observe agent docs", href: "/docs/agent" },
  },
  {
    question: "Does kprompt apply changes to my cluster automatically?",
    answer:
      "No. Every mutating intent compiles into a PlanResult that lists the resources, diffs, and risk level before anything runs. On a TTY you confirm with y/N; in scripts you pass --approve explicitly. Wipe-class prompts are hard-denied instead of planned, and Autopilot is propose-only by default (ADR-0015) — it never applies silently.",
    more: { label: "Safety model", href: "/docs/safety" },
  },
  {
    question: "Should I replace kubectl or K9s with kprompt?",
    answer:
      "No. kubectl remains the precise API client and scripting language; K9s remains the best live terminal UI for watching rollouts and hopping between Pods. kprompt sits beside them when the bottleneck is correlating intent and cluster context — not exact flags or a resource browser.",
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
