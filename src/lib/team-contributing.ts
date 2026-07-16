export type ContributeRepo = {
  name: string;
  href: string;
  description: string;
  stack: string;
};

export type ContributeStep = {
  title: string;
  description: string;
};

export const CONTRIBUTE_PAGE = {
  title: "Become a contributor",
  description:
    "kprompt is MIT licensed and built in public. You do not need permission to open an issue or send a PR — start small, keep safety in mind, and link your work to a clear problem.",
} as const;

export const CONTRIBUTE_REPOS: ContributeRepo[] = [
  {
    name: "CLI",
    href: "https://github.com/kprompt/kprompt",
    description:
      "Go binary: planner, safety, executor, providers, Helm depth, and E2E against kind.",
    stack: "Go · kubectl · LLM APIs",
  },
  {
    name: "Website",
    href: "https://github.com/kprompt/kprompt-website",
    description:
      "Marketing site, docs mirror, install endpoint, blog, and team pages.",
    stack: "Next.js · TypeScript · Tailwind",
  },
];

export const CONTRIBUTE_FOCUS_AREAS = [
  "Safety rules, risk scoring, and hard-deny coverage",
  "New LLM providers and preset quality",
  "Helm install/upgrade flows and deeper Kubernetes investigation chains",
  "Docs accuracy — install, providers, CI JSON, and operator examples",
  "E2E tests on kind (deploy, scale, rollback, explain, logs)",
  "Website UX, accessibility, and content (blog, docs, team)",
] as const;

export const CONTRIBUTE_STEPS: ContributeStep[] = [
  {
    title: "Find or file an issue",
    description:
      "Search existing issues first. For bugs and features, open one with context: what you expected, what happened, and your cluster/provider setup if relevant.",
  },
  {
    title: "Discuss before large changes",
    description:
      "Small fixes and docs can go straight to a PR. For new tools, safety behavior, or architecture shifts, comment on an issue so we align on scope before you invest days of work.",
  },
  {
    title: "Fork, branch, and keep it focused",
    description:
      "One concern per PR — easier to review and safer to merge. Match the style of the repo you are touching (Go in CLI, TypeScript in website).",
  },
  {
    title: "Test what you change",
    description:
      "Run go test ./... for CLI changes. For website changes, npm run build and npm run lint. Add or update tests when behavior changes.",
  },
  {
    title: "Open a PR with context",
    description:
      "Explain why the change matters, link the issue, and call out anything operators should know (flags, safety, breaking behavior). No secrets, kubeconfigs, or API keys in commits.",
  },
];

export const CONTRIBUTE_PR_CHECKLIST = [
  "Linked issue or clear problem statement",
  "Tests updated when behavior changes",
  "Docs updated when user-facing behavior changes",
  "No credentials, tokens, or private cluster details",
  "Safety-sensitive paths called out in the PR description",
] as const;

export const CONTRIBUTE_CLI_SETUP = `git clone https://github.com/kprompt/kprompt.git
cd kprompt
go test ./...
go build -o bin/kprompt ./cmd/kprompt
./bin/kprompt version`;

export const CONTRIBUTE_CLI_E2E = `# Optional — requires Docker + kind
go test -tags=e2e ./test/e2e/ -count=1 -v -timeout 10m`;

export const CONTRIBUTE_WEBSITE_SETUP = `git clone https://github.com/kprompt/kprompt-website.git
cd kprompt-website
npm install
npm run dev`;

export const CONTRIBUTE_LINKS = {
  cliIssues: "https://github.com/kprompt/kprompt/issues",
  websiteIssues: "https://github.com/kprompt/kprompt-website/issues",
  cliSecurity: "https://github.com/kprompt/kprompt/security",
} as const;
