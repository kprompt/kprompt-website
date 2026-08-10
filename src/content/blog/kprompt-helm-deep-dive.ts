import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kprompt-helm-deep-dive",
    title:
      "kprompt + Helm deep dive: install, upgrade, dry-run, and wipe denies",
    description:
      "Day-2 Helm with kprompt: real helm install/upgrade plans, template and client dry-run previews, Bitnami recipes, and hard denies for uninstall-all — without replacing Helm or GitOps.",
    publishedAt: "2026-08-10",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "helm",
      "devops",
      "platform engineering",
      "cli",
      "safety",
      "kprompt",
    ],
    keywords: [
      "kprompt helm",
      "natural language helm install",
      "helm upgrade plan",
      "helm dry-run kubernetes",
      "helm template preview",
      "helm uninstall --all deny",
      "bitnami redis helm",
      "kubernetes day 2 helm",
      "plan approve helm",
      "kprompt install redis",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "Helm is still the right tool for charted day-2 releases. kprompt does not replace it. It compiles natural language into the real helm argv you would type — under the same plan → safety → approve → apply loop as every other mutate.",
      },
      {
        type: "p",
        text: "The decision sheet for when to use Helm versus raw kubectl already lives here. This post is the deep dive: install and upgrade plan shapes, template and client dry-run previews, Bitnami recipes, and what we refuse to ship as NL convenience.",
        links: [
          { label: "Helm vs kubectl (day-2)", href: "/blog/helm-vs-kubectl-day-2" },
          { label: "Integrations", href: "/docs/integrations" },
        ],
      },
      {
        type: "h2",
        text: "Prerequisite: Helm on PATH",
      },
      {
        type: "p",
        text: "kprompt calls the Helm CLI. If helm is missing, plans fail clear — they do not invent a chart success. Check detection first; bootstrap the host tool when you want the Helm path.",
      },
      {
        type: "code",
        caption: "Detect, then optional host install",
        code: `kprompt tools
# Helm available → path + version; else MissingHint

kprompt setup --profile minimal --dry-run
# review host Helm plan, then:
# kprompt setup --profile minimal --approve

# Kubernetes recipe shortcut if you only need a Deployment:
# kprompt "deploy redis" -n cache`,
      },
      {
        type: "h2",
        text: "Install: real helm install under a plan",
      },
      {
        type: "p",
        text: "Known recipes today map redis, postgresql, mongodb, and nginx to Bitnami charts. An install plan is typically two actions: add the repo, then install the release. Before you approve, enrichment attaches a truncated helm template preview so you can see manifests — not a sandbox cluster.",
      },
      {
        type: "code",
        caption: "Install walkthrough",
        code: `$ kprompt "install redis" -n cache

Plan
  1. helm-repo     helm repo add bitnami https://charts.bitnami.com/bitnami
  2. helm-install  helm install redis bitnami/redis -n cache --create-namespace

# Preview (attached): helm template redis bitnami/redis … --repo <url>
Risk: medium
Approve? [y/N]`,
      },
      {
        type: "p",
        text: "Same loop for postgresql, mongodb, and nginx. Staging namespaces are the right place to learn the preview habit. --approve only after you read the plan.",
        links: [
          { label: "Quickstart", href: "/docs/quickstart" },
        ],
      },
      {
        type: "h2",
        text: "Upgrade: version required, client dry-run preview",
      },
      {
        type: "p",
        text: "Upgrade intents need an explicit chart version. The plan adds repo update, then helm upgrade. Preview uses the same upgrade argv with --dry-run=client --hide-notes — chart render before mutate, not a shadow environment.",
      },
      {
        type: "code",
        caption: "Upgrade walkthrough",
        code: `$ kprompt "upgrade nginx to 15.3.2" -n staging

Plan
  1. helm-repo
  2. helm-repo-update  helm repo update bitnami
  3. helm-upgrade      helm upgrade nginx bitnami/nginx -n staging --version 15.3.2

# Preview: helm upgrade … --dry-run=client --hide-notes
# Diff: version line (current → target)
Approve? [y/N]`,
      },
      {
        type: "p",
        text: "upgrade nginx without a version fails closed. That is intentional: ambiguous upgrades are how Friday nights go wrong.",
      },
      {
        type: "h2",
        text: "Plan shapes worth recognizing",
      },
      {
        type: "table",
        headers: ["Op","What it runs","When"],
        rows: [
          ["helm-repo","helm repo add …","Install and upgrade"],
          ["helm-repo-update","helm repo update …","Upgrade"],
          ["helm-install","helm install …","Install"],
          ["helm-upgrade","helm upgrade …","Upgrade"],
        ],
      },
      {
        type: "p",
        text: "Mutating Helm plans set RequiresApproval. PlanResult JSON is the same CI contract as scale or rollback — gate with jq, never treat --approve as a free pass. Manifests and API keys stay out of the JSON document.",
        links: [
          { label: "CI / PlanResult", href: "/docs/ci" },
          { label: "PlanResult JSON deep dive", href: "/blog/planresult-json-deep-dive" },
        ],
      },
      {
        type: "code",
        caption: "CI-shaped install",
        code: `kprompt "install redis" -n demo -o json
# jq on .risk.denied, .plan.actions[].op, then human or gated --approve`,
      },
      {
        type: "h2",
        text: "deploy vs install (one reminder)",
      },
      {
        type: "table",
        headers: ["Prompt","Backend","Use when"],
        rows: [
          ["deploy redis","Kubernetes recipe / Deployment","You want a simple workload, not a Helm release"],
          ["install redis","Helm CLI plan","You want a charted release with Helm lifecycle"],
        ],
      },
      {
        type: "p",
        text: "Mixing them up is the most common onboarding footgun. Full decision matrix: Helm vs kubectl day-2.",
        links: [
          { label: "Helm vs kubectl (day-2)", href: "/blog/helm-vs-kubectl-day-2" },
        ],
      },
      {
        type: "h2",
        text: "Recipes, values, and fail-closed unknowns",
      },
      {
        type: "ul",
        items: [
          "Shipped Bitnami recipes: redis, postgresql, mongodb, nginx",
          "Explicit charts: set params.chart + params.repo_url when the recipe is not enough",
          "Values knob today: optional --set replicaCount when replicas are in the intent — not a full values IDE",
          "Unknown app without chart params fails with a clear hint — often \"deploy foo\" as the Kubernetes shortcut",
        ],
      },
      {
        type: "code",
        caption: "Honesty examples",
        code: `kprompt "install foo" -n demo
# → no Helm chart recipe — set params.chart + params.repo_url
#    or: kprompt "deploy foo"

kprompt "upgrade nginx" -n demo
# → upgrade intent missing params.version`,
      },
      {
        type: "h2",
        text: "Wipe-class Helm uninstall stays denied",
      },
      {
        type: "p",
        text: "helm uninstall --all, uninstall all releases, purge all releases — hard deny. Name a single release if you truly intend deletion; we still do not market a casual NL uninstall path. Named wipe jokes and --approve traps live in the edge-case guide.",
        links: [
          { label: "Safety", href: "/docs/safety" },
          { label: "Edge-case prompts", href: "/blog/kubernetes-edge-case-prompts" },
        ],
      },
      {
        type: "code",
        caption: "Expect deny",
        code: `kprompt "helm uninstall --all"
kprompt "uninstall all helm releases"
# Refusing wipe-class Helm uninstall — name a single release`,
      },
      {
        type: "h2",
        text: "What we are not claiming",
      },
      {
        type: "ul",
        items: [
          "Not Helmfile or umbrella-chart product surface",
          "Not a values IDE or arbitrary -f values.yaml English compiler",
          "Not first-class NL Helm rollback (rollback still means Deployment rollout undo)",
          "Not silent Autopilot Helm apply",
          "Not a replacement for GitOps as production source of truth — use --gitops when you want a PR, not a cluster apply",
          "Dry-run / template preview ≠ sandbox / chaos Simulation lab",
        ],
      },
      {
        type: "h2",
        text: "Try it on staging",
      },
      {
        type: "code",
        caption: "Install → upgrade → deny trio",
        code: `kprompt tools
kprompt "install redis" -n staging
# read template preview, then y or --approve

kprompt "upgrade nginx to 15.3.2" -n staging
# read client dry-run preview

kprompt "helm uninstall --all"
# expect hard deny`,
      },
      {
        type: "p",
        text: "Experimental on purpose. Prefer non-production while you learn the previews. Read every plan. Star the repo if the contract matches how you want Helm day-2 to feel.",
        links: [
          { label: "Install", href: "/docs/install" },
          { label: "Integrations", href: "/docs/integrations" },
          { label: "Safety", href: "/docs/safety" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
        ],
      },
    ],
  };

export default post;
