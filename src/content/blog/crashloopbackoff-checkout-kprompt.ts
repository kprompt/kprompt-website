import type { BlogPost } from "@/lib/blog-types";
import { HARUN_TEMEL } from "@/lib/team";

const post: BlogPost = {
    slug: "crashloopbackoff-checkout-kprompt",
    title:
      "Friday night CrashLoopBackOff: diagnosing a checkout service with kprompt instead of kubectl roulette",
    description:
      "A real on-call walkthrough: checkout pods stuck in CrashLoopBackOff, how we read the previous logs and events with kprompt, and why the fix still waited for human approve.",
    publishedAt: "2026-08-04",
    author: HARUN_TEMEL,
    tags: [
      "kubernetes",
      "troubleshooting",
      "sre",
      "on-call",
      "kprompt",
      "crashloopbackoff",
    ],
    keywords: [
      "crashloopbackoff checkout",
      "kubernetes friday night on-call",
      "kprompt crashloopbackoff",
      "explain why api is crashing",
      "kubectl roulette",
      "plan approve apply crashloop",
      "kprompt in the wild",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "It is Friday night. Slack lights up: checkout is failing in staging, then a quieter ping that production payment confirmations look flaky. kubectl get pods shows the familiar red: CrashLoopBackOff on the checkout Deployment. Restart count climbing. Nobody wants to play kubectl roulette — get, describe, logs, wrong logs, logs --previous, events, guess, patch, hope.",
      },
      {
        type: "p",
        text: "This is the first post in kprompt in the wild: real operator scenarios, not product manifesto. The reference ladder for CrashLoopBackOff still lives in our CrashLoopBackOff guide. Here I walk what we actually did with kprompt — read first, plan second, approve last.",
        links: [
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
        ],
      },
      {
        type: "h2",
        text: "What we saw",
      },
      {
        type: "p",
        text: "Namespace payments. Deployment checkout. Three replicas, zero Ready. Last State exit code 1 — application error, not OOM (137) and not ImagePullBackOff. That already rules out “just bump memory” and “registry is down.” The useful logs are on the previous container, not the one currently starting.",
      },
      {
        type: "code",
        caption: "The smoke check (still useful)",
        code: `kubectl get pods -n payments -l app=checkout
# NAME                         READY   STATUS             RESTARTS
# checkout-7d8f9c4b6d-xk2n4    0/1     CrashLoopBackOff   12`,
      },
      {
        type: "h2",
        text: "Ask for the ladder, do not invent it",
      },
      {
        type: "p",
        text: "Instead of hand-rolling five kubectl commands in the wrong order, we asked kprompt to explain. Reads run immediately — no approval when nothing mutates. The explain path walks Deployment → ReplicaSet → Pods → Events → previous logs and reports what it found.",
        links: [
          { label: "commands", href: "/docs/commands" },
          { label: "Quickstart", href: "/docs/quickstart" },
        ],
      },
      {
        type: "code",
        caption: "Read-only diagnosis",
        code: `kprompt "explain why checkout is crashing" -n payments
kprompt "logs checkout" -n payments
kprompt "why is checkout not ready" -n payments`,
      },
      {
        type: "p",
        text: "What came back matched the classic dependency shape: checkout started, tried the orders Service, got connection refused, exited 1. Events showed Back-off restarting failed container. The model can still be wrong — that is why we kept the previous logs and the Service/endpoints check in view. In our case the orders pods were not Ready either; checkout was the noisy symptom, not the only patient.",
      },
      {
        type: "h2",
        text: "Investigate when one hop is not enough",
      },
      {
        type: "p",
        text: "When the first explain points at a dependency, investigate (or why) helps stitch the hops without opening twelve terminals. Still read-only. Still no mutate.",
        links: [
          {
            label: "Beyond AI kubectl: why kprompt is aiming at AI SRE",
            href: "/blog/ai-sre-not-ai-kubectl",
          },
        ],
      },
      {
        type: "code",
        caption: "Multi-hop read path",
        code: `kprompt "investigate checkout" -n payments
kprompt "why is checkout CrashLoopBackOff" -n payments`,
      },
      {
        type: "p",
        text: "The finding we trusted: orders ConfigMap had a bad DB host after a partial roll. Orders could not become Ready; checkout kept dying on connect. Fixing checkout alone would have been theater.",
      },
      {
        type: "h2",
        text: "The fix still became a plan",
      },
      {
        type: "p",
        text: "We did not --approve a blind “restart checkout.” We asked for a bounded change: restore the last-good ConfigMap value for orders (or roll back the bad revision), then re-check checkout. Mutations produce a plan with risk and a diff. On a TTY you answer y/N. That boundary is the point when you are tired and Slack is loud.",
        links: [{ label: "Safety", href: "/docs/safety" }],
      },
      {
        type: "code",
        caption: "Mutate only after review",
        code: `$ kprompt "rollback orders config to last good" -n payments

Plan
  1. rollout undo Deployment/orders   # or patch ConfigMap — review the diff

Risk: medium
Approve? [y/N]`,
      },
      {
        type: "p",
        text: "After orders came Ready, checkout stopped looping without a heroic checkout-side patch. We still verified with a short read: explain / get pods — Ready 3/3. If the plan had proposed delete namespace or an unscoped wipe, hard-deny would have stopped it before apply. We did not need that scare this night; we needed the habit.",
      },
      {
        type: "h2",
        text: "What I would tell next on-call",
      },
      {
        type: "ul",
        items: [
          "CrashLoopBackOff is a symptom — read exit code and previous logs before any patch",
          "Use explain / investigate for the ladder; keep kubectl when you need a ticket paste",
          "Never restart-loop a Deployment hoping the dependency heals itself",
          "Mutations stay plan → approve → apply — even on Friday night",
          "Practice on kind first: kprompt-examples scenario 01-crashloop",
        ],
      },
      {
        type: "code",
        caption: "Practice when nothing is on fire",
        code: `git clone https://github.com/kprompt/kprompt-examples.git
cd kprompt-examples
make up && make break SCENARIO=01-crashloop && make verify
kprompt "explain why api is crashing" -n payments`,
      },
      {
        type: "h2",
        text: "What is next in this series",
      },
      {
        type: "p",
        text: "Next up from this lane: ImagePullBackOff after a registry rotate — plan the fix before production. Install path if you want to try the same loop locally: Install and Quickstart. Deeper CrashLoop mechanics: the CrashLoopBackOff guide.",
        links: [
          { label: "Install", href: "/docs/install" },
          { label: "Quickstart", href: "/docs/quickstart" },
          {
            label: "CrashLoopBackOff guide",
            href: "/blog/kubernetes-crashloopbackoff",
          },
        ],
      },
    ],
  };

export default post;
