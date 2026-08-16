import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kprompt-mcp-tool-provider",
    title:
      "kprompt as an MCP tool provider — plan-gated ops from your editor",
    description:
      "kprompt mcp serve exposes read and plan tools to Cursor, Claude Desktop, and other IDE assistants over stdio. Mutations return a PlanResult and never auto-apply. IDE interop, not an agent platform.",
    publishedAt: "2026-08-10",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "mcp",
      "sre",
      "devops",
      "platform engineering",
      "kprompt",
    ],
    keywords: [
      "kprompt mcp",
      "kprompt mcp serve",
      "mcp tool provider kubernetes",
      "plan-gated mcp",
      "cursor mcp kubernetes",
      "claude desktop kubernetes mcp",
      "mcp never auto-apply",
      "planresult mcp",
      "ide agent kubernetes ops",
      "kubectl-ai mcp alternative",
    ],
    featured: true,
    blocks: [
      {
        type: "p",
        text: "IDE assistants now speak MCP. Cursor, Claude Desktop, Windsurf, and friends spawn local tool servers and call them mid-conversation. That is the right distribution surface for cluster ops — if the tool refuses to become a silent apply path.",
      },
      {
        type: "p",
        text: "We shipped kprompt mcp serve as a read/plan-only Model Context Protocol tool provider. Your editor can investigate a CrashLoop, ask why a Deployment is pending, and compile a mutate into a typed PlanResult. It cannot approve. It cannot apply. Approval stays a human action you run yourself in a terminal.",
        links: [
          { label: "MCP docs", href: "/docs/mcp" },
          {
            label: "ADR-0024",
            href: "https://github.com/kprompt/kprompt-architecture/blob/main/decisions/ADR-0024-mcp-interop.md",
          },
        ],
      },
      {
        type: "h2",
        text: "Tool provider, not agent platform",
      },
      {
        type: "p",
        text: "The word MCP is overloaded. Some products use it as a control plane for Agents-as-CRDs, A2A meshes, and marketplaces. That is a real lane — it is not ours. kprompt is The AI Runtime for Kubernetes: observe, reason, emit a reviewable plan, then approve before execute. MCP here is reach into the editor, not a new authority model.",
        links: [
          {
            label: "AI Runtime for Kubernetes",
            href: "/blog/ai-runtime-for-kubernetes",
          },
          {
            label: "kprompt vs kagent",
            href: "/blog/kprompt-vs-kagent",
          },
        ],
      },
      {
        type: "ul",
        items: [
          "One binary: kprompt mcp serve — no separate kprompt-mcp release",
          "stdio JSON-RPC for the local operator — no network listener by default",
          "Same PlanResult wire artifact as CLI --output json",
          "Same Safety Engine: wipe-class / namespace-delete intents hard-deny",
          "No --approve over MCP — an assistant cannot pass approval through the protocol",
        ],
      },
      {
        type: "p",
        text: "If you need a multi-agent platform on the cluster, look at kagent. If you need plan-gated day-2 ops from the editor you already live in, this surface is for you.",
      },
      {
        type: "h2",
        text: "What the tools do",
      },
      {
        type: "table",
        headers: ["Tool", "Job", "Mutates?"],
        rows: [
          [
            "kprompt.read",
            "NL reads against your kubeconfig (list, describe, logs, …) → PlanResult JSON",
            "No",
          ],
          [
            "kprompt.investigate / why / timeline / impact",
            "AI SRE packs for a target — multi-hop RCA, cause, chronology, blast radius",
            "No",
          ],
          [
            "kprompt.plan",
            "Compile a mutation prompt into actions, diff, risk, blast radius — never applies",
            "No",
          ],
          [
            "kprompt.tools / kprompt.doctor",
            "Detected integrations + environment health (no API keys printed)",
            "No",
          ],
        ],
      },
      {
        type: "p",
        text: "Reasoning tools need a configured LLM provider (BYOK or local). They honor your kubeconfig RBAC. Cluster credentials stay on your machine — stdio is scoped to the operator who launched the editor.",
        links: [
          { label: "Providers", href: "/docs/providers" },
          { label: "Safety", href: "/docs/safety" },
        ],
      },
      {
        type: "h2",
        text: "Wire it up",
      },
      {
        type: "code",
        caption: "Cursor (~/.cursor/mcp.json or project .cursor/mcp.json)",
        code: `{
  "mcpServers": {
    "kprompt": {
      "command": "kprompt",
      "args": ["mcp", "serve"]
    }
  }
}`,
      },
      {
        type: "code",
        caption: "Claude Desktop (claude_desktop_config.json)",
        code: `{
  "mcpServers": {
    "kprompt": {
      "command": "kprompt",
      "args": ["mcp", "serve"]
    }
  }
}`,
      },
      {
        type: "p",
        text: "Use an absolute path to the binary if the editor’s PATH does not see kprompt. Human-readable logs go to stderr so stdout stays clean for the protocol.",
        links: [{ label: "Install", href: "/docs/install" }],
      },
      {
        type: "h2",
        text: "A real loop: assistant proposes, human applies",
      },
      {
        type: "p",
        text: "Say checkout is CrashLoopBackOff in payments. Inside the editor you ask the assistant to investigate. It calls kprompt.investigate or kprompt.why with target checkout. You get structured evidence — Events, previous logs, dependency hops — as JSON the assistant can narrate. Still no mutate.",
      },
      {
        type: "p",
        text: "When you are ready to change something, the assistant calls kprompt.plan with a bounded prompt. You review the PlanResult: actions, risk, blast radius. If it looks right, you leave the chat and apply yourself:",
      },
      {
        type: "code",
        caption: "Apply stays out-of-band",
        code: `# Assistant showed you a PlanResult via kprompt.plan — review it.
# Then, in your own terminal:

kprompt "rollback orders config to last good" -n payments
# Approve? [y/N]   or   ... --approve after you trust the plan`,
      },
      {
        type: "p",
        text: "That split is deliberate. Convenience that lets an IDE agent pass --approve over MCP would dissolve the contract we spent a series arguing for: typed plans, fail-closed safety, humans on the mutate path.",
        links: [
          {
            label: "Building AI SRE in Public",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "PlanResult JSON deep dive",
            href: "/blog/planresult-json-deep-dive",
          },
          {
            label: "Intent compiler, not chat",
            href: "/blog/intent-compiler-not-chat",
          },
        ],
      },
      {
        type: "h2",
        text: "How this compares",
      },
      {
        type: "table",
        headers: ["Surface", "What MCP usually means", "kprompt mcp serve"],
        rows: [
          [
            "kubectl-ai",
            "First-class MCP mode in the NL-CLI lane",
            "Same reach idea; our mutate path always returns PlanResult and never applies over MCP",
          ],
          [
            "K8sGPT",
            "MCP for scan/explain into the assistant",
            "Complementary — we are intent → plan for day-2 ops, not a fleet scanner",
          ],
          [
            "kagent",
            "MCP/A2A as part of an agent platform on the cluster",
            "Different product — we are tool provider for ops, not Agents-as-CRDs",
          ],
          [
            "agentgateway",
            "MCP/LLM/A2A gateway data plane (Gateway API)",
            "Different layer — we speak MCP to IDEs; we do not federate MCP servers on the wire",
          ],
        ],
      },
      {
        type: "p",
        text: "The head-to-head with kubectl-ai still holds: same natural-language CLI neighborhood for day-2, different contract when something must change the cluster. MCP does not erase that fork — it makes the fork visible inside the editor. For gateway vs ops-compiler, see vs agentgateway.",
        links: [
          {
            label: "kprompt vs kubectl-ai",
            href: "/blog/kprompt-vs-kubectl-ai",
          },
          {
            label: "kprompt vs agentgateway",
            href: "/blog/kprompt-vs-agentgateway",
          },
          {
            label: "agentgateway alternatives",
            href: "/blog/agentgateway-alternatives",
          },
          {
            label: "Kubernetes AI tools comparison",
            href: "/blog/kubernetes-ai-tools-comparison",
          },
        ],
      },
      {
        type: "h2",
        text: "Safety invariants (locked)",
      },
      {
        type: "ul",
        items: [
          "No remote auto-apply — the MCP server never executes a mutation",
          "No --approve exposed over the protocol",
          "Hard-denies intact for wipe-class and unscoped deletes",
          "Existing RBAC boundary — reads use your kubeconfig, no credential upload",
          "Local trust by default — stdio only; HTTP/SSE stays off unless you opt in later",
        ],
      },
      {
        type: "p",
        text: "MCP adds reach, not authority. That sentence is the whole product bet.",
      },
      {
        type: "h2",
        text: "Quick manual check",
      },
      {
        type: "code",
        caption: "Smoke the protocol without an editor",
        code: `printf '%s\\n' \\
  '{"jsonrpc":"2.0","id":1,"method":"initialize"}' \\
  '{"jsonrpc":"2.0","id":2,"method":"tools/list"}' \\
  | kprompt mcp serve`,
      },
      {
        type: "h2",
        text: "What we are not claiming",
      },
      {
        type: "ul",
        items: [
          "Not a hosted multi-tenant MCP endpoint",
          "Not an MCP/A2A control plane, agent marketplace, or AI gateway (see agentgateway)",
          "Not silent Autopilot from the editor",
          "Not a replacement for running kprompt in CI — PlanResult JSON gates stay the pipeline path",
        ],
      },
      {
        type: "p",
        text: "Experimental, as the rest of the CLI. Prefer non-production contexts first. Read every plan. If the assistant proposes delete namespace, trust the hard-deny — then ask why that prompt ever left your mouth.",
        links: [
          { label: "MCP docs", href: "/docs/mcp" },
          { label: "Quickstart", href: "/docs/quickstart" },
          { label: "CI / PlanResult", href: "/docs/ci" },
          {
            label: "vs agentgateway",
            href: "/blog/kprompt-vs-agentgateway",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
        ],
      },
    ],
  };

export default post;
