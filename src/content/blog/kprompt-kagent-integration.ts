import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
  slug: "kprompt-kagent-integration",
  title:
    "kprompt + kagent: PlanResult as an MCP tool under a CNCF agent platform",
  description:
    "How to compose kprompt with kagent without collapsing the layers: kagent hosts Agents-as-CRDs via MCPServer / RemoteMCPServer; kprompt ships read/plan-only MCP tools that return a typed PlanResult and never auto-apply. Validated against kagent quickstart + first MCP tool docs.",
  publishedAt: "2026-08-29",
  author: MUHTALIP_DEDE,
  tags: [
    "kubernetes",
    "ai",
    "kagent",
    "mcp",
    "sre",
    "platform engineering",
    "architecture",
    "devops",
    "agent",
  ],
  keywords: [
    "kprompt kagent integration",
    "kprompt + kagent",
    "kagent mcpserver kprompt",
    "planresult mcp kagent",
    "kagent agents crd plan before apply",
    "compose kagent and kprompt",
    "cncf kagent mcp tools",
    "kagent remotemcpserver planresult",
    "ai runtime under agent platform",
    "kprompt mcp serve kagent",
    "solo.io kagent kprompt",
    "kubernetes agent platform planresult",
    "a2a observe handoff kprompt",
  ],
  featured: true,
  blocks: [
    {
      type: "p",
      text: "kagent and kprompt keep getting compared because both say “runtime,” both ship SRE-shaped demos, and both speak MCP. The honest story is simpler: they sit on different layers of the same triangle. kagent is the Kubernetes-native agent platform. kprompt is the plan-gated ops compiler. This post is about composing them — not replacing either.",
      links: [
        { label: "kagent", href: "https://kagent.dev/" },
        {
          label: "kagent Quick Start",
          href: "https://kagent.dev/docs/kagent/getting-started/quickstart/",
        },
        {
          label: "kprompt vs kagent",
          href: "/blog/kprompt-vs-kagent",
        },
        {
          label: "Runtime vs Gateway vs Platform",
          href: "/blog/ai-runtime-vs-ai-gateway-vs-agent-platform",
        },
      ],
    },
    {
      type: "p",
      text: "If you maintain or adopt kagent: we want you to notice this pattern. Treat kprompt as an MCPServer (or RemoteMCPServer) your Agents call when the job is “understand this cluster and emit a refuse-able plan” — not as a competing control plane. (kagent’s older ToolServer API is gone; kmcp MCPServer + RemoteMCPServer are the current surface.)",
    },
    {
      type: "h2",
      text: "Hire each product for its job",
    },
    {
      type: "table",
      headers: ["Job", "Owner", "Primary artifact"],
      rows: [
        [
          "Run agents as CRDs, MCP catalogs, A2A graphs, mesh policy",
          "kagent",
          "Agent / Session + MCPServer / RemoteMCPServer + traces",
        ],
        [
          "Compile cluster intent into a reviewable mutate plan",
          "kprompt",
          "PlanResult → safety → human approve",
        ],
        [
          "Always-on namespace watch → Incident → gated notify",
          "kprompt Observe",
          "Incident / AgentAlert (mutate off by default)",
        ],
      ],
    },
    {
      type: "p",
      text: "kagent wins when agents are the product you ship next to apps. kprompt wins when the product artifact is a typed plan CI and humans can refuse. Overlap on “incident agent” demos does not erase that contract difference — see the head-to-head and the alternatives hub if you landed here from a “kagent alternative” search.",
      links: [
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        { label: "kagent alternatives", href: "/blog/kagent-alternatives" },
      ],
    },
    {
      type: "h2",
      text: "What kagent’s quickstart actually teaches",
    },
    {
      type: "p",
      text: "Validated against the public Quick Start and “Adding MCP Tools” guides (kagent CLI ~0.9.9 as of this writing):",
      links: [
        {
          label: "Quick Start",
          href: "https://kagent.dev/docs/kagent/getting-started/quickstart/",
        },
        {
          label: "Adding MCP Tools",
          href: "https://kagent.dev/docs/kagent/getting-started/first-mcp-tool/",
        },
      ],
    },
    {
      type: "ul",
      items: [
        "Install path: kind + Helm + kubectl + OPENAI_API_KEY → kagent install --profile demo (or --profile minimal)",
        "First agent: UI wizard or Declarative Agent CRD; demo profile ships sample agents (helm / observability / istio)",
        "Built-in Kubernetes tools attach as RemoteMCPServer named kagent-tool-server (read-shaped k8s_get_* tools in the docs examples)",
        "Custom tools: create a kmcp MCPServer with transportType: stdio (uvx / npx / your binary), then reference it from Agent.spec.declarative.tools[] with type: McpServer",
        "Invoke: kagent dashboard or kagent invoke -t \"…\" --agent <name>",
        "A2A is real: agents can expose skills and be called from Slack / other bots — useful later for Observe handoff, not required for MCP compose",
      ],
    },
    {
      type: "p",
      text: "That is exactly the hook we want: kagent already teaches “wrap any stdio MCP server as MCPServer, pin toolNames on the Agent.” kprompt mcp serve is that kind of server — PlanResult-shaped tools instead of kubectl fluency.",
    },
    {
      type: "h2",
      text: "The composition we want",
    },
    {
      type: "p",
      text: "One sentence: a kagent Agent reasons and orchestrates; when it needs Kubernetes day-2 truth or a mutate proposal, it calls kprompt MCP tools; kprompt returns PlanResult JSON; apply stays out-of-band — operator TTY, CI gate, or an explicit local --approve the human runs themselves.",
    },
    {
      type: "code",
      caption: "Mental model",
      code: `kagent Agent (CRD)
  │  tools[] type: McpServer
  ├─► RemoteMCPServer/kagent-tool-server   # built-in k8s_get_* (optional)
  └─► MCPServer/kprompt-mcp                # kprompt mcp serve (stdio)
        ├─ kprompt.investigate / why / timeline / impact
        └─ kprompt.plan  ──► PlanResult JSON
                                  │
                                  ▼
                         human / CI refuse-or-approve
                                  │
                                  ▼
                         kprompt "…" --approve   # never via MCP`,
    },
    {
      type: "p",
      text: "That split matches how we already ship IDE interop. Cursor and Claude Desktop spawn kprompt mcp serve over stdio today. kagent’s MCPServer stdio story is the same protocol — kmcp runs the process in-cluster and fronts it for Agents.",
      links: [
        {
          label: "kprompt as an MCP tool provider",
          href: "/blog/kprompt-mcp-tool-provider",
        },
        { label: "MCP docs", href: "/docs/mcp" },
        {
          label: "ADR-0024",
          href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0024-mcp-interop.md",
        },
      ],
    },
    {
      type: "h2",
      text: "What ships today vs what you assemble",
    },
    {
      type: "table",
      headers: ["Surface", "Status", "Notes"],
      rows: [
        [
          "kprompt mcp serve (stdio)",
          "Shipped",
          "Read/plan-only tools; PlanResult wire format; no --approve over MCP",
        ],
        [
          "Laptop CLI plan → approve → apply",
          "Shipped",
          "Primary mutate contract; wipe-class hard denies",
        ],
        [
          "Observe agent (Helm)",
          "Shipped",
          "Namespace watch → Incident → Slack/Discord/webhook; Autopilot propose-only",
        ],
        [
          "kagent MCPServer wrapping stdio MCP",
          "Shipped (kagent/kmcp)",
          "Documented path: MCPServer + Agent tools[] — same pattern as fetch / Slack examples",
        ],
        [
          "First-party kprompt MCPServer image + Agent example",
          "Not shipped",
          "You can assemble if you containerize the kprompt binary; we have not published a joint chart yet",
        ],
        [
          "kprompt as RemoteMCPServer (HTTP/SSE)",
          "Not shipped",
          "Optional later; stdio MCPServer is enough to start composing",
        ],
        [
          "Observe → A2A handoff into a kagent Agent",
          "Not shipped",
          "A2A exists on kagent; Observe notify → A2A is still our side to wire",
        ],
      ],
    },
    {
      type: "p",
      text: "We are deliberate about honesty: coexistence works today as two products side-by-side. The MCP compose path is no longer vapor — kagent already documents wrapping stdio servers. What is missing is a first-party kprompt container + Agent YAML we test in CI, not a new protocol invention.",
    },
    {
      type: "h2",
      text: "Safety invariants (non-negotiable)",
    },
    {
      type: "p",
      text: "If kprompt tools appear in a kagent Agent, these rules stay locked — same as ADR-0024 for editors:",
    },
    {
      type: "ul",
      items: [
        "No remote auto-apply — MCP never executes a mutation; kprompt.plan returns PlanResult only",
        "No --approve over MCP — assistants and agents cannot pass approval through the protocol",
        "Hard-denies intact — wipe-class / namespace-delete intents refuse regardless of caller",
        "RBAC boundary — tools honor the ServiceAccount / kubeconfig of the caller; no Secret-value CMDB",
        "Observe stays notify-first — gated alert ≠ silent heal; Autopilot remains propose-only by default",
        "Do not swap PlanResult for raw k8s mutate tools on the same Agent when the job is gated day-2 — pin toolNames to kprompt.* for mutate proposals",
      ],
    },
    {
      type: "p",
      text: "Platform teams still own agent RBAC, mesh egress, and HITL on the kagent side. kprompt does not replace that governance — it adds a refuse-able plan artifact when the hop is Kubernetes mutate.",
      links: [
        { label: "Safety model", href: "/docs/safety" },
        {
          label: "PlanResult JSON",
          href: "/blog/planresult-json-deep-dive",
        },
      ],
    },
    {
      type: "h2",
      text: "Integration sketch for platform teams",
    },
    {
      type: "h3",
      text: "Phase 0 — run both without glue",
    },
    {
      type: "p",
      text: "Ship kagent for docs RAG, ticket triage, and custom agents (Quick Start demo profile is fine). Keep operators on kprompt for day-2 NL and Observe for namespace paging. No shared wire required. Many teams stop here and that is fine.",
    },
    {
      type: "h3",
      text: "Phase 1 — laptop MCP as a proof",
    },
    {
      type: "p",
      text: "On a workstation that already has kubeconfig + kprompt, prove the tool contract the Agent will eventually call:",
    },
    {
      type: "code",
      caption: "Local MCP (already documented)",
      code: `# Terminal A — tool provider
kprompt mcp serve

# Or wire the same binary into any MCP client:
# Cursor / Claude Desktop → command: kprompt, args: ["mcp", "serve"]

# Tools to exercise: kprompt.investigate, kprompt.why, kprompt.plan
# Apply stays:
kprompt "rollback payment-api" -n payments   # y/N or --approve`,
    },
    {
      type: "p",
      text: "Success criterion: the assistant can narrate evidence and show a PlanResult; it cannot mutate the cluster through MCP.",
    },
    {
      type: "h3",
      text: "Phase 2 — kagent Agent + kprompt as MCPServer",
    },
    {
      type: "p",
      text: "Follow the same shape as kagent’s first MCP tool guide (fetch via uvx) and Slack MCPServer example — swap the command for kprompt:",
      links: [
        {
          label: "Adding MCP Tools",
          href: "https://kagent.dev/docs/kagent/getting-started/first-mcp-tool/",
        },
      ],
    },
    {
      type: "ul",
      items: [
        "Build or pull a container image that includes the kprompt binary (and LLM provider env via Secret)",
        "Apply a namespaced MCPServer with transportType: stdio, cmd: kprompt, args: [mcp, serve], read-only-leaning ServiceAccount",
        "Author a Declarative Agent whose tools[] pin kprompt.investigate / why / plan (and optionally keep kagent-tool-server for raw reads)",
        "System message: for cluster mutate proposals, call kprompt.plan; never invent kubectl apply; never treat tool output as applied",
        "Route PlanResult to Slack/PR/CI for human gate; apply via kprompt CLI or a controlled runner that is not the MCP process",
      ],
    },
    {
      type: "code",
      caption:
        "Illustrative CRDs aligned to kagent docs (image tag + toolNames must match a real build — not a one-liner install)",
      code: `apiVersion: kagent.dev/v1alpha1
kind: MCPServer
metadata:
  name: kprompt-mcp
  namespace: kagent
spec:
  deployment:
    image: "ghcr.io/kprompt/kprompt:<tag>"   # illustrative — publish pending
    cmd: "kprompt"
    args: ["mcp", "serve"]
    port: 3000
    # secretRefs: LLM provider keys, etc.
  transportType: "stdio"
  stdioTransport: {}
---
apiVersion: kagent.dev/v1alpha2
kind: Agent
metadata:
  name: plan-gated-ops
  namespace: kagent
spec:
  description: Cluster ops agent that proposes PlanResult, never auto-applies.
  type: Declarative
  declarative:
    modelConfig: default-model-config
    systemMessage: |-
      For day-2 mutate proposals call kprompt.plan.
      Show PlanResult (actions, risk, blast) to the human.
      Never claim a change was applied. Never invent kubectl apply.
    tools:
    - type: McpServer
      mcpServer:
        name: kprompt-mcp
        kind: MCPServer
        toolNames:
        - kprompt.investigate
        - kprompt.why
        - kprompt.plan`,
    },
    {
      type: "p",
      text: "We are not claiming this YAML works copy-paste today without a published image and a CI-tested example. We are claiming the CRD shapes match current kagent docs — so maintainers can review the compose story without us inventing a dead ToolServer API.",
    },
    {
      type: "h3",
      text: "Phase 3 — Observe notify → kagent A2A (optional)",
    },
    {
      type: "p",
      text: "kprompt Observe already collapses Pods/Events into Incidents and gates alerts. A later hop can hand an Incident summary to a kagent Agent over A2A for deeper multi-agent triage (docs RAG, ticket draft, runbook) — the same A2A edge kagent documents for Slack bots. Remediates still should not skip PlanResult. Notify and propose stay separated from apply.",
      links: [
        { label: "Observe agent", href: "/docs/agent" },
        {
          label: "Observe vs investigate",
          href: "/blog/observe-vs-investigate",
        },
        {
          label: "kagent Slack + A2A",
          href: "https://kagent.dev/docs/kagent/examples/slack-a2a/",
        },
      ],
    },
    {
      type: "h2",
      text: "Why kagent should care",
    },
    {
      type: "p",
      text: "kagent’s public story already includes kubectl-shaped MCP tools (kagent-tool-server), incident response agents, HITL, and A2A. What platform buyers still ask is: “Where is the refuse-able plan artifact for day-2 mutate?” That is the gap PlanResult fills without forcing kagent to become an ops CLI.",
    },
    {
      type: "ul",
      items: [
        "Keep Agents-as-CRDs as the platform product — do not dilute into another kubectl chat",
        "Offer a standards-based MCPServer that returns structured risk, diff, and blast radius",
        "Give security reviewers a clear apply boundary: MCP proposes; humans/CI approve",
        "Let SRE demos stay honest — compose investigate → plan → approve instead of silent tool apply",
      ],
    },
    {
      type: "p",
      text: "We built kprompt because we believe that boundary. We would rather plug into the CNCF agent platform than pretend we are one.",
      links: [
        {
          label: "CNCF kagent",
          href: "https://www.cncf.io/projects/kagent/",
        },
        {
          label: "kagent on GitHub",
          href: "https://github.com/kagent-dev/kagent",
        },
      ],
    },
    {
      type: "h2",
      text: "Open invite",
    },
    {
      type: "p",
      text: "To the kagent maintainers and community: if a first-party MCPServer example (image + Agent YAML), kmcp notes, or joint reference architecture would help adopters, we want that conversation. Preferred starting point is MCP tool semantics that already ship in kprompt mcp serve — stable names, PlanResult JSON, apply forever out-of-band.",
    },
    {
      type: "p",
      text: "File ideas or friction on the kprompt side against the architecture ADRs; bring Agent / MCPServer / RemoteMCPServer realities from your side. Complementary layers beat another “AI for Kubernetes” silo.",
      links: [
        {
          label: "ADR-0024 MCP interop",
          href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0024-mcp-interop.md",
        },
        { label: "kprompt GitHub", href: "https://github.com/kprompt/kprompt" },
        { label: "Contact", href: "/team" },
      ],
    },
    {
      type: "h2",
      text: "Try the pieces you can run today",
    },
    {
      type: "code",
      caption: "kprompt path (plan-gated ops + MCP)",
      code: `curl -fsSL https://kprompt.ai/install | bash

kprompt "explain why api is crashing" -n payments
kprompt mcp serve   # IDE / local MCP client

# Mutate only after you review a plan:
kprompt "scale api to 3" -n staging`,
    },
    {
      type: "p",
      text: "For kagent’s own quickstart (kind + Helm + Agent CRD), start at the Quick Start. For category without hype, read the triangle hub. For the comparison that stays sharp about alternatives intent, keep the vs post bookmarked.",
      links: [
        {
          label: "kagent Quick Start",
          href: "https://kagent.dev/docs/kagent/getting-started/quickstart/",
        },
        {
          label: "Runtime vs Gateway vs Platform",
          href: "/blog/ai-runtime-vs-ai-gateway-vs-agent-platform",
        },
        { label: "kprompt vs kagent", href: "/blog/kprompt-vs-kagent" },
        {
          label: "kprompt vs agentgateway",
          href: "/blog/kprompt-vs-agentgateway",
        },
        { label: "kprompt quickstart", href: "/docs/quickstart" },
      ],
    },
  ],
};

export default post;
