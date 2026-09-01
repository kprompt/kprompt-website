import type { BlogPost } from "@/lib/blog-types";
import { EMIRE_BARIS } from "@/lib/team";

const post: BlogPost = {
  slug: "kubectl-describe-explained-beginners",
  title:
    "kubectl describe explained: what to look for on Pods and Deployments",
  description:
    "kubectl describe vs get: how to read Pod and Deployment output, Events, Conditions, lastState, and which command to run next. Optional kprompt examples.",
  publishedAt: "2026-09-01",
  author: EMIRE_BARIS,
  tags: ["kubernetes", "beginner", "kubectl", "devops", "troubleshooting"],
  keywords: [
    "kubectl describe",
    "kubectl describe pod",
    "kubectl describe deployment",
    "kubectl describe explained",
    "kubernetes describe output",
    "kubectl describe events",
    "pod conditions kubernetes",
    "kubernetes beginner kubectl",
  ],
  blocks: [
    {
      type: "p",
      text: "kubectl get pods tells you something is wrong. kubectl describe tells you why. If STATUS, READY, or RESTARTS already confuse you, start with kubectl get pods explained — then come back here for the next command.",
      links: [
        {
          label: "kubectl get pods explained",
          href: "/blog/kubectl-get-pods-explained",
        },
      ],
    },
    {
      type: "p",
      text: "This guide is a beginner walkthrough of describe on Pods and Deployments: what each section means, which lines matter first, and what to run after you finish reading. Official reference: kubectl describe.",
      links: [
        {
          label: "kubectl describe",
          href: "https://kubernetes.io/docs/reference/kubectl/generated/kubectl_describe/",
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
        "get — a table: is it Running, Pending, CrashLoopBackOff?",
        "describe — the story: Events, Conditions, lastState, image, probes, mounts.",
        "Read Events from the bottom. Then logs. Then change one thing.",
      ],
    },
    {
      type: "h2",
      text: "get vs describe",
    },
    {
      type: "table",
      headers: ["", "kubectl get", "kubectl describe"],
      rows: [
        ["Shape", "One-line table", "Multi-section dump"],
        ["Best for", "Scan many objects", "Debug one object"],
        ["Shows Events?", "No (use get events)", "Yes — last lines of describe"],
        ["Shows Conditions?", "Only READY in the table", "Yes — Ready, Scheduled, …"],
        ["Shows last crash?", "RESTARTS count only", "lastState / Last Termination"],
      ],
    },
    {
      type: "code",
      caption: "Namespace matters — same as get",
      code: `kubectl describe pod api-7d9f8c6b5-xk2n1 -n staging
kubectl describe deploy api -n staging
kubectl describe svc api -n staging
kubectl describe cm api-config -n staging`,
    },
    {
      type: "p",
      text: "Prefer a name from get. For many replicas, pick one unhealthy Pod: kubectl get pods -l app=api -n staging, then describe that name. Labels and selectors explained covers -l.",
      links: [
        {
          label: "labels and selectors explained",
          href: "/blog/kubernetes-labels-and-selectors-explained",
        },
      ],
    },
    {
      type: "h2",
      text: "Describe a Pod — read in this order",
    },
    {
      type: "p",
      text: "Do not start at the top and grind through every field. Jump in this order: Status / Node (is it scheduled?), Containers → State and Last State, Conditions, then Events at the bottom.",
    },
    {
      type: "h3",
      text: "Status, node, and IP",
    },
    {
      type: "p",
      text: "If Status is Pending and Node is empty, the scheduler has not placed the Pod. Events will usually say FailedScheduling (CPU, memory, taints, or PVC). If Node is set but Status is CrashLoopBackOff, the Pod is on a node and the container keeps dying — skip to lastState and logs.",
    },
    {
      type: "h3",
      text: "Containers: State, Last State, Restart Count",
    },
    {
      type: "p",
      text: "This block is the reason describe exists. State is now. Last State is the crash you just missed.",
    },
    {
      type: "code",
      caption: "Typical crash block (abbreviated)",
      code: `Containers:
  api:
    Image:          ghcr.io/example/api:1.4.2
    State:          Waiting
      Reason:       CrashLoopBackOff
    Last State:     Terminated
      Reason:       Error
      Exit Code:    1
      Finished:     Mon, 01 Sep 2026 10:12:03 +0000
    Restart Count:  6`,
    },
    {
      type: "ul",
      items: [
        "Exit Code 1 (or other app codes) — process crashed; read logs --previous.",
        "Exit Code 137 — often OOMKilled (128 + 9). Confirm in Reason and the OOMKilled guide.",
        "Exit Code 143 — SIGTERM (128 + 15); often a probe or a rollout, not a random crash.",
        "ImagePullBackOff here — wrong image, tag, or registry auth; see ImagePullBackOff.",
      ],
    },
    {
      type: "p",
      text: "Also check the Image line. A typo in the tag is a describe finding, not a “Kubernetes is broken” finding.",
    },
    {
      type: "h3",
      text: "Conditions",
    },
    {
      type: "table",
      headers: ["Condition", "True means", "If False, look at"],
      rows: [
        ["PodScheduled", "A node accepted the Pod", "Events: FailedScheduling"],
        ["Initialized", "Init containers finished", "Init container State / logs"],
        ["ContainersReady", "App containers report ready", "Probes, crashes, ports"],
        ["Ready", "Pod can receive Service traffic", "Readiness probe + Service selector"],
      ],
    },
    {
      type: "p",
      text: "Ready False while Running is common: the process is up, the readiness probe fails, the Service has no Endpoints. That is a Service problem as much as a Pod problem — see What is a Kubernetes Service.",
      links: [
        {
          label: "What is a Kubernetes Service",
          href: "/blog/what-is-a-kubernetes-service",
        },
      ],
    },
    {
      type: "h3",
      text: "Events (read the bottom first)",
    },
    {
      type: "p",
      text: "Events are the cluster’s recent comments. They age out. If describe Events is empty, run kubectl get events -n staging --sort-by=.lastTimestamp and look at the tail.",
    },
    {
      type: "code",
      caption: "Events you will actually see",
      code: `Events:
  Type     Reason            Age   From               Message
  ----     ------            ----  ----               -------
  Normal   Scheduled         4m    default-scheduler  Successfully assigned staging/api-… to node-2
  Normal   Pulled            3m    kubelet            Successfully pulled image
  Normal   Created           3m    kubelet            Created container api
  Normal   Started           3m    kubelet            Started container api
  Warning  Unhealthy         90s   kubelet            Readiness probe failed: HTTP 500
  Warning  BackOff           40s   kubelet            Back-off restarting failed container api`,
    },
    {
      type: "ul",
      items: [
        "FailedScheduling — not enough CPU/memory, taint, or unbound PVC.",
        "FailedCreatePodSandBox / network — CNI; not an app log problem.",
        "Unhealthy — probe failed (liveness restarts; readiness drops traffic).",
        "BackOff / CrashLoopBackOff — kubelet waiting; the cause is Last State + logs.",
        "FailedMount — ConfigMap, Secret, or volume name mismatch. See ConfigMap vs Secret.",
      ],
    },
    {
      type: "h2",
      text: "Describe a Deployment",
    },
    {
      type: "p",
      text: "Describe the Deployment when many Pods look wrong, or when a rollout is stuck. You want replica counts and Deployment conditions — not every Pod field. Refresh What is a Deployment if replicas vs Pods is still fuzzy.",
      links: [
        {
          label: "What is a Deployment",
          href: "/blog/what-is-a-kubernetes-deployment",
        },
      ],
    },
    {
      type: "code",
      caption: "What to extract from describe deploy",
      code: `kubectl describe deploy api -n staging
# Replicas:               3 desired | 3 updated | 2 total | 1 available | 1 unavailable
# Conditions:
#   Type           Status  Reason
#   Progressing    True    NewReplicaSetAvailable
#   Available      False   MinimumReplicasUnavailable
# OldReplicaSets / NewReplicaSet  — which revision is live`,
    },
    {
      type: "ul",
      items: [
        "desired > available — some Pods are not Ready (probes, crashes, Pending).",
        "updated != desired during a rollout — wait, or describe the new Pods.",
        "OldReplicaSets still listed — a previous revision has Pods; labels may have changed.",
      ],
    },
    {
      type: "p",
      text: "Then describe one bad Pod from that Deployment. Deployment describe does not replace Pod Events.",
    },
    {
      type: "h2",
      text: "After describe — what to run next",
    },
    {
      type: "table",
      headers: ["You saw", "Next command", "Then read"],
      rows: [
        [
          "CrashLoop / Exit Code 1",
          "kubectl logs POD -n staging --previous --tail=200",
          "CrashLoopBackOff guide",
        ],
        [
          "OOMKilled / exit 137",
          "describe again — memory limit vs usage",
          "OOMKilled guide",
        ],
        [
          "ImagePullBackOff",
          "check Image: line and imagePullSecrets",
          "ImagePullBackOff guide",
        ],
        [
          "FailedScheduling",
          "kubectl describe node NODE (or get events)",
          "requests vs cluster free capacity",
        ],
        [
          "Ready False, Running",
          "readiness probe path/port; kubectl get endpoints",
          "Service vs Deployment",
        ],
        [
          "FailedMount",
          "describe the ConfigMap or Secret name in the Event",
          "ConfigMap vs Secret",
        ],
      ],
    },
    {
      type: "code",
      caption: "The beginner loop",
      code: `kubectl get pods -n staging
kubectl describe pod POD_NAME -n staging
kubectl logs POD_NAME -n staging --tail=200
kubectl logs POD_NAME -n staging --previous
kubectl get events -n staging --sort-by=.lastTimestamp`,
    },
    {
      type: "h2",
      text: "Common beginner mistakes",
    },
    {
      type: "ul",
      items: [
        "Reading only the top of describe and skipping Events.",
        "Describing the Deployment and never describing a Pod — Events live on the Pod.",
        "Forgetting -n and describing a name that exists in default, not staging.",
        "Looking at current logs after a crash — you need --previous for the dead container.",
        "Treating Warning Events as noise. Age matters: a Warning from 20 minutes ago may be the cause.",
        "Editing YAML before you can point at one Event line. Describe first, change second.",
      ],
    },
    {
      type: "h2",
      text: "Same checks in natural language (optional)",
    },
    {
      type: "p",
      text: "kprompt can run the describe/logs loop as a read. Mutations still show a plan and ask for approval on a TTY.",
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
      code: `kprompt "describe pod for deployment api in staging"
kprompt "describe deployment api in staging"
kprompt "show events for api in staging"
kprompt "explain why api pods are crashing in staging"`,
    },
    {
      type: "h2",
      text: "What to learn next",
    },
    {
      type: "p",
      text: "You can now move from the get table to a describe story. The next beginner posts in this track are not published yet: Kubernetes requests and limits, then liveness vs readiness probes. Until those ship, go deeper on the failures describe already pointed at: CrashLoopBackOff, ImagePullBackOff, and OOMKilled. If you skipped the table, start with kubectl get pods explained.",
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
        {
          label: "kubectl get pods explained",
          href: "/blog/kubectl-get-pods-explained",
        },
      ],
    },
  ],
};

export default post;
