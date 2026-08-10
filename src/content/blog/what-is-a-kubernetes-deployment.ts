import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
    slug: "what-is-a-kubernetes-deployment",
    title:
      "What is a Deployment in Kubernetes? (with kubectl examples)",
    description:
      "What a Kubernetes Deployment is, how it manages Pods and ReplicaSets, kubectl get/describe/rollout commands, common beginner mistakes, and optional natural-language checks with kprompt.",
    publishedAt: "2026-08-02",
    author: EMIRE_BARIS,
    tags: ["kubernetes", "beginner", "kubectl", "devops"],
    keywords: [
      "what is a deployment in kubernetes",
      "what is a kubernetes deployment",
      "kubernetes deployment explained",
      "kubectl get deployments",
      "kubectl rollout status",
      "deployment replicas kubernetes",
      "deployment vs pod",
      "kubernetes beginner deployment",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "If you searched what is a deployment in kubernetes, here is the short version: a Deployment is the controller you usually create for a stateless app. It declares how many Pod copies you want, which container image to run, and how updates should roll out. Kubernetes then creates and replaces Pods so reality matches that declaration.",
        links: [
          {
            label: "Kubernetes Deployment documentation",
            href: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
          },
        ],
      },
      {
        type: "p",
        text: "This page is Deployment-first. For the Pod vs Deployment comparison, see Pods vs Deployments. For how traffic reaches those Pods, see Service vs Deployment.",
        links: [
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          {
            label: "Service vs Deployment",
            href: "/blog/kubernetes-service-vs-deployment",
          },
        ],
      },
      {
        type: "h2",
        text: "The one-sentence version",
      },
      {
        type: "ul",
        items: [
          "A Deployment is desired state for a set of identical Pods (replicas + template).",
          "It owns ReplicaSets, which create the actual Pods.",
          "You rarely create lone Pods in production — you create a Deployment.",
        ],
      },
      {
        type: "h2",
        text: "What a Deployment actually does",
      },
      {
        type: "p",
        text: "You give Kubernetes a Pod template (containers, ports, labels, probes) and a replica count. The Deployment controller creates a ReplicaSet. The ReplicaSet creates Pods. If a Pod dies or a node fails, a replacement Pod appears. If you change the image, the Deployment performs a rolling update (by default) and keeps history so you can roll back.",
      },
      {
        type: "code",
        caption: "Mental model",
        code: `Deployment "api"
  └── ReplicaSet (current revision)
        ├── Pod api-aaa
        ├── Pod api-bbb
        └── Pod api-ccc`,
      },
      {
        type: "h2",
        text: "kubectl commands that stick",
      },
      {
        type: "code",
        caption: "Inspect and manage a Deployment",
        code: `kubectl get deployments -n staging
kubectl describe deployment api -n staging
kubectl get pods -l app=api -n staging

kubectl scale deployment api --replicas=3 -n staging
kubectl rollout status deployment/api -n staging
kubectl rollout undo deployment/api -n staging
kubectl rollout history deployment/api -n staging`,
      },
      {
        type: "p",
        text: "READY columns on kubectl get deploy show desired vs available replicas. If READY is 0/3, dig into Pods next — status reasons live on the Pod objects. See kubectl get pods explained.",
        links: [
          {
            label: "kubectl get pods explained",
            href: "/blog/kubectl-get-pods-explained",
          },
        ],
      },
      {
        type: "h2",
        text: "Common beginner mistakes",
      },
      {
        type: "ul",
        items: [
          "Creating a bare Pod YAML for an app that should restart and scale → use a Deployment",
          "Editing a live Pod and expecting the change to survive → the Deployment recreates Pods from the template",
          "Treating the Pod name as stable → names change on recreate; the Deployment name stays",
          "Forgetting labels → Services cannot select Pods if labels/selectors do not match",
        ],
      },
      {
        type: "h2",
        text: "Optional natural-language checks",
      },
      {
        type: "p",
        text: "kprompt can list and explain Deployments as reads. Scaling or restarting still produces a plan you approve.",
        links: [
          { label: "Quickstart", href: "/docs/quickstart" },
          {
            label: "kubectl cheat sheet",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
        ],
      },
      {
        type: "code",
        caption: "Soft kprompt examples",
        code: `kprompt "list deployments in staging"
kprompt "describe deployment api in staging"
kprompt "scale api to 3 in staging"   # review plan → y or n`,
      },
      {
        type: "h2",
        text: "What to learn next",
      },
      {
        type: "p",
        text: "Compare objects with Pods vs Deployments, then networking with Services / Service vs Deployment, then Namespaces. Day-2 tooling: kubectl vs K9s.",
        links: [
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          {
            label: "kubectl get pods explained",
            href: "/blog/kubectl-get-pods-explained",
          },
          {
            label: "Services",
            href: "/blog/what-is-a-kubernetes-service",
          },
          {
            label: "Service vs Deployment",
            href: "/blog/kubernetes-service-vs-deployment",
          },
          {
            label: "Namespaces",
            href: "/blog/kubernetes-namespaces-explained",
          },
          { label: "kubectl vs K9s", href: "/blog/kubectl-vs-k9s" },
        ],
      },
    ],
  };

export default post;
