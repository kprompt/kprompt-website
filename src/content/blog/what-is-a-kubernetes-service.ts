import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
    slug: "what-is-a-kubernetes-service",
    title:
      "What is a Kubernetes Service? A beginner guide to stable networking",
    description:
      "Why Pod IPs are not enough, what a Service does, ClusterIP vs NodePort vs LoadBalancer, selectors and Endpoints, kubectl commands, and optional natural-language checks with kprompt.",
    publishedAt: "2026-08-01",
    author: EMIRE_BARIS,
    tags: ["kubernetes", "beginner", "kubectl", "devops", "networking"],
    keywords: [
      "what is a kubernetes service",
      "kubernetes service explained",
      "kubernetes service vs deployment",
      "service vs deployment kubernetes",
      "clusterip nodeport loadbalancer",
      "kubernetes service selector",
      "kubectl get services",
      "pod ip vs service",
      "kubernetes networking beginner",
      "kubernetes endpoints",
    ],
    updatedAt: "2026-08-02",
    blocks: [
      {
        type: "p",
        text: "You learned that Pods run your containers and Deployments keep them running — see Pods vs Deployments if you need a refresher. The next question every beginner hits: how does traffic reach those Pods? Pod IP addresses change. A Service is Kubernetes’ answer — a stable way to send traffic to the right Pods.",
        links: [
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
        ],
      },
      {
        type: "p",
        text: "This guide explains what a Service is, why you need one, how selectors connect Services to Pods, the main Service types, and the kubectl commands that make the relationship visible on a real cluster.",
        links: [
          {
            label: "Kubernetes Service documentation",
            href: "https://kubernetes.io/docs/concepts/services-networking/service/",
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
          "Pods get ephemeral IP addresses — they change when Pods restart.",
          "A Service provides a stable name and IP (or external access) in front of a set of Pods.",
          "You match Services to Pods using labels and selectors — not by hard-coding Pod names.",
        ],
      },
      {
        type: "h2",
        text: "Why Pod IP alone is not enough",
      },
      {
        type: "p",
        text: "Each Pod has its own IP on the cluster network. That sounds fine until a Pod is recreated: new Pod, new IP. If your frontend hard-coded pod-api-7d4f8b9c-xk2lm:8080, the next restart breaks the connection.",
      },
      {
        type: "ul",
        items: [
          "Deployments replace Pods — IP addresses are not stable identifiers",
          "Multiple replicas mean multiple Pod IPs — clients need one entry point",
          "Services abstract away which specific Pod answers a request",
        ],
      },
      {
        type: "h2",
        text: "What is a Service?",
      },
      {
        type: "p",
        text: "A Service is a Kubernetes API object that defines a logical set of Pods and a policy to access them. Inside the cluster, other workloads usually reach your app at a DNS name like api.default.svc.cluster.local — backed by the Service, not a single Pod.",
      },
      {
        type: "code",
        caption: "Mental model",
        code: `Client / another Pod
        │
        ▼
   Service "api"  (stable ClusterIP + DNS)
        │
        ├── Pod api-aaa111
        ├── Pod api-bbb222
        └── Pod api-ccc333`,
      },
      {
        type: "h2",
        text: "Selectors: how the Service finds Pods",
      },
      {
        type: "p",
        text: "A Service does not list Pod names. It uses a label selector. Your Deployment labels Pods with app: api; the Service selects app: api. When replicas scale up or Pods restart, the Service automatically includes matching Pods.",
      },
      {
        type: "code",
        caption: "Minimal Service YAML",
        code: `apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: default
spec:
  selector:
    app: api          # must match Pod template labels
  ports:
    - port: 80        # Service port
      targetPort: 8080 # container port
  type: ClusterIP`,
      },
      {
        type: "p",
        text: "If selector labels do not match any Pod, the Service exists but nothing receives traffic — a very common beginner bug.",
      },
      {
        type: "h2",
        text: "Service types (beginner view)",
      },
      {
        type: "table",
        headers: ["Type", "Who can reach it", "Typical use"],
        rows: [
          [
            "ClusterIP (default)",
            "Other Pods inside the cluster",
            "Internal microservice-to-microservice traffic",
          ],
          [
            "NodePort",
            "External clients via node IP + high port",
            "Dev/demo, quick external access (not ideal for prod alone)",
          ],
          [
            "LoadBalancer",
            "External clients via cloud load balancer",
            "Public HTTP APIs on AWS/GCP/Azure",
          ],
        ],
      },
      {
        type: "p",
        text: "Most in-cluster traffic uses ClusterIP. You expose to the internet with LoadBalancer (or Ingress on top — a later topic).",
      },
      {
        type: "h2",
        text: "Endpoints: proof the Service has backends",
      },
      {
        type: "p",
        text: "Kubernetes maintains an Endpoints (or EndpointSlice) object listing the Pod IPs that match the Service selector. If Endpoints is empty, your Service has no backends — check labels on the Deployment template and the Service selector.",
      },
      {
        type: "code",
        caption: "Inspect Services and backends",
        code: `kubectl get services
kubectl get svc -n staging
kubectl describe service api -n default

kubectl get endpoints api -n default
kubectl get pods -l app=api -n default --show-labels`,
      },
      {
        type: "h2",
        text: "Common beginner mistakes",
      },
      {
        type: "ul",
        items: [
          "Service selector does not match Pod labels → Endpoints empty, connection refused",
          "targetPort wrong → Service forwards to a port nothing listens on",
          "Calling a Pod IP directly in config instead of the Service name",
          "Expecting ClusterIP to be reachable from your laptop without port-forward or LoadBalancer",
        ],
      },
      {
        type: "h2",
        text: "Same checks in natural language (optional)",
      },
      {
        type: "p",
        text: "kprompt turns plain English into a reviewable plan before anything reaches the cluster. Listing and describing Services is read-only. Mutations still require approval.",
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
        code: `kprompt "list services in staging"
kprompt "describe service api in default"
kprompt "get endpoints for api in staging"`,
      },
      {
        type: "h2",
        text: "What to learn next",
      },
      {
        type: "p",
        text: "Pods run workloads. Deployments keep Pod counts stable. Services give those Pods a stable address inside (and sometimes outside) the cluster. Still mixing Service and Deployment? Read Service vs Deployment. Next in this beginner series: Namespaces — how to organize resources across teams and environments.",
        links: [
          {
            label: "Service vs Deployment",
            href: "/blog/kubernetes-service-vs-deployment",
          },
          {
            label: "Namespaces",
            href: "/blog/kubernetes-namespaces-explained",
          },
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          {
            label: "Kubernetes AI tools",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
          { label: "Docs overview", href: "/docs" },
        ],
      },
    ],
  };

export default post;
