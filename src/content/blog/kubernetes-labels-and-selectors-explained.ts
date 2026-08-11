import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
  slug: "kubernetes-labels-and-selectors-explained",
  title:
    "Kubernetes labels and selectors explained (the glue between objects)",
  description:
    "Labels and selectors in Kubernetes: how Deployments label Pods, how Services find them, kubectl -l and endpoints checks, common mistakes, and optional kprompt examples.",
  publishedAt: "2026-08-12",
  author: EMIRE_BARIS,
  tags: ["kubernetes", "beginner", "kubectl", "devops", "networking"],
  keywords: [
    "kubernetes labels and selectors",
    "kubernetes label selector",
    "matchLabels kubernetes",
    "service selector not matching pods",
    "kubectl get pods -l",
    "kubernetes endpoints empty",
    "kubernetes beginner guide",
    "kubectl show labels",
  ],
  blocks: [
    {
      type: "p",
      text: "You already know Pods, Deployments, and Services — see Pods vs Deployments and Services if you need a refresher. Namespaces scope where objects live. Labels and selectors are how Kubernetes connects those objects: which Pods belong to a Deployment, and which Pods a Service sends traffic to.",
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
      text: "This guide explains labels on Pods and Deployments, selectors on Services, the kubectl commands that make the link visible, and the mistakes that leave Endpoints empty even when everything looks Running.",
      links: [
        {
          label: "Kubernetes labels and selectors documentation",
          href: "https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/",
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
        "A label is key/value metadata on an object (for example app: api).",
        "A selector is a filter: “give me objects with these labels.”",
        "Deployment Pod template labels must match the Service selector — or traffic never reaches your Pods.",
      ],
    },
    {
      type: "h2",
      text: "What is a label?",
    },
    {
      type: "p",
      text: "Labels are arbitrary key/value pairs attached to Kubernetes objects. They do not change how a container runs by themselves — they organize and select objects. Controllers, Services, and kubectl -l all rely on them.",
    },
    {
      type: "code",
      caption: "Labels on a Pod (metadata.labels)",
      code: `apiVersion: v1
kind: Pod
metadata:
  name: api-manual
  labels:
    app: api
    tier: backend
    env: staging
spec:
  containers:
    - name: api
      image: nginx:1.27`,
    },
    {
      type: "p",
      text: "On a Deployment, labels appear in two places beginners confuse: metadata.labels on the Deployment object itself (optional, for your own organization) and spec.template.metadata.labels on the Pod template (required for Services to target the Pods the Deployment creates).",
    },
    {
      type: "h2",
      text: "What is a selector?",
    },
    {
      type: "p",
      text: "A selector is a label query. A Service uses spec.selector to decide which Pods receive traffic. kubectl uses -l the same way. ReplicaSets (owned by Deployments) also use selectors to know which Pods they own.",
    },
    {
      type: "code",
      caption: "Service selector must match Pod labels",
      code: `apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  selector:
    app: api          # must match Pod template labels
  ports:
    - port: 80
      targetPort: 8080
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api        # ReplicaSet watches Pods with this label
  template:
    metadata:
      labels:
        app: api      # Pods get this label — Service must match here
    spec:
      containers:
        - name: api
          image: nginx:1.27
          ports:
            - containerPort: 8080`,
    },
    {
      type: "h2",
      text: "How Deployment and Service connect",
    },
    {
      type: "p",
      text: "The mental model from Service vs Deployment still applies: the Deployment keeps Pods alive; the Service gives them a stable address. Labels are the wire between them. Scale the Deployment and new Pods inherit template labels — the Service picks them up automatically.",
      links: [
        {
          label: "Service vs Deployment",
          href: "/blog/kubernetes-service-vs-deployment",
        },
      ],
    },
    {
      type: "code",
      caption: "Mental model",
      code: `Deployment "api"
  └── Pod template labels: app=api
        ├── Pod api-7f8c9d-xk2lm  labels: app=api
        └── Pod api-7f8c9d-mn4pq  labels: app=api

Service "api"  selector: app=api
        │
        └── Endpoints → both Pod IPs`,
    },
    {
      type: "h2",
      text: "kubectl commands that stick",
    },
    {
      type: "p",
      text: "These four commands are the beginner debugging loop for “Service exists but nothing works.” Run them in order before you change YAML.",
    },
    {
      type: "code",
      caption: "See labels, selectors, and Endpoints",
      code: `# 1) What labels do my Pods have?
kubectl get pods -n staging --show-labels
kubectl get pods -l app=api -n staging

# 2) What does the Service select?
kubectl get svc api -n staging -o yaml | grep -A3 selector

# 3) Which Pod IPs are registered?
kubectl get endpoints api -n staging
kubectl get endpointslices -l kubernetes.io/service.name=api -n staging

# 4) Do Pod labels match the Service selector?
kubectl get pods -n staging -l app=api --show-labels
kubectl describe svc api -n staging`,
    },
    {
      type: "h2",
      text: "Reading Endpoints output",
    },
    {
      type: "p",
      text: "Endpoints (or EndpointSlices) list the Pod IPs behind a Service. If ADDRESSES is empty or <none>, the Service selector did not match any Pod — even if kubectl get pods shows Running Pods with a similar name.",
    },
    {
      type: "code",
      caption: "Healthy vs broken",
      code: `# Healthy — Pod IPs listed
NAME   ENDPOINTS                     AGE
api    10.244.1.12:8080,10.244.2.8:8080   5m

# Broken — selector mismatch (very common)
NAME   ENDPOINTS   AGE
api    <none>      5m`,
    },
    {
      type: "h2",
      text: "matchLabels vs matchExpressions (beginner view)",
    },
    {
      type: "ul",
      items: [
        "matchLabels — equality only (app: api). Enough for most apps.",
        "matchExpressions — In, NotIn, Exists, DoesNotExist for advanced filtering.",
        "Beginners: make Deployment template labels and Service selector identical with matchLabels first.",
      ],
    },
    {
      type: "code",
      caption: "matchExpressions example (optional)",
      code: `selector:
  matchExpressions:
    - key: app
      operator: In
      values:
        - api
        - api-canary`,
    },
    {
      type: "h2",
      text: "Common beginner mistakes",
    },
    {
      type: "ul",
      items: [
        "Labels on the Deployment metadata but not on spec.template.metadata.labels — Service cannot see them on Pods",
        "Typo: app: api on Pods but app:api or app: Api on the Service selector (labels are case-sensitive)",
        "Changing the Service name and assuming DNS follows Pod names — clients dial the Service name; labels do the matching",
        "Running Pods from an old ReplicaSet after a label change — Endpoints update only for Pods that still match",
        "Using kubectl get pods without -l and missing that the Running Pod has different labels than you think",
      ],
    },
    {
      type: "h2",
      text: "When labels matter beyond Services",
    },
    {
      type: "ul",
      items: [
        "kubectl logs and exec with -l app=api — target the right Pod among replicas",
        "NetworkPolicy and some Ingress controllers select workloads by labels",
        "Prometheus ServiceMonitor and Helm charts often assume standard labels like app.kubernetes.io/name",
      ],
    },
    {
      type: "h2",
      text: "Same checks in natural language (optional)",
    },
    {
      type: "p",
      text: "kprompt resolves label phrases in read prompts. Mutations still show a plan and ask for approval on a TTY.",
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
      code: `kprompt "list pods with label app=api in staging"
kprompt "describe service api in staging"
kprompt "get endpoints for api in staging"
kprompt "explain why service api has no endpoints in staging"`,
    },
    {
      type: "h2",
      text: "What to learn next",
    },
    {
      type: "p",
      text: "Labels connect Deployments to Services. Next, configure apps with ConfigMaps and Secrets (env vars and mounted files). For deeper kubectl reading, see kubectl get pods explained and the troubleshooting guides when Pods misbehave.",
      links: [
        {
          label: "Service vs Deployment",
          href: "/blog/kubernetes-service-vs-deployment",
        },
        {
          label: "Services",
          href: "/blog/what-is-a-kubernetes-service",
        },
        {
          label: "Namespaces",
          href: "/blog/kubernetes-namespaces-explained",
        },
        {
          label: "kubectl get pods explained",
          href: "/blog/kubectl-get-pods-explained",
        },
        {
          label: "Kubernetes OOMKilled guide",
          href: "/blog/kubernetes-oomkilled",
        },
        {
          label: "ImagePullBackOff guide",
          href: "/blog/kubernetes-imagepullbackoff",
        },
      ],
    },
  ],
};

export default post;
