export type DemoCommand = {
  id: string;
  command: string;
  lines: string[];
};

export const HERO_DEMOS: DemoCommand[] = [
  {
    id: "deploy-redis",
    command: 'kprompt "deploy redis"',
    lines: [
      "✓ Deployment created",
      "✓ Service created",
      "✓ Ingress configured",
      "✓ Ready in 12 seconds",
    ],
  },
  {
    id: "deploy-nginx",
    command: 'kprompt "deploy nginx"',
    lines: [
      "✓ Deployment nginx created",
      "✓ Service ClusterIP ready",
      "✓ Replicas: 2/2 available",
      "✓ Ready in 8 seconds",
    ],
  },
  {
    id: "scale-api",
    command: 'kprompt "scale api to 10"',
    lines: [
      "✓ Scaling deployment/api",
      "✓ Replicas 3 → 10",
      "✓ HPA unchanged",
      "✓ Ready in 4 seconds",
    ],
  },
  {
    id: "explain-crash",
    command: 'kprompt "explain why payment-api is crashing"',
    lines: [
      "✓ Collected pod events",
      "✓ OOMKilled: memory limit 256Mi",
      "✓ Suggested limit: 512Mi",
      "✓ Patch ready for approval",
    ],
  },
  {
    id: "cronjob",
    command: 'kprompt "create a cronjob every hour"',
    lines: [
      "✓ CronJob schedule: 0 * * * *",
      "✓ Container image confirmed",
      "✓ Manifest generated",
      "✓ Awaiting apply approval",
    ],
  },
  {
    id: "backup-pg",
    command: 'kprompt "backup postgres"',
    lines: [
      "✓ Found StatefulSet postgres",
      "✓ Snapshot Job queued",
      "✓ PVC snapshot in progress",
      "✓ Backup id: pg-042",
    ],
  },
  {
    id: "helm",
    command: 'kprompt "generate helm chart"',
    lines: [
      "✓ Chart scaffold created",
      "✓ values.yaml generated",
      "✓ templates/ populated",
      "✓ Chart ready at ./chart",
    ],
  },
];

export const CLI_EXAMPLES = [
  'kprompt "deploy redis"',
  'kprompt "rollback payment-api"',
  'kprompt "scale workers to 12"',
  'kprompt "show pods using more than 2GB RAM"',
  'kprompt "generate helm chart"',
  'kprompt "explain ingress"',
  'kprompt "backup postgres"',
] as const;

export const CLI_DEMO_OUTPUT: Record<string, string[]> = {
  'kprompt "deploy redis"': [
    "Planning deployment…",
    "✓ Deployment created",
    "✓ Service created",
    "✓ Ready in 12s",
  ],
  'kprompt "rollback payment-api"': [
    "Finding last healthy revision…",
    "✓ Rolled back to revision 17",
    "✓ Pods recovering",
  ],
  'kprompt "scale workers to 12"': [
    "✓ Scaling deployment/workers",
    "✓ Replicas 4 → 12",
  ],
  'kprompt "show pods using more than 2GB RAM"': [
    "Scanning metrics…",
    "  payment-api-7f9  2.4Gi",
    "  analytics-0      3.1Gi",
    "  cache-warmup-2   2.1Gi",
  ],
  'kprompt "generate helm chart"': [
    "✓ Chart scaffolded",
    "✓ values.yaml written",
    "✓ templates ready",
  ],
  'kprompt "explain ingress"': [
    "Ingress routes external HTTP(S)",
    "to Services via rules & TLS.",
    "Your cluster: 3 ingresses active.",
  ],
  'kprompt "backup postgres"': [
    "✓ Snapshot Job created",
    "✓ backup id: pg-042",
  ],
};
