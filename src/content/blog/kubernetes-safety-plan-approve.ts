import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-safety-plan-approve",
    title:
      "Kubernetes safety with AI: plan, approve, hard denies, and production discipline",
    description:
      "Why natural-language Kubernetes tools need plan-before-apply, risk scoring, and hard denies — with real kprompt examples for scale, rollback, and blocked wipe prompts.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "safety",
      "devops",
      "sre",
      "platform engineering",
    ],
    keywords: [
      "kubernetes safety",
      "kubernetes production best practices",
      "kubernetes change management",
      "ai kubernetes safety",
      "kubectl production",
      "kubernetes rollback",
      "kubernetes approval workflow",
      "platform engineering safety",
      "kubernetes hardening",
      "kprompt safety",
    ],
    blocks: [
      {
        type: "p",
        text: "The fastest way to hurt a Kubernetes cluster with AI is also the simplest: pipe model output straight to bash. One wrong namespace, one hallucinated resource name, one delete verb you didn't read — and your incident becomes a postmortem about automation, not about the original bug. Safety is not a feature checkbox for AI ops tools. It's the architecture.",
      },
      {
        type: "p",
        text: "kprompt treats every mutating prompt as untrusted until a human or an explicitly configured pipeline approves a structured plan. Read-only work (get, list, explain, logs, describe) runs immediately. Everything else hits Plan → Safety → Apply. This post explains that loop, what hard denies block, and the production habits that still matter when the CLI does the right thing.",
      },
      {
        type: "h2",
        text: "Plan → Safety → Apply (the whole model)",
      },
      {
        type: "p",
        text: "Prompt in plain English. kprompt maps intent to concrete operations — usually kubectl commands with namespace and context resolved. Before exec, the tool evaluates risk: low, medium, high, or denied. On a TTY you confirm y/N unless you pass --approve. Denied plans never run, regardless of flags.",
      },
      {
        type: "code",
        caption: "Scale with review",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "p",
        text: "That pause is the product. The LLM suggested intent; the plan shows exactly what touches the apiserver. You're not approving English — you're approving commands.",
      },
      {
        type: "h2",
        text: "Hard denies: what never applies",
      },
      {
        type: "p",
        text: "Some prompts fail closed. Hard denies catch wipe-class language and operations outside named-resource delete rules. Models can be manipulated or confused; hard denies don't negotiate.",
      },
      {
        type: "ul",
        items: [
          "Cluster or namespace wipe phrasing",
          "Delete-everything style requests",
          "Deleting an entire namespace",
          "Deletes that aren't a named Pod, Deployment, or Service",
        ],
      },
      {
        type: "code",
        caption: "Always blocked",
        code: `$ kprompt "delete all pods in production"

Risk: denied
# Plan does not apply — named resources only`,
      },
      {
        type: "p",
        text: "Named delete still requires approval and shows up in the plan — you delete deployment redis, not everything in a namespace. That matches how careful operators already work; the CLI enforces it even when the prompt is reckless.",
      },
      {
        type: "h2",
        text: "Risk levels and what they mean",
      },
      {
        type: "ul",
        items: [
          "low — routine scale or rollout on scoped resources; still needs approval on a TTY",
          "medium — production namespaces, rollbacks, or wider blast radius",
          "high — operations that deserve extra scrutiny and slower approval",
          "denied — hard stop; fix the prompt or use supported delete patterns",
        ],
      },
      {
        type: "p",
        text: "Risk labels are signals, not substitutes for reading the plan. Medium in staging might be acceptable during a drill; medium in production might need a second pair of eyes — process kprompt doesn't replace.",
      },
      {
        type: "h2",
        text: "Live diffs: review the change, not just the sentence",
      },
      {
        type: "p",
        text: "When the target object exists, plans can include before→after diffs — replica count changes, image tag updates, resource limit patches. That's critical for AI-assisted ops: the model's summary might sound right while the diff shows a wrong tag or limit. Train teams to look at diffs first on mutations that change spec.",
      },
      {
        type: "h2",
        text: "When --approve is appropriate",
      },
      {
        type: "p",
        text: "--approve skips the interactive y/N prompt. Use it in CI after JSON gates, in scripts you've tested on staging, or in replay from kprompt history when the plan is unchanged. Do not use it as default on production laptops because it's convenient.",
      },
      {
        type: "ul",
        items: [
          "OK — staging automation with jq gates on PlanResult JSON",
          "OK — history rerun of a plan you already reviewed interactively",
          "OK — local kind clusters while learning the tool",
          "Risky — first time running an unfamiliar prompt in prod",
          "Risky — combining --approve with loose CI checks",
        ],
      },
      {
        type: "code",
        caption: "Approve with wait on rollout",
        code: `kprompt "rollback api" -n staging --approve --wait --timeout 10m`,
      },
      {
        type: "h2",
        text: "Safety vs RBAC vs admission control",
      },
      {
        type: "p",
        text: "kprompt safety is not a replacement for Kubernetes RBAC, OPA/Gatekeeper, or Kyverno. It's a pre-execution layer on the operator's machine. RBAC limits what credentials can do; admission hooks enforce org policy at the apiserver; kprompt limits what gets suggested and executed from natural language before it reaches either. Stack all three for production.",
      },
      {
        type: "table",
        headers: ["Layer", "Where it runs", "What it blocks"],
        rows: [
          ["kprompt plan/safety", "Operator laptop / CI", "Bad prompts, wipe language, unreviewed apply"],
          ["RBAC", "apiserver", "Unauthorized API calls for the identity"],
          ["Admission policy", "apiserver", "Non-compliant manifests and forbidden fields"],
        ],
      },
      {
        type: "h2",
        text: "Three demo scenarios that show the model",
      },
      {
        type: "h3",
        text: "1. Plan + approve scale",
      },
      {
        type: "p",
        text: "The bread-and-butter demo: scale a Deployment, read the kubectl line, accept or reject. For recordings without apply, use JSON output and jq to show intent and risk without touching the cluster.",
      },
      {
        type: "code",
        caption: "JSON without apply",
        code: `kprompt --output json "scale api to 3" -n staging | \\
  jq '{intent:.plan.intent, risk:.risk.level, denied:.risk.denied}'`,
      },
      {
        type: "h3",
        text: "2. Explain before mutate",
      },
      {
        type: "p",
        text: "Incident flow: explain why a workload is crashing (read path, no approval), understand OOM or probe failure, then consider a bounded fix — memory patch or rollback — with a fresh plan and approval. AI accelerates diagnosis; humans still own the fix.",
      },
      {
        type: "code",
        caption: "Read then act",
        code: `kprompt "explain why api is crashing" -n staging
# ... read output ...
kprompt "rollback api" -n staging   # separate plan + approve`,
      },
      {
        type: "h3",
        text: "3. Safety denial",
      },
      {
        type: "p",
        text: "Show that wipe language fails closed. Stakeholders need to see denial as success — the tool refused an unsafe class of operation, not a model error.",
      },
      {
        type: "h2",
        text: "Experimental software — stay honest",
      },
      {
        type: "p",
        text: "kprompt is early-stage Apache-2.0 CLI. Safety rules reduce risk; they do not certify production readiness. Plans can be wrong within allowed operations — wrong deployment name, wrong replica count, wrong namespace if flags are ambiguous. Hard denies don't catch every mistake. Start on kind or non-production; keep --approve off until plans feel familiar.",
      },
      {
        type: "h2",
        text: "Production checklist",
      },
      {
        type: "ul",
        items: [
          "Set default namespace and context in config — reduce ambiguous prompts",
          "Read the plan and diff on every mutation in shared clusters",
          "Use -n and --context explicitly for production commands",
          "Prefer JSON plan artifacts in CI before any automated apply",
          "Rotate LLM keys separately from kube credentials; neither belongs in config.yaml",
          "Disable local history on shared jump hosts if prompts are sensitive",
        ],
      },
      {
        type: "h2",
        text: "Try the safety loop",
      },
      {
        type: "code",
        caption: "Install and practice denies + scale",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging    # expect deny
kprompt "scale api to 2" -n staging    # review plan → y or n`,
      },
      {
        type: "p",
        text: "Full safety reference: kprompt.ai/docs/safety. For CI gating, see our post on PlanResult JSON. The goal is simple: AI speed with operator control — not autopilot with a Kubernetes sticker.",
        links: [
          { label: "kprompt.ai/docs/safety", href: "/docs/safety" },
          {
            label: "our post on PlanResult JSON",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
    ],
  };

export default post;
