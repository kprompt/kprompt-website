import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "planresult-json-deep-dive",
    title:
      "PlanResult JSON deep dive: fields, risk, jq recipes, and what is never stored",
    description:
      "Schema-focused companion to CI plan gates: apiVersion, plan.actions, risk.denied, result payloads, RouteResult / MultiContextResult, history vs CI artifacts, and hard rules on manifests and API keys.",
    publishedAt: "2026-07-23",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ci/cd",
      "devops",
      "platform engineering",
      "automation",
      "ai",
    ],
    keywords: [
      "planresult json",
      "kprompt planresult",
      "kubernetes plan json ci",
      "jq kubernetes plan gate",
      "risk.denied kprompt",
      "plan before apply json",
      "kubernetes ai cli json output",
      "ci approval gate kubectl",
      "kprompt --output json",
      "intent compiler planresult",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "The intent compiler bet only works if the artifact is boring and stable. PlanResult is that artifact: one JSON document on stdout when you pass --output json, human UI on stderr, no manifests, no API keys. This post is the field guide to the schema — companion to the pipeline patterns in Kubernetes in CI/CD: gating cluster changes with plan JSON before apply and the CI / JSON docs.",
        links: [
          {
            label: "Kubernetes in CI/CD: gating cluster changes with plan JSON before apply",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          { label: "CI / JSON docs", href: "/docs/ci" },
          {
            label: "intent compiler",
            href: "/blog/intent-compiler-not-chat",
          },
        ],
      },
      {
        type: "h2",
        text: "Emit it",
      },
      {
        type: "code",
        caption: "stdout = PlanResult; stderr = human noise",
        code: `kprompt "scale api to 10" -n prod --output json
kprompt "scale api to 10" -n prod -o json > plan.json`,
      },
      {
        type: "h2",
        text: "Envelope fields",
      },
      {
        type: "table",
        headers: ["Field", "Type", "Notes"],
        rows: [
          ["apiVersion", "string", "Always kprompt.io/v1"],
          ["kind", "string", "PlanResult (or RouteResult / MultiContextResult — see below)"],
          ["schemaVersion", "string", '"1" — bump only on breaking changes'],
          ["prompt", "string", "Original natural-language prompt"],
          ["cluster_context", "string?", "Resolved kubeconfig context when known"],
          ["plan", "object", "Intent, summary, actions, requiresApproval"],
          ["risk", "object", "level, denied, message"],
          ["applied", "bool", "Whether a mutation actually ran"],
          ["result", "object?", "Read/tool payload (get, explain, optimize, …)"],
        ],
      },
      {
        type: "code",
        caption: "Minimal mutate plan (illustrative)",
        code: `{
  "apiVersion": "kprompt.io/v1",
  "kind": "PlanResult",
  "schemaVersion": "1",
  "prompt": "scale api to 10",
  "cluster_context": "kind-staging",
  "plan": {
    "intent": "scale",
    "summary": "Scale Deployment/api to 10 replicas",
    "requiresApproval": true,
    "namespace": "prod",
    "actions": [
      {
        "op": "scale",
        "backend": "kubernetes",
        "kind": "Deployment",
        "name": "api",
        "namespace": "prod",
        "replicas": 10
      }
    ]
  },
  "risk": { "level": "medium", "denied": false, "message": "Mutation requires approval" },
  "applied": false
}`,
      },
      {
        type: "h2",
        text: "plan.actions — what CI should inspect",
      },
      {
        type: "ul",
        items: [
          "op — scale, deploy, delete, patch, rollback, …",
          "backend — kubernetes, helm, …",
          "kind / name / namespace — target object",
          "cluster_context — set on multi-context paths",
          "replicas / revision — when relevant",
          "diff — optional live before→after text (still not a full manifest dump)",
        ],
      },
      {
        type: "p",
        text: "Actions are intentionally thin. Policy engines gate on op + kind + namespace, not on guessing YAML from an LLM.",
      },
      {
        type: "h2",
        text: "risk — the gate that matters",
      },
      {
        type: "table",
        headers: ["Field", "Meaning"],
        rows: [
          ["level", "low | medium | high | denied"],
          ["denied", "true when hard-deny fired (wipe-class, etc.)"],
          ["message", "Human reason — log it; do not parse prose for policy"],
        ],
      },
      {
        type: "code",
        caption: "jq recipes",
        code: `# Hard deny must fail the job
jq -e '.risk.denied == false'

# Block deletes
jq -e '[.plan.actions[].op] | index("delete") | not'

# Allow only scale
jq -e '.plan.intent == "scale"'

# Reject high risk
jq -e '.risk.level != "high" and .risk.level != "denied"'

# Namespace allow-list
jq -e '.plan.namespace == "staging"'`,
      },
      {
        type: "h2",
        text: "result — read and report payloads",
      },
      {
        type: "p",
        text: "For get/list/explain/logs/optimize/graph and similar reads, result holds a structured payload (shape depends on intent). Mutating plans that only print a plan leave result empty or omitted. Optimize attaches idle / rightsizing / findings under result — see optimize my cluster.",
        links: [
          {
            label: "optimize my cluster",
            href: "/blog/optimize-my-cluster",
          },
        ],
      },
      {
        type: "h2",
        text: "Related kinds: RouteResult and MultiContextResult",
      },
      {
        type: "ul",
        items: [
          "RouteResult — multi-tool chain: steps[] of PlanResult, aggregate risk, stoppedAt / stopReason",
          "MultiContextResult — read fan-out across contexts: contexts[], steps[], optional fleetSummary for optimize",
        ],
      },
      {
        type: "p",
        text: "Gate RouteResult by inspecting .risk and each .steps[].risk.denied. Never treat a parent --approve as consent for every step without reading the aggregate plan.",
      },
      {
        type: "h2",
        text: "History vs CI artifacts",
      },
      {
        type: "table",
        headers: ["Store", "What", "What not"],
        rows: [
          [
            "~/.kprompt/history.jsonl",
            "Local prompt + plan summary for rerun",
            "Full manifests, API keys, kubeconfig",
          ],
          [
            "CI plan.json artifact",
            "Full PlanResult for audit / PR comment",
            "Secrets — they were never in the document",
          ],
          [
            "Team audit (when enrolled)",
            "Summaries pushed by policy",
            "Cluster credentials in the control plane",
          ],
        ],
      },
      {
        type: "h2",
        text: "What is never stored",
      },
      {
        type: "ul",
        items: [
          "LLM API keys",
          "Full Kubernetes manifests / Secret data",
          "kubeconfig files or tokens",
          "Raw provider request dumps in PlanResult",
        ],
      },
      {
        type: "h2",
        text: "Anti-patterns",
      },
      {
        type: "ul",
        items: [
          "One CI step: -o json --approve on production",
          "Parsing risk.message with regex instead of risk.denied / level",
          "Assuming schemaVersion will stay \"1\" forever without checking",
          "Committing plan.json that you manually edited to bypass gates",
        ],
      },
      {
        type: "h2",
        text: "Wire it",
      },
      {
        type: "code",
        caption: "Plan → gate → separate approve",
        code: `#!/usr/bin/env bash
set -euo pipefail
json="$(kprompt "scale api to 3" -n staging -o json)"
echo "$json" | jq -e '.risk.denied == false' >/dev/null
echo "$json" | jq -e '.plan.intent == "scale"' >/dev/null
echo "$json" > plan.json
# Human or second job:
# kprompt "scale api to 3" -n staging --approve --wait`,
      },
      {
        type: "p",
        text: "Full GitHub Actions patterns live in the CI gates post. For why this artifact beats a chat transcript, see the intent compiler note. Schema reference stays mirrored on CI / JSON docs.",
        links: [
          {
            label: "CI gates post",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          {
            label: "intent compiler note",
            href: "/blog/intent-compiler-not-chat",
          },
          { label: "CI / JSON docs", href: "/docs/ci" },
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
        ],
      },
    ],
  };

export default post;
