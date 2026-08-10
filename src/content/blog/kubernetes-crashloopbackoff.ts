import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-crashloopbackoff",
    title:
      "Kubernetes CrashLoopBackOff: how to read it, find the cause, and fix it",
    description:
      "CrashLoopBackOff is a symptom, not a cause. How the restart backoff works, what exit codes tell you, the kubectl ladder for finding the real failure, and how to apply a bounded fix you actually reviewed.",
    publishedAt: "2026-07-26",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "troubleshooting",
      "devops",
      "sre",
      "kubectl",
    ],
    keywords: [
      "kubernetes crashloopbackoff",
      "crashloopbackoff fix",
      "pod crashloopbackoff",
      "what is crashloopbackoff",
      "kubectl logs previous",
      "container exit code 1",
      "crashloopbackoff exit code 137",
      "kubernetes pod restarting",
      "back-off restarting failed container",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "CrashLoopBackOff is the most recognisable failure state in Kubernetes and one of the most misread. It is not an error code from your application. It is Kubernetes telling you that a container keeps exiting and that the kubelet is now waiting longer between restart attempts. The cause is somewhere else entirely — usually in the logs of the instance that already died.",
      },
      {
        type: "p",
        text: "This guide is the operator ladder: what the state actually means, how to read the exit code, how to get the logs of the crashed container rather than the starting one, and how to make a bounded change you reviewed first.",
        links: [
          {
            label: "Pod lifecycle",
            href: "https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/",
          },
        ],
      },
      {
        type: "h2",
        text: "What CrashLoopBackOff actually means",
      },
      {
        type: "p",
        text: "With the default restartPolicy of Always, the kubelet restarts a container that exits — for any reason, including a clean exit 0. If it keeps exiting, the kubelet applies an exponential backoff between attempts instead of hammering the node. The Pod reports CrashLoopBackOff while it waits.",
      },
      {
        type: "ul",
        items: [
          "The container started — this is not a scheduling or image problem (that would be Pending or ImagePullBackOff)",
          "The restart count climbs and the gap between restarts grows",
          "Kubernetes is behaving correctly; your container is the thing that is unhappy",
          "A container that exits 0 immediately still loops, because Always means always",
        ],
      },
      {
        type: "h2",
        text: "Read the exit code first",
      },
      {
        type: "p",
        text: "The exit code narrows the search dramatically before you read a single log line. It lives under the container's Last State in describe output.",
      },
      {
        type: "table",
        headers: ["Exit code", "Usually means", "Where to look next"],
        rows: [
          [
            "1",
            "Application error — unhandled exception, failed startup check",
            "Logs of the previous container",
          ],
          [
            "137",
            "SIGKILL — most often OOMKilled at the memory limit",
            "Last State reason and memory limits",
          ],
          [
            "143",
            "SIGTERM — terminated, often during shutdown handling",
            "Probe config and graceful shutdown code",
          ],
          [
            "126 / 127",
            "Command not executable or not found",
            "Image entrypoint, command, and PATH",
          ],
          [
            "0",
            "Clean exit, but restartPolicy keeps restarting it",
            "Whether this should be a Job instead of a Deployment",
          ],
        ],
      },
      {
        type: "p",
        text: "If you see 137, you are probably not debugging a crash loop at all — you are debugging a memory kill that presents as one. That has its own ladder.",
        links: [
          {
            label: "own ladder",
            href: "/blog/kubernetes-oomkilled",
          },
        ],
      },
      {
        type: "h2",
        text: "The kubectl ladder",
      },
      {
        type: "p",
        text: "The single most common mistake is running kubectl logs and seeing nothing useful, because that returns the currently starting container — not the one that crashed. You almost always want --previous.",
      },
      {
        type: "code",
        caption: "Confirm the state, then read the right logs",
        code: `kubectl get pods -n payments

kubectl describe pod -l app=api -n payments
# Containers → Last State:
#   Reason: Error
#   Exit Code: 1

# logs of the instance that actually died
kubectl logs -l app=api -n payments --previous --tail=100`,
      },
      {
        type: "ul",
        items: [
          "Scope — which Deployment, namespace, and kubeconfig context",
          "Status — restart count, Ready, Last State reason and exit code",
          "Logs — always with --previous for a looping container",
          "Events — Back-off restarting failed container, probe failures, image errors",
          "Config — env vars, mounted Secrets and ConfigMaps, entrypoint",
          "Dependencies — is it dying because something it connects to is unreachable?",
        ],
      },
      {
        type: "code",
        caption: "Events tell you what the kubelet is doing",
        code: `kubectl get events -n payments --sort-by='.lastTimestamp' | tail -20
# Warning  BackOff  Back-off restarting failed container api`,
      },
      {
        type: "h2",
        text: "The five causes that cover most crash loops",
      },
      {
        type: "h3",
        text: "1. A dependency is not reachable",
      },
      {
        type: "p",
        text: "The container starts, tries to connect to a database or cache, fails, and exits. The log line is usually explicit — connection refused, no such host, timeout. Check that the Service name resolves and that the dependency is actually Ready before you touch the crashing workload.",
      },
      {
        type: "h3",
        text: "2. Missing or wrong configuration",
      },
      {
        type: "p",
        text: "A required environment variable is unset, a Secret key was renamed, or a mounted ConfigMap does not have the file the app expects. These fail fast on startup, which is why the logs are short and the restart count is high.",
      },
      {
        type: "h3",
        text: "3. Memory limit too low",
      },
      {
        type: "p",
        text: "Exit code 137 with reason OOMKilled. Raising the limit may be correct, or it may be hiding a leak. Compare observed usage to the limit before doubling anything.",
      },
      {
        type: "h3",
        text: "4. A bad probe configuration",
      },
      {
        type: "p",
        text: "A liveness probe that starts checking before the app can answer will kill a healthy-but-slow container forever. If the app works when you exec into it but the kubelet keeps restarting it, suspect initialDelaySeconds, the probe path, or the port.",
      },
      {
        type: "h3",
        text: "5. A bad release",
      },
      {
        type: "p",
        text: "It worked an hour ago. Nothing about the cluster changed. In that case the fastest safe action is usually to roll back, then debug the image on your own time rather than during the incident.",
      },
      {
        type: "h2",
        text: "Reproduce it on purpose before you need to",
      },
      {
        type: "p",
        text: "The best time to practise this ladder is when nothing is actually on fire. kprompt-examples ships a CrashLoopBackOff fixture: the api container logs a connection attempt, reports connection refused to its database, then exits 1 — exactly the shape you meet in production.",
        links: [
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
        ],
      },
      {
        type: "code",
        caption: "A real crash loop in a kind cluster",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=01-crashloop && make verify

kubectl describe pod -l app=api -n payments
kubectl logs -l app=api -n payments --previous
make fix SCENARIO=01-crashloop`,
      },
      {
        type: "h2",
        text: "Asking in natural language instead",
      },
      {
        type: "p",
        text: "The ladder above is mechanical, which is exactly why it is worth compiling. kprompt's explain path walks Deployment → ReplicaSet → Pods → Events → Logs and reports what it found, including the previous container's output. Reads run immediately — there is nothing to approve when nothing changes.",
        links: [
          { label: "commands", href: "/docs/commands" },
        ],
      },
      {
        type: "code",
        caption: "Explain is read-only",
        code: `kprompt "explain why api is crashing" -n payments
kprompt "logs api" -n payments
kprompt "why is api not ready" -n payments`,
      },
      {
        type: "p",
        text: "When the right fix is a mutation — roll back, raise a limit, correct replicas — it becomes a plan with a diff and a risk verdict that you approve. That boundary is the point: the model can be wrong about the cause, and you still see exactly what would change before it changes.",
        links: [{ label: "safety model", href: "/docs/safety" }],
      },
      {
        type: "code",
        caption: "A rollback you review first",
        code: `$ kprompt "rollback api" -n payments

Plan
  1. rollout undo Deployment/api

Risk: medium
Apply? [y/N]`,
      },
      {
        type: "h2",
        text: "What not to do",
      },
      {
        type: "ul",
        items: [
          "Do not delete the Pod and hope — the Deployment recreates it and the loop returns",
          "Do not remove the liveness probe to stop the restarts; you are deleting the alarm, not the fire",
          "Do not raise memory limits reflexively unless the exit code and reason actually say OOMKilled",
          "Do not read kubectl logs without --previous and conclude there are no logs",
          "Do not approve an AI-suggested plan you have not sanity-checked against the evidence",
        ],
      },
      {
        type: "h2",
        text: "Related reading",
      },
      {
        type: "p",
        text: "For memory kills specifically, see the OOMKilled guide. For a wider prompt catalogue across failure modes, see the error prompt playbook. For always-on namespace watching that groups restarts into one Incident instead of paging per restart, see the Observe agent docs.",
        links: [
          { label: "OOMKilled guide", href: "/blog/kubernetes-oomkilled" },
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          { label: "Observe agent docs", href: "/docs/agent" },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  };

export default post;
