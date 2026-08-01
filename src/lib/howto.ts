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
      "Run the zero-LLM Observe walkthrough on kind in about a minute, then optionally add a BYOK LLM provider and practice the plan → approve loop on a sandbox cluster.",
    totalTime: "PT8M",
    tools: [
      "kprompt CLI",
      "Docker or Colima",
      "kind",
      "kubectl",
      "make",
      "Optional: Ollama ($0) or a cloud provider key",
    ],
    steps: [
      {
        name: "Try at $0 — no provider key",
        text: "Install kind, kubectl, and kprompt, clone kprompt-examples, then run make walkthrough. That brings up kind, breaks workloads on purpose, and runs the Observe agent in heuristic mode with zero LLM spend.",
      },
      {
        name: "Level up with NL (Ollama first)",
        text: "On a disposable cluster, prefer local Ollama ($0): kprompt config set provider ollama, then run read-only prompts. Cloud BYOK keys (e.g. KPROMPT_GEMINI_API_KEY) are optional — kprompt does not sell them.",
      },
      {
        name: "Run your first NL prompts",
        text: 'Start with kprompt "list deployments", then try kprompt "scale api to 3" to see the plan, diff, and risk verdict before confirming with y/N.',
      },
      {
        name: "Pick a terminal theme",
        text: "Optionally run kprompt theme preview, then set a theme with kprompt config set theme nord or the --theme flag. Themes respect NO_COLOR and stay off when stdout is not a TTY.",
      },
      {
        name: "Try an installed integration",
        text: 'Run kprompt tools to see which integrations are available, then try prompts such as "install redis" for Helm or "why is my api slow?" for Prometheus. Missing dependencies produce setup hints instead of fabricated output.',
      },
    ],
  },
};
