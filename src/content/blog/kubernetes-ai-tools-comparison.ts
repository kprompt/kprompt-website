import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-ai-tools-comparison",
    title:
      "Kubernetes AI tools: K8sGPT, kubectl-ai, Kagent, and plan-before-apply CLIs",
    description:
      "Map of Kubernetes AI / k8s AI tools by job: K8sGPT (and Kubegpt-style searches) for diagnosis, kubectl-ai and kprompt for NL CLIs, Kagent for in-cluster agents — honest mutation contracts included.",
    publishedAt: "2026-07-18",
    updatedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "kubernetes cli",
      "devops",
      "platform engineering",
    ],
    keywords: [
      "k8sgpt",
      "kubegpt",
      "k8sgpt alternatives",
      "k8sgpt vs kubectl-ai",
      "kubernetes ai tools",
      "k8s ai tools",
      "k8s ai",
      "kubernetes ai",
      "best ai tools for kubernetes troubleshooting",
      "kubectl-ai",
      "kagent vs kubectl-ai",
      "kagent kubernetes",
      "ai kubernetes troubleshooting",
      "chat with kubernetes cluster",
      "natural language kubernetes",
      "kubernetes ai cli",
      "ai kubernetes cli",
      "kprompt",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "The Kubernetes AI category is crowded with demos that look similar in a screenshot: type English, get cluster help. Underneath, only some of the differences are category-level. K8sGPT is not competing with a mutate CLI. Kagent is not a laptop kubectl wrapper. kubectl-ai and kprompt, though, share a lane — natural language on a local CLI — and the honest question is whether the contract differs enough to matter.",
      },
      {
        type: "p",
        text: "This field guide maps the strongest peers without inventing a unique category for ourselves: K8sGPT (analyzer-first diagnosis), kubectl-ai (NL → kubectl), Kagent (Kubernetes-native agents), hosted “chat with your cluster” products, and IDE copilots. kprompt is a local BYOK CLI in the same intent lane as kubectl-ai, with a stricter bet: structured plan → safety → approve before apply, plus day-2 paths that reach Helm and observability tools. None of these replace kubectl, RBAC, or admission policy.",
        links: [
          { label: "K8sGPT", href: "https://k8sgpt.ai/" },
          {
            label: "kubectl-ai",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
          { label: "Kagent", href: "https://github.com/kagent-dev/kagent" },
        ],
      },
      {
        type: "h2",
        text: "Quick comparison",
      },
      {
        type: "table",
        headers: ["Tool", "Primary job", "Where it runs", "Mutation model"],
        rows: [
          [
            "K8sGPT",
            "Scan cluster → explain issues",
            "CLI (+ optional operator / MCP)",
            "Optional remediation; diagnosis-first",
          ],
          [
            "kubectl-ai",
            "NL → kubectl commands",
            "Local CLI",
            "Often executes generated kubectl",
          ],
          [
            "Kagent",
            "Build/run AI agents on K8s",
            "In-cluster framework + CRDs",
            "Agent workflows you design",
          ],
          [
            "Hosted chat",
            "Managed cluster chat / SRE UI",
            "Vendor SaaS",
            "Varies; credentials often leave laptop",
          ],
          [
            "IDE copilots",
            "Write manifests / runbooks",
            "Editor",
            "Suggest YAML; apply is separate",
          ],
          [
            "kprompt",
            "Intent CLI + gated plan/apply",
            "Local CLI (BYOK)",
            "Same lane as kubectl-ai; stricter defaults",
          ],
        ],
      },
      {
        type: "h2",
        text: "Three jobs — and one crowded lane",
      },
      {
        type: "p",
        text: "Most “AI for Kubernetes” products optimize for one of three jobs. Mixing them up is how you end up with a scanner when you needed a mutate gate — or an agent framework when you needed a five-minute explain.",
      },
      {
        type: "ul",
        items: [
          "Diagnose — what is broken right now, and why (analyzers + LLM narration)",
          "Intent CLI — turn a sentence into cluster actions from the operator laptop",
          "Automate — long-running or multi-step agents that act without a human at the keyboard",
        ],
      },
      {
        type: "p",
        text: "K8sGPT owns diagnose. Kagent owns automate (as a platform). kubectl-ai and kprompt both sit in the intent-CLI lane. Inside that lane, kubectl-ai optimizes for kubectl fluency; kprompt optimizes for a gated ops contract (printable plan, risk, hard denies, CI JSON) and for pulling Helm / explain-style workflows into the same loop. That is a product bet — not a new category.",
      },
      {
        type: "h2",
        text: "K8sGPT: the strongest diagnosis peer",
      },
      {
        type: "p",
        text: "K8sGPT is the CNCF-adjacent tool most teams mean when they say “AI that understands my cluster” (including misspelled searches like Kubegpt). It runs analyzers over live resources, surfaces problems (CrashLoopBackOff, misconfigured Services, and similar), and can enrich findings with an LLM via --explain. Multiple backends are supported — including local models — and sensitive fields can be anonymized before they leave your environment. For a short landing page on the Kubegpt vs K8sGPT name collision, see Kubegpt vs K8sGPT.",
        links: [
          { label: "K8sGPT", href: "https://k8sgpt.ai/" },
          {
            label: "GitHub repository",
            href: "https://github.com/k8sgpt-ai/k8sgpt",
          },
          {
            label: "Kubegpt vs K8sGPT",
            href: "/blog/kubegpt-vs-k8sgpt",
          },
        ],
      },
      {
        type: "h2",
        text: "What is Kubegpt? (people mean K8sGPT)",
      },
      {
        type: "p",
        text: "There is no separate mainstream “Kubegpt” product that replaces K8sGPT in this lane. Treat Kubegpt searches as K8sGPT intent, then decide whether you need analyzer-first diagnosis or an intent CLI with a mutation gate.",
      },
      {
        type: "ul",
        items: [
          "Best when something is already wrong and you need triage in plain English",
          "Analyzer catalog encodes SRE-shaped checks — not just free-form chat",
          "MCP server mode plugs analysis into assistants like Claude Desktop",
          "Optional auto-remediation exists; the core value remains scan + explain",
        ],
      },
      {
        type: "code",
        caption: "Typical K8sGPT loop",
        code: `k8sgpt analyze
k8sgpt analyze --explain
# Optional: remediation paths when you enable them`,
      },
      {
        type: "p",
        text: "Where it differs from kprompt: K8sGPT starts from cluster findings. kprompt starts from operator intent (“scale api to 3”, “why isn't redis ready?”, “install redis”). If your pain is “walk me the unhealthy objects,” reach for K8sGPT first. If your pain is “turn this sentence into a reviewable change,” reach for a plan-before-apply CLI.",
      },
      {
        type: "h2",
        text: "kubectl-ai: same lane, different contract",
      },
      {
        type: "p",
        text: "kubectl-ai (Google Cloud open source) is the peer we take most seriously for day-2 natural language. Same shape: local CLI, describe the operation, get kubectl (and often run it). If your bottleneck is flag order, jsonpath, or custom columns, it is an excellent fit — and putting kprompt on a shortlist next to it is correct, not confused.",
        links: [
          {
            label: "kubectl-ai",
            href: "https://github.com/GoogleCloudPlatform/kubectl-ai",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Best for terminal natives who already think in kubectl verbs",
          "Strong for awkward queries and interactive sessions",
          "Multi-model backends including local options",
          "Less opinionated about plan artifacts, risk labels, and hard-deny policy",
        ],
      },
      {
        type: "p",
        text: "We do not claim a separate category here. The differentiation is the contract we enforce by default: structured PlanResult, risk scoring, hard denies for wipe-class language, interactive approval unless --approve, CI-friendly JSON before automated apply, and first-class plans that can reach Helm or performance explains — not only a generated kubectl line. If those gates do not matter to your team, kubectl-ai may be enough. If they do, evaluate both on the same prompts and keep the one whose mutation path you would trust on a shared cluster.",
      },
      {
        type: "h2",
        text: "Kagent: in-cluster agent framework",
      },
      {
        type: "p",
        text: "Kagent is a Kubernetes-native framework for building and running AI agents as cluster resources — controllers, tools, model configs, and a UI/CLI to manage them. It is not a drop-in “type English, fix CrashLoop” product. It is infrastructure for teams that want agents as first-class workloads next to the apps they operate.",
        links: [
          { label: "Kagent", href: "https://github.com/kagent-dev/kagent" },
          { label: "kagent alternatives", href: "/blog/kagent-alternatives" },
          { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        ],
      },
      {
        type: "p",
        text: "Compared with kprompt: Kagent is a general in-cluster agent platform. kprompt’s optional Observe agent is a single, kprompt-native pipeline (watch → Incident → gated Slack/webhook) with Role-scoped RBAC and no Autopilot mutate in V1. Choose Kagent when you need multi-agent CRDs and shared tool runtimes. Choose kprompt Observe when you want threaded alerts with Incident/AgentAlert DNA — and keep the laptop CLI for plan → approve → apply. Searching for a kagent alternative by job? Use the dedicated hub.",
        links: [
          { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
          { label: "kagent alternatives", href: "/blog/kagent-alternatives" },
        ],
      },
      {
        type: "h2",
        text: "Hosted chat-with-cluster and IDE copilots",
      },
      {
        type: "h3",
        text: "Hosted / SaaS control planes",
      },
      {
        type: "p",
        text: "Vendored “chat with your cluster” products optimize for time-to-demo: connect a cluster, ask questions in a browser, sometimes remediate from the same UI. Pros: managed models, polished SRE narratives, less CLI setup. Cons: credential handling, data residency, another control plane to trust, and mutation policies that are vendor-specific rather than “the plan printed in your terminal.”",
      },
      {
        type: "p",
        text: "kprompt's bet is the opposite shape: no hosted agent required, BYOK providers, plans and approvals on the operator machine. Hosted products can still win for organizations that want a managed AIOps console — evaluate them on audit logs, RBAC mapping, and whether apply can be forced through human review.",
      },
      {
        type: "h3",
        text: "IDE copilots",
      },
      {
        type: "p",
        text: "GitHub Copilot, Cursor, and similar tools accelerate writing Deployment YAML, Helm values, and runbooks. They are not live-cluster operators unless you wire extra MCP or kubectl plugins. Pair them with kubectl, K8sGPT, or kprompt: generate manifests in the editor; diagnose and mutate against real state with a cluster-aware tool.",
      },
      {
        type: "h2",
        text: "K8sGPT alternatives — and when they are the wrong category",
      },
      {
        type: "p",
        text: "Teams searching for “K8sGPT alternatives” often mean one of two things: another analyzer that explains unhealthy objects, or a natural-language CLI that can propose fixes. Those are different jobs. A true K8sGPT peer stays diagnosis-first. An intent CLI like kubectl-ai or kprompt starts from what you want to do, not from a scan catalog.",
      },
      {
        type: "ul",
        items: [
          "Stay with K8sGPT (or similar analyzers) when the bottleneck is finding what is broken",
          "Evaluate kubectl-ai or kprompt when you already know the outcome and need a mutate path",
          "Evaluate Kagent when you need an in-cluster agent platform, not a laptop scan CLI",
          "Do not expect a plan-before-apply CLI to replace analyzer coverage — pair them",
        ],
      },
      {
        type: "h2",
        text: "Best AI tools for Kubernetes troubleshooting",
      },
      {
        type: "p",
        text: "“Best AI tools for Kubernetes troubleshooting” depends on the failure mode. For CrashLoopBackOff and misconfigured Services across a fleet, start with K8sGPT analyze --explain. For a single workload you already named (“why is payment-api crashing?”), an intent CLI explain path is often faster. For always-on namespace watching with gated Slack alerts, use an Observe-style agent — not a chat REPL left open on production.",
        links: [
          { label: "error prompt playbook", href: "/blog/kubernetes-error-prompt-playbook" },
          { label: "Observe agent docs", href: "/docs/agent" },
        ],
      },
      {
        type: "table",
        headers: ["Troubleshooting need", "First tool", "Why"],
        rows: [
          [
            "Fleet scan / unknown unhealthy objects",
            "K8sGPT",
            "Analyzer catalog + explain",
          ],
          [
            "Named workload root-cause",
            "Intent CLI (kubectl-ai or kprompt)",
            "Explain from the resource you already care about",
          ],
          [
            "Awkward kubectl / jsonpath under pressure",
            "kubectl-ai",
            "Fluency specialist in the NL-CLI lane",
          ],
          [
            "Bounded fix with a reviewable plan",
            "kprompt",
            "Plan → safety → approve before apply",
          ],
          [
            "Always-on namespace alerts",
            "kprompt Observe agent",
            "Watch → Incident → gated notify; no silent Autopilot",
          ],
        ],
      },
      {
        type: "h2",
        text: "What is an AI Kubernetes CLI?",
      },
      {
        type: "p",
        text: "An AI Kubernetes CLI turns natural language into cluster operations from your laptop using your kubeconfig. The useful split inside that category is the mutate contract: some tools optimize for generating and running kubectl quickly; others compile intent into a typed plan you review first. kprompt is the second shape — BYOK providers, PlanResult JSON for CI, and hard denies for wipe-class prompts.",
        links: [
          { label: "BYOK providers", href: "/docs/providers" },
          { label: "safety model", href: "/docs/safety" },
          { label: "CI / PlanResult JSON", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "Kagent vs kubectl-ai",
      },
      {
        type: "p",
        text: "Kagent and kubectl-ai are easy to confuse in a “Kubernetes AI” listicle, but they sit in different jobs. kubectl-ai is a local natural-language CLI for operators. Kagent is an in-cluster framework for building and running agents as Kubernetes resources. Choose kubectl-ai (or kprompt) when a human is at the keyboard. Choose Kagent when a platform team owns agent CRDs, tool runtimes, and ServiceAccount blast radius.",
      },
      {
        type: "h2",
        text: "Where kprompt fits — and what we are not claiming",
      },
      {
        type: "p",
        text: "kprompt is an experimental Apache-2.0 CLI in the intent-CLI lane: natural language in, structured plan out, safety checks, then apply only after approval (unless you explicitly pass --approve). Reads (list, explain, logs, describe) run immediately. Mutations always show the plan — with risk labels and hard denies for wipe-class prompts. Integrations extend the same loop toward Helm, Argo Workflows, and Prometheus-backed performance explains.",
        links: [
          { label: "safety checks", href: "/docs/safety" },
          { label: "Integrations", href: "/docs/integrations" },
        ],
      },
      {
        type: "code",
        caption: "Plan-before-apply (mutations)",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "ul",
        items: [
          "Not a K8sGPT replacement — we are not an analyzer-first fleet scanner",
          "Not a Kagent replacement — we ship an optional Observe-only agent (Helm), not a multi-agent framework",
          "Not Autopilot — Observe never applies/patches/deletes; Autopilot needs a future ADR",
          "Not “unique NL kubectl” — kubectl-ai shares that job; we share the lane",
          "Our bet — gated plan/apply on your laptop (BYOK) + optional always-on Observe alerts",
          "Experimental — wrong plans still happen; hard denies are not a production certificate",
        ],
      },
      {
        type: "h2",
        text: "Honest overlap matrix",
      },
      {
        type: "table",
        headers: ["If you need…", "Reach for", "Why"],
        rows: [
          [
            "Fleet health triage / analyzer findings",
            "K8sGPT",
            "Built for scan → explain; mature analyzer set",
          ],
          [
            "Awkward kubectl / jsonpath generation",
            "kubectl-ai (or kprompt)",
            "Same intent-CLI lane; kubectl-ai is the fluency specialist",
          ],
          [
            "In-cluster multi-step AI agents",
            "Kagent",
            "Framework + CRDs for agent platforms",
          ],
          [
            "Always-on namespace alerts (Observe-only)",
            "kprompt Observe agent (Helm)",
            "Watch → Incident → gated Slack/webhook; no Autopilot mutate",
          ],
          [
            "Managed browser chat / AIOps console",
            "Hosted products",
            "Fast demo; evaluate trust and residency",
          ],
          [
            "Manifest / runbook drafting",
            "IDE copilots",
            "Editor-native; apply is still yours",
          ],
          [
            "Day-2 intent with gated plan/apply + CI JSON",
            "kprompt (evaluate vs kubectl-ai)",
            "Same lane; stricter default contract",
          ],
        ],
      },
      {
        type: "h2",
        text: "Can you use more than one?",
      },
      {
        type: "p",
        text: "Yes — and strong teams will. A realistic stack looks like: K8sGPT for scheduled or on-demand cluster scans, one intent CLI (kubectl-ai or kprompt — pick by mutation contract, not by logo), kubectl for exact scripts and CI, K9s or a dashboard for live watching, and GitOps for steady-state desired state. Agents belong when you have a platform team to own their lifecycle — not as the first AI experiment on production.",
      },
      {
        type: "ul",
        items: [
          "Incident open: K8sGPT analyze --explain or an intent-CLI explain",
          "Bounded fix: reviewable plan + approve (or kubectl you typed by hand)",
          "Steady state: Argo CD / Flux + PR review",
          "Watch: K9s, Headlamp, Grafana — not an LLM in a loop",
        ],
      },
      {
        type: "h2",
        text: "Decision checklist",
      },
      {
        type: "ul",
        items: [
          "Is the bottleneck finding issues or expressing intent? → K8sGPT vs intent CLI",
          "Inside the intent-CLI lane, do you need gated plans / CI JSON / hard denies by default? → That is the kprompt vs kubectl-ai axis",
          "Must credentials stay on the laptop? → Prefer local CLI / local models",
          "Do you want a new in-cluster AI runtime? → Only if you can own Kagent-class ops",
          "Is the team still learning kubectl? → AI is an accelerator, not a substitute for RBAC literacy",
        ],
      },
      {
        type: "h2",
        text: "Try the contract, not the category",
      },
      {
        type: "p",
        text: "If your shortlist already includes K8sGPT and kubectl-ai, keep both jobs clear: use K8sGPT when you need analyzer findings; use an intent CLI when you already know the outcome. Then run the same mutate prompts through kubectl-ai and kprompt and compare only what matters — what prints before apply, what gets denied, and what you can gate in CI. For a job-first primer (what “Kubernetes AI” even means), start with What is Kubernetes AI?",
        links: [
          {
            label: "What is Kubernetes AI?",
            href: "/blog/what-is-kubernetes-ai",
          },
        ],
      },
      {
        type: "code",
        caption: "Install kprompt and start with reads",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "list deployments" -n staging
kprompt "explain why api is not ready" -n staging
kprompt "scale api to 2" -n staging   # review plan → y or n`,
      },
      {
        type: "p",
        text: "Read the safety guide before approving mutations on shared clusters. For a dedicated head-to-head, see kprompt vs kubectl-ai. Searching kubectl-ai alternatives specifically? Use that landing. For Pod-level AI triage without silent apply, see AI for Kubernetes Pods. For how kprompt sits next to kubectl and K9s (non-AI peers), see our kubectl alternatives post. For model and BYOK choices, see Providers. For optional always-on alerts, see the Observe agent docs.",
        links: [
          { label: "safety guide", href: "/docs/safety" },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          {
            label: "kubectl-ai alternatives",
            href: "/blog/kubectl-ai-alternatives",
          },
          {
            label: "AI for Kubernetes Pods",
            href: "/blog/ai-kubernetes-pod-diagnose",
          },
          {
            label: "kubectl alternatives post",
            href: "/blog/kubectl-alternatives",
          },
          { label: "Providers", href: "/docs/providers" },
          { label: "Observe agent docs", href: "/docs/agent" },
          {
            label: "LLM providers guide",
            href: "/blog/kubernetes-llm-providers-byok",
          },
        ],
      },
    ],
  };

export default post;
