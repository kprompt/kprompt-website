/** Build campaign URLs for posts that send traffic back to kprompt.ai. */
export function withUtm(
  pathOrUrl: string,
  opts: {
    source: "x" | "linkedin" | "bluesky" | "github";
    medium?: string;
    campaign: string;
    content?: string;
  }
): string {
  const base = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : `https://kprompt.ai${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
  const url = new URL(base);
  url.searchParams.set("utm_source", opts.source);
  url.searchParams.set("utm_medium", opts.medium ?? "social");
  url.searchParams.set("utm_campaign", opts.campaign);
  if (opts.content) url.searchParams.set("utm_content", opts.content);
  return url.toString();
}

type SocialSource = "x" | "linkedin" | "bluesky" | "github";

/** Blog/docs landings for the ongoing growth series (Series 2). */
const GROWTH_ENTRIES = {
  aiToolsComparison: {
    path: "/blog/kubernetes-ai-tools-comparison",
    content: "ai-tools-comparison",
  },
  aiToolsComparisonReply: {
    path: "/docs/quickstart",
    content: "ai-tools-comparison-reply",
  },
  aiSre: {
    path: "/blog/ai-sre-not-ai-kubectl",
    content: "ai-sre",
  },
  vsKubectlAi: {
    path: "/blog/kprompt-vs-kubectl-ai",
    content: "vs-kubectl-ai",
  },
  oomkilled: {
    path: "/blog/kubernetes-oomkilled",
    content: "oomkilled",
  },
  errorPlaybook: {
    path: "/blog/kubernetes-error-prompt-playbook",
    content: "error-playbook",
  },
  intentCompiler: {
    path: "/blog/intent-compiler-not-chat",
    content: "intent-compiler",
  },
  safety: {
    path: "/blog/kubernetes-safety-plan-approve",
    content: "safety",
  },
  ciCd: {
    path: "/blog/kubernetes-ci-cd-plan-gates",
    content: "ci-cd",
  },
  planResultJson: {
    path: "/blog/planresult-json-deep-dive",
    content: "planresult-json",
  },
  observeDemo: {
    path: "/blog/observe-agent-kind-demo",
    content: "observe-demo",
  },
  byok: {
    path: "/blog/kubernetes-llm-providers-byok",
    content: "byok",
  },
  buildInPublic: {
    path: "/blog/building-ai-sre-in-public",
    content: "build-in-public",
  },
  quickstart: {
    path: "/docs/quickstart",
    content: "quickstart",
  },
  github: {
    path: "https://github.com/kprompt/kprompt",
    content: "github",
  },
  examples: {
    path: "https://github.com/kprompt/kprompt-examples",
    content: "examples",
  },
} as const;

function growthLinksFor(source: SocialSource) {
  return Object.fromEntries(
    Object.entries(GROWTH_ENTRIES).map(([key, { path, content }]) => [
      key,
      withUtm(path, { source, campaign: "growth", content }),
    ])
  ) as {
    [K in keyof typeof GROWTH_ENTRIES]: string;
  };
}

/** Ready-to-paste landings for the growth series (`utm_campaign=growth`). */
export const GROWTH_LINKS = {
  x: growthLinksFor("x"),
  linkedin: growthLinksFor("linkedin"),
  bluesky: growthLinksFor("bluesky"),
} as const;

/** Ready-to-paste landings for the current launch campaign. */
export const LAUNCH_LINKS = {
  x: {
    quickstart: withUtm("/docs/quickstart", {
      source: "x",
      campaign: "launch",
      content: "quickstart",
    }),
    imagePull: withUtm("/blog/kubernetes-imagepullbackoff", {
      source: "x",
      campaign: "launch",
      content: "imagepull",
    }),
    kubectlVsK9s: withUtm("/blog/kubectl-vs-k9s", {
      source: "x",
      campaign: "launch",
      content: "kubectl-vs-k9s",
    }),
    crashLoop: withUtm("/blog/kubernetes-crashloopbackoff", {
      source: "x",
      campaign: "launch",
      content: "crashloop",
    }),
    kubernetesAi: withUtm("/blog/what-is-kubernetes-ai", {
      source: "x",
      campaign: "launch",
      content: "kubernetes-ai",
    }),
    examples: withUtm("https://github.com/kprompt/kprompt-examples", {
      source: "x",
      campaign: "launch",
      content: "examples",
    }),
  },
  linkedin: {
    quickstart: withUtm("/docs/quickstart", {
      source: "linkedin",
      campaign: "launch",
      content: "quickstart",
    }),
    imagePull: withUtm("/blog/kubernetes-imagepullbackoff", {
      source: "linkedin",
      campaign: "launch",
      content: "imagepull",
    }),
    kubectlVsK9s: withUtm("/blog/kubectl-vs-k9s", {
      source: "linkedin",
      campaign: "launch",
      content: "kubectl-vs-k9s",
    }),
    kubernetesAi: withUtm("/blog/what-is-kubernetes-ai", {
      source: "linkedin",
      campaign: "launch",
      content: "kubernetes-ai",
    }),
    examples: withUtm("https://github.com/kprompt/kprompt-examples", {
      source: "linkedin",
      campaign: "launch",
      content: "examples",
    }),
  },
  bluesky: {
    quickstart: withUtm("/docs/quickstart", {
      source: "bluesky",
      campaign: "launch",
      content: "quickstart",
    }),
    imagePull: withUtm("/blog/kubernetes-imagepullbackoff", {
      source: "bluesky",
      campaign: "launch",
      content: "imagepull",
    }),
    kubectlVsK9s: withUtm("/blog/kubectl-vs-k9s", {
      source: "bluesky",
      campaign: "launch",
      content: "kubectl-vs-k9s",
    }),
    kubernetesAi: withUtm("/blog/what-is-kubernetes-ai", {
      source: "bluesky",
      campaign: "launch",
      content: "kubernetes-ai",
    }),
  },
} as const;
