export type DemoCommand = {
  id: string;
  command: string;
  lines: string[];
};

/** Hero rotation — operate / investigate / analyze / agent. */
export const HERO_RUNTIME_DEMOS: DemoCommand[] = [
  {
    id: "scale-checkout",
    command: 'kprompt "scale checkout-api to 10"',
    lines: [
      "Intent: scale",
      "Understood: Deployment/checkout-api · namespace checkout",
      "Plan: replicas 3 → 10",
      "Risk: medium · blast radius: checkout",
      "Apply this plan? [y/N]:",
    ],
  },
  {
    id: "why-checkout",
    command: 'kprompt "why is checkout-api crashing?"',
    lines: [
      "Walking Deploy → Pods → Events → Logs",
      "Finding: OOMKilled — memory limit 256Mi",
      "Related: redis latency elevated in same window",
      "Suggested: raise memory to 512Mi (plan ready)",
    ],
  },
  {
    id: "optimize-cluster",
    command: 'kprompt "optimize my cluster"',
    lines: [
      "Inventory: 48 workloads · 12 namespaces",
      "Idle: 6 Deployments under-utilized vs requests",
      "Rightsizing: payment-api CPU request ↓ 250m",
      "HPA hints: 3 workloads at maxReplicas — read-only",
    ],
  },
  {
    id: "agent-observe",
    command:
      "kprompt agent run -n payments --analyze --health --heuristic",
    lines: [
      "Observe: watching namespace payments",
      "Incident: CrashLoopBackOff ×3 correlated",
      "Confidence: high · severity: warning",
      "Alert gated — no mutate (Observe mode)",
    ],
  },
];

/** Alias used by AnimatedTerminal default. */
export const HERO_DEMOS = HERO_RUNTIME_DEMOS;

/** Motivation-first CLI strip (~8 prompts). */
export const CLI_EXAMPLES = [
  'kprompt "scale api to 10" --approve --wait',
  "kprompt agent run -n payments --analyze --health --heuristic",
  'kprompt "optimize my cluster"',
  'kprompt "show service dependency graph"',
  "kprompt why payment-api",
  'kprompt "deploy redis"',
  'kprompt "explain why payment-api is crashing"',
  'kprompt "audit my cluster"',
] as const;

export const CLI_DEMO_OUTPUT: Record<string, string[]> = {
  'kprompt "scale api to 10" --approve --wait': [
    "✓ Scaling deployment/api 3 → 10",
    "Waiting for rollout…",
    "✓ Ready",
  ],
  "kprompt agent run -n payments --analyze --health --heuristic": [
    "Observe: watching namespace payments",
    "Incident: CrashLoopBackOff ×3 correlated",
    "Confidence: high · severity: warning",
    "Alert gated — no mutate (Observe mode)",
  ],
  'kprompt "optimize my cluster"': [
    "Inventory: 48 workloads · 12 namespaces",
    "Idle: 6 Deployments under-utilized vs requests",
    "Rightsizing: payment-api CPU request ↓ 250m",
    "HPA: 3 workloads at maxReplicas — read-only report",
  ],
  'kprompt "show service dependency graph"': [
    "Nodes: Service/checkout-api · redis · mysql",
    "Edges: checkout-api → redis · checkout-api → mysql",
    "Optional OTel edges: degraded (no Tempo)",
    "type: service-graph — read-only",
  ],
  "kprompt why payment-api": [
    "Cause finding: ImagePullBackOff",
    "Registry auth missing for ghcr.io/…",
    "Related: Secret/regcred not mounted",
    "Next: create pull secret → PlanResult",
  ],
  'kprompt "deploy redis"': [
    "Planning deployment…",
    "✓ Deployment/redis planned",
    "✓ Service/redis planned",
    "Risk: medium — awaiting approval",
  ],
  'kprompt "explain why payment-api is crashing"': [
    "Deployment → ReplicaSet → Pods → Events → Logs",
    "⚠ OOMKilled — limit 256Mi",
    "Suggested patch: memory → 512Mi",
  ],
  'kprompt "audit my cluster"': [
    "Scanning Deploy/StatefulSet/DaemonSet templates…",
    "Finding: Audit.MissingLimits on payment-worker",
    "Finding: Audit.RunAsRoot on jobs-runner",
    "Harden plan ready — Apply? [y/N]",
  ],
};
