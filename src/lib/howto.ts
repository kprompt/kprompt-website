import { SITE } from "@/lib/constants";

export type HowToStep = {
  name: string;
  text: string;
};

export type HowTo = {
  name: string;
  description: string;
  /** ISO 8601 duration. */
  totalTime: string;
  tools?: string[];
  steps: HowToStep[];
};

/**
 * HowTo structured data for the step-by-step docs pages, keyed by route.
 * Steps mirror the headings rendered on the page — update both together.
 */
export const DOCS_HOWTOS: Record<string, HowTo> = {
  "/docs/install": {
    name: "Install the kprompt CLI",
    description:
      "Install the kprompt Kubernetes AI CLI on macOS, Linux, or from source, then verify the binary is on your PATH.",
    totalTime: "PT3M",
    tools: ["Terminal", "curl or Homebrew", "Go toolchain (source builds only)"],
    steps: [
      {
        name: "Install the release binary",
        text: `Run ${SITE.installCommand} to install the latest release binary into ~/.local/bin. No sudo is required on macOS.`,
      },
      {
        name: "Or install with Homebrew",
        text: `On macOS and Linux, run ${SITE.installCommandBrew} to install the official GitHub Release binary through the kprompt/homebrew-tap formula.`,
      },
      {
        name: "Put kprompt on your PATH",
        text: 'Append export PATH="$HOME/.local/bin:$PATH" to your shell profile (for example ~/.zshrc) and reload the shell so the kprompt binary resolves.',
      },
      {
        name: "Verify the install",
        text: `Run kprompt version to confirm the CLI is installed. You should see v${SITE.version} or newer.`,
      },
    ],
  },
  "/docs/quickstart": {
    name: "Get started with kprompt on Kubernetes",
    description:
      "Point kprompt at a sandbox cluster, set an LLM provider and API key, then run your first natural-language prompts through the plan and approve loop.",
    totalTime: "PT10M",
    tools: ["kprompt CLI", "kubectl", "A kind, minikube, or sandbox cluster", "An LLM API key"],
    steps: [
      {
        name: "Check cluster access",
        text: "Run kubectl config current-context and kubectl get ns to confirm which cluster kprompt will talk to. Start on a disposable cluster such as kind or minikube rather than production.",
      },
      {
        name: "Save defaults",
        text: "Use kprompt config set provider, model, and namespace to store defaults in ~/.kprompt/config.yaml. The config file never stores API keys — only whether a key is present in the environment.",
      },
      {
        name: "Export an LLM API key",
        text: "Export a provider key such as KPROMPT_GEMINI_API_KEY, or the OpenAI, Anthropic, Groq, or Ollama equivalent. Keys stay in environment variables on your machine (BYOK).",
      },
      {
        name: "Run your first prompts",
        text: 'Start read-only with kprompt "list deployments", then try a mutating prompt like kprompt "scale api to 3" to see the plan, diff, and risk verdict before confirming with y/N.',
      },
      {
        name: "Pick a terminal theme",
        text: "Optionally set a theme with kprompt config set theme nord or the --theme flag. Themes only color terminal output, respect NO_COLOR, and stay off when stdout is not a TTY.",
      },
      {
        name: "Try an installed integration",
        text: 'Run kprompt tools to see which integrations are available, then try prompts such as "install redis" for Helm or "why is my api slow?" for Prometheus. Missing dependencies produce setup hints instead of fabricated output.',
      },
    ],
  },
};
