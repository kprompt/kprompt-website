import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubectl-vs-k9s",
    title:
      "kubectl vs K9s: differences, when to use each, and why you need both",
    description:
      "kubectl vs K9s (and k9s vs kubectl): kubectl is the scriptable API client; K9s is a live terminal UI over the same API. When to use each in incidents, CI, and day-2 ops — plus where AI CLIs fit.",
    publishedAt: "2026-07-26",
    updatedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "kubectl",
      "kubernetes cli",
      "devops",
      "sre",
    ],
    keywords: [
      "kubectl vs k9s",
      "k9s vs kubectl",
      "k9s vs k8s",
      "k8s vs k9s",
      "k9s alternative",
      "is k9s better than kubectl",
      "k9s tutorial",
      "kubernetes terminal ui",
      "kubectl alternatives",
      "k9s read only mode",
      "kubernetes cli comparison",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "“kubectl vs K9s” is one of the most searched Kubernetes tooling questions, and the framing is slightly wrong. These are not two implementations of the same tool competing for a slot in your shell profile. kubectl is the official API client — a precise, scriptable vocabulary for the Kubernetes API. K9s is a terminal UI that continuously watches that same API using the same kubeconfig and the same RBAC.",
        links: [
          {
            label: "official API client",
            href: "https://kubernetes.io/docs/reference/kubectl/",
          },
          { label: "K9s", href: "https://github.com/derailed/k9s" },
        ],
      },
      {
        type: "p",
        text: "So the honest answer is: keep both, and know which one the current task belongs to. This post is the decision rule, not a winner announcement.",
      },
      {
        type: "h2",
        text: "The one-line answer",
      },
      {
        type: "ul",
        items: [
          "Reach for kubectl when the output must be exact, reproducible, scriptable, or pasted into a ticket",
          "Reach for K9s when you are watching live state and need to navigate fast without retyping commands",
          "Neither removes the need to understand Kubernetes objects — they are both thin layers over the same API",
        ],
      },
      {
        type: "h2",
        text: "Job-by-job comparison",
      },
      {
        type: "table",
        headers: ["Job", "kubectl", "K9s"],
        rows: [
          [
            "Scripts, CI, runbooks",
            "Built for it — stable flags, JSON/YAML output",
            "Interactive TUI is not automatable",
          ],
          [
            "Watch a rollout live",
            "Works with --watch or repeated get",
            "Better — continuous views, no retyping",
          ],
          [
            "Hop between Pods and tail logs",
            "kubectl logs with selectors and --previous",
            "Faster — keyboard navigation between resources",
          ],
          [
            "Full API surface and uncommon resources",
            "Complete — every verb and CRD",
            "Common day-2 actions, not every verb",
          ],
          [
            "Precise output shaping",
            "jsonpath, custom-columns, -o yaml",
            "Views are for reading, not for piping",
          ],
          [
            "Sharing what you did",
            "Copy-pasteable command",
            "Hard to reproduce a keystroke sequence",
          ],
          [
            "Exploring an unfamiliar cluster",
            "Verbose but explicit",
            "Better — you see relationships as you browse",
          ],
        ],
      },
      {
        type: "h2",
        text: "What kubectl is actually good at",
      },
      {
        type: "p",
        text: "kubectl is the common language of Kubernetes operations. Every runbook, incident note, Stack Overflow answer, and CI job speaks it. That matters more than ergonomics: a kubectl command is an artifact you can review, diff, and hand to someone else.",
      },
      {
        type: "code",
        caption: "Output shaping you cannot get from a TUI",
        code: `# Which containers were last terminated, and why?
kubectl get pods -n payments -o jsonpath='{range .items[*]}{.metadata.name}{"\\t"}{range .status.containerStatuses[*]}{.lastState.terminated.reason}{" "}{end}{"\\n"}{end}'

# Custom columns for a quick capacity read
kubectl get pods -n payments \\
  -o custom-columns='POD:.metadata.name,CPU_REQ:.spec.containers[*].resources.requests.cpu'`,
      },
      {
        type: "ul",
        items: [
          "Deterministic — the same command produces the same result in CI and on your laptop",
          "Composable — pipe into jq, grep, or a policy check",
          "Extensible — krew plugins add subcommands without leaving the CLI",
          "Teachable — kubectl explain documents the API from the terminal",
        ],
      },
      {
        type: "h2",
        text: "What K9s is actually good at",
      },
      {
        type: "p",
        text: "K9s removes the retype-and-rerun loop. Instead of running kubectl get pods, reading, then running kubectl describe on one of them, you stay in a live view and move around with the keyboard. During an incident that difference is real: you are navigating evidence, not composing commands.",
      },
      {
        type: "ul",
        items: [
          "Continuously refreshed resource views instead of point-in-time snapshots",
          "Keyboard-driven navigation between Deployments, Pods, logs, and describe output",
          "Fast context and namespace switching when the incident spans more than one",
          "Read-only mode when you want to browse a sensitive cluster without fat-fingering an edit",
          "Skins, aliases, hotkeys, and plugins for teams that live in the terminal",
        ],
      },
      {
        type: "p",
        text: "Flags, config paths, and available views shift between K9s releases — check the upstream repository for the version you installed rather than trusting a blog snapshot.",
        links: [
          {
            label: "upstream repository",
            href: "https://github.com/derailed/k9s",
          },
        ],
      },
      {
        type: "h2",
        text: "k9s vs k8s: not the same comparison",
      },
      {
        type: "p",
        text: "Search often mixes “k9s vs k8s” with “kubectl vs K9s.” They are different questions. Kubernetes (k8s) is the platform. K9s is one terminal UI for operating that platform. If you landed here from k9s vs k8s, start with the short myth-bust post, then come back for the kubectl decision rule.",
        links: [
          {
            label: "short myth-bust post",
            href: "/blog/k9s-vs-kubernetes",
          },
        ],
      },
      {
        type: "h2",
        text: "Is K9s a kubectl replacement?",
      },
      {
        type: "p",
        text: "No, and treating it as one causes two specific problems. First, you cannot put a K9s session in a pipeline, so anything you want automated still has to be expressed as kubectl. Second, a keystroke sequence is not an audit trail — when someone asks what you changed at 03:00, a command history answers and a TUI session does not.",
      },
      {
        type: "ul",
        items: [
          "K9s is a better reader; kubectl is the better writer of record",
          "Mutations made from a TUI are easy to make and hard to review afterwards",
          "If your team needs every change to be reviewable, the interface matters less than the approval step around it",
        ],
      },
      {
        type: "h2",
        text: "Where an AI Kubernetes CLI fits",
      },
      {
        type: "p",
        text: "There is a third bottleneck that neither tool addresses: translating intent into the right change. K9s helps you look, kubectl helps you execute precisely, but if you already know the outcome — scale api to three, roll back the bad release, explain why redis is not ready — you still have to reconstruct the command chain under pressure.",
      },
      {
        type: "p",
        text: "That is the gap kprompt targets, and deliberately not by piping model output into a shell. A mutating prompt compiles into a plan with actions, a diff, and a risk verdict, which you approve before anything runs. It uses your kubeconfig and your own LLM key, and it does not replace RBAC or admission policy.",
        links: [
          { label: "safety model", href: "/docs/safety" },
          { label: "BYOK providers", href: "/docs/providers" },
        ],
      },
      {
        type: "code",
        caption: "Intent, then a reviewable plan",
        code: `$ kprompt "scale api to 3" -n payments

Plan
  1. scale Deployment/api replicas → 3

Risk: medium
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "A realistic three-tool workflow",
      },
      {
        type: "p",
        text: "Most strong platform teams do not standardize on one interface. They match the interface to the phase of the work.",
      },
      {
        type: "table",
        headers: ["Incident phase", "Tool", "Why"],
        rows: [
          [
            "Notice something is wrong",
            "K9s (or an alert)",
            "Live view surfaces restarts and Pending Pods",
          ],
          [
            "Understand the cause",
            "kubectl describe / logs, or an explain prompt",
            "Evidence you can quote in the incident channel",
          ],
          [
            "Make a bounded change",
            "Reviewed plan or a hand-typed kubectl",
            "Both leave a reviewable artifact",
          ],
          [
            "Steady state",
            "GitOps (Argo CD / Flux)",
            "Desired state belongs in Git, not in a TUI",
          ],
        ],
      },
      {
        type: "h2",
        text: "Try all three on a deliberately broken cluster",
      },
      {
        type: "p",
        text: "The fastest way to form your own opinion is to break something on purpose and navigate it three ways. kprompt-examples spins up kind, breaks seven workloads, and runs offline in heuristic mode with no API key and no spend.",
        links: [
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
        ],
      },
      {
        type: "code",
        caption: "kind cluster, one broken namespace",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=01-crashloop && make verify

# now look at the same failure three ways
kubectl describe pod -l app=api -n payments
k9s -n payments
kprompt "explain why api is crashing" -n payments`,
      },
      {
        type: "p",
        text: "For the wider interface survey (Headlamp, Lens, dashboards), see our kubectl alternatives post. Searching specifically for K9s alternatives? Use the dedicated K9s alternatives guide. For the AI peer map (K8sGPT, kubectl-ai, Kagent), see the Kubernetes AI tools comparison. For the specific failure above, see the CrashLoopBackOff guide.",
        links: [
          {
            label: "kubectl alternatives post",
            href: "/blog/kubectl-alternatives",
          },
          {
            label: "K9s alternatives guide",
            href: "/blog/k9s-alternatives",
          },
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  };

export default post;
