import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "building-ai-sre-09-knowledge-graph",
    title: "Building AI SRE in Public #9: Knowledge Graph",
    description:
      "Read-only service topology as typed nodes/edges — Ingress, PVC, Secret/ConfigMap names, reverse impact — not a Secret CMDB or chat “who depends on what” folklore. Honest degraded when OTel/mesh are missing.",
    publishedAt: "2026-08-02",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "ai",
      "sre",
      "architecture",
      "devops",
      "platform engineering",
      "observability",
    ],
    keywords: [
      "kubernetes knowledge graph",
      "service dependency graph kubernetes",
      "building ai sre knowledge graph",
      "who consumes service kubernetes",
      "blast radius reverse dependencies",
      "kprompt service graph",
      "ai sre topology",
      "ingress pvc graph edges",
    ],
    featured: false,
    blocks: [
      {
        type: "p",
        text: "This is episode 9 of Building AI SRE in Public. Episode 8 kept namespace priors local and capped. Knowledge Graph answers the topology question operators ask before they touch anything: what connects to what, and who would feel it if this Service dies? Chat answers invent callers. Typed nodes and edges refuse to.",
        links: [
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Episode 8: Cluster Memory",
            href: "/blog/building-ai-sre-08-cluster-memory",
          },
          {
            label: "Episode 6: Investigation Graph",
            href: "/blog/building-ai-sre-06-investigation-graph",
          },
          {
            label: "Graph docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/graph.md",
          },
          {
            label: "Impact docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/impact.md",
          },
        ],
      },
      {
        type: "h2",
        text: "The claim",
      },
      {
        type: "p",
        text: "AI SRE needs a read-only relationship map — Services, EndpointSlice-backed pods, Ingress exposes, volume mounts (PVC / Secret / ConfigMap names), remembered deps, and reverse consumers — as JSON you can jq. That map biases investigate and plan blast radius. It does not auto-remediate, invent mesh callers, or upload topology to the cloud by default.",
      },
      {
        type: "h2",
        text: "Two graphs, one honesty rule",
      },
      {
        type: "table",
        headers: ["", "Investigation Graph (ep.6)", "Knowledge Graph (this ep.)"],
        rows: [
          ["Question", "How do we verify a finding?", "What connects / who consumes?"],
          ["Shape", "Gated hops → Investigation", "Nodes/edges → service-graph + impact"],
          ["Proof", "EvidenceRef / Unknowns", "Static refs + optional OTel calls"],
          ["Mutate", "Never from soft-agree", "Never from an edge alone"],
        ],
      },
      {
        type: "p",
        text: "Same temperament: refuse fiction. Kubernetes does not record “who called this Service” by itself. Missing OTel or mesh lands in degraded[] — not invented edges that make the picture prettier.",
      },
      {
        type: "h2",
        text: "What ships (MVP)",
      },
      {
        type: "ul",
        items: [
          "Service dependency graph: type: service-graph nodes/edges (T-059 · T-060)",
          "Ingress → Service exposes; Pod → PVC mounts; Pod → Secret/ConfigMap mounts by name only (AG-063 · AG-064)",
          "Reverse impact: who consumes / blast radius → Investigation (S-005 · T-083)",
          "Namespace memory deps as heuristic edges — evidence, not proof (AG-015 · ep.8)",
          "CLI + agent dump: show service dependency graph · agent graph · who consumes …",
        ],
      },
      {
        type: "code",
        caption: "Topology you can audit",
        code: `kprompt "show service dependency graph" -n payments
kprompt agent graph -n payments
kprompt agent graph -n payments --ingress --pvc --volume-refs --network-policy
kprompt agent graph -n payments -o json

kprompt "who consumes redis" -n payments
kprompt "blast radius for payment-api" -n payments --output json
kprompt "impact of service api" -n production`,
      },
      {
        type: "h2",
        text: "Impact vs PlanResult blastRadius",
      },
      {
        type: "table",
        headers: ["", "impact (live)", "PlanResult.blastRadius"],
        rows: [
          ["Asks", "What currently points at this object?", "What will this proposed change touch?"],
          ["When", "Read / investigate", "Before approve / apply"],
          ["Artifact", "Investigation", "PlanResult"],
        ],
      },
      {
        type: "p",
        text: "Both are structural. Neither replaces approval. Simulation (change preview) may reuse the same relationships — still not chaos or capacity what-if as a product claim.",
      },
      {
        type: "h2",
        text: "Secret honesty",
      },
      {
        type: "p",
        text: "Edges may say a Pod mounts Secret payments-db — the name. Values never enter the graph. That is a reality-anchor-shaped non-goal: topology without a Secret CMDB. ConfigMap names follow the same rule.",
      },
      {
        type: "h2",
        text: "Privacy",
      },
      {
        type: "p",
        text: "Helm and laptop Observe agents do not upload topology to api.kprompt.ai. Knowledge stays where the kubeconfig or in-cluster SA already is — same privacy default as Cluster Memory.",
      },
      {
        type: "h2",
        text: "What ships vs building",
      },
      {
        type: "ul",
        items: [
          "Shipped: service-graph JSON; Ingress/PVC/volume-ref edges; reverse impact MVP; memory dep hints",
          "Shipped: Secret/ConfigMap name-only mounts; degraded honesty for OTel/mesh gaps",
          "Shipped (v0.10): topology edges — ExternalName / env-host / EndpointSlice / NetworkPolicy into impact",
          "Building: always-on external APIs / Kafka as first-class nodes; interactive Team /graph UI",
          "Exploring: ADR / docs2src as knowledge nodes (not a second chat brain)",
          "Non-goal: auto-remediation from edges; inventing runtime callers; replacing Prom/mesh/CMDB products",
        ],
      },
      {
        type: "h2",
        text: "Try the map",
      },
      {
        type: "code",
        caption: "Non-prod drill",
        code: `# kind + dependency scenario
kprompt "show service dependency graph" -n payments -o json \\
  | jq '{type, nodes: (.nodes|length), edges: (.edges|length)}'
kprompt "who consumes redis" -n payments
# Prefer static edges + degraded[] over a model inventing callers`,
      },
      {
        type: "p",
        text: "If your AI ops tool draws a pretty graph from narrative alone, you have wallpaper. Knowledge Graph MVP is plumbing: names, selectors, mounts, and honest gaps.",
      },
      {
        type: "h2",
        text: "Next",
      },
      {
        type: "p",
        text: "Episode 10 is Autonomous SRE — and why we don’t want it yet. The series closes on the approval boundary, not a fleet of unsupervised remediations.",
        links: [
          {
            label: "Episode 10: Autonomous SRE",
            href: "/blog/building-ai-sre-10-autonomous-not-yet",
          },
          {
            label: "Series hub",
            href: "/blog/building-ai-sre-in-public",
          },
          {
            label: "Graph docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/graph.md",
          },
          {
            label: "Impact docs",
            href: "https://github.com/kprompt/kprompt/blob/main/docs/impact.md",
          },
          {
            label: "Cluster Memory (ep.8)",
            href: "/blog/building-ai-sre-08-cluster-memory",
          },
          { label: "GitHub", href: "https://github.com/kprompt/kprompt" },
          { label: "Roadmap & vision", href: "/docs/roadmap" },
        ],
      },
    ],
  };

export default post;
