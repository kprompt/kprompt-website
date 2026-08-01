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
    question: "How is kprompt different from ARK (Agentic Runtime for Kubernetes)?",
    answer:
      "ARK (McKinsey’s agents-at-scale-ark) is an agent platform on Kubernetes: Agents, Teams, Models, and Tools as CRDs so you can host agentic applications — similar to how Argo hosts workflows. kprompt is an AI Runtime for operating the cluster: natural language becomes a reviewable PlanResult, then you approve before apply, plus an optional Observe agent for namespace alerts. Same word “runtime,” different job — hosting agents vs reasoning about cluster ops under an approval gate.",
    more: { label: "kprompt vs ARK", href: "/blog/kprompt-vs-ark" },
  },
  {
    question: "How is kprompt different from kagent?",
    answer:
      "kagent (CNCF Sandbox) is a Kubernetes-native agent platform: Agents as CRDs, MCP tools, A2A, mesh, and BYO frameworks so you run agents on the cluster. kprompt is a plan-before-apply ops CLI plus an optional Observe notify pipeline — PlanResult is the product artifact, not a general Agent CRD control plane. Marketing can overlap on incident demos; the contracts do not.",
    more: { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
  },
  {
    question: "Does kprompt apply changes to my cluster automatically?",
    answer:
      "No. Every mutating intent compiles into a PlanResult that lists the resources, diffs, and risk level before anything runs. On a TTY you confirm with y/N; in scripts you pass --approve explicitly. Wipe-class prompts are hard-denied instead of planned, and Autopilot is propose-only by default (ADR-0015) — it never applies silently. Trust loop: Reason → Plan → Validate → Approve → Execute → Observe → Learn.",
    more: { label: "Safety model", href: "/docs/safety" },
  },
  {
    question: "How is kprompt different from kubectl-ai?",
    answer:
      "Both turn natural language into Kubernetes actions from the terminal. The difference is the contract: kprompt is an AI Runtime with a reviewable plan, safety engine, hard denies, and CI-stable PlanResult JSON — plus an optional in-cluster Observe path. It is not competing as a chat REPL for kubectl fluency.",
    more: { label: "kprompt vs kubectl-ai", href: "/blog/kprompt-vs-kubectl-ai" },
  },
  {
    question: "Should I replace kubectl or K9s with kprompt?",
    answer:
      "No. kubectl remains the precise API client and scripting language; K9s remains the best live terminal UI for watching rollouts and hopping between Pods. kprompt sits beside them when the bottleneck is reasoning about intent and evidence — not when you need exact flags or a resource browser.",
    more: {
      label: "kubectl vs K9s and alternatives",
      href: "/blog/kubectl-alternatives",
    },
  },
  {
    question: "Where do my kubeconfig and LLM keys live?",
    answer:
      "On your machine. kprompt reads your existing kubeconfig locally. For NL plans use local Ollama ($0, no key) or your own cloud provider key from environment variables (BYOK) — kprompt does not sell keys. Optional Team kp_… tokens from kprompt login are org policy/audit only. Cluster credentials are not uploaded to a control plane by default, and ~/.kprompt/config.yaml never stores secrets.",
    more: { label: "Providers and keys", href: "/docs/providers" },
  },
  {
    question: "Which LLM providers does kprompt support?",
    answer:
      "Start with local Ollama ($0, no cloud key). Cloud options include OpenAI, Anthropic, Gemini, Groq, xAI (Grok), Moonshot (Kimi K3), and others — bring your own key, pick a provider and model with kprompt config set, and switch per command when you want a cheaper or stronger model.",
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
      "The optional Observe agent (installed with Helm) is the first in-cluster runtime surface: it watches a namespace, turns anomalies into an Incident, and sends gated Slack or webhook notifications. It runs with namespace-scoped Role RBAC and does not mutate your cluster — it is an observer, not a self-healer. A thin Coordinator also ships: cross-namespace handoff, optional read-only kube probe, InvestigationReport merge, and Shared Knowledge (durable ConfigMap/file handoff edges via /v1/knowledge) — still mutate-off. A full continuous blast-radius product graph stays on the roadmap.",
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
