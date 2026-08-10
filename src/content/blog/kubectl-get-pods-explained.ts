import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
    slug: "kubectl-get-pods-explained",
    title:
      "kubectl get pods explained: STATUS, restarts, and next commands",
    description:
      "How to read kubectl get pods output — READY, STATUS, RESTARTS, AGE — what CrashLoopBackOff and Pending mean, and which kubectl command to run next.",
    publishedAt: "2026-08-02",
    author: EMIRE_BARIS,
    tags: ["kubernetes", "beginner", "kubectl", "devops", "troubleshooting"],
    keywords: [
      "kubectl get pods",
      "kubectl get pods explained",
      "kubectl get pods status",
      "pod status kubernetes",
      "crashloopbackoff kubectl",
      "pending pod kubernetes",
      "kubectl describe pod",
      "kubernetes beginner kubectl",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "kubectl get pods is usually the first command people learn — and the first place they get stuck. The table looks simple until STATUS says CrashLoopBackOff or Pending and RESTARTS climbs. This guide is how to read that table and what to run next.",
      },
      {
        type: "p",
        text: "Pods are the running instances; Deployments keep them alive. If those words are fuzzy, skim What is a Deployment and Pods vs Deployments first.",
        links: [
          {
            label: "What is a Deployment",
            href: "/blog/what-is-a-kubernetes-deployment",
          },
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
        ],
      },
      {
        type: "h2",
        text: "The columns",
      },
      {
        type: "table",
        headers: ["Column", "Meaning", "What to check next"],
        rows: [
          [
            "NAME",
            "Pod object name (often Deployment hash + random suffix)",
            "Do not treat as a stable app ID",
          ],
          [
            "READY",
            "Ready containers / total containers in the Pod",
            "0/1 → probes, crashes, or not started",
          ],
          [
            "STATUS",
            "Phase / reason (Running, Pending, CrashLoopBackOff, …)",
            "describe + logs + events",
          ],
          [
            "RESTARTS",
            "How often containers restarted",
            "Climbing + CrashLoop → logs --previous",
          ],
          [
            "AGE",
            "How long this Pod object has existed",
            "Very new after a rollout is normal",
          ],
        ],
      },
      {
        type: "code",
        caption: "List Pods (namespace matters)",
        code: `kubectl get pods
kubectl get pods -n staging
kubectl get pods -A
kubectl get pods -o wide -n staging`,
      },
      {
        type: "h2",
        text: "STATUS values you will see first",
      },
      {
        type: "ul",
        items: [
          "Running — containers started; still check READY if traffic fails",
          "Pending — not scheduled yet (resources, PVC, taints) → describe for Events",
          "CrashLoopBackOff — container keeps exiting → logs and --previous",
          "ImagePullBackOff / ErrImagePull — image name, tag, or registry auth",
          "Completed — Job/Pod finished successfully (normal for Jobs)",
          "OOMKilled (in describe/lastState) — memory limit hit",
        ],
      },
      {
        type: "p",
        text: "Deep dives when you are past the table: CrashLoopBackOff, ImagePullBackOff, OOMKilled.",
        links: [
          {
            label: "CrashLoopBackOff",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          {
            label: "ImagePullBackOff",
            href: "/blog/kubernetes-imagepullbackoff",
          },
          {
            label: "OOMKilled",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
      },
      {
        type: "h2",
        text: "Next commands (always)",
      },
      {
        type: "code",
        caption: "From get pods → evidence",
        code: `kubectl describe pod POD_NAME -n staging
kubectl logs POD_NAME -n staging --tail=200
kubectl logs POD_NAME -n staging --previous
kubectl get events -n staging --sort-by=.lastTimestamp | tail -40`,
      },
      {
        type: "p",
        text: "Prefer label selectors when a Deployment owns many Pods: kubectl get pods -l app=api -n staging. For live watching without retyping, K9s helps — then come back to kubectl for ticket-ready commands. See kubectl vs K9s.",
        links: [{ label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" }],
      },
      {
        type: "h2",
        text: "Optional natural-language triage",
      },
      {
        type: "code",
        caption: "Soft kprompt examples",
        code: `kprompt "list pods in staging"
kprompt "explain why api pods are crashing" -n staging
kprompt "show events for api" -n staging`,
      },
      {
        type: "p",
        text: "For a full AI-assisted Pod loop without silent apply, see AI for Kubernetes Pods. For more kubectl patterns, see the natural-language cheat sheet.",
        links: [
          {
            label: "AI for Kubernetes Pods",
            href: "/blog/ai-kubernetes-pod-diagnose",
          },
          {
            label: "natural-language cheat sheet",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
          {
            label: "What is a Deployment",
            href: "/blog/what-is-a-kubernetes-deployment",
          },
          { label: "Quickstart", href: "/docs/quickstart" },
        ],
      },
    ],
  };

export default post;
