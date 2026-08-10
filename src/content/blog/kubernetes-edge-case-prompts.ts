import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-edge-case-prompts",
    title:
      "Kubernetes edge-case prompts: what should fail closed, what needs a second look",
    description:
      "Edge-case prompt scenarios for Kubernetes AI CLIs — wipe jokes, unscoped deletes, ambiguous resource names, missing tools, secrets reads, scale-to-zero, and --approve traps — with what kprompt does today.",
    publishedAt: "2026-07-18",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "safety",
      "troubleshooting",
      "devops",
      "sre",
    ],
    keywords: [
      "kubernetes edge cases",
      "kubernetes hard deny",
      "dangerous kubectl prompts",
      "delete all pods kubernetes",
      "ambiguous kubernetes resource",
      "kubernetes prompt safety",
      "scale to zero production",
      "helm uninstall all",
      "kubernetes ai edge cases",
      "kprompt",
    ],
    blocks: [
      {
        type: "p",
        text: "Happy-path demos lie. Real operators type tired prompts: wipe jokes, “delete that,” short names that match two CRDs, Helm uninstall --all, scale to zero “just for a minute,” and --approve because the TTY is annoying. Edge cases are where an AI Kubernetes CLI either earns trust or burns a cluster.",
      },
      {
        type: "p",
        text: "This guide is the awkward half of our error playbook: prompts that should hard-deny, plans that need a second look, and failure modes that are not “the model was dumb” — they are product contracts. kprompt is experimental; hard denies reduce blast radius, they do not certify production readiness.",
        links: [
          {
            label: "error playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          { label: "safety docs", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "Edge cases vs incidents",
      },
      {
        type: "table",
        headers: ["Kind", "Example", "What good tooling does"],
        rows: [
          [
            "Incident",
            "CrashLoop, OOM, slow API",
            "Investigate with live state; suggest bounded fixes",
          ],
          [
            "Edge case",
            "Wipe joke, ambiguous kind, missing Prom",
            "Fail closed or fail clear — never invent success",
          ],
          [
            "Human trap",
            "--approve on unfamiliar prod prompt",
            "Make the plan painful to skip; keep JSON gates",
          ],
        ],
      },
      {
        type: "h2",
        text: "1. Wipe jokes and “delete everything”",
      },
      {
        type: "p",
        text: "Edge: the prompt is socially casual and operationally catastrophic. Models will happily play along unless policy stops them before tokens are spent.",
      },
      {
        type: "code",
        caption: "Expect hard deny (before a useful plan)",
        code: `kprompt "delete the cluster"
kprompt "wipe everything"
kprompt "delete all namespaces"
kprompt "delete all pods in production"
kprompt "remove the namespace"`,
      },
      {
        type: "p",
        text: "What kprompt does: prompt-layer hard deny for wipe-class language — risk denied, no apply path. Named delete of a single Pod, Deployment, or Service still plans and asks for approval.",
      },
      {
        type: "ul",
        items: [
          "Do — treat deny as success in demos and training",
          "Do not — soften wipe language until it sneaks past (“clean up staging resources”) without reading the plan",
        ],
      },
      {
        type: "h2",
        text: "2. Unscoped delete: “all”, “*”, empty name",
      },
      {
        type: "p",
        text: "Edge: the model (or a bad extraction) produces a delete action without a concrete object name, or with all / * / everything.",
      },
      {
        type: "code",
        caption: "Safe vs refused",
        code: `kprompt "delete deployment redis" -n cache   # plan + high risk → approve
# Plans that delete without a real name, or name=all/* → refused`,
      },
      {
        type: "p",
        text: "What kprompt does: plan evaluation refuses unscoped deletes and Namespace deletes. Only Pod, Deployment, and Service named deletes are in scope today — deleting a StatefulSet or CronJob via NL delete is refused, not half-applied.",
      },
      {
        type: "h2",
        text: "3. Helm uninstall --all / purge all releases",
      },
      {
        type: "p",
        text: "Edge: day-2 Helm fluency turns into fleet destruction. “Uninstall all releases in staging” sounds like cleanup; it is a blast radius event.",
      },
      {
        type: "code",
        caption: "Expect Helm wipe deny",
        code: `kprompt "helm uninstall --all"
kprompt "uninstall all helm releases"
kprompt "purge all releases"`,
      },
      {
        type: "p",
        text: "What kprompt does: wipe-class Helm uninstall prompts and --all style commands are denied. Named install/upgrade still go through template/dry-run style plan review when that path is used.",
      },
      {
        type: "h2",
        text: "4. Ambiguous resource names",
      },
      {
        type: "p",
        text: "Edge: short names and Kind strings collide across API groups — especially once CRDs enter the cluster. “Get widgets” might match more than one resource.",
      },
      {
        type: "code",
        caption: "Be explicit when discovery is crowded",
        code: `kprompt "list deployments.apps" -n staging
kprompt "get pods" -n staging
# Prefer group-qualified names when short names collide`,
      },
      {
        type: "p",
        text: "What kprompt does on generic reads: discovery-backed resolution; ambiguous short names should error with candidates rather than silently picking the wrong API. Unknown types should say unknown — not invent a CRD schema from model weights.",
      },
      {
        type: "ul",
        items: [
          "Do — qualify with group (deployments.apps) when in doubt",
          "Do not — approve a mutate plan that names the wrong kind because the short name “looked right”",
        ],
      },
      {
        type: "h2",
        text: "5. Missing integrations (Prom, Helm, Argo, traces)",
      },
      {
        type: "p",
        text: "Edge: the prompt assumes a stack that is not installed. A bad tool invents PromQL answers or Helm output. A good tool fails clear.",
      },
      {
        type: "code",
        caption: "Discover before you diagnose",
        code: `kprompt tools
kprompt "why is my api slow?" -n production
kprompt "install redis" -n cache
kprompt "trace payment request"`,
      },
      {
        type: "p",
        text: "What you should get: kprompt tools reports what is detectable (Helm on PATH, Workflow CRD, Prom/Grafana/OTel URLs). Performance/trace/Helm paths should error or degrade honestly when backends are absent — not fabricate latency numbers.",
      },
      {
        type: "h2",
        text: "6. Secrets and ConfigMaps on the read path",
      },
      {
        type: "p",
        text: "Edge: “show secrets” is a legitimate ops read under RBAC, and also a leak risk in terminals, screen shares, and LLM context. Authorization is your kubeconfig — not the CLI pretending to be a DLP product.",
      },
      {
        type: "code",
        caption: "Reads are allowed; treat output as sensitive",
        code: `kprompt "list secrets" -n staging
# Table listings should not dump secret data values into columns
# Still: prompt + metadata may reach your LLM provider — use Ollama or careful keys if needed`,
      },
      {
        type: "p",
        text: "What kprompt does: Secret/ConfigMap gets are not hard-denied (RBAC decides). List tables avoid leaking secret data values into the grid. PlanResult and history are designed not to store manifests/keys — but the model still sees operational context you send. See the BYOK providers post for privacy trade-offs.",
        links: [
          {
            label: "BYOK providers post",
            href: "/blog/kubernetes-llm-providers-byok",
          },
        ],
      },
      {
        type: "h2",
        text: "7. Scale to zero / wrong namespace pronouns",
      },
      {
        type: "p",
        text: "Edge: the plan is “valid” and still wrong. Scale api to 0 in production, or a prompt that says “it” while your default namespace is prod.",
      },
      {
        type: "code",
        caption: "Make blast radius explicit",
        code: `kprompt "scale api to 0" -n production
# Read the plan: replicas=0 is easy to miss in a hurry

kprompt config set namespace staging
kprompt "scale api to 3" -n production --context prod-cluster`,
      },
      {
        type: "p",
        text: "What kprompt does: shows the plan and risk; it does not read your mind. Hard denies will not catch every bad-but-legal scale. Humans (or CI jq gates on intent/replicas) own this class.",
      },
      {
        type: "ul",
        items: [
          "Do — put -n and --context on production mutations",
          "Do not — rely on chat memory of “we were talking about staging”",
        ],
      },
      {
        type: "h2",
        text: "8. --approve as an edge case",
      },
      {
        type: "p",
        text: "Edge: the flag that skips the y/N prompt. Correct in CI after JSON gates; dangerous as a laptop default.",
      },
      {
        type: "code",
        caption: "When --approve is appropriate",
        code: `# OK after you already reviewed the same plan interactively
kprompt "scale api to 3" -n staging --approve --wait

# OK in CI after jq gates on PlanResult
kprompt "scale api to 3" -n staging -o json | jq -e '.risk.denied == false'

# Risky: first-time prod prompt with --approve because you are late`,
      },
      {
        type: "p",
        text: "Hard denies still block wipe-class prompts even with --approve. Everything else that is merely “medium risk” will apply if you ask it to. That is the edge.",
        links: [
          {
            label: "CI plan gates",
            href: "/blog/kubernetes-ci-cd-plan-gates",
          },
        ],
      },
      {
        type: "h2",
        text: "9. Multi-step prompts that mix mutate and investigate",
      },
      {
        type: "p",
        text: "Edge: “scale api to 3 then investigate something weird” or chaining unsupported steps. Routers that auto-apply mid-chain are how incidents get compound interest.",
      },
      {
        type: "code",
        caption: "Prefer one intent per approval",
        code: `kprompt "explain why api is crashing" -n staging
kprompt "scale api to 3" -n staging
# Separate prompts → separate plans → separate decisions`,
      },
      {
        type: "p",
        text: "What to expect: multi-tool routing exists for investigation chains; mutating chains should still surface plans you can refuse. If a step is unsupported, the run should stop with a clear error rather than skipping to a partial apply.",
      },
      {
        type: "h2",
        text: "10. Deploy without enough identity",
      },
      {
        type: "p",
        text: "Edge: “deploy myapp” with no image, registry, or known recipe. A chatty CLI invents nginx:latest and calls it done.",
      },
      {
        type: "code",
        caption: "Fail clear > hallucinate an image",
        code: `kprompt "deploy redis" -n cache          # known recipe path
kprompt "deploy myapp" -n staging        # should demand image / clearer params`,
      },
      {
        type: "p",
        text: "What good behavior looks like: error asking for an image (or a documented recipe), not a silent wrong Deployment. Always read the plan’s image field before approve.",
      },
      {
        type: "h2",
        text: "Quick matrix",
      },
      {
        type: "table",
        headers: ["Edge prompt", "Expect", "Your job"],
        rows: [
          [
            "Wipe / delete all / wipe namespace",
            "Hard deny",
            "Celebrate the deny; use named ops",
          ],
          [
            "Helm uninstall --all",
            "Hard deny",
            "Name one release",
          ],
          [
            "Ambiguous short name",
            "Error + candidates",
            "Qualify group/kind",
          ],
          [
            "Missing Prom/Helm/Argo",
            "Clear failure",
            "kprompt tools; fix config",
          ],
          [
            "list secrets",
            "RBAC + careful output",
            "Mind LLM + screen share",
          ],
          [
            "scale to 0 in prod",
            "Legal plan, real risk",
            "Read replicas; maybe refuse",
          ],
          [
            "--approve first time",
            "Applies if not denied",
            "Interactive review first",
          ],
        ],
      },
      {
        type: "h2",
        text: "What hard denies do not catch",
      },
      {
        type: "p",
        text: "Be honest with your team: policy catches wipe-class and unscoped patterns. It does not catch “scale the wrong Deployment,” “raise memory on the sidecar,” or “rollback the healthy app.” Those need plan literacy — the same muscle as reading a kubectl command before Enter.",
      },
      {
        type: "ul",
        items: [
          "Wrong name, right verb — still a bad day",
          "Wrong context with a perfect prompt — still prod",
          "Correct plan, wrong time (change freeze) — process, not CLI",
        ],
      },
      {
        type: "h2",
        text: "Drill the edges on purpose",
      },
      {
        type: "code",
        caption: "Staging chaos curriculum",
        code: `curl -fsSL https://kprompt.ai/install | bash
export KPROMPT_GEMINI_API_KEY="..."

kprompt "delete all pods" -n staging
kprompt "helm uninstall --all"
kprompt "scale api to 0" -n staging          # read plan → n
kprompt "delete deployment redis" -n staging # read plan → decide
kprompt tools`,
      },
      {
        type: "p",
        text: "Pair this with the incident playbook when something is actually broken, and the safety post when you teach the plan → approve loop. Edge cases are not corner decorations — they are how you decide whether an AI CLI belongs near production credentials. For a full kubectl ↔ natural-language cheat sheet, see the paired one-liners guide.",
        links: [
          {
            label: "incident playbook",
            href: "/blog/kubernetes-error-prompt-playbook",
          },
          {
            label: "safety post",
            href: "/blog/kubernetes-safety-plan-approve",
          },
          {
            label: "paired one-liners guide",
            href: "/blog/kubectl-cheat-sheet-natural-language",
          },
        ],
      },
    ],
  };

export default post;
