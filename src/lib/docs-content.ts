export type DocsBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string; caption?: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    };

export type DocsPage = {
  title: string;
  description: string;
  blocks: DocsBlock[];
};

export const DOCS_PAGES: Record<string, DocsPage> = {
  overview: {
    title: "Overview",
    description:
      "kprompt is an open-source CLI that turns natural language into a reviewable Kubernetes plan, then applies with approval.",
    blocks: [
      {
        type: "p",
        text: "Talk to your cluster from the terminal you already use. kprompt uses your kubeconfig and your LLM API keys (BYOK). Mutations always produce a plan; risk checks and hard denies run before apply.",
      },
      {
        type: "h2",
        text: "What it is",
      },
      {
        type: "ul",
        items: [
          "MIT CLI for day-2 Kubernetes ops",
          "Plan → safety → approve → apply loop",
          "Deploy, scale, rollback, named delete",
          "Read path: get/list, explain, logs, describe",
          "Local history and CI-stable JSON PlanResult",
        ],
      },
      {
        type: "h2",
        text: "What it is not (yet)",
      },
      {
        type: "ul",
        items: [
          "Not a hosted agent that runs inside your cluster",
          "Not Helm/Argo/CronJob/backup generation",
          "Not a paid Team control plane (explored later — nothing to buy today)",
        ],
      },
      {
        type: "p",
        text: "Source of truth for the binary: github.com/kprompt/kprompt. This site mirrors install, safety, providers, and CI docs for operators who land here first.",
      },
    ],
  },
  install: {
    title: "Install",
    description: "Install the kprompt CLI from GitHub Releases via the website installer.",
    blocks: [
      {
        type: "h2",
        text: "Recommended",
      },
      {
        type: "code",
        code: "curl -fsSL https://kprompt-website.vercel.app/install | bash",
      },
      {
        type: "p",
        text: "Installs the latest release binary into ~/.local/bin (no sudo on macOS). After kprompt.ai DNS is live, the same path will be https://kprompt.ai/install.",
      },
      {
        type: "h2",
        text: "Fallback (jsDelivr, pinned tag)",
      },
      {
        type: "code",
        code: "curl -fsSL https://cdn.jsdelivr.net/gh/kprompt/kprompt@v0.2.0/install/install.sh | bash",
      },
      {
        type: "h2",
        text: "PATH",
      },
      {
        type: "code",
        code: `echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
kprompt version`,
      },
      {
        type: "h2",
        text: "From source",
      },
      {
        type: "code",
        code: `git clone https://github.com/kprompt/kprompt.git
cd kprompt
go install ./cmd/kprompt`,
      },
    ],
  },
  quickstart: {
    title: "Quickstart",
    description: "Kubeconfig, config file, API key, and your first prompts.",
    blocks: [
      {
        type: "h2",
        text: "1. Cluster access",
      },
      {
        type: "code",
        code: `kubectl config current-context
kubectl get ns`,
      },
      {
        type: "h2",
        text: "2. Save defaults (no secrets)",
      },
      {
        type: "code",
        code: `kprompt config set provider gemini
kprompt config set model gemini-2.0-flash
kprompt config set namespace default
kprompt config`,
      },
      {
        type: "p",
        text: "Config lives at ~/.kprompt/config.yaml. It never stores API keys — only whether a key is set or unset in the environment.",
      },
      {
        type: "h2",
        text: "3. Export an API key",
      },
      {
        type: "code",
        code: `export KPROMPT_GEMINI_API_KEY="..."
# or OPENAI / ANTHROPIC / GROQ / … — see Providers`,
      },
      {
        type: "h2",
        text: "4. Prompt",
      },
      {
        type: "code",
        code: `kprompt "list deployments"
kprompt "scale api to 3"          # plan + y/N on a TTY
kprompt "scale api to 3" --approve --wait
kprompt "explain why api is crashing"`,
      },
      {
        type: "h2",
        text: "History",
      },
      {
        type: "code",
        code: `kprompt history
kprompt history rerun
kprompt history rerun 3 --approve`,
      },
    ],
  },
  commands: {
    title: "Commands",
    description: "Supported intents and useful flags in the shipped CLI.",
    blocks: [
      {
        type: "h2",
        text: "Supported intents",
      },
      {
        type: "table",
        headers: ["Intent", "Examples", "Notes"],
        rows: [
          ["deploy", '"deploy redis"', "Deployment ± Service shortcuts"],
          ["scale", '"scale api to 10"', "Deployment replicas"],
          ["rollback", '"rollback payment-api"', "Rollout undo"],
          ["delete", '"delete deployment redis"', "Named Pod/Deployment/Service only"],
          ["get / list", '"list deployments"', "Read-only"],
          ["explain", '"explain why api is crashing"', "Status + events; may suggest patch"],
          ["logs", '"logs payment-api"', "Tail"],
          ["describe", '"describe payment-api"', "Compact describe"],
        ],
      },
      {
        type: "h2",
        text: "Flags",
      },
      {
        type: "table",
        headers: ["Flag", "Description"],
        rows: [
          ["--approve", "Apply without interactive confirmation"],
          ["--wait", "After apply, wait for Deployment rollout"],
          ["--timeout", "Timeout for --wait (default 5m)"],
          ["--output / -o", "text (default) or json (PlanResult)"],
          ["--provider", "LLM provider id"],
          ["--model", "Model id"],
          ["--context", "kubeconfig context"],
          ["-n / --namespace", "Namespace (wins over prompt phrases)"],
        ],
      },
      {
        type: "h2",
        text: "Subcommands",
      },
      {
        type: "ul",
        items: [
          "kprompt config / config set …",
          "kprompt history / history rerun [n]",
          "kprompt version",
        ],
      },
    ],
  },
  safety: {
    title: "Safety",
    description: "Approval, risk levels, and hard denies.",
    blocks: [
      {
        type: "p",
        text: "Every mutating plan is risk-evaluated before apply. On a TTY, kprompt asks y/N unless you pass --approve. Read-only intents (get, list, explain, logs, describe) do not require approval.",
      },
      {
        type: "h2",
        text: "Hard denies",
      },
      {
        type: "ul",
        items: [
          "Cluster or namespace wipe language",
          "Delete-everything style prompts",
          "Deleting a whole namespace",
          "Anything that is not a named Pod, Deployment, or Service delete",
        ],
      },
      {
        type: "h2",
        text: "Risk levels",
      },
      {
        type: "p",
        text: "Plans surface low / medium / high / denied. Denied plans never apply. Medium/high mutations still need explicit approval.",
      },
      {
        type: "h2",
        text: "Diffs",
      },
      {
        type: "p",
        text: "When a live object exists, plans include a before→after diff so you can review the change, not only the intent summary.",
      },
      {
        type: "code",
        caption: "Example deny",
        code: `kprompt "delete all pods in production"
# Risk: denied — named resources only`,
      },
    ],
  },
  providers: {
    title: "Providers",
    description: "BYOK LLM providers and environment variables.",
    blocks: [
      {
        type: "p",
        text: "Select with --provider or ~/.kprompt/config.yaml (provider, model, optional base_url). API keys are environment variables only — never stored in the config file.",
      },
      {
        type: "table",
        headers: ["Provider", "--provider", "Env key", "Default model"],
        rows: [
          ["OpenAI", "openai", "KPROMPT_OPENAI_API_KEY", "gpt-4o-mini"],
          ["Anthropic", "anthropic", "KPROMPT_ANTHROPIC_API_KEY", "claude-sonnet-4-20250514"],
          ["Gemini", "gemini", "KPROMPT_GEMINI_API_KEY", "gemini-2.0-flash"],
          ["Groq", "groq", "KPROMPT_GROQ_API_KEY", "llama-3.3-70b-versatile"],
          ["Mistral", "mistral", "KPROMPT_MISTRAL_API_KEY", "mistral-small-latest"],
          ["DeepSeek", "deepseek", "KPROMPT_DEEPSEEK_API_KEY", "deepseek-chat"],
          ["OpenRouter", "openrouter", "KPROMPT_OPENROUTER_API_KEY", "openai/gpt-4o-mini"],
          ["Together", "together", "KPROMPT_TOGETHER_API_KEY", "Llama 3.1 8B Turbo"],
          ["Ollama", "ollama", "(optional)", "llama3.2"],
          ["OpenAI-compat", "openai-compatible", "KPROMPT_OPENAI_API_KEY", "(requires base_url)"],
        ],
      },
      {
        type: "h2",
        text: "Examples",
      },
      {
        type: "code",
        code: `export KPROMPT_OPENAI_API_KEY=sk-...
kprompt "list deployments"

export KPROMPT_ANTHROPIC_API_KEY=sk-ant-...
kprompt --provider anthropic "explain why api is crashing"

kprompt --provider ollama --model llama3.2 "list pods"`,
      },
    ],
  },
  ci: {
    title: "CI / JSON",
    description: "Stable PlanResult output for pipeline gates.",
    blocks: [
      {
        type: "p",
        text: "Pass --output json or -o json to emit a single PlanResult document on stdout. Human confirmations and wait status go to stderr in JSON mode.",
      },
      {
        type: "code",
        code: 'kprompt "scale api to 10" -n prod --output json',
      },
      {
        type: "h2",
        text: "Schema",
      },
      {
        type: "table",
        headers: ["Field", "Notes"],
        rows: [
          ["apiVersion", "always kprompt.io/v1"],
          ["kind", "always PlanResult"],
          ["schemaVersion", '"1" — bump only on breaking changes'],
          ["plan.intent", "scale, deploy, get, …"],
          ["plan.actions", "ops without YAML manifests"],
          ["risk.level", "low / medium / high / denied"],
          ["risk.denied", "hard deny"],
          ["applied", "whether a mutation ran"],
          ["result", "optional get/explain/logs/describe payload"],
        ],
      },
      {
        type: "p",
        text: "Manifests and API keys are never included.",
      },
      {
        type: "h2",
        text: "Gate example",
      },
      {
        type: "code",
        code: `#!/usr/bin/env bash
set -euo pipefail
json="$(kprompt "scale api to 10" -n prod -o json)"
echo "$json" | jq -e '.risk.denied == false' >/dev/null
echo "$json" | jq -e '.plan.intent == "scale"' >/dev/null
kprompt "scale api to 10" -n prod --approve --wait`,
      },
      {
        type: "h2",
        text: "jq helpers",
      },
      {
        type: "code",
        code: `# Fail if any delete is planned
echo "$json" | jq -e '[.plan.actions[].op] | index("delete") | not'

# High-risk gate
echo "$json" | jq -e '.risk.level != "high"'`,
      },
    ],
  },
};
