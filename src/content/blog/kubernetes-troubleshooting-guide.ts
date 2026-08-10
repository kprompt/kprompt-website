import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-troubleshooting-guide",
    title:
      "How to troubleshoot Kubernetes: deployments, pods, and crash loops from the terminal",
    description:
      "A practical guide to Kubernetes troubleshooting — CrashLoopBackOff, deployments not ready, image pull errors, and rollbacks — using kubectl workflows and natural-language explains with kprompt.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "kubectl",
    ],
    keywords: [
      "kubernetes troubleshooting",
      "kubernetes deployment not ready",
      "crashloopbackoff kubernetes",
      "kubectl debug pods",
      "kubernetes logs",
      "kubernetes events",
      "deployment rollout failed",
      "kubernetes rollback",
      "debug kubernetes cluster",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "Most Kubernetes incidents start the same way: a alert fires, a deploy pipeline goes red, or someone asks in Slack why staging is broken. You know the namespace, maybe the app name — and then the archaeology begins. kubectl get pods shows CrashLoopBackOff. describe surfaces a failed probe. logs show a stack trace from three revisions ago. Events scroll off the buffer. You're not missing skill; you're missing time. For copy-paste prompts per error type, see the error prompt playbook.",
        links: [
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
        ],
      },
      {
        type: "p",
        text: "This guide walks through the troubleshooting patterns every operator uses on real clusters — and how to run them faster with plain English when kprompt is in your toolkit. Nothing here replaces understanding Kubernetes; it compresses the repetitive glue work so you can focus on the fix.",
      },
      {
        type: "h2",
        text: "The standard Kubernetes troubleshooting ladder",
      },
      {
        type: "p",
        text: "Whether you type kubectl yourself or describe intent in natural language, the investigation order is similar. Start wide, narrow to the broken object, then read signals.",
      },
      {
        type: "ul",
        items: [
          "Scope — confirm context, namespace, and which workload is affected",
          "Status — Deployment / StatefulSet / DaemonSet conditions and replica counts",
          "Pods — phase, restarts, ready containers, node placement",
          "Events — Warning events often beat logs for the first clue",
          "Logs — application output after you know which Pod revision matters",
          "Change — what deployed, scaled, or config-mapped recently",
        ],
      },
      {
        type: "code",
        caption: "Classic kubectl sequence",
        code: `kubectl config current-context
kubectl get deploy,po -n staging
kubectl describe deploy api -n staging
kubectl get events -n staging --sort-by='.lastTimestamp'
kubectl logs deploy/api -n staging --tail=100`,
      },
      {
        type: "p",
        text: "kprompt maps the same ladder to prompts — especially on the read path, which runs immediately without an apply gate:",
      },
      {
        type: "code",
        caption: "Natural-language equivalents",
        code: `kprompt "list deployments" -n staging
kprompt "why isn't api ready?" -n staging
kprompt "describe api" -n staging
kprompt "logs api" -n staging --tail 100`,
      },
      {
        type: "h2",
        text: "Deployment not ready",
      },
      {
        type: "p",
        text: "Deployment not ready usually means availableReplicas < desiredReplicas. Common causes: image pull failures, failed readiness probes, insufficient cluster resources, PodDisruptionBudget blocks, or a bad rollout stuck on maxUnavailable.",
      },
      {
        type: "h3",
        text: "What to look for",
      },
      {
        type: "ul",
        items: [
          "kubectl describe deployment — Conditions and Events at the bottom",
          "ReplicaSet generations — old RS still scaling down?",
          "Pod template changes — env, image tag, resource limits",
          "Probes — readiness failing while app still booting?",
        ],
      },
      {
        type: "code",
        caption: "Example prompts",
        code: `kprompt "explain why deployment api is not ready" -n staging
kprompt "show replica sets for api" -n staging`,
      },
      {
        type: "p",
        text: "Fix paths are often rollout undo, scale temporarily, or patch config — all mutating. With kprompt, you'll see the plan (kubectl rollout undo, kubectl scale, etc.) and approve only after it matches your intent.",
      },
      {
        type: "h2",
        text: "CrashLoopBackOff",
      },
      {
        type: "p",
        text: "CrashLoopBackOff means the container starts, exits non-zero, and kubelet backs off retries. It's a symptom — not a root cause. The exit might be a missing env var, bad command, OOMKill, or dependency unreachable on startup. For the full exit-code table and ladder, see the dedicated CrashLoopBackOff guide; when Last State shows OOMKilled, follow the OOMKilled guide instead.",
        links: [
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          {
            label: "OOMKilled guide",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "kubectl logs pod/... --previous — logs from the last crashed instance",
          "describe pod — Last State, Exit Code, OOMKilled, probe failures",
          "Check ConfigMap/Secret mounts and file paths the entrypoint expects",
          "Compare working vs broken revision — what changed in the image or values?",
        ],
      },
      {
        type: "code",
        caption: "Crash loop investigation",
        code: `kprompt "explain why redis is crashlooping" -n cache
kprompt "logs redis" -n cache
kprompt "describe pod for redis" -n cache`,
      },
      {
        type: "h2",
        text: "ImagePullBackOff and registry issues",
      },
      {
        type: "p",
        text: "Image pull errors are operational, not mystical: wrong tag, deleted image, registry auth (imagePullSecrets), rate limits, or private registry DNS from the node. Events on the Pod usually state the exact reason. For the full ErrImagePull vs ImagePullBackOff ladder, see the dedicated ImagePullBackOff guide. Fix forward is correcting the Deployment image or secret — again, a planned mutation you should read before apply.",
        links: [
          {
            label: "ImagePullBackOff guide",
            href: "/blog/kubernetes-imagepullbackoff",
          },
        ],
      },
      {
        type: "h2",
        text: "Service has no endpoints",
      },
      {
        type: "p",
        text: "Traffic blackholes when Service selectors don't match Pod labels, Pods aren't Ready, or you're hitting the wrong port name. Trace Service → Endpoints → backing Pods. Ingress and mesh layers add another hop — but start at Endpoints empty.",
      },
      {
        type: "code",
        caption: "Connectivity checks",
        code: `kprompt "get service api" -n staging
kprompt "list pods for api with labels" -n staging
kprompt "explain why service api has no endpoints" -n staging`,
      },
      {
        type: "h2",
        text: "When the fix is rollback or scale",
      },
      {
        type: "p",
        text: "During incidents, the fastest safe move is often rollback to last good revision or scale out to absorb load — not debugging for forty minutes while users wait. kprompt treats these as medium-risk mutations: you see exact kubectl commands, namespace, and rollout target before confirming.",
      },
      {
        type: "code",
        caption: "Recovery actions (plan + approve)",
        code: `$ kprompt "rollback api" -n production

Plan
  1. kubectl rollout undo deployment/api -n production

Risk: medium
Apply? [y/N] y

$ kprompt "scale api to 5" -n production --wait

Plan
  1. kubectl scale deployment/api --replicas=5 -n production
  2. kubectl rollout status deployment/api -n production --timeout=5m

Risk: low
Apply? [y/N] y`,
      },
      {
        type: "h2",
        text: "Production discipline while troubleshooting",
      },
      {
        type: "p",
        text: "Speed and safety pull in opposite directions during outages. A few rules we follow and recommend:",
      },
      {
        type: "ul",
        items: [
          "Read first — explain, logs, describe before any mutate in prod",
          "Never --approve a prompt you haven't run in staging when the blast radius is unclear",
          "Prefer named operations — kprompt hard-denies wipe-everything language and whole-namespace deletes",
          "Use --wait after rollbacks and scales so you know the Deployment actually recovered",
          "Capture the plan — kprompt history or --output json for post-incident review",
        ],
      },
      {
        type: "h2",
        text: "Staging vs production contexts",
      },
      {
        type: "p",
        text: "Reproduce in staging with the same prompt before prod apply. kprompt respects kubeconfig context and -n namespace — set defaults in ~/.kprompt/config.yaml or pass flags explicitly so prod accidents don't come from ambiguous pronouns in the prompt.",
      },
      {
        type: "code",
        caption: "Context and namespace",
        code: `kprompt config set context staging-cluster
kprompt config set namespace staging
kprompt "explain why api is down"

# Production — explicit flags
kprompt "rollback api" -n production --context prod-cluster`,
      },
      {
        type: "h2",
        text: "After the incident",
      },
      {
        type: "p",
        text: "Replay from kprompt history to compare what you asked vs what ran. Wire JSON plan output into CI so the same prompts get gated in pipelines before anyone touches shared clusters. Troubleshooting skill compounds when your tooling leaves an audit trail — not just shell scrollback.",
      },
      {
        type: "code",
        caption: "History and CI",
        code: `kprompt history
kprompt history rerun 2

kprompt "scale api to 10" -n prod -o json | jq -e '.risk.denied == false'`,
      },
      {
        type: "h2",
        text: "Get started",
      },
      {
        type: "p",
        text: "Install kprompt, point at a non-production cluster, and practice explain and logs prompts on a broken test deployment before you need them at 3 a.m. Full safety and command reference: kprompt.ai/docs.",
        links: [{ label: "kprompt.ai/docs", href: "/docs" }],
      },
      {
        type: "code",
        caption: "Install",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."
kprompt "list pods" -n staging
kprompt "why isn't my deployment ready?" -n staging`,
      },
    ],
  };

export default post;
