import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-ci-cd-plan-gates",
    title:
      "Kubernetes in CI/CD: gating cluster changes with plan JSON before apply",
    description:
      "How to use kprompt PlanResult JSON in CI/CD pipelines to review Kubernetes scale, deploy, and rollback plans before apply — with jq gates, GitHub Actions patterns, and production safety rules.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ci/cd",
      "devops",
      "platform engineering",
      "automation",
    ],
    keywords: [
      "kubernetes ci cd",
      "kubernetes pipeline",
      "gitops ci",
      "kubernetes deployment automation",
      "kubectl ci cd",
      "kubernetes change management",
      "platform engineering ci",
      "kubernetes approval gate",
      "devops automation kubernetes",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "CI/CD pipelines love deterministic steps: build, test, scan, deploy. Kubernetes breaks the fantasy the moment someone runs kubectl apply -f or helm upgrade from a GitHub Action without a human reading the diff. The pipeline goes green; the cluster goes red. Platform teams respond with policy engines, admission webhooks, and mandatory reviews — all necessary, all heavy.",
      },
      {
        type: "p",
        text: "kprompt adds a lighter pattern for natural-language or ticket-driven changes: emit a structured PlanResult as JSON, gate it in CI with jq or policy checks, then apply in a separate step only if the plan passes. This post shows how to wire that loop for Kubernetes scale, deploy, and rollback — without treating the LLM as an autorun root user.",
      },
      {
        type: "h2",
        text: "Why plan-before-apply belongs in CI",
      },
      {
        type: "p",
        text: "Continuous delivery to Kubernetes should separate intent from execution. Intent might come from a PR label, a Slack slash command translated to a prompt, or an operator-maintained runbook string. Execution should be kubectl-compatible commands you can diff, log, and reject.",
      },
      {
        type: "ul",
        items: [
          "Plans are inspectable — actions, namespace, risk level, denied flag",
          "JSON is machine-readable — jq, OPA, or custom gates without parsing shell text",
          "Apply is optional and distinct — same prompt, second invocation with --approve",
          "Secrets stay out of stdout — manifests and API keys are never in PlanResult",
          "Human UI goes to stderr in JSON mode — logs stay clean for artifacts",
        ],
      },
      {
        type: "h2",
        text: "PlanResult JSON in one minute",
      },
      {
        type: "p",
        text: "Run kprompt with --output json or -o json. stdout is a single PlanResult document (apiVersion kprompt.io/v1, kind PlanResult). Key fields for pipelines:",
      },
      {
        type: "ul",
        items: [
          "plan.intent — scale, deploy, rollback, get, explain, …",
          "plan.actions — ordered ops (no raw YAML blobs)",
          "risk.level — low / medium / high / denied",
          "risk.denied — hard deny; pipeline should fail fast",
          "applied — whether a mutation actually ran (false on plan-only runs)",
        ],
      },
      {
        type: "code",
        caption: "Emit a plan",
        code: `kprompt "scale api to 10" -n prod -o json > plan.json
cat plan.json | jq '.plan.actions, .risk'`,
      },
      {
        type: "h2",
        text: "Two-stage pipeline: gate, then apply",
      },
      {
        type: "p",
        text: "The safest default is two jobs or steps: (1) generate and validate JSON; (2) apply only on main branch or after manual approval, reusing the same prompt with --approve --wait. Never combine loose jq gates with --approve on production in the same unreviewed script.",
      },
      {
        type: "code",
        caption: "Bash gate script",
        code: `#!/usr/bin/env bash
set -euo pipefail

PROMPT='scale api to 10'
NS=prod

json="$(kprompt "$PROMPT" -n "$NS" -o json)"

# Hard deny — stop immediately
echo "$json" | jq -e '.risk.denied == false' >/dev/null

# Intent must match expectation
echo "$json" | jq -e '.plan.intent == "scale"' >/dev/null

# Reject high-risk in automated staging gates
echo "$json" | jq -e '.risk.level != "high"' >/dev/null

# Reject delete ops in this pipeline
echo "$json" | jq -e '[.plan.actions[].op] | index("delete") | not' >/dev/null

echo "$json" > "plan-$(date +%s).json"
echo "Plan passed gates."`,
      },
      {
        type: "code",
        caption: "Apply step (after gate + human approval)",
        code: `# Same prompt — explicit approve + wait for rollout
kprompt "scale api to 10" -n prod --approve --wait --timeout 10m`,
      },
      {
        type: "h2",
        text: "GitHub Actions pattern",
      },
      {
        type: "p",
        text: "Store kubeconfig and LLM keys in GitHub Secrets. Use environment protection rules so the apply job requires reviewer approval. Plan job runs on every PR; apply job only on workflow_dispatch or merge to main.",
      },
      {
        type: "code",
        caption: "Sketch workflow",
        code: `# .github/workflows/kprompt-plan.yml
jobs:
  plan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install kprompt
        run: curl -fsSL https://kprompt.ai/install | bash
      - name: Plan scale
        env:
          KPROMPT_GEMINI_API_KEY: \${{ secrets.KPROMPT_GEMINI_API_KEY }}
          KUBECONFIG: \${{ secrets.KUBECONFIG_STAGING }}
        run: |
          json=$(kprompt "scale api to 3" -n staging -o json)
          echo "$json" | jq -e '.risk.denied == false'
          echo "$json" | jq -e '.plan.intent == "scale"'
          echo "$json" > plan.json
      - uses: actions/upload-artifact@v4
        with:
          name: kprompt-plan
          path: plan.json

  apply:
    needs: plan
    if: github.ref == 'refs/heads/main'
    environment: staging-k8s   # required reviewers
    runs-on: ubuntu-latest
    steps:
      - name: Apply (approved)
        env:
          KPROMPT_GEMINI_API_KEY: \${{ secrets.KPROMPT_GEMINI_API_KEY }}
          KUBECONFIG: \${{ secrets.KUBECONFIG_STAGING }}
        run: |
          kprompt "scale api to 3" -n staging --approve --wait`,
      },
      {
        type: "h2",
        text: "Common jq gates for Kubernetes pipelines",
      },
      {
        type: "ul",
        items: [
          ".risk.denied == false — mandatory baseline",
          ".plan.intent == \"scale\" — ticket says scale, plan must say scale",
          ".risk.level != \"high\" — block auto-path for high blast radius",
          "No delete op in plan.actions — read-only or scale-only pipelines",
          "Namespace label in metadata — reject cross-namespace surprises (when exposed in schema)",
        ],
      },
      {
        type: "code",
        caption: "Extra jq examples",
        code: `# Fail if plan includes rollback (use dedicated workflow instead)
echo "$json" | jq -e '.plan.intent != "rollback"'

# Pretty-print for human review in CI logs
echo "$json" | jq '{ intent: .plan.intent, risk: .risk, actions: .plan.actions }'`,
      },
      {
        type: "h2",
        text: "Where this fits in GitOps",
      },
      {
        type: "p",
        text: "GitOps (Argo CD, Flux) keeps desired state in Git — CI builds images and updates manifests. kprompt is not a replacement for GitOps; it's complementary for operational prompts that don't belong in a repo: scale for a drill, rollback during an incident, explain why staging is red before you merge. Use PlanResult JSON to gate those operational paths the same way you gate manifest diffs.",
      },
      {
        type: "ul",
        items: [
          "GitOps — declarative desired state, PR review on YAML",
          "kprompt CI — imperative day-2 ops with structured plan artifacts",
          "Together — Git for steady state, gated prompts for break-glass and capacity",
        ],
      },
      {
        type: "h2",
        text: "Anti-patterns to avoid",
      },
      {
        type: "ul",
        items: [
          "Single step with -o json --approve on production — skips human review entirely",
          "Loose jq (only checking .applied) — doesn't validate intent or risk",
          "Shared kubeconfig with cluster-admin in CI — scope ServiceAccounts per pipeline",
          "Storing LLM or kube secrets in plan artifacts — PlanResult excludes them; keep artifacts clean",
          "Assuming experimental CLI is production-hardened — start on staging, tune gates over time",
        ],
      },
      {
        type: "h2",
        text: "Read-only checks in CI (no apply)",
      },
      {
        type: "p",
        text: "Not every pipeline step mutates. Use get, list, and explain in JSON mode for smoke tests after deploy — verify workloads exist, pods ready, no denied risk because reads don't mutate.",
      },
      {
        type: "code",
        caption: "Post-deploy smoke",
        code: `json=$(kprompt "list deployments" -n staging -o json)
echo "$json" | jq -e '.plan.intent == "get" or .plan.intent == "list"'
echo "$json" | jq '.result'`,
      },
      {
        type: "h2",
        text: "History and audit",
      },
      {
        type: "p",
        text: "Locally, kprompt history stores recent prompts and plan summaries in ~/.kprompt/history.jsonl — useful for correlating CI prompts with incident timelines. In CI, upload plan.json artifacts and retain them with your build logs. schemaVersion in PlanResult is stable at 1; bump-aware parsers keep pipelines working across CLI upgrades.",
      },
      {
        type: "h2",
        text: "Try it on staging first",
      },
      {
        type: "p",
        text: "Install kprompt in a branch pipeline, emit JSON for a harmless list or describe prompt, then progress to scale on staging with two-stage gate + environment approval. Full schema and jq helpers: kprompt.ai/docs/ci. Field-level walkthrough: PlanResult JSON deep dive.",
        links: [
          { label: "kprompt.ai/docs/ci", href: "/docs/ci" },
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
        ],
      },
      {
        type: "code",
        caption: "Quick start",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."
kprompt "scale api to 2" -n staging -o json | jq .
kprompt "scale api to 2" -n staging --approve --wait`,
      },
    ],
  };

export default post;
