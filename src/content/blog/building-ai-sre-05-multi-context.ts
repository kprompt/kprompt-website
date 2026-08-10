import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-05-multi-context",
    title: "Building AI SRE in Public #5: Multi-context",
    description:
      "AI SRE across kubeconfig contexts: single-context default, explicit read fan-out, per-context mutate approval, aliases, and why we refuse silent fleet --approve or uploading cluster credentials.",
    publishedAt: "2026-07-27",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "safety",
      "platform engineering",
      "devops",
      "architecture",
    ],
    keywords: [
      "kubernetes multi context",
      "kubeconfig fan-out ai",
      "building ai sre multi-context",
      "multi cluster kubectl ai",
      "approve each context",
      "fleet optimize kubernetes",
      "multi-context planresult",
      "ai sre blast radius",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 5 of Building AI SRE in Public. Episodes 2–4 locked the compiler, the PlanResult IR, and the safety wall. Multi-context is where that wall meets real operator life: prod, staging, and kind sitting in one kubeconfig — and one careless English sentence that could mean all of them.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 4: Safety Engine",
            href: "/blog/building-ai-sre-04-safety",
          },
          { label: "Multi-cluster docs", href: "/docs/multi-cluster" },
          {
            label: "ADR-0012",
            href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0012-multi-cluster.md",
          },
        ],
      },
      {
        type: "h2",
        text: "The claim",
      },
      {
        type: "p",
        text: "An AI SRE that only works on “the current context” is half a tool. Operators compare staging to prod, chase a bug across environments, and optimize idle capacity on a laptop fleet. The design claim: read fan-out is a feature; mutate fan-out is a controlled escalation. “All clusters” is never implied. Credentials never leave the machine.",
      },
      {
        type: "h2",
        text: "Single-context default — still the happy path",
      },
      {
        type: "p",
        text: "Every plan still resolves one kubeconfig context unless you opt in: --context, a local alias, config default, or kubectl’s current-context. That matches how kubectl itself works and how blast radius stays mental. Aliases (prod → the ugly GKE name) are the naming layer; require_alias_match can refuse a mutate when current-context does not match the alias you asked for — wrong-cluster fat-finger insurance.",
      },
      {
        type: "code",
        caption: "Inventory and aliases",
        code: `kprompt contexts
kprompt contexts --check
kprompt config alias set prod gke_myproj_us-central1_prod
kprompt --context prod "list deployments"
kprompt config set require_alias_match true`,
      },
      {
        type: "h2",
        text: "Read fan-out is opt-in, never “all”",
      },
      {
        type: "p",
        text: "You name contexts with --contexts staging,prod or clear natural language (“across staging and prod”). Supported reads today include get/list, explain, logs, describe, investigate/why/timeline/impact, audit/cleanup, and optimize. Output is sectioned per context. JSON kind MultiContextResult carries per-context steps and cluster_context on each step; optimize adds a fleetSummary. Unreachable contexts degrade — others still return. That honesty matters more than a green spinner.",
      },
      {
        type: "code",
        caption: "Compare without mutating",
        code: `kprompt --contexts staging,prod "list deployments"
kprompt "list pods across staging and prod"
kprompt --contexts staging,prod "optimize my cluster" -o json \\
  | jq '{kind, fleetSummary, contexts: [.steps[].cluster_context]}'`,
      },
      {
        type: "h2",
        text: "Mutate safety gets stricter as the blast radius grows",
      },
      {
        type: "p",
        text: "Episode 4 said approval is part of safety. Multi-context makes that concrete: interactive mode asks Apply … to context \"…\"? for each selected context. Plain --approve across multiple contexts is refused — one flag must not mean “yes to the fleet.” The explicit escape hatch is --approve-each-context: you consented, in writing, to the same plan on every listed context. Every PlanResult action and audit event still carries cluster_context so CI and humans can see where apply landed.",
      },
      {
        type: "table",
        headers: ["Mode", "Behavior"],
        rows: [
          [
            "Interactive",
            "Confirm each context separately",
          ],
          [
            "--approve alone (multi)",
            "Refused — not a fleet override",
          ],
          [
            "--approve-each-context",
            "Explicit multi-apply after you opted in",
          ],
        ],
      },
      {
        type: "code",
        caption: "Escalate deliberately",
        code: `kprompt --contexts staging,prod "scale api to 3"
# → per-context y/N

kprompt --contexts staging,prod --approve "scale api to 3"
# → refused

kprompt --contexts staging,prod --approve-each-context "scale api to 3"
# → you meant the fleet`,
      },
      {
        type: "h2",
        text: "What multi-context is not",
      },
      {
        type: "ul",
        items: [
          "Not uploading kubeconfigs to api.kprompt.ai or app.kprompt.ai",
          "Not a hosted live multi-cluster browser (Lens/Headlamp clone)",
          "Not silent --approve across every context in the file",
          "Not an always-on in-cluster multi-cluster agent",
          "Not turning kprompt-dash into a fleet UI — dash stays localhost, single-context inventory",
        ],
      },
      {
        type: "p",
        text: "Team control plane may eventually store metadata only (display name, alias, which enrolled device can reach a cluster). Bridge workers still execute with the laptop’s kubeconfig. That is ADR-0012’s line in the sand: multi-cluster UX is CLI-first and credential-local.",
      },
      {
        type: "h2",
        text: "Why this belongs in an AI SRE series",
      },
      {
        type: "p",
        text: "Investigation without environment comparison is theater. “Is staging also CrashLooping?” is a read fan-out question. “Scale api to 10 everywhere” is a mutate fan-out question with a different blast radius. AI SRE must make that asymmetry legible in the artifact — MultiContextResult for reads, PlanResult + cluster_context + per-context approval for writes — not hide it behind a chat that “just ran it on all of them.”",
      },
      {
        type: "h2",
        text: "What ships vs what we refuse",
      },
      {
        type: "ul",
        items: [
          "Shipped: contexts inventory, aliases, require_alias_match",
          "Shipped: explicit --contexts / NL across for read packs + optimize fleetSummary",
          "Shipped: per-context interactive approve; refuse bare multi --approve; --approve-each-context",
          "Building: richer org registry metadata without credential upload",
          "Non-goal: implied all-contexts fan-out; kubeconfig upload; dash-as-fleet; silent fleet Autopilot",
        ],
      },
      {
        type: "h2",
        text: "Try the asymmetry",
      },
      {
        type: "code",
        caption: "Non-prod drill",
        code: `kprompt contexts --check
kprompt --contexts kind-a,kind-b "list pods"
kprompt --contexts kind-a,kind-b "optimize my cluster"
kprompt --contexts kind-a,kind-b "scale demo to 2"   # expect two prompts
# Prefer n unless you meant both`,
      },
      {
        type: "p",
        text: "If a tool can --approve once and touch every context in your kubeconfig, it is not ready for production English — no matter how convenient the fleet story sounds.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 6 is Investigation Graph — chat is a line; ops is a gated graph (fan-out → independent verify → PlanResult → approve). The hub tracks the rest of the arc.",
        links: [
          {
            label: "Episode 6: Investigation Graph",
            href: "/blog/building-ai-sre-06-investigation-graph",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          { label: "Multi-cluster docs", href: "/docs/multi-cluster" },
          { label: "Architecture diagrams", href: "/docs/architecture" },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
