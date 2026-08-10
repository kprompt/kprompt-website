import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-error-prompt-playbook",
    title:
      "Real Kubernetes error prompts: crash loops, OOM, ImagePull, denies, and slow APIs",
    description:
      "A playbook of real incident prompts for Kubernetes — what to type when pods crash, images fail to pull, memory kills, wipe-class mistakes, RBAC denials, and latency spikes — with kprompt examples that stay plan-before-apply.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "prompt engineering",
    ],
    keywords: [
      "kubernetes error prompts",
      "kubernetes incident playbook",
      "crashloopbackoff prompt",
      "imagepullbackoff fix",
      "kubernetes natural language",
      "kubectl incident response",
      "oomkilled prompt",
      "kubernetes rbac denied",
      "why is my api slow kubernetes",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "Incidents do not arrive as clean runbooks. They arrive as Slack pings: “api is crashlooping,” “staging is slow,” “can you just delete everything in that namespace and start over?” The useful skill is turning that noise into a precise investigation or a bounded change — without improvising kubectl flags under adrenaline.",
      },
      {
        type: "p",
        text: "This playbook lists real error scenarios and the prompts we actually use with kprompt (and the kubectl equivalents you should still know). Every mutating path stays plan → safety → approve. Reads (explain, logs, describe, list, performance) run immediately. Software is experimental — practice on staging first.",
        links: [
          { label: "safety docs", href: "/docs/safety" },
          {
            label: "troubleshooting guide",
            href: "/blog/kubernetes-troubleshooting-guide",
          },
        ],
      },
      {
        type: "h2",
        text: "How to read each scenario",
      },
      {
        type: "ul",
        items: [
          "Symptom — what operators say or see",
          "Prompt — copy-pasteable kprompt line (swap names/namespaces)",
          "What you should get — findings, plan, or hard deny",
          "Do not — the shortcut that makes it worse",
        ],
      },
      {
        type: "h2",
        text: "1. CrashLoopBackOff — “it keeps restarting”",
      },
      {
        type: "p",
        text: "Symptom: Pod Ready is false, restarts climb, Waiting reason CrashLoopBackOff. You need the last exit reason and logs — not a blind rollout restart.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why api is crashing" -n staging
kprompt "logs api" -n staging
kprompt "describe api" -n staging`,
      },
      {
        type: "p",
        text: "What you should get: explain findings such as CrashLoopBackOff, last exit reason, and a suggestion to inspect logs. If the underlying kill was OOMKilled, you may also see a suggested memory patch that still requires approval. For the exit-code table and the full manual ladder behind these prompts, see the CrashLoopBackOff guide.",
        links: [
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Do — read Last State / findings before any mutate",
          "Do not — kubectl delete pod in a loop hoping the next one is healthier without reading why it died",
        ],
      },
      {
        type: "h2",
        text: "2. OOMKilled — exit 137 / memory limit",
      },
      {
        type: "p",
        text: "Symptom: Last State Reason OOMKilled, exit 137, or explain reports OOMKilled on a container. Full deep-dive: OOMKilled guide.",
        links: [
          { label: "OOMKilled guide", href: "/blog/kubernetes-oomkilled" },
        ],
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why payment-api is crashing" -n production
# If Suggested fix appears: read memory limit before→after → y or n

# Explicit follow-ups
kprompt "logs payment-api" -n production
kprompt "describe payment-api" -n production`,
      },
      {
        type: "p",
        text: "What you should get: OOMKilled finding and optionally a plan to raise the Deployment memory limit. Approving applies a real patch — treat it like any production resource change.",
      },
      {
        type: "ul",
        items: [
          "Do — confirm OOM in status; check metrics before doubling forever",
          "Do not — remove memory limits entirely to “make it stop”",
        ],
      },
      {
        type: "h2",
        text: "3. ImagePullBackOff / ErrImagePull",
      },
      {
        type: "p",
        text: "Symptom: Pod never starts; Waiting Reason ImagePullBackOff or ErrImagePull. Usually a bad tag, private registry auth, or rate limit — not something a memory bump fixes.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why api is not ready" -n staging
kprompt "describe api" -n staging
kprompt "logs api" -n staging   # often empty until the image pulls`,
      },
      {
        type: "p",
        text: "What you should get: image-pull finding and a suggestion to verify the image reference / pull secrets. The fix is usually correcting the Deployment image or imagePullSecrets — a separate planned mutation or GitOps PR, not an auto-remediation guess. For the Event-first ladder and the five common causes, see the ImagePullBackOff guide.",
        links: [
          {
            label: "ImagePullBackOff guide",
            href: "/blog/kubernetes-imagepullbackoff",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "Do — read Events for the exact registry error",
          "Do not — scale up replicas of a Pod that cannot pull; you only multiply failures",
        ],
      },
      {
        type: "h2",
        text: "4. Deployment not ready — “replicas unavailable”",
      },
      {
        type: "p",
        text: "Symptom: availableReplicas < desired; rollout stuck. Causes vary: probes, image pull, resources, PDB, bad config.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why deployment api is not ready" -n staging
kprompt "list pods" -n staging
kprompt "describe api" -n staging`,
      },
      {
        type: "p",
        text: "What you should get: a grounded chain over Deployment → ReplicaSet → Pods → Events → Logs style signals. After you know the cause, a separate prompt for rollback or scale — never combine “fix everything” into one unsupervised approve.",
      },
      {
        type: "code",
        caption: "Recovery (separate plan + approve)",
        code: `kprompt "rollback api" -n staging
kprompt "scale api to 3" -n staging --wait`,
      },
      {
        type: "h2",
        text: "5. “API is slow” — latency without a red Pod",
      },
      {
        type: "p",
        text: "Symptom: Pods look Ready; users feel p95 pain. kubectl describe will not show latency. With Prometheus configured, use a performance prompt.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "why is my api slow?" -n production
kprompt "show CPU for payment-api pods last hour" -n production

# Optional next: traces if Jaeger/Tempo is wired
kprompt "trace payment request" -n production`,
      },
      {
        type: "p",
        text: "What you should get: read-only findings (CPU, memory, latency, HPA/replica signals) and optional scaling suggestions — still a plan if you mutate. If Prometheus is missing, the tool should fail clearly rather than invent metrics.",
      },
      {
        type: "ul",
        items: [
          "Do — confirm Prom URL / access with kprompt tools first",
          "Do not — scale to 50 replicas because a chat model “felt” like load",
        ],
      },
      {
        type: "h2",
        text: "6. Panic prompt — wipe / delete everything",
      },
      {
        type: "p",
        text: "Symptom: stress language — “delete all pods,” “wipe the namespace,” “remove the cluster.” These are the prompts that should fail closed.",
      },
      {
        type: "code",
        caption: "Expect hard deny",
        code: `kprompt "delete all pods in production"
kprompt "wipe the staging namespace"
kprompt "delete everything"`,
      },
      {
        type: "p",
        text: "What you should get: risk denied — wipe-class and unscoped deletes never apply. Named delete of a single Pod, Deployment, or Service still shows a plan and needs approval.",
      },
      {
        type: "code",
        caption: "Named delete (planned)",
        code: `kprompt "delete deployment redis" -n cache
# Plan + risk → y/N`,
      },
      {
        type: "h2",
        text: "7. Bad deploy — roll back under pressure",
      },
      {
        type: "p",
        text: "Symptom: error rate spiked after a rollout; you want last known good Revision, not a debate in the PR thread.",
      },
      {
        type: "code",
        caption: "Prompts",
        code: `kprompt "explain why api is crashing" -n production
kprompt "rollback api" -n production
# Read plan: kubectl rollout undo … → approve
kprompt "rollback api" -n production --approve --wait --timeout 10m`,
      },
      {
        type: "p",
        text: "What you should get: a medium-risk rollback plan with namespace and Deployment named. Use --approve only when you already reviewed the same prompt or gated JSON in CI.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
      {
        type: "h2",
        text: "8. Auth and kubeconfig failures",
      },
      {
        type: "p",
        text: "Symptom: CLI errors before any plan — missing kubeconfig, bad context, expired credentials, RBAC forbid. These are not “prompt engineering” problems; fix identity first.",
      },
      {
        type: "code",
        caption: "Discipline prompts after fixing access",
        code: `# Fix credentials / context first, then:
kprompt config set context staging-cluster
kprompt "list deployments" -n staging

# Production — be explicit
kprompt "explain why api is down" -n production --context prod-cluster`,
      },
      {
        type: "p",
        text: "What you should get on RBAC failures: a short message naming the verb/resource/namespace and a kubectl auth can-i hint — not a hallucinated successful plan.",
      },
      {
        type: "h2",
        text: "Quick reference",
      },
      {
        type: "table",
        headers: ["Situation", "Start with", "Then"],
        rows: [
          [
            "CrashLoop / restarts",
            "explain why <app> is crashing",
            "logs / describe; patch or rollback if cause known",
          ],
          [
            "OOMKilled",
            "explain why <app> is crashing",
            "Review suggested memory plan or set exact resources",
          ],
          [
            "ImagePullBackOff",
            "explain / describe",
            "Fix image or pull secret — do not scale",
          ],
          [
            "Not ready",
            "explain why deployment <app> is not ready",
            "rollback or scale as a separate approve",
          ],
          [
            "Slow but Ready",
            "why is my api slow?",
            "metrics/traces; scale only from a plan",
          ],
          [
            "Wipe language",
            "(any delete-all prompt)",
            "Expect deny; use named delete only",
          ],
          [
            "Bad release",
            "rollback <app>",
            "Approve + --wait",
          ],
        ],
      },
      {
        type: "h2",
        text: "Prompt habits that survive real incidents",
      },
      {
        type: "ul",
        items: [
          "Name the workload and namespace — pronouns (“it”, “that thing”) burn time",
          "Read before mutate — explain/logs first on shared clusters",
          "One intent per approve — do not smuggle delete into a scale prompt",
          "Prefer staging rehearsal of the same prompt before prod --approve",
          "Keep PlanResult JSON when you need an audit trail (-o json)",
        ],
      },
      {
        type: "h2",
        text: "Practice the playbook on staging",
      },
      {
        type: "code",
        caption: "Install and dry-run the scary paths",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging          # expect deny
kprompt "explain why api is crashing" -n staging
kprompt "scale api to 2" -n staging           # review plan → n or y`,
      },
      {
        type: "p",
        text: "For the safety model behind denies and risk levels, see the safety post. For memory kills specifically, see the OOMKilled guide. For weird prompts that should fail closed or need extra care, see the edge-case prompt guide. The goal is simple: when the error is real, the prompt is boring — and the plan is visible.",
        links: [
          {
            label: "safety post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "OOMKilled guide",
            href: "/blog/kubernetes-oomkilled",
          },
          {
            label: "edge-case prompt guide",
            href: "/blog/kubernetes-edge-case-prompts",
          },
        ],
      },
    ],
  };

export default post;
