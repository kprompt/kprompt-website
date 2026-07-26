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
