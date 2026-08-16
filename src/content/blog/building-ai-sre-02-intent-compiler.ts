import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-02-intent-compiler",
    title: "Building AI SRE in Public #2: Intent Compiler",
    description:
      "Kubernetes deserves a compiler, not a chatbot. How kprompt turns natural language into Intent → Actions → PlanResult, why Go owns planning and safety, and why the IR must stay reviewable for AI SRE.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "platform engineering",
      "devops",
      "architecture",
    ],
    keywords: [
      "kubernetes intent compiler",
      "building ai sre intent compiler",
      "planresult intermediate representation",
      "natural language kubernetes compiler",
      "typed intent llm kubernetes",
      "ai sre architecture",
      "fail closed kubernetes ai",
      "llm structured output kubernetes",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 2 of Building AI SRE in Public. Episode 1 argued for the category. This episode is the technical heart of the wedge: an intent compiler — not a chat REPL that happens to call kubectl.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 1: Why AI SRE",
            href: "/blog/building-ai-sre-01-why",
          },
          {
            label: "Short-form positioning",
            href: "/blog/intent-compiler-not-chat",
          },
        ],
      },
      {
        type: "h2",
        text: "Compilers emit artifacts; chatbots emit turns",
      },
      {
        type: "p",
        text: "A chatbot optimizes for conversation continuity. A compiler optimizes for an intermediate representation (IR) you can refuse. In kprompt the IR is not “whatever the model said last.” It is a pipeline of typed stages ending in PlanResult — something a human, a jq filter, or a CI job can gate before the apiserver sees a mutate.",
      },
      {
        type: "code",
        caption: "Conceptual pipeline (shipped shape)",
        code: `prompt
  → Intent     (structured: kind, target, params)
  → Actions[]  (ordered ops + optional manifests/diffs)
  → Safety     (risk + hard denies)
  → PlanResult (printable + JSON)
  → Approve?   → Executor → cluster`,
      },
      {
        type: "p",
        text: "Reads can short-circuit (list, get, logs, explain) without a mutate approval. Mutations always materialize the plan first. That split is deliberate: investigation should be fast; change should be conscious.",
      },
      {
        type: "h2",
        text: "What the LLM is allowed to own",
      },
      {
        type: "p",
        text: "The model is good at messy language → structured intent. It is a bad place to put irrevocable policy. So the boundary is sharp:",
      },
      {
        type: "table",
        headers: ["Layer", "Owner", "Job"],
        rows: [
          [
            "Prompt → Intent",
            "LLM + schema validation",
            "Parse what the operator meant",
          ],
          [
            "Intent → Actions",
            "Go planner / routers",
            "Turn intent into concrete cluster or tool steps",
          ],
          [
            "Safety",
            "Go policy",
            "Risk score, hard deny, force approval",
          ],
          [
            "Approval",
            "Human or CI",
            "y/N, --approve, or jq gate on JSON",
          ],
          [
            "Execute",
            "Go + kubeconfig / tool CLIs",
            "Apply only what was approved",
          ],
        ],
      },
      {
        type: "p",
        text: "If the model hallucinates a wipe, the safety layer should still deny. If the model proposes a scale, the plan should still show namespace, resource, and risk before apply. Trust the typed stages; distrust free prose as a control plane.",
        links: [
          { label: "Safety docs", href: "/docs/safety" },
          {
            label: "Plan → approve",
            href: "/blog/kubernetes-safety-plan-approve",
          },
        ],
      },
      {
        type: "h2",
        text: "IR sketch: Intent, Action, PlanResult",
      },
      {
        type: "p",
        text: "Exact Go structs evolve in the product repo. The conceptual types stay stable enough to teach:",
      },
      {
        type: "code",
        caption: "IR shapes (conceptual)",
        code: `Intent
  Kind, Target, Params, Confidence

Action
  Op, Object (GVK/name/ns), Manifest?, Diff?

PlanResult
  Intent, Actions[], Risk, Summary,
  RequiresApproval, Denied?, Applied?`,
      },
      {
        type: "p",
        text: "PlanResult is the public artifact: terminal summary for humans, JSON for pipelines. Secrets and raw kubeconfig never belong in history or CI logs. Episode 3 will go deeper on the schema; today the point is that AI SRE features (investigate, why, blast radius) must eventually land as richer fields on the same artifact — not as a second chat product.",
        links: [
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
          { label: "CI / PlanResult docs", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "One compiler, many backends",
      },
      {
        type: "p",
        text: "A compiler that only scales Deployments is a toy. The payoff is one approval contract across day-2 surfaces: Kubernetes API, Helm, Prometheus explains, OTel walks, Tekton/KEDA plans, GitOps sync prompts, Crossplane claims (high risk). The LLM proposes; routers and planners emit Actions against tools you already run. Multi-tool chains still collapse to one aggregate plan and one approve for mutating steps.",
        links: [{ label: "Integrations", href: "/docs/integrations" }],
      },
      {
        type: "code",
        caption: "Different backends, same gate",
        code: `kprompt "scale api to 3" -n staging
kprompt "install redis" -n cache
kprompt "why is my api slow?" -n production
kprompt "optimize my cluster"
# Mutating follow-ups still require approval`,
      },
      {
        type: "h2",
        text: "Fail closed by default",
      },
      {
        type: "ul",
        items: [
          "Unknown or wipe-class intents → deny before a useful apply path",
          "High-risk mutations → approval required even with automation flags later",
          "Missing kubeauth / LLM key → clear doctor-style errors, not silent guess",
          "Multi-context: no “one --approve mutates the fleet”",
        ],
      },
      {
        type: "p",
        text: "Fail closed is how a compiler earns the right to grow into AI SRE. Auto-remediation without an IR you can refuse is how AIOps burned trust.",
      },
      {
        type: "h2",
        text: "What this episode ships vs explores",
      },
      {
        type: "ul",
        items: [
          "Shipped: Intent → plan → safety → approve → apply; JSON PlanResult; investigate / why / timeline on the same IR; blast-radius; multi-tool routes",
          "Building: deeper continuous multi-agent reasoning; richer Prom/OTel-backed trees when backends exist",
          "Exploring: knowledge/ADR context feeding the compiler — still not unsupervised mutate",
        ],
      },
      {
        type: "h2",
        text: "How to pressure-test the compiler",
      },
      {
        type: "code",
        caption: "Thirty-minute drill",
        code: `brew install kprompt/tap/kprompt
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging          # expect deny / hard stop
kprompt "scale api to 0" -n staging -o json | jq .risk
kprompt "scale api to 2" -n staging           # read plan → n or y`,
      },
      {
        type: "p",
        text: "Score the artifact, not the banter. If a competing tool cannot show a refuse-able plan, it is a different product — even if both accept English.",
        links: [
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
        ],
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 3 is PlanResult — the IR as a CI citizen: why one typed document serves humans and pipelines, how blastRadius and verify attach, and what never belongs in the artifact. Read it next.",
        links: [
          {
            label: "Episode 3: PlanResult",
            href: "/blog/building-ai-sre-03-planresult",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "PlanResult JSON deep dive (companion)",
            href: "/blog/planresult-json-deep-dive",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
