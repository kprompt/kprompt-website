import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-imagepullbackoff",
    title:
      "Kubernetes ImagePullBackOff: how to read ErrImagePull and fix the image reference",
    description:
      "ImagePullBackOff means the container never started. How ErrImagePull differs from CrashLoopBackOff, what Events tell you, common causes (bad tag, private registry, rate limit), and how to fix it without guessing.",
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
      "kubernetes imagepullbackoff",
      "errimagepull",
      "imagepullbackoff fix",
      "pod imagepullbackoff",
      "kubernetes failed to pull image",
      "imagepullsecrets",
      "errimagepull private registry",
      "docker hub rate limit kubernetes",
      "back-off pulling image",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "ImagePullBackOff is the failure that looks like a crash loop until you read one field carefully: the container never started. There are no application logs. There is no exit code from your process. The kubelet tried to pull an image, failed, and is now waiting longer between attempts.",
      },
      {
        type: "p",
        text: "This guide is the operator ladder for pull failures: how ErrImagePull and ImagePullBackOff differ, what Events actually say, the five causes that cover most incidents, and how to fix the image reference — by hand or with a reviewable plan.",
        links: [
          {
            label: "Images",
            href: "https://kubernetes.io/docs/concepts/containers/images/",
          },
        ],
      },
      {
        type: "h2",
        text: "ErrImagePull vs ImagePullBackOff",
      },
      {
        type: "table",
        headers: ["Reason", "What it means", "What you do"],
        rows: [
          [
            "ErrImagePull",
            "The latest pull attempt failed",
            "Read the Event message — tag, auth, or network",
          ],
          [
            "ImagePullBackOff",
            "Pulls keep failing; kubelet is backing off",
            "Same root cause — do not wait for it to “heal”",
          ],
          [
            "CrashLoopBackOff",
            "Container started, then exited",
            "Different ladder — logs and exit codes matter",
          ],
        ],
      },
      {
        type: "p",
        text: "If you run kubectl logs and see nothing useful, that is expected here. The container was never created. Look at Events and the Waiting reason instead of --previous.",
        links: [
          {
            label: "CrashLoopBackOff",
            href: "/blog/kubernetes-crashloopbackoff",
          },
        ],
      },
      {
        type: "h2",
        text: "Confirm it in 30 seconds",
      },
      {
        type: "code",
        caption: "Status, then Events",
        code: `kubectl get pods -n payments
# NAME                      READY   STATUS             RESTARTS
# worker-7d9f4c8b9-xk2m1    0/1     ImagePullBackOff   0

kubectl describe pod -l app=worker -n payments
# Events:
#   Failed   Failed to pull image "ghcr.io/...:9.9.9": ...
#   Failed   Error: ErrImagePull
#   BackOff  Back-off pulling image "ghcr.io/...:9.9.9"`,
      },
      {
        type: "ul",
        items: [
          "READY 0/1 and RESTARTS 0 — the process never ran",
          "Waiting reason ImagePullBackOff or ErrImagePull on the container",
          "Event message names the image reference and often the registry error",
          "kubectl logs will be empty or “container not found” — that is a clue, not a dead end",
        ],
      },
      {
        type: "h2",
        text: "The five causes that cover most pull failures",
      },
      {
        type: "h3",
        text: "1. Wrong image name or tag",
      },
      {
        type: "p",
        text: "Typo in the repository, a tag that was never pushed, or :latest pointing somewhere unexpected. The Event usually says “not found” or “manifest unknown.” Fix the Deployment image field — do not delete the Pod and hope.",
      },
      {
        type: "h3",
        text: "2. Private registry without credentials",
      },
      {
        type: "p",
        text: "The image exists, but the node cannot authenticate. You need an imagePullSecret on the Pod (or a service account that references one), and the Secret must match the registry host. ErrImagePull messages often mention unauthorized or denied.",
      },
      {
        type: "code",
        caption: "Check pull secrets on the Pod",
        code: `kubectl get pod -l app=worker -n payments \\
  -o jsonpath='{.items[0].spec.imagePullSecrets[*].name}{"\\n"}'

kubectl get deploy worker -n payments \\
  -o jsonpath='{.spec.template.spec.containers[*].image}{"\\n"}'`,
      },
      {
        type: "h3",
        text: "3. Registry rate limit",
      },
      {
        type: "p",
        text: "Anonymous Docker Hub pulls still surprise teams on busy CI days. Events mention rate limit or toomanyrequests. Authenticated pulls or a mirror/cache fix the symptom; pinning digests and using your own registry fixes the habit.",
      },
      {
        type: "h3",
        text: "4. Network / DNS / firewall to the registry",
      },
      {
        type: "p",
        text: "The cluster cannot reach the registry host — corporate proxy, missing egress, broken CoreDNS, or a wrong mirror. Nodes that pull fine from one registry and fail on another are a network story, not an image story.",
      },
      {
        type: "h3",
        text: "5. Architecture mismatch",
      },
      {
        type: "p",
        text: "An arm64-only image on an amd64 node (or the reverse) fails at pull or create time depending on the runtime. Multi-arch manifests or matching node pools fix it. The Event may mention no matching manifest for the platform.",
      },
      {
        type: "h2",
        text: "Reproduce it on purpose",
      },
      {
        type: "p",
        text: "kprompt-examples ships an ImagePullBackOff fixture: the worker Deployment points at a tag that does not exist. The container never runs — a good analysis must not invent log lines.",
        links: [
          {
            label: "kprompt-examples",
            href: "https://github.com/kprompt/kprompt-examples",
          },
        ],
      },
      {
        type: "code",
        caption: "kind cluster, missing image tag",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=02-image-pull && make verify

kubectl describe pod -l app=worker -n payments
make fix SCENARIO=02-image-pull`,
      },
      {
        type: "h2",
        text: "Natural-language explain",
      },
      {
        type: "p",
        text: "kprompt's explain path walks Deployments → Pods → Events. For ImagePullBackOff it should name the bad image reference and stop short of claiming it read application logs — because there are none.",
        links: [{ label: "commands", href: "/docs/commands" }],
      },
      {
        type: "code",
        caption: "Explain is read-only",
        code: `kprompt "explain why worker is not ready" -n payments
kprompt "why is worker ImagePullBackOff" -n payments
kprompt "describe worker" -n payments`,
      },
      {
        type: "p",
        text: "Fixing the image is a mutation: patch the Deployment image or imagePullSecrets, show a plan, then approve. That boundary matters — models guess tags; you still verify the registry.",
        links: [{ label: "safety model", href: "/docs/safety" }],
      },
      {
        type: "code",
        caption: "A corrected image you review first",
        code: `$ kprompt "set worker image to ghcr.io/example/worker:1.2.3" -n payments

Plan
  1. patch Deployment/worker container image → ghcr.io/example/worker:1.2.3

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
          "Do not delete the Pod on a loop — the Deployment recreates the same bad image",
          "Do not treat empty logs as “the app is silent” — the app never started",
          "Do not raise memory or CPU for a pull failure",
          "Do not confuse this with CrashLoopBackOff — different evidence, different fix",
          "Do not approve an AI-suggested image tag you have not verified in the registry",
        ],
      },
      {
        type: "h2",
        text: "Related reading",
      },
      {
        type: "p",
        text: "For containers that start and then die, see the CrashLoopBackOff guide. For memory kills, see OOMKilled. For a prompt catalogue across failure modes, see the error prompt playbook.",
        links: [
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
          { label: "OOMKilled", href: "/blog/kubernetes-oomkilled" },
          {
            label: "error prompt playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          { label: "Install kprompt", href: "/docs/install" },
        ],
      },
    ],
  };

export default post;
