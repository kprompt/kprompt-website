import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-pods-vs-deployments",
    title:
      "Kubernetes Pods vs Deployments: what beginners actually need to know",
    description:
      "A plain guide to Pods and Deployments — what each one is, how they relate, kubectl commands that stick, common beginner mistakes, and optional natural-language checks with kprompt.",
    publishedAt: "2026-07-28",
    updatedAt: "2026-08-02",
    author: EMIRE_BARIS,
    tags: ["kubernetes", "beginner", "kubectl", "devops"],
    keywords: [
      "kubernetes pods vs deployments",
      "pod vs deployment kubernetes",
      "deployment vs pod kubernetes",
      "what is a kubernetes pod",
      "what is a kubernetes deployment",
      "what is a deployment in kubernetes",
      "kubectl get pods",
      "kubectl get deployments",
      "kubernetes beginner guide",
      "deployment replicas kubernetes",
      "pod ephemeral kubernetes",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "If you are new to Kubernetes, you will see Pods in almost every kubectl output — and Deployments in almost every tutorial YAML. They sound related, and they are — but they are not the same thing. Confusing them is one of the most common beginner mistakes. Want Deployment-only depth first? Start with What is a Deployment. Want to decode kubectl get pods? See that guide.",
        links: [
          {
            label: "What is a Deployment",
            href: "/blog/what-is-a-kubernetes-deployment",
          },
          {
            label: "that guide",
            href: "/blog/kubectl-get-pods-explained",
          },
        ],
      },
      {
        type: "p",
        text: "This guide explains the difference in plain language: what a Pod is, what a Deployment does, how they connect, and which kubectl commands help you see the relationship on a real cluster.",
        links: [
          {
            label: "Kubernetes Pod documentation",
            href: "https://kubernetes.io/docs/concepts/workloads/pods/",
          },
          {
            label: "Kubernetes Deployment documentation",
            href: "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/",
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
          "A Pod runs your container(s) right now.",
          "A Deployment declares how many Pod copies you want and keeps them running.",
          "In production, you usually create a Deployment — not a lone Pod.",
        ],
      },
      {
        type: "h2",
        text: "What is a Pod?",
      },
      {
        type: "p",
        text: "A Pod is the smallest deployable unit in Kubernetes. It wraps one or more containers that share the same network namespace and can share storage volumes. When people say “my app is running in the cluster,” they usually mean a Pod is running — even if they created it through a Deployment.",
      },
      {
        type: "p",
        text: "Pods are ephemeral. That word matters. If a Pod is deleted, crashes hard, or the node it sits on fails, that specific Pod is gone. Kubernetes does not “heal” a standalone Pod by itself. Something else — typically a Deployment — must create a replacement.",
      },
      {
        type: "code",
        caption: "List and inspect Pods",
        code: `kubectl get pods
kubectl get pods -n staging
kubectl describe pod api-7d4f8b9c-xk2lm -n default
kubectl logs api-7d4f8b9c-xk2lm -n default`,
      },
      {
        type: "p",
        text: "Pod names often end with a random suffix (for example api-7d4f8b9c-xk2lm). That suffix changes when the Pod is recreated. Do not treat the Pod name as a stable identifier for your application.",
      },
      {
        type: "h2",
        text: "What is a Deployment?",
      },
      {
        type: "p",
        text: "A Deployment is a controller that manages ReplicaSets, which in turn create and maintain Pods. You tell the Deployment the desired state — which container image, how many replicas, labels — and it works continuously to match reality to that state.",
      },
      {
        type: "ul",
        items: [
          "Self-healing: if a Pod dies, the Deployment creates another one",
          "Scaling: change replicas from 1 to 5 and new Pods appear",
          "Rolling updates: swap to a new image without manual Pod deletion",
          "Rollbacks: undo a bad rollout using revision history",
        ],
      },
      {
        type: "code",
        caption: "List Deployments and find their Pods",
        code: `kubectl get deployments
kubectl get deployments -n staging
kubectl describe deployment api -n default

# Pods owned by this Deployment (match on labels)
kubectl get pods -l app=api -n default

# See desired vs ready replicas
kubectl get deploy api -n default`,
      },
      {
        type: "h2",
        text: "How Pods and Deployments relate",
      },
      {
        type: "p",
        text: "Think of the Deployment as the manager and Pods as the workers. The Deployment object stays stable (name api, namespace default). The Pod objects underneath come and go as the cluster reconciles state.",
      },
      {
        type: "code",
        caption: "Mental model",
        code: `Deployment "api"
  └── ReplicaSet (current revision)
        ├── Pod api-aaa111
        ├── Pod api-bbb222
        └── Pod api-ccc333`,
      },
      {
        type: "p",
        text: "When you kubectl apply a Deployment YAML, you are not applying a Pod YAML directly. You are telling Kubernetes: “Keep this Pod template running with N copies.” The control plane creates the ReplicaSet and Pods for you.",
      },
      {
        type: "h2",
        text: "Pods vs Deployments — comparison",
      },
      {
        type: "table",
        headers: ["", "Pod", "Deployment"],
        rows: [
          ["What it is", "A running instance of container(s)", "Desired state + controller for Pods"],
          ["Name stability", "Changes when recreated", "Stable (api, nginx, …)"],
          ["Replica count", "One Pod object = one unit", "replicas: N in spec"],
          ["Self-healing", "No (standalone Pod)", "Yes — replaces failed Pods"],
          ["Updates", "Manual delete/recreate", "Rolling update built in"],
          ["Typical use", "Debugging, one-off tests", "Stateless apps in production"],
        ],
      },
      {
        type: "h2",
        text: "The mistake every beginner makes once",
      },
      {
        type: "p",
        text: "You run kubectl delete pod api-7d4f8b9c-xk2lm to “restart” the app. Seconds later, a new Pod appears with a different suffix. That feels like a bug — but it is the Deployment doing exactly what you asked it to do: maintain the desired replica count.",
      },
      {
        type: "ul",
        items: [
          "To restart workloads managed by a Deployment: kubectl rollout restart deployment/api",
          "To stop the app: scale to zero (kubectl scale deploy api --replicas=0) or delete the Deployment",
          "Deleting one Pod alone does not remove the Deployment — it only triggers a replacement",
        ],
      },
      {
        type: "h2",
        text: "When to use which",
      },
      {
        type: "table",
        headers: ["Situation", "Use"],
        rows: [
          ["Run a quick throwaway container to test", "Pod or kubectl run (learning only)"],
          ["Run your API / web app in staging or prod", "Deployment"],
          ["Need stable network identity per replica", "StatefulSet (not covered here — different controller)"],
          ["Debug a crashing container", "kubectl describe pod + logs on the Pod"],
          ["Change how many copies run", "Edit Deployment replicas, not individual Pods"],
        ],
      },
      {
        type: "h2",
        text: "Minimal Deployment YAML (for context)",
      },
      {
        type: "p",
        text: "You do not need to memorize every field on day one. The important part is spec.replicas and spec.template — the Pod template the Deployment copies.",
      },
      {
        type: "code",
        caption: "Smallest useful Deployment",
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: myregistry/api:1.0.0
          ports:
            - containerPort: 8080`,
      },
      {
        type: "p",
        text: "After kubectl apply -f deployment.yaml, use kubectl get pods -l app=api to see the two Pods the Deployment created.",
      },
      {
        type: "h2",
        text: "Same checks in natural language (optional)",
      },
      {
        type: "p",
        text: "kprompt is an open-source CLI that turns plain English into a reviewable plan before anything reaches the cluster. Read-only prompts like list and describe do not mutate the cluster. Scale, delete, and other changes still show a plan and ask for approval — the same discipline you want when learning kubectl.",
        links: [
          { label: "Quickstart", href: "/docs/quickstart" },
          {
            label: "kubectl cheat sheet (NL pairs)",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
          { label: "Install", href: "/docs/install" },
        ],
      },
      {
        type: "code",
        caption: "Soft kprompt examples — read first; mutate only after you approve the plan",
        code: `kprompt "list pods in staging"
kprompt "list deployments in default"
kprompt "describe deployment api in staging"

# Mutations show a plan first — no silent apply
kprompt "scale api to 3 in staging"
kprompt "rollout restart deployment api in staging"`,
      },
      {
        type: "h2",
        text: "What to learn next",
      },
      {
        type: "p",
        text: "Pods run containers. Deployments keep the right number of Pods alive and roll out changes safely. Deployment-only primer: What is a Deployment. Reading the get pods table: kubectl get pods explained. Next: Services, Service vs Deployment, then Namespaces.",
        links: [
          {
            label: "What is a Deployment",
            href: "/blog/what-is-a-kubernetes-deployment",
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
          {
            label: "kubectl vs K9s",
            href: "/blog/kubectl-vs-k9s",
          },
        ],
      },
    ],
  };

export default post;
