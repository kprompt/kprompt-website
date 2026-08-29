import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-argo-cd",
  title:
    "kprompt + Argo CD: sync status, drift, and approve-gated reconcile",
  description:
    "Day-2 Argo CD with kprompt: detect Application CRDs, show gitops sync status, investigate drift vs Git, approve-gated sync/promote/rollback through the real Application API, and optional --gitops PR mode instead of live reconcile. Flux is the peer engine on the same contract. Not an Argo UI and not silent sync.",
  publishedAt: "2026-08-29",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "argo-cd",
    "gitops",
    "devops",
    "sre",
    "kprompt",
  ],
  keywords: [
    "kprompt argo cd",
    "argo cd troubleshooting kubernetes",
    "show gitops sync status",
    "kubernetes drift vs git",
    "natural language argo cd",
    "approve gated argo sync",
    "kprompt flux gitops",
    "gitops pr mode kubernetes",
    "argo application out of sync",
    "ai sre gitops",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "Argo CD is still the right controller for desired state in Git. kprompt does not replace the Application CRD, and it does not invent OutOfSync when neither Argo nor Flux is installed. It detects the controllers you already run, narrates sync + health, and turns “sync the payments application” into an approve-gated plan that patches the real Application API. Reads are free. Reconcile is not silent.",
    },
    {
      type: "p",
      text: "This is the site twin to the Medium thesis that GitOps stays declarative while AI Ops must stay intentional — intent → typed plan → approve → either live reconcile or a GitHub PR. Flux Kustomizations share the same CLI contract; examples lead with Argo CD.",
      links: [
        {
          label: "Medium: GitOps was declarative",
          href: "https://muhtalipdede.medium.com/gitops-was-declarative-ai-ops-will-be-intentional-30b75f29f08c",
        },
        { label: "kprompt + Helm deep dive", href: "/blog/kprompt-helm-deep-dive" },
        { label: "CI/CD plan gates", href: "/blog/kubernetes-ci-cd-plan-gates" },
        {
          label: "Integrations",
          href: "/docs/integrations#gitops-flux-argo-cd",
        },
      ],
    },
    {
      type: "h2",
      text: "Prerequisite: Application CRDs you already installed",
    },
    {
      type: "p",
      text: "kprompt tools reports GitOps when Flux Kustomization and/or Argo CD Application APIs are served. setup does not install Flux or Argo CD — brownfield bind-over-install. Prefer the controller your platform team already owns.",
      links: [
        { label: "Tools", href: "/docs/tools" },
        { label: "Adopt", href: "/docs/adopt" },
        {
          label: "Brownfield in 15 minutes",
          href: "/blog/brownfield-kprompt-in-15-minutes",
        },
      ],
    },
    {
      type: "code",
      caption: "Detect — no second control plane",
      code: `kprompt tools
# gitops: Argo CD Application present
#     or: Flux Kustomization + Argo CD Application present
#     or: MissingHint — neither CRD found

# setup never installs GitOps controllers`,
    },
    {
      type: "h2",
      text: "show gitops sync status — the compact read",
    },
    {
      type: "p",
      text: "Status and health are read-only. kprompt lists Applications (and Flux Kustomizations when present): sync status, health, revision hints. Missing GitOps fails clear with Drift.GitOpsMissing-class honesty — it does not fabricate a green sync table.",
    },
    {
      type: "code",
      caption: "Status (read-only)",
      code: `kprompt "show gitops sync status"
kprompt "gitops status" -n argocd
# Compact table — no reconcile, no PR`,
    },
    {
      type: "h2",
      text: "Drift: OutOfSync as Investigation, not vibes",
    },
    {
      type: "p",
      text: "check cluster drift / what is out of sync reads the same controller truth and emits an Investigation: OutOfSync, Unhealthy, per-resource rows from Argo status.resources (non-Synced only), or Flux inventory when a Kustomization is OutOfSync. The scan never mutates. -o json stays report-only.",
      links: [
        {
          label: "docs/drift.md",
          href: "https://github.com/kprompt/kprompt/blob/main/docs/drift.md",
        },
      ],
    },
    {
      type: "code",
      caption: "Drift scan",
      code: `kprompt "check cluster drift"
kprompt "what is out of sync" -n argocd
kprompt "check drift" -o json | jq '.result'

# Findings (MVP): Drift.OutOfSync · Drift.Unhealthy · Drift.ResourceOutOfSync
# Drift.GitOpsMissing when neither engine is detected`,
    },
    {
      type: "table",
      headers: ["Signal", "Argo CD", "If missing"],
      rows: [
        [
          "Sync status",
          "Application sync.status (Synced / OutOfSync)",
          "Fail clear — no invented apps",
        ],
        [
          "Health",
          "Application health (Healthy guidance when synced-but-unhealthy)",
          "Omit — do not auto-sync unhealthy",
        ],
        [
          "Per-resource drift",
          "status.resources[] not Synced (capped)",
          "App-level only",
        ],
        [
          "Flux peer",
          "Kustomization Ready / inventory when OutOfSync",
          "degraded: flux-inventory if inventory absent",
        ],
      ],
    },
    {
      type: "p",
      text: "Honesty: this is controller sync/health inventory — not a full live-vs-manifest field diff of every object. Manual changes GitOps already overwrote will not appear as drift.",
    },
    {
      type: "h2",
      text: "Approve-gated sync — live reconcile toward Git",
    },
    {
      type: "p",
      text: "When an app is OutOfSync, drift may offer a reviewable sync plan. Or ask directly: sync the payments application. Apply goes through the real Argo CD Application API (or Flux reconcile annotation) — TTY y/N or --approve. That is live reconcile toward Git, not a PR and not kubectl apply freestyle.",
      links: [{ label: "Safety", href: "/docs/safety" }],
    },
    {
      type: "code",
      caption: "Named sync (mutating — gated)",
      code: `kprompt "sync the payments application" --approve
kprompt "show gitops sync status then sync payments" --approve

# Same gate as any mutating PlanResult
# Scale / delete / wipe-class stays on the Kubernetes path — not GitOps sync`,
    },
    {
      type: "h2",
      text: "Two write paths: reconcile vs --gitops PR",
    },
    {
      type: "p",
      text: "Intentional ops means choosing the write path on purpose. Live GitOps sync reconciles the cluster toward the repo you already trust. --gitops opens a GitHub PR instead of cluster apply for supported mutates (deploy / patch / Helm template) — merge, then let Argo or Flux reconcile. Sync plans themselves stay on the cluster path; omit --gitops for controller sync.",
      links: [
        {
          label: "docs/gitops-pr.md",
          href: "https://github.com/kprompt/kprompt/blob/main/docs/gitops-pr.md",
        },
        { label: "CI/CD plan gates", href: "/blog/kubernetes-ci-cd-plan-gates" },
      ],
    },
    {
      type: "code",
      caption: "PR mode (desired state in Git)",
      code: `kprompt "deploy redis" -n demo --gitops --gitops-repo acme/infra --approve
# Banner: Apply target: Git PR (not cluster)
# Merge → Argo/Flux reconcile — kprompt did not silent-apply`,
    },
    {
      type: "h2",
      text: "Troubleshooting map (operator questions)",
    },
    {
      type: "table",
      headers: ["You ask", "kprompt shape", "Mutates?"],
      rows: [
        [
          "Is staging synced?",
          "show gitops sync status",
          "No",
        ],
        [
          "What drifted vs Git?",
          "check cluster drift / what is out of sync",
          "No (suggest may offer sync)",
        ],
        [
          "Pull Git into the cluster now",
          "sync the <app> application",
          "Yes — approve",
        ],
        [
          "Change desired state via PR",
          "deploy … --gitops --gitops-repo …",
          "PR only — not live apply",
        ],
        [
          "Why is the app unhealthy but Synced?",
          "Drift.Unhealthy guidance",
          "No auto-sync",
        ],
      ],
    },
    {
      type: "h2",
      text: "Observe: GitOps as evidence, not proof",
    },
    {
      type: "p",
      text: "Namespace Observe can attach GitOps EvidenceRefs when --gitops-evidence is on. Applications often live in argocd, not the app namespace — the flag only sees objects in the watch namespace. Missing GitOps → degraded: gitops. Sync status biases explanation; it never sole-proves root cause and never unlocks silent apply.",
      links: [
        { label: "Observe vs Investigate", href: "/blog/observe-vs-investigate" },
        {
          label: "agent-ops",
          href: "https://github.com/kprompt/kprompt/blob/main/docs/agent-ops.md",
        },
      ],
    },
    {
      type: "h2",
      text: "What we are not claiming",
    },
    {
      type: "ul",
      items: [
        "Not an Argo CD UI / ApplicationSet designer / App-of-Apps installer",
        "Not a Flux bootstrap or Argo install via kprompt setup",
        "Not a full manifest field-level diff engine — controller sync/health inventory",
        "Not silent reconcile: OutOfSync ≠ auto sync",
        "Not replacing Git as source of truth — compose with it",
        "Not --gitops for live sync / scale / delete (those stay cluster apply)",
      ],
    },
    {
      type: "h2",
      text: "Try it against the Argo CD you already run",
    },
    {
      type: "code",
      caption: "Detect → status → drift → gated sync → deny wipe",
      code: `kprompt tools
kprompt "show gitops sync status" -n argocd
kprompt "what is out of sync" -n argocd
kprompt "sync the payments application"   # expect y/N — or pass --approve deliberately
kprompt "delete everything in the cluster"
# expect hard deny — GitOps never weakens the safety loop`,
    },
    {
      type: "p",
      text: "Experimental on purpose. Prefer non-production Applications while you learn the gate. If tools says GitOps is missing, install or point at the controller your platform already runs — do not stand up a second Argo so the screenshot looks green. Flux operators: same prompts; engine detection picks Kustomization when that is what you have.",
      links: [
        {
          label: "Integrations",
          href: "/docs/integrations#gitops-flux-argo-cd",
        },
        { label: "Top 100 (GitOps rows)", href: "/blog/top-100-kubernetes-prompts" },
        { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
      ],
    },
  ],
};

export default post;
