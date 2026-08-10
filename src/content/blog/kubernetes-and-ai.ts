import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-and-ai",
    title: "Kubernetes meets AI: what works, what breaks, and what's next",
    description:
      "Large language models change how operators talk to clusters — but they don't replace kube-apiserver truth. A practical map of AI + Kubernetes: use cases, failure modes, and why plan-before-apply matters.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: ["kubernetes", "ai", "llm", "platform engineering", "devops"],
    blocks: [
      {
        type: "p",
        text: "Every platform team has felt the same tension: Kubernetes is the right abstraction for running software at scale, but day-2 work still feels like archaeology. Which Deployment owns this Service? Why is the HPA not scaling? Did someone apply a bad ConfigMap in staging or production? You reach for kubectl, the metrics stack, ticket history, and sometimes a colleague who remembers the incident from last quarter.",
      },
      {
        type: "p",
        text: "Large language models (LLMs) promise a different input layer: describe intent in English, get back commands, manifests, or explanations. That promise is real for certain tasks — and dangerously oversold for others. This post is our field guide to AI on Kubernetes: where models help operators, where they hallucinate cluster state, and how to design tools (like kprompt) that use AI without handing it the keys.",
      },
      {
        type: "h2",
        text: "Why Kubernetes and AI show up together",
      },
      {
        type: "p",
        text: "Kubernetes is declarative, API-driven, and verbose. The control plane exposes rich objects — Pods, Deployments, ReplicaSets, Events, CRDs — connected by labels, owners references, and controllers. Humans think in stories (“payment-api is slow”); the cluster stores graphs of objects and status conditions. LLMs are good at translating between those worlds when you give them structure and guardrails.",
      },
      {
        type: "ul",
        items: [
          "Natural language maps well to operator intent: scale, roll back, explain, compare",
          "Kubernetes APIs and kubectl output are text — easy to feed into models as context",
          "Incident response is often sequential reasoning: Pod → Event → Log → node — similar to chain-of-thought",
          "Platform teams already use AI for docs, runbooks, and internal chat — the cluster is the next surface",
        ],
      },
      {
        type: "h2",
        text: "What AI is genuinely good at in K8s",
      },
      {
        type: "h3",
        text: "Intent parsing and command synthesis",
      },
      {
        type: "p",
        text: "Models excel at turning messy sentences into structured actions: extracting namespace hints (“in staging”), resource names, replica counts, and verb choice (get vs scale vs rollback). That reduces friction for engineers who know what they want but don't want to reconstruct exact kubectl flag order at 2 a.m.",
      },
      {
        type: "code",
        caption: "Intent → plan (simplified)",
        code: `Prompt:  "scale payment-api to 3 in prod"
Plan:    kubectl scale deployment/payment-api --replicas=3 -n prod

Prompt:  "show me crashlooping pods in kube-system"
Plan:    kubectl get pods -n kube-system --field-selector=status.phase=Failed`,
      },
      {
        type: "h3",
        text: "Explanation and investigation chains",
      },
      {
        type: "p",
        text: "When something is wrong, operators walk a chain: Deployment status → ReplicaSet → Pod → Events → Logs. LLMs can orchestrate that narrative if the tool gathers real API data first — summarizing CrashLoopBackOff, image pull errors, or probe failures instead of guessing from training data.",
      },
      {
        type: "code",
        caption: "Explain-style prompts",
        code: `kprompt "why isn't redis ready?"
kprompt "explain why payment-api pods are restarting"
kprompt "describe the redis deployment"`,
      },
      {
        type: "h3",
        text: "Runbook acceleration — not runbook replacement",
      },
      {
        type: "p",
        text: "AI can draft the steps for “rollback canary” or “drain a bad node” faster than searching Confluence. The value is speed to a draft plan you still review. Mature teams treat model output like a junior SRE's suggestion: useful, never auto-executed on production without a human checkpoint.",
      },
      {
        type: "h2",
        text: "Where AI breaks on Kubernetes",
      },
      {
        type: "p",
        text: "Models don't live inside your cluster. Unless a tool fetches live state, an LLM will confabulate resource names, namespaces, and current replica counts. Even with retrieval, context windows limit how much of a large fleet you can inject. These failure modes are predictable — and they're why “chat with your cluster” products need engineering discipline, not just a slick UI.",
      },
      {
        type: "ul",
        items: [
          "Hallucinated resources — deploying redis when you meant redash",
          "Stale context — summarizing yesterday's Pod list after a rollout finished",
          "Wrong blast radius — delete commands without namespace scoping",
          "Policy blind spots — models don't know your org's change windows or PCI rules",
          "Non-determinism — the same prompt can yield different plans across providers or temperature settings",
        ],
      },
      {
        type: "h3",
        text: "Authorization is not a language problem",
      },
      {
        type: "p",
        text: "RBAC, admission webhooks, and human change management exist because production clusters need accountability. An LLM has no inherent model of who you are, what you're allowed to break, or whether this Tuesday is freeze week. Any AI layer must separate suggestion from execution — the same way CI separates build from deploy.",
      },
      {
        type: "h2",
        text: "Three architectures for AI on clusters",
      },
      {
        type: "h3",
        text: "1. In-cluster agents",
      },
      {
        type: "p",
        text: "An agent runs inside the cluster with ServiceAccount credentials, watches APIs, and answers questions. Pros: low latency to apiserver, can hold cluster-specific memory. Cons: another component to secure, upgrade, and audit; operators must trust what's running in prod; credential scope is sensitive.",
      },
      {
        type: "h3",
        text: "2. SaaS control planes",
      },
      {
        type: "p",
        text: "Send prompts and often kubeconfig or tokens to a hosted service. Pros: fast to try, managed models. Cons: data residency, credential handling, vendor lock-in, and a bigger blast radius if the service is compromised or misconfigured.",
      },
      {
        type: "h3",
        text: "3. Local CLI with BYOK (kprompt's bet)",
      },
      {
        type: "p",
        text: "Run on the operator's machine: your kubeconfig, your LLM API keys, plans printed locally before apply. The model sees what the tool gathers from kubectl/kubernetes clients — not a black-box remote agent. Mutations go through plan → safety → approve → apply. Reads can run immediately. Nothing requires installing an AI pod next to your workloads.",
      },
      {
        type: "ul",
        items: [
          "Credentials stay where they already are (kubeconfig + env vars)",
          "Every mutation is reviewable — diffs when available, risk scoring, hard denies",
          "Provider-agnostic — Gemini, OpenAI, Anthropic, Groq, Ollama locally, etc.",
          "CI can consume JSON PlanResult without auto-applying to prod",
        ],
      },
      {
        type: "h2",
        text: "A sane loop: Prompt → Plan → Safety → Apply",
      },
      {
        type: "p",
        text: "Whether you build in-house or use kprompt, the loop we recommend is boring on purpose. AI proposes; your toolchain and humans dispose. Safety rules run on structured plans, not on raw chat text. That lets you add AI speed without giving up the muscle memory of reading a plan before it hits the apiserver.",
      },
      {
        type: "code",
        caption: "Mutation with approval",
        code: `$ kprompt "rollback payment-api" -n production

Plan
  1. kubectl rollout undo deployment/payment-api -n production

Risk: medium — production namespace, deployment rollback
Apply? [y/N] n
Aborted.`,
      },
      {
        type: "p",
        text: "Hard denies catch patterns you never want silently applied — wide deletes, namespace wipes, and similar. Risk labels surface blast radius. On a TTY you confirm; in CI you emit JSON and gate with jq or policy engines — but the default is not silent apply.",
      },
      {
        type: "h2",
        text: "What shipped in v0.3 — and what comes next",
      },
      {
        type: "p",
        text: "v0.3 moves beyond core workload operations with deep Kubernetes investigation, Helm orchestration, Argo Workflows, Prometheus diagnosis, and Jaeger/Tempo query adapters. The frontier still expands through real APIs and reviewable plans.",
      },
      {
        type: "ul",
        items: [
          "Helm — chart install/upgrade is now a first-class plan with preview, not YAML pasted from chat",
          "HorizontalPodAutoscaler + metrics — Prometheus-backed performance explains now ground CPU, memory, latency, and replica findings",
          "Argo Workflows — generate, submit, inspect, and wait for batch or ML workflows",
          "Argo CD / Flux — sync status, drift, promote/rollback as GitOps-aware prompts",
          "CustomResourceDefinitions — Tekton, KEDA, Istio: models must call real CRD APIs, not invent fields",
          "OpenTelemetry traces — Jaeger/Tempo adapters ship; natural-language slow-span diagnosis comes next",
        ],
      },
      {
        type: "p",
        text: "Each integration increases context quality — and increases the cost of wrong automation. That's why we're shipping breadth with approval gates, not autopilot.",
      },
      {
        type: "h2",
        text: "Choosing models for cluster work",
      },
      {
        type: "p",
        text: "Not every provider behaves the same on structured operational tasks. Fast models (Gemini Flash, Groq, small OpenAI tiers) are often enough for get/list and simple plans. Larger models help on multi-step explains and ambiguous prompts — at higher latency and cost. Local Ollama matters for air-gapped or privacy-sensitive environments; you trade model quality for data never leaving your network except to your apiserver.",
      },
      {
        type: "ul",
        items: [
          "Use fast models for read-heavy sessions and iteration",
          "Use stronger models when explains chain multiple resources",
          "Keep temperature low for plan generation — you want consistency, not creativity",
          "Log prompts locally (kprompt history) for replay and debugging — never log secrets",
        ],
      },
      {
        type: "h2",
        text: "What we tell every team evaluating AI + Kubernetes",
      },
      {
        type: "ul",
        items: [
          "Start on non-production — kind, minikube, or a sandbox namespace",
          "Never skip the plan — especially for delete, scale-to-zero, and cross-namespace ops",
          "Treat the LLM as a planner, not an authorizer",
          "Wire JSON plan output into CI before you wire auto-apply",
          "Measure wrong plans and near-misses — they're training data for better prompts and safety rules",
        ],
      },
      {
        type: "h2",
        text: "Try the loop on your cluster",
      },
      {
        type: "p",
        text: "If this map matches how you think about AI on Kubernetes — pragmatic, approval-first, API-grounded — kprompt is built for that workflow. Install, point at a sandbox context, and run read prompts before you approve any mutation.",
      },
      {
        type: "code",
        caption: "Quick start",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."
kprompt "list deployments"
kprompt "explain why api pods are not ready" -n staging
kprompt "scale api to 2" -n staging   # review plan before y`,
      },
      {
        type: "p",
        text: "We'll keep writing here about Helm depth, provider tuning, and safety patterns as we ship them. If you're experimenting with AI on your fleet, open an issue or PR — real operator feedback beats roadmap fiction.",
      },
    ],
  };

export default post;
