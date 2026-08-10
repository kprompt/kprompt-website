import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-service-vs-deployment",
    title:
      "Kubernetes Service vs Deployment: roles, not rivals",
    description:
      "Service vs Deployment in Kubernetes: Deployments run and update Pods; Services give those Pods a stable network identity. When you need each, how they connect via labels, and kubectl checks that stick.",
    publishedAt: "2026-08-02",
    author: EMIRE_BARIS,
    tags: ["kubernetes", "beginner", "kubectl", "devops", "networking"],
    keywords: [
      "kubernetes service vs deployment",
      "service vs deployment kubernetes",
      "deployment vs service kubernetes",
      "what is a deployment in kubernetes",
      "kubernetes service and deployment",
      "do i need a service and deployment",
      "kubectl get svc deployment",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "Searches like kubernetes service vs deployment sound like a bake-off. They are not competitors. A Deployment keeps your Pods running and updated. A Service is how other workloads (and sometimes the outside world) reach those Pods with a stable name. Most real apps need both.",
      },
      {
        type: "p",
        text: "If you still need the Pod vs Deployment basics, start there. If you need networking detail (ClusterIP, selectors, Endpoints), use the Service guide. This page is the decision rule that connects them.",
        links: [
          {
            label: "Pod vs Deployment basics",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          {
            label: "Service guide",
            href: "/blog/what-is-a-kubernetes-service",
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
          "Deployment = desired Pod count + rollout/self-heal for your app containers",
          "Service = stable DNS/IP in front of Pods selected by labels",
          "Deployment without Service → app runs, but nothing has a stable way to call it",
          "Service without matching Pods → DNS exists, Endpoints empty, connections fail",
        ],
      },
      {
        type: "h2",
        text: "Side-by-side",
      },
      {
        type: "table",
        headers: ["", "Deployment", "Service"],
        rows: [
          [
            "Job",
            "Create/maintain Pods from a template",
            "Route traffic to matching Pods",
          ],
          [
            "API group",
            "apps/v1",
            "v1 (core)",
          ],
          [
            "Stability",
            "Object name stable; Pod names change",
            "ClusterIP/DNS stable while Service exists",
          ],
          [
            "Scales",
            "replicas field",
            "Does not create Pods — only targets them",
          ],
          [
            "Typical kubectl",
            "kubectl get deploy / rollout status",
            "kubectl get svc / get endpoints",
          ],
        ],
      },
      {
        type: "h2",
        text: "How they connect",
      },
      {
        type: "p",
        text: "The glue is labels. The Deployment’s Pod template sets labels (for example app: api). The Service’s selector asks for the same labels. Scale the Deployment and the Service automatically includes the new Pods — you do not edit the Service for each replica.",
      },
      {
        type: "code",
        caption: "See both sides of the link",
        code: `kubectl get deploy api -n default
kubectl get pods -l app=api -n default --show-labels
kubectl get svc api -n default
kubectl get endpoints api -n default`,
      },
      {
        type: "h2",
        text: "When you need which",
      },
      {
        type: "ul",
        items: [
          "Running a stateless web/API app in the cluster → Deployment (+ usually a Service)",
          "Calling that app from another Pod by a stable name → Service (ClusterIP)",
          "Exposing to a cloud load balancer → Service type LoadBalancer (still backed by Deployment Pods)",
          "One-off debug container → often a bare Pod; skip Service unless something must dial it",
          "Batch/job work → Job/CronJob, not Deployment; Service only if something must reach those Pods",
        ],
      },
      {
        type: "h2",
        text: "Common mix-ups",
      },
      {
        type: "ul",
        items: [
          "“I created a Deployment, why can’t I curl it?” → you need a Service (or port-forward to a Pod)",
          "“Service is up but connection refused” → check Endpoints; selector/labels or targetPort may be wrong",
          "Editing the Service to “scale” → scale the Deployment replicas instead",
          "Treating the Deployment name as a DNS name → DNS points at the Service name",
        ],
      },
      {
        type: "h2",
        text: "Optional natural-language checks",
      },
      {
        type: "p",
        text: "kprompt can list and describe both objects as reads. Mutations still produce a plan you approve.",
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
        code: `kprompt "list deployments and services in staging"
kprompt "describe deployment api and service api in default"
kprompt "explain why service api has no endpoints" -n staging`,
      },
      {
        type: "h2",
        text: "What to read next",
      },
      {
        type: "p",
        text: "Deepen workloads with Pods vs Deployments, networking with the Service guide, then Namespaces. For day-2 tooling after the basics, see kubectl vs K9s or the Kubernetes AI tools map.",
        links: [
          {
            label: "Pods vs Deployments",
            href: "/blog/kubernetes-pods-vs-deployments",
          },
          {
            label: "Service guide",
            href: "/blog/what-is-a-kubernetes-service",
          },
          {
            label: "Namespaces",
            href: "/blog/kubernetes-namespaces-explained",
          },
          {
            label: "kubectl vs K9s",
            href: "/blog/kubectl-vs-k9s",
          },
          {
            label: "Kubernetes AI tools map",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
        ],
      },
    ],
  };

export default post;
