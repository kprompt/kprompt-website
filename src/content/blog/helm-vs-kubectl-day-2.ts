import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "helm-vs-kubectl-day-2",
    title:
      "Helm vs kubectl for day-2: when charts win, when raw apply wins",
    description:
      "A practical decision guide for Helm charts versus kubectl apply on day-2 Kubernetes ops — plus how kprompt maps install/upgrade prompts to reviewable Helm plans without replacing Helm or GitOps.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "helm",
      "kubectl",
      "devops",
      "platform engineering",
    ],
    keywords: [
      "helm vs kubectl",
      "helm day 2 operations",
      "kubernetes helm install",
      "kubectl apply vs helm",
      "helm upgrade kubernetes",
      "helm chart vs manifests",
      "kubernetes package management",
      "helm dry run",
      "natural language helm",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "Day-2 Kubernetes is rarely “write one Deployment YAML and forget it.” You install Redis, bump a chart version, tweak values, roll back a bad upgrade, or scale a workload that was never in Helm. Teams argue Helm vs kubectl as if one should win. Both should — for different jobs.",
      },
      {
        type: "p",
        text: "This guide is a decision sheet: when charts are the right abstraction, when raw kubectl (or GitOps manifests) is clearer, and how kprompt fits as a natural-language layer that calls the real Helm CLI for install/upgrade — with template/dry-run style previews and the same plan → approve gate as kubectl mutations. It does not replace Helm, and it does not replace Git as the source of truth for production desired state.",
        links: [
          { label: "Helm documentation", href: "https://helm.sh/docs/" },
          {
            label: "integrations docs",
            href: "/docs/integrations",
          },
        ],
      },
      {
        type: "h2",
        text: "Quick decision",
      },
      {
        type: "table",
        headers: ["Situation", "Prefer", "Why"],
        rows: [
          [
            "Third-party app with a maintained chart (Redis, ingress, monitoring)",
            "Helm",
            "Values, versioning, and release history beat hand-maintaining upstream YAML",
          ],
          [
            "One Deployment you own end-to-end",
            "kubectl / GitOps manifests",
            "No release object overhead; diffs stay obvious in Git",
          ],
          [
            "Bump chart version or values in staging",
            "Helm upgrade",
            "helm history / rollback semantics exist for a reason",
          ],
          [
            "Emergency scale / rollback of a Deployment",
            "kubectl (or NL scale/rollback)",
            "Fast, named, reversible — do not wait on a chart refactor",
          ],
          [
            "Steady-state production desired state",
            "GitOps (Argo CD / Flux) + Helm or Kustomize",
            "PR review beats laptop apply as the long-term control plane",
          ],
          [
            "Wipe every release in a namespace",
            "Neither — stop",
            "helm uninstall --all class ops are blast-radius events",
          ],
        ],
      },
      {
        type: "h2",
        text: "What Helm is actually for",
      },
      {
        type: "p",
        text: "Helm packages Kubernetes apps as charts: templates + values + a release record. You are not “avoiding YAML” — you are parameterizing someone else's (or your team's) templates and tracking upgrades as releases. That shines when the chart encodes probes, RBAC, Services, and sane defaults you would otherwise copy from READMEs.",
      },
      {
        type: "ul",
        items: [
          "Install — create a named release from a chart/repo",
          "Upgrade — change chart version or values with history",
          "Rollback — return a release to a prior revision (Helm's meaning, not only Deployment rollout undo)",
          "Values — the contract between you and the chart authors",
        ],
      },
      {
        type: "code",
        caption: "Classic Helm day-2",
        code: `helm repo add bitnami https://charts.bitnami.com/bitnami
helm install redis bitnami/redis -n cache --create-namespace
helm upgrade redis bitnami/redis -n cache --version 18.0.0
helm history redis -n cache
helm rollback redis 1 -n cache`,
      },
      {
        type: "h2",
        text: "What kubectl still owns",
      },
      {
        type: "p",
        text: "kubectl talks directly to the apiserver. It is the right tool when the unit of change is an object you understand cold — scale replicas, rollout undo, describe a Pod, patch a probe. It is also the lingua franca inside scripts, CI, and incident notes. Helm eventually applies objects; kubectl remains how you inspect and surgically mutate them.",
      },
      {
        type: "code",
        caption: "Classic kubectl day-2",
        code: `kubectl get deploy -n staging
kubectl scale deploy/api --replicas=3 -n staging
kubectl rollout undo deploy/api -n staging
kubectl describe pod -l app=api -n staging
kubectl logs deploy/api -n staging --tail=100`,
      },
      {
        type: "p",
        text: "If your “app” is a single Deployment your team wrote, wrapping it in Helm “because platforms use Helm” often adds ceremony without adding leverage. Prefer plain manifests (or Kustomize) in Git until you need values-driven reuse across environments.",
      },
      {
        type: "h2",
        text: "deploy vs install in kprompt (easy to confuse)",
      },
      {
        type: "p",
        text: "Natural language blurs the verbs. In kprompt they map to different backends:",
      },
      {
        type: "table",
        headers: ["Prompt shape", "Backend", "Use when"],
        rows: [
          [
            "deploy redis / deploy nginx",
            "Kubernetes recipes (client-go / manifests)",
            "Simple known workloads; no Helm required",
          ],
          [
            "install redis / install <chart>",
            "Helm CLI (helm on PATH)",
            "You want a real chart release with preview",
          ],
          [
            "upgrade nginx to 1.3",
            "Helm upgrade",
            "Chart/version bump with plan before apply",
          ],
          [
            "scale / rollback / delete deployment …",
            "Kubernetes",
            "Object-level day-2, chart or not",
          ],
        ],
      },
      {
        type: "code",
        caption: "Same word family, different plans",
        code: `kprompt "deploy redis" -n cache
# → Kubernetes Deployment (+ Service) style plan

kprompt "install redis" -n cache
# → helm repo / helm install plan + template/dry-run preview

kprompt tools   # confirm Helm is on PATH before install prompts`,
      },
      {
        type: "p",
        text: "If Helm is missing, kprompt should hint you toward install Helm or the Kubernetes deploy shortcut — not invent a successful chart install.",
      },
      {
        type: "h2",
        text: "The approval loop stays the same",
      },
      {
        type: "p",
        text: "Whether the plan's backend is kubernetes or helm, mutations are still reviewable. Helm paths surface template/dry-run style previews so you read rendered intent before approve. Wipe-class Helm language (uninstall --all, purge all releases) hard-denies. Named uninstall is not something to casually --approve in production either — treat release deletion like any high-blast-radius change.",
        links: [
          {
            label: "edge-case guide (Helm --all)",
            href: "/blog/kubernetes-edge-case-prompts",
          },
          { label: "safety docs", href: "/docs/safety" },
        ],
      },
      {
        type: "code",
        caption: "Install with eyes open",
        code: `$ kprompt "install redis" -n cache

# Plan includes helm steps + preview context
# Risk: medium — mutation requires approval
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "Day-2 patterns that mix both",
      },
      {
        type: "h3",
        text: "Chart for install, kubectl for incident",
      },
      {
        type: "p",
        text: "Production Redis came from Helm. Tonight it OOMs. You do not need a values PR to confirm OOMKilled — explain/logs first, then a bounded memory patch or Helm values bump as a follow-up. Incident speed and release hygiene are different tempos.",
        links: [
          {
            label: "OOMKilled guide",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
      },
      {
        type: "code",
        caption: "Mixed tempo",
        code: `kprompt "explain why redis is crashing" -n cache
# … confirm OOM …

# Later, durable fix via chart values / upgrade — or a reviewed patch plan
kprompt "upgrade redis" -n cache`,
      },
      {
        type: "h3",
        text: "GitOps owns prod; laptop owns discovery",
      },
      {
        type: "p",
        text: "Use Helm (or Helm via Argo CD) in Git for environments that matter. Use kprompt/kubectl on the laptop for staging discovery, explain, and break-glass scale/rollback — with plan gates. CI can consume PlanResult JSON for operational prompts the same way it gates manifest diffs.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
      {
        type: "h2",
        text: "Anti-patterns",
      },
      {
        type: "ul",
        items: [
          "Helm wrapping a single Deployment you fully control — ceremony without reuse",
          "kubectl apply of chart output with no release record — you lose Helm history on purpose",
          "Editing live objects that GitOps will overwrite — fix Git, not only the cluster",
          "helm uninstall --all as cleanup — hard deny exists for a reason",
          "Assuming NL install invents a private chart you never configured — real Helm + real repos only",
        ],
      },
      {
        type: "h2",
        text: "Honest scope today",
      },
      {
        type: "p",
        text: "kprompt ships Helm install and upgrade planning with previews when helm is on PATH. It is experimental. It is not a full Helmfile replacement, not a values IDE, and not a promise that every chart flag is expressible in English. Read the plan. Prefer non-production while you learn how previews look for your charts.",
      },
      {
        type: "h2",
        text: "Try both paths on staging",
      },
      {
        type: "code",
        caption: "deploy shortcut vs Helm install",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt tools
kprompt "deploy redis" -n staging      # Kubernetes recipe path
kprompt "install redis" -n staging     # Helm path — review preview → y/N
kprompt "list deployments" -n staging`,
      },
      {
        type: "p",
        text: "For kubectl one-liners paired with prompts, see the cheat sheet. For why plans matter more than chat scroll, see the intent compiler note. Pick Helm when the chart is the product; pick kubectl when the object is.",
        links: [
          {
            label: "cheat sheet",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
          {
            label: "intent compiler note",
            href: "/blog/intent-compiler-not-chat",
          },
          {
            label: "integrations roadmap post",
            href: "/blog/kubernetes-integrations-roadmap",
          },
        ],
      },
    ],
  };

export default post;
