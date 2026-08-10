import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubectl-cheat-sheet-natural-language",
    title:
      "kubectl cheat sheet with natural-language equivalents (kprompt)",
    description:
      "A practical kubectl cheat sheet paired with natural-language prompts — get, list, describe, logs, scale, rollback, delete, explain, Helm, and JSON CI — for operators who know the API and want faster day-2 typing.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "kubectl",
      "kubernetes cli",
      "devops",
      "cheat sheet",
    ],
    keywords: [
      "kubectl cheat sheet",
      "kubectl commands",
      "kubectl natural language",
      "kubernetes cheat sheet",
      "kubectl get pods",
      "kubectl scale deployment",
      "kubectl rollout undo",
      "kubectl logs",
      "kubectl describe",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "kubectl remains the primary command-line tool for Kubernetes. This cheat sheet does not replace it — it pairs common one-liners with natural-language prompts you can run through kprompt when flag order is the bottleneck, not understanding the API.",
        links: [
          {
            label: "primary command-line tool for Kubernetes",
            href: "https://kubernetes.io/docs/concepts/overview/kubectl/",
          },
        ],
      },
      {
        type: "p",
        text: "Reads (list, get, describe, logs, explain) run immediately. Mutations (scale, deploy, rollback, named delete, Helm install/upgrade) print a plan, run safety checks, and wait for approval unless you pass --approve. Prefer staging. Experimental software — wrong plans still happen; read before you apply.",
        links: [
          { label: "safety docs", href: "/docs/safety" },
          {
            label: "kubectl alternatives comparison",
            href: "/blog/kubectl-alternatives",
          },
        ],
      },
      {
        type: "h2",
        text: "How to use this sheet",
      },
      {
        type: "ul",
        items: [
          "Left: kubectl you already trust in scripts and runbooks",
          "Right: a kprompt prompt that aims at the same outcome",
          "Swap api / redis / staging for your names — always pass -n on shared clusters",
          "For wipe-class language and other traps, see the edge-case guide",
        ],
      },
      {
        type: "h2",
        text: "Context and namespace",
      },
      {
        type: "table",
        headers: ["kubectl", "kprompt"],
        rows: [
          [
            "kubectl config current-context",
            "kprompt config   # shows context/namespace defaults",
          ],
          [
            "kubectl config use-context staging",
            "kprompt config set context staging",
          ],
          [
            "kubectl config set-context --current --namespace=staging",
            "kprompt config set namespace staging",
          ],
          [
            "kubectl … -n production --context prod",
            "kprompt \"…\" -n production --context prod",
          ],
        ],
      },
      {
        type: "h2",
        text: "Get and list",
      },
      {
        type: "table",
        headers: ["kubectl", "kprompt"],
        rows: [
          [
            "kubectl get pods -n staging",
            "kprompt \"list pods\" -n staging",
          ],
          [
            "kubectl get deploy -n staging",
            "kprompt \"list deployments\" -n staging",
          ],
          [
            "kubectl get svc -n staging",
            "kprompt \"list services\" -n staging",
          ],
          [
            "kubectl get nodes",
            "kprompt \"list nodes\"   # or: how many nodes are in the cluster",
          ],
          [
            "kubectl get cm -n staging",
            "kprompt \"list configmaps\" -n staging",
          ],
          [
            "kubectl get secret db-creds -n prod",
            "kprompt \"get secret db-creds\" -n prod",
          ],
          [
            "kubectl get deploy,po -n staging",
            "kprompt \"list deployments\" -n staging   # then list pods",
          ],
        ],
      },
      {
        type: "p",
        text: "Generic get/list works for discoverable built-ins and CRDs when discovery can resolve the kind. Prefer group-qualified names (deployments.apps) when short names collide — see the edge-case guide.",
        links: [
          {
            label: "edge-case guide",
            href: "/blog/kubernetes-edge-case-prompts",
          },
        ],
      },
      {
        type: "h2",
        text: "Describe, logs, explain",
      },
      {
        type: "table",
        headers: ["kubectl", "kprompt"],
        rows: [
          [
            "kubectl describe deploy/api -n staging",
            "kprompt \"describe api\" -n staging",
          ],
          [
            "kubectl logs deploy/api -n staging --tail=100",
            "kprompt \"logs api\" -n staging",
          ],
          [
            "kubectl logs deploy/api -n staging --previous",
            "kprompt \"logs api\" -n staging   # then ask for previous in follow-up if needed",
          ],
          [
            "(manual chain: get → describe → events → logs)",
            "kprompt \"explain why api is crashing\" -n staging",
          ],
          [
            "(same ladder for readiness)",
            "kprompt \"explain why deployment api is not ready\" -n staging",
          ],
        ],
      },
      {
        type: "code",
        caption: "Incident start",
        code: `kprompt "explain why payment-api is crashing" -n production
kprompt "logs payment-api" -n production
kprompt "describe payment-api" -n production`,
      },
      {
        type: "h2",
        text: "Scale, deploy, rollback (plan + approve)",
      },
      {
        type: "table",
        headers: ["kubectl", "kprompt"],
        rows: [
          [
            "kubectl scale deploy/api --replicas=3 -n staging",
            "kprompt \"scale api to 3\" -n staging",
          ],
          [
            "kubectl rollout undo deploy/api -n staging",
            "kprompt \"rollback api\" -n staging",
          ],
          [
            "kubectl rollout status deploy/api -n staging",
            "kprompt \"rollback api\" -n staging --wait   # or scale --wait",
          ],
          [
            "kubectl create deploy redis --image=redis:7 -n cache",
            "kprompt \"deploy redis\" -n cache",
          ],
          [
            "kubectl delete deploy redis -n cache",
            "kprompt \"delete deployment redis\" -n cache",
          ],
        ],
      },
      {
        type: "code",
        caption: "Mutation loop",
        code: `$ kprompt "scale api to 3" -n staging

Plan
  1. kubectl scale deployment/api --replicas=3 -n staging

Risk: low
Apply? [y/N]`,
      },
      {
        type: "p",
        text: "Hard denies block wipe-class prompts (delete all pods, wipe namespace, …). Named delete is Pod, Deployment, or Service only today. Details: safety post and edge-case guide.",
        links: [
          {
            label: "safety post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "edge-case guide",
            href: "/blog/kubernetes-edge-case-prompts",
          },
        ],
      },
      {
        type: "h2",
        text: "Helm (when charts own the release)",
      },
      {
        type: "table",
        headers: ["helm / kubectl world", "kprompt"],
        rows: [
          [
            "helm install redis bitnami/redis -n cache",
            "kprompt \"install redis\" -n cache",
          ],
          [
            "helm upgrade … --version 1.3",
            "kprompt \"upgrade nginx to 1.3\" -n staging",
          ],
          [
            "helm uninstall --all   # dangerous",
            "(hard deny — name a single release)",
          ],
        ],
      },
      {
        type: "p",
        text: "Requires helm on PATH. Plans can include template/dry-run style previews before approve. Deeper Helm vs raw kubectl decision guide is next on the content backlog.",
      },
      {
        type: "h2",
        text: "Performance and traces",
      },
      {
        type: "table",
        headers: ["Classic path", "kprompt"],
        rows: [
          [
            "Prom UI / kubectl top / custom PromQL",
            "kprompt \"why is my api slow?\" -n production",
          ],
          [
            "Jaeger/Tempo UI search",
            "kprompt \"trace payment request\" -n production",
          ],
          [
            "kubectl get hpa -n production",
            "(covered inside performance explain when Prom is configured)",
          ],
        ],
      },
      {
        type: "code",
        caption: "Check what is wired",
        code: `kprompt tools
kprompt "why is my api slow?" -n production`,
      },
      {
        type: "h2",
        text: "CI and JSON",
      },
      {
        type: "table",
        headers: ["Pattern", "Command"],
        rows: [
          [
            "Emit PlanResult",
            "kprompt \"scale api to 10\" -n prod -o json",
          ],
          [
            "Gate denied",
            "… | jq -e '.risk.denied == false'",
          ],
          [
            "Apply after gate",
            "kprompt \"scale api to 10\" -n prod --approve --wait",
          ],
        ],
      },
      {
        type: "p",
        text: "Full pipeline patterns: CI plan gates post and /docs/ci.",
        links: [
          {
            label: "CI plan gates post",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
          { label: "/docs/ci", href: "/docs/ci" },
        ],
      },
      {
        type: "h2",
        text: "History",
      },
      {
        type: "code",
        caption: "Replay without retyping",
        code: `kprompt history
kprompt history rerun 3
kprompt history rerun 3 --approve   # only if you already trust that plan`,
      },
      {
        type: "h2",
        text: "When to stay on raw kubectl",
      },
      {
        type: "ul",
        items: [
          "Exact scripts and GitOps PRs — commit kubectl/helm, not chat",
          "Obscure API fields and one-off CRD patches you already know by heart",
          "Air-gapped emergencies when the LLM provider is unreachable (unless Ollama is local)",
          "Anything your org forbids sending operational context to a model",
        ],
      },
      {
        type: "h2",
        text: "Quick install",
      },
      {
        type: "code",
        caption: "Try the pairs on staging",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "list deployments" -n staging
kprompt "explain why api is not ready" -n staging
kprompt "scale api to 2" -n staging    # review plan → y or n`,
      },
      {
        type: "p",
        text: "For incident phrasing by error type, use the error prompt playbook. For wipe jokes and --approve traps, use the edge-case guide. For why we compile to a plan instead of racing chat REPLs, see the intent compiler note. kubectl literacy stays the foundation — natural language is the accelerator.",
        links: [
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          {
            label: "edge-case guide",
            href: "/blog/kubernetes-edge-case-prompts",
          },
          {
            label: "intent compiler note",
            href: "/blog/intent-compiler-not-chat",
          },
          { label: "docs quickstart", href: "/docs/quickstart" },
        ],
      },
    ],
  };

export default post;
