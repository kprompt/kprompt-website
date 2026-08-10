import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-oomkilled",
    title:
      "Kubernetes OOMKilled: how to detect memory kills, raise limits, and avoid guesswork",
    description:
      "A practical guide to OOMKilled in Kubernetes — exit 137, Last State, memory requests vs limits, kubectl checks, and how kprompt explain can suggest a reviewable memory patch.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "kubectl",
    ],
    keywords: [
      "kubernetes oomkilled",
      "oomkilled exit 137",
      "kubernetes memory limit",
      "pod oomkilled",
      "raise memory kubernetes",
      "container killed memory",
      "kubectl describe oom",
      "kubernetes resource limits",
      "crashloopbackoff oom",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "OOMKilled is one of the most common “the app is broken” signals in Kubernetes — and one of the easiest to misread. The Pod may still show Running. Restarts climb. Logs look fine until they stop mid-request. Someone raises the memory limit “a bit,” the Deployment rolls, and two hours later it happens again. Or worse: they remove the limit entirely and the node starts evicting neighbors.",
      },
      {
        type: "p",
        text: "This guide is the operator ladder for memory kills: how to confirm OOMKilled, how requests and limits differ, what kubectl shows, and how to apply a bounded fix with a reviewable plan. kprompt's explain path detects OOM findings and can propose a memory patch — still behind approval, because raising limits is a real cluster change.",
        links: [
          {
            label: "Kubernetes resource management",
            href: "https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
          },
        ],
      },
      {
        type: "h2",
        text: "What OOMKilled actually means",
      },
      {
        type: "p",
        text: "When a container exceeds its memory limit, the Linux OOM killer (via cgroup enforcement) terminates the process. Kubernetes records the termination reason as OOMKilled. Exit code is often 137 (128 + SIGKILL). That is not an application “bug code” — it is the kernel saying the cgroup ran out of memory.",
      },
      {
        type: "ul",
        items: [
          "Limit hit → container killed → kubelet may restart it (CrashLoopBackOff if it keeps dying)",
          "No memory limit → the container can grow until the node is under pressure (evictions, not always a clean OOMKilled on that Pod)",
          "Requests affect scheduling; limits affect kill behavior — confusing them is the most common ops mistake",
        ],
      },
      {
        type: "h2",
        text: "Confirm it before you patch",
      },
      {
        type: "p",
        text: "Do not raise memory because “it feels like OOM.” Read the Pod status. The smoking gun is usually Last State / Last Termination State on the container: Reason OOMKilled, Exit Code 137.",
      },
      {
        type: "code",
        caption: "Classic kubectl confirmation",
        code: `kubectl get pods -n staging
kubectl describe pod -l app=api -n staging
# Look under Containers → Last State:
#   Reason: OOMKilled
#   Exit Code: 137

kubectl get pod -n staging -o jsonpath='{range .items[*]}{.metadata.name}{"\\t"}{range .status.containerStatuses[*]}{.name}{"="}{.lastState.terminated.reason}{" "}{end}{"\\n"}{end}'`,
      },
      {
        type: "p",
        text: "Also check current limits on the Deployment template — describe Pod shows what ran; the Deployment owns what will run next:",
      },
      {
        type: "code",
        caption: "See memory requests and limits",
        code: `kubectl get deploy api -n staging -o jsonpath='{range .spec.template.spec.containers[*]}{.name}{" limits="}{.resources.limits.memory}{" requests="}{.resources.requests.memory}{"\\n"}{end}'`,
      },
      {
        type: "h2",
        text: "Requests vs limits (the part people skip)",
      },
      {
        type: "table",
        headers: ["Field", "What it does", "OOM relevance"],
        rows: [
          [
            "requests.memory",
            "Scheduler places the Pod on a node with enough capacity",
            "Too low → noisy neighbor risk; does not by itself OOMKill",
          ],
          [
            "limits.memory",
            "Hard cgroup cap for the container",
            "Exceed this → OOMKilled",
          ],
          [
            "No limit",
            "Container can use free node memory",
            "May avoid OOMKilled on that Pod; can hurt the node",
          ],
        ],
      },
      {
        type: "p",
        text: "A healthy fix usually raises the limit (and often the request toward a sensible fraction of that limit) based on observed usage — not deleting limits to “make it stop.” If you have Prometheus, compare working set / RSS to the current limit before you double everything.",
      },
      {
        type: "h2",
        text: "kubectl explain ladder for memory kills",
      },
      {
        type: "ul",
        items: [
          "Scope — which Deployment / Pod, which namespace and context",
          "Status — restarts, Ready, Last State reason",
          "Resources — limits and requests on the crashing container",
          "Events — Failed / OOM / eviction messages on Pod or node",
          "Logs — --previous for the crashed instance (may be empty if killed hard)",
          "Change — bump memory or roll back a bad image / leaky release",
        ],
      },
      {
        type: "code",
        caption: "Investigation sequence",
        code: `kubectl describe deploy api -n staging
kubectl describe pod -l app=api -n staging
kubectl logs deploy/api -n staging --previous --tail=100
kubectl get events -n staging --field-selector reason=OOMKilling --sort-by='.lastTimestamp'`,
      },
      {
        type: "h2",
        text: "Natural-language explain → suggested patch",
      },
      {
        type: "p",
        text: "kprompt's explain path walks live Deployment → Pod → Events → Logs style signals. When it finds OOMKilled on a container, it can propose a follow-up: raise the Deployment memory limit (typically doubling a known limit in the suggested plan) and show the plan for approval. Reads run immediately; the patch does not apply until you confirm — or you pass --approve in a context you trust.",
      },
      {
        type: "code",
        caption: "Detect and review a memory fix",
        code: `$ kprompt "explain why api is crashing" -n staging

# … findings include OOMKilled on container app …

Suggested fix (requires approval):
Plan
  1. patch Deployment/api memory limit (e.g. 64Mi → 128Mi)

Risk: medium
Apply? [y/N]`,
      },
      {
        type: "p",
        text: "That is the intent-compiler shape: evidence from the apiserver, a concrete mutation plan, human gate. It is not “the model silently edited production.” If you reject the plan, nothing changes — dig into leaks, heap dumps, or a bad release instead.",
      },
      {
        type: "ul",
        items: [
          "Use explain first on non-production or a staging clone of the workload",
          "Read the before→after memory numbers in the plan — doubling forever is not a strategy",
          "Prefer fixing leaks for steady growth; raise limits for genuine under-provisioning",
          "After apply, use --wait on related rollouts or watch the Deployment until restarts stabilize",
        ],
      },
      {
        type: "h2",
        text: "Manual patch when you want exact numbers",
      },
      {
        type: "p",
        text: "Sometimes you already know the target (512Mi limit, 256Mi request). Use kubectl or a reviewed kprompt plan with an explicit change — do not approve a suggested bump you have not sanity-checked against metrics.",
      },
      {
        type: "code",
        caption: "Explicit memory patch",
        code: `kubectl set resources deploy/api -n staging \\
  --limits=memory=512Mi --requests=memory=256Mi

# or edit the template
kubectl edit deploy api -n staging`,
      },
      {
        type: "h2",
        text: "When raising memory is the wrong fix",
      },
      {
        type: "ul",
        items: [
          "Memory leak — usage climbs until any limit dies; fix the app or roll back the release",
          "Cache without bound — tune the process (JVM heap, Node heap, Go pacer) to fit the cgroup",
          "Wrong container — sidecar OOMs while you patch the app container",
          "Node pressure — Pod evicted or node NotReady; look at node allocatable and neighbors",
          "Burst then idle — a higher limit may be fine; also consider HPA/VPA later, not blind doubles",
        ],
      },
      {
        type: "h2",
        text: "Production habits",
      },
      {
        type: "ul",
        items: [
          "Confirm OOMKilled in Last State before changing resources",
          "Change one variable at a time — memory patch or image rollback, not both blind",
          "Keep limits; size them from data",
          "Record the plan (kprompt history or -o json) for the incident timeline",
          "Revisit after 24h of metrics — did working set settle under the new limit?",
        ],
      },
      {
        type: "h2",
        text: "Try it on a sandbox Deployment",
      },
      {
        type: "p",
        text: "Spin a tiny limit on kind or staging, force an OOM, then run explain and decide whether to approve the suggested patch. Pair with the ImagePullBackOff guide when the Pod never starts, and with the CrashLoopBackOff guide when the memory kill is what keeps the container looping.",
        links: [
          {
            label: "ImagePullBackOff guide",
            href: "/blog/kubernetes-imagepullbackoff",
          },
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          { label: "safety guide", href: "/docs/safety" },
        ],
      },
      {
        type: "code",
        caption: "Quick start",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "explain why api is crashing" -n staging
# review Suggested fix → y or n`,
      },
    ],
  };

export default post;
