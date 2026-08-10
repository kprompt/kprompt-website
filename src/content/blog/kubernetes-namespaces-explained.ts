import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-namespaces-explained",
    title:
      "Kubernetes Namespaces explained: isolation for beginners",
    description:
      "What a Namespace is, why teams use dev/staging/prod separation, the default namespace trap, kubectl -n commands, common mistakes, and optional kprompt examples.",
    publishedAt: "2026-08-01",
    author: EMIRE_BARIS,
    tags: ["kubernetes", "beginner", "kubectl", "devops"],
    keywords: [
      "kubernetes namespaces explained",
      "what is a kubernetes namespace",
      "kubectl namespace",
      "kubernetes default namespace",
      "namespace isolation kubernetes",
      "kubectl -n staging",
      "kubernetes beginner guide",
    ],
    blocks: [
      {
        type: "p",
        text: "You now know Pods, Deployments, and Services — see Pods vs Deployments and Services if you need a refresher. The last piece of the beginner puzzle is Namespaces: how Kubernetes groups resources so teams and environments do not step on each other.",
        links: [
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          {
            label: "Services",
            href: "/blog/what-is-a-kubernetes-service",
          },
        ],
      },
      {
        type: "p",
        text: "This guide explains what a Namespace is, why it exists, how to use kubectl -n, and the mistakes beginners make when everything lands in default.",
        links: [
          {
            label: "Kubernetes Namespace documentation",
            href: "https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/",
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
          "A Namespace is a scope for names — Pod api in staging and Pod api in prod can coexist.",
          "Namespaces do not replace clusters — they organize objects inside one cluster.",
          "Always know which Namespace you are targeting before you apply or delete.",
        ],
      },
      {
        type: "h2",
        text: "What is a Namespace?",
      },
      {
        type: "p",
        text: "A Namespace is a Kubernetes API object that partitions resources inside a single cluster. RBAC, ResourceQuotas, and NetworkPolicies can be scoped per Namespace. Think of it as folders for your YAML — not separate machines.",
      },
      {
        type: "h2",
        text: "Why teams use Namespaces",
      },
      {
        type: "table",
        headers: ["Namespace", "Typical use"],
        rows: [
          ["default", "Quick tests — easy to pollute; avoid for shared clusters"],
          ["dev", "Developer experiments"],
          ["staging", "Pre-production validation"],
          ["prod", "Live workloads — strict RBAC"],
          ["payments", "Team-owned slice of the cluster"],
        ],
      },
      {
        type: "h2",
        text: "The default namespace trap",
      },
      {
        type: "p",
        text: "If you omit -n, kubectl and many manifests target default. That is fine on kind/minikube alone; on a shared cluster it is how you accidentally scale or delete the wrong team's Deployment.",
      },
      {
        type: "code",
        caption: "List Namespaces and resources inside one",
        code: `kubectl get namespaces
kubectl get namespaces -o wide

kubectl get pods -n staging
kubectl get deployments -n staging
kubectl get services -n staging

# See your current context default namespace
kubectl config view --minify --output 'jsonpath={..namespace}{"\\n"}'`,
      },
      {
        type: "h2",
        text: "Create and switch Namespace",
      },
      {
        type: "code",
        caption: "Minimal Namespace YAML",
        code: `apiVersion: v1
kind: Namespace
metadata:
  name: staging`,
      },
      {
        type: "code",
        caption: "Apply and set default for current context",
        code: `kubectl apply -f namespace-staging.yaml
kubectl create namespace staging   # or imperative

kubectl config set-context --current --namespace=staging
kubectl get pods                 # now defaults to staging`,
      },
      {
        type: "h2",
        text: "Common beginner mistakes",
      },
      {
        type: "ul",
        items: [
          "kubectl apply -f app.yaml without namespace: in YAML or -n → lands in default",
          "Right name, wrong Namespace — get deploy api finds nothing in prod because it lives in staging",
          "Assuming Namespace equals environment in every company — naming conventions vary; read your platform docs",
          "Deleting a Namespace to “clean up” — deletes all namespaced objects inside it",
        ],
      },
      {
        type: "h2",
        text: "Same checks in natural language (optional)",
      },
      {
        type: "p",
        text: "kprompt resolves namespace phrases in prompts when you say in staging or across namespaces for reads. Mutations still show a plan and ask for approval.",
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
        code: `kprompt "list pods in staging"
kprompt "list deployments in payments"
kprompt "describe service api in default"`,
      },
      {
        type: "h2",
        text: "Beginner series complete",
      },
      {
        type: "p",
        text: "You now have the core trilogy: Pods and Deployments for workloads, Services for stable traffic, Namespaces for scope. Still unsure Service vs Deployment? Read that decision page. From here, dive into troubleshooting (OOMKilled), kubectl habits, or kubectl vs K9s for day-2 tooling.",
        links: [
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          {
            label: "Service vs Deployment",
            href: "/blog/kubernetes-service-vs-deployment",
          },
          {
            label: "Services",
            href: "/blog/what-is-a-kubernetes-service",
          },
          {
            label: "Kubernetes OOMKilled guide",
            href: "/blog/kubernetes-oomkilled",
          },
          {
            label: "kubectl vs K9s",
            href: "/blog/kubectl-vs-k9s",
          },
        ],
      },
    ],
  };

export default post;
