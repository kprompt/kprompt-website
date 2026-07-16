export type DemoCommand = {
  id: string;
  command: string;
  lines: string[];
};

/** First entry is what visitors see when the page opens. */
export const HERO_DEMOS: DemoCommand[] = [
  {
    id: "scale-plan",
    command: 'kprompt "scale api to 3"',
    lines: [
      "Intent: scale",
      "Action: patch deployment/api replicas 1 → 3",
      "Diff: spec.replicas: 1 → 3",
      "Risk: medium — requires approval",
      "Apply? [y/N]",
    ],
  },
  {
    id: "wipe-denied",
    command: 'kprompt "delete all pods in production"',
    lines: [
      "Intent: wipe-class delete",
      "Risk: denied",
      "Only named Pod / Deployment / Service deletes are allowed",
      "Cluster unchanged",
    ],
  },
  {
    id: "deploy-redis",
    command: 'kprompt "deploy redis" --approve',
    lines: [
      "Intent: deploy",
      "✓ Deployment/redis created",
      "✓ Service/redis created",
      "Applied",
    ],
  },
  {
    id: "explain-oom",
    command: 'kprompt "explain why payment-api is crashing"',
    lines: [
      "Collected status + recent events",
      "Finding: OOMKilled — memory limit 256Mi",
      "Suggested: raise memory to 512Mi (plan ready)",
      "Run with --approve to apply the patch",
    ],
  },
  {
    id: "helm-preview",
    command: 'kprompt "install redis"',
    lines: [
      "Intent: Helm install",
      "Preview: helm template + dry-run",
      "Action: install release redis",
      "Risk: medium — requires approval",
      "Apply? [y/N]",
    ],
  },
  {
    id: "workflow",
    command: 'kprompt "train a yolov11 model" --approve --wait',
    lines: [
      "Generated Workflow/train-yolov11",
      "✓ Submitted to argoproj.io/v1alpha1",
      "Phase: Running",
      "✓ Phase: Succeeded",
    ],
  },
  {
    id: "performance",
    command: 'kprompt "why is my api slow?" -n production',
    lines: [
      "Prometheus window: 15m",
      "Finding: p95 latency elevated",
      "CPU saturation: high · replicas: 2",
      "Suggestion: review HPA target or scale to 3",
    ],
  },
  {
    id: "rollback",
    command: 'kprompt "rollback payment-api" --approve',
    lines: [
      "Intent: rollback",
      "✓ Undoing deployment/payment-api rollout",
      "✓ Revision restored",
    ],
  },
  {
    id: "logs",
    command: 'kprompt "logs payment-api"',
    lines: [
      "Tailing pods for deployment/payment-api",
      "payment-api-7f9c…  ready",
      "… last 50 lines",
    ],
  },
  {
    id: "json-ci",
    command: 'kprompt "scale api to 10" -o json',
    lines: [
      '{ "apiVersion": "kprompt.io/v1",',
      '  "kind": "PlanResult",',
      '  "schemaVersion": "1",',
      '  "plan": { "intent": "scale", … },',
      '  "risk": { "level": "medium", "denied": false } }',
    ],
  },
  {
    id: "history",
    command: "kprompt history",
    lines: [
      "1  scale api to 3          scale    pending",
      "2  explain payment-api     explain  read",
      "3  deploy redis            deploy   applied",
      "Tip: kprompt history rerun 1",
    ],
  },
];

export const CLI_EXAMPLES = [
  'kprompt "deploy redis"',
  'kprompt "scale api to 10" --approve --wait',
  'kprompt "rollback payment-api"',
  'kprompt "logs payment-api"',
  'kprompt "describe payment-api"',
  'kprompt "explain why payment-api is crashing"',
  'kprompt "install redis"',
  'kprompt "train a yolov11 model" --approve --wait',
  'kprompt "why is my api slow?" -n production',
  "kprompt tools",
  'kprompt --theme dracula "list deployments"',
  'kprompt "delete deployment redis" --approve',
  'kprompt "list deployments" -n staging',
  "kprompt history",
  'kprompt "scale api to 10" -o json',
] as const;

export const CLI_DEMO_OUTPUT: Record<string, string[]> = {
  'kprompt "deploy redis"': [
    "Planning deployment…",
    "✓ Deployment/redis planned",
    "✓ Service/redis planned",
    "Risk: medium — awaiting approval",
  ],
  'kprompt "scale api to 10" --approve --wait': [
    "✓ Scaling deployment/api 3 → 10",
    "Waiting for rollout…",
    "✓ Ready",
  ],
  'kprompt "rollback payment-api"': [
    "Finding last revision…",
    "Action: rollout undo deployment/payment-api",
    "Risk: medium — awaiting approval",
  ],
  'kprompt "logs payment-api"': [
    "Tailing deployment/payment-api",
    "  payment-api-7f9  Listening on :8080",
    "  payment-api-7f9  Ready",
  ],
  'kprompt "describe payment-api"': [
    "Deployment/payment-api",
    "  Replicas: 2/2 available",
    "  Image: registry.example/payment-api:1.4.2",
    "  Conditions: Available=True",
  ],
  'kprompt "explain why payment-api is crashing"': [
    "Deployment → ReplicaSet → Pods → Events → Logs",
    "⚠ OOMKilled — limit 256Mi",
    "Suggested patch: memory → 512Mi",
  ],
  'kprompt "install redis"': [
    "Helm release: redis",
    "Running template + dry-run preview…",
    "Risk: medium — awaiting approval",
  ],
  'kprompt "train a yolov11 model" --approve --wait': [
    "✓ Workflow/train-yolov11 submitted",
    "Waiting for terminal phase…",
    "✓ Succeeded",
  ],
  'kprompt "why is my api slow?" -n production': [
    "Prometheus: CPU · memory · p95 latency · HPA",
    "Finding: p95 elevated while replicas remain at 2",
    "Suggestion: inspect HPA target or scale",
  ],
  "kprompt tools": [
    "Kubernetes       ready",
    "Helm             ready",
    "Argo Workflows   ready",
    "Prometheus       configured",
  ],
  'kprompt --theme dracula "list deployments"': [
    "Theme: dracula (TTY only)",
    "NAMESPACE   NAME           READY",
    "default     api            3/3",
  ],
  'kprompt "delete deployment redis" --approve': [
    "✓ Deleting deployment/redis",
    "Named delete only — namespace wipe denied",
  ],
  'kprompt "list deployments" -n staging': [
    "NAMESPACE   NAME           READY",
    "staging     api            3/3",
    "staging     workers        2/2",
  ],
  "kprompt history": [
    "1  scale api to 3",
    "2  explain payment-api",
    "3  deploy redis",
  ],
  'kprompt "scale api to 10" -o json': [
    "PlanResult schemaVersion=1",
    'intent=scale  risk.level=medium',
    "applied=false  (stdout is JSON only)",
  ],
};
