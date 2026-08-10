import type { BlogPost } from "@/lib/blog-types";
import { MUHTALIP_DEDE } from "@/lib/team";

const post: BlogPost = {
    slug: "kubernetes-llm-providers-byok",
    title:
      "Choosing an LLM for Kubernetes: BYOK providers, privacy, and what to run in prod",
    description:
      "Compare Gemini, OpenAI, Anthropic, Groq, and Ollama for Kubernetes CLI workflows with kprompt — BYOK keys, air-gapped setups, model speed vs explain quality, and security rules for operators.",
    publishedAt: "2026-07-16",
    author: MUHTALIP_DEDE,
    tags: [
      "kubernetes",
      "llm",
      "ai",
      "devops",
      "security",
    ],
    keywords: [
      "kubernetes llm",
      "ollama kubernetes",
      "openai kubernetes",
      "gemini devops",
      "byok llm",
      "local llm kubernetes",
      "anthropic cli",
      "kubernetes ai tools",
      "private llm deployment",
      "kprompt providers",
    ],
    blocks: [
      {
        type: "p",
        text: "Natural-language Kubernetes tools need a model somewhere. The question platform teams ask first is not which prompt template wins — it's where your data goes, which API key gets billed, and whether an air-gapped cluster forces local inference. kprompt is bring-your-own-key (BYOK) by design: your kubeconfig stays local, your provider keys stay in environment variables, and ~/.kprompt/config.yaml never stores secrets.",
      },
      {
        type: "p",
        text: "This guide compares the LLM providers kprompt supports today — when to pick Gemini Flash for speed, Claude or GPT for hard explains, Groq for low-latency iteration, Ollama for offline — and the security habits that matter when kubectl output flows to a model.",
      },
      {
        type: "h2",
        text: "What actually gets sent to the LLM",
      },
      {
        type: "p",
        text: "Transparency matters for security reviews. kprompt sends your prompt plus context the tool gathers to plan or explain — intent parsing, kubectl get/describe/log snippets, cluster metadata needed for the operation. It does not upload your kubeconfig file. API keys travel only to the provider you choose (or to localhost for Ollama). PlanResult JSON and history store plan summaries locally — not full manifests, not env secrets.",
      },
      {
        type: "ul",
        items: [
          "Sent — user prompt, selected provider/model, operational context for the plan",
          "Not stored in config — API keys (env vars only)",
          "Not in PlanResult stdout — manifests, kubeconfig, raw secrets",
          "Your choice — cloud API vs local Ollama on the same laptop as kubectl",
        ],
      },
      {
        type: "h2",
        text: "Supported providers at a glance",
      },
      {
        type: "p",
        text: "Set provider in ~/.kprompt/config.yaml or pass --provider on each run. Default models ship sensible for CLI work; override with --model when you need more capacity.",
      },
      {
        type: "table",
        headers: ["Provider", "Flag", "Env key", "Default model"],
        rows: [
          ["OpenAI", "openai", "KPROMPT_OPENAI_API_KEY", "gpt-4o-mini"],
          ["Anthropic", "anthropic", "KPROMPT_ANTHROPIC_API_KEY", "claude-sonnet-4-6"],
          ["Gemini", "gemini", "KPROMPT_GEMINI_API_KEY", "gemini-3.6-flash"],
          ["Groq", "groq", "KPROMPT_GROQ_API_KEY", "llama-3.3-70b-versatile"],
          ["xAI (Grok)", "xai", "KPROMPT_XAI_API_KEY", "grok-4.5"],
          ["Mistral", "mistral", "KPROMPT_MISTRAL_API_KEY", "mistral-small-latest"],
          ["DeepSeek", "deepseek", "KPROMPT_DEEPSEEK_API_KEY", "deepseek-chat"],
          ["Moonshot (Kimi K3)", "moonshot", "KPROMPT_MOONSHOT_API_KEY", "kimi-k3"],
          ["OpenRouter", "openrouter", "KPROMPT_OPENROUTER_API_KEY", "openai/gpt-4o-mini"],
          ["Together", "together", "KPROMPT_TOGETHER_API_KEY", "meta-llama/Llama-3.3-70B-Instruct-Turbo"],
          ["Ollama", "ollama", "(none required)", "llama3.2"],
          ["OpenAI-compatible", "openai-compatible", "KPROMPT_OPENAI_API_KEY", "set base_url"],
        ],
      },
      {
        type: "h2",
        text: "When to use each provider",
      },
      {
        type: "h3",
        text: "Gemini — fast default for daily ops",
      },
      {
        type: "p",
        text: "Gemini 3.6 Flash is a strong default for list/get/scale plans and short explains: low latency, low cost, good structured output. Most kprompt docs and examples use Gemini for that reason. Platform engineers running dozens of prompts per shift often standardize here first.",
      },
      {
        type: "code",
        caption: "Gemini setup",
        code: `export KPROMPT_GEMINI_API_KEY="..."
kprompt config set provider gemini
kprompt config set model gemini-3.6-flash
kprompt "list deployments" -n staging`,
      },
      {
        type: "h3",
        text: "OpenAI and Anthropic — harder explains",
      },
      {
        type: "p",
        text: "Multi-step troubleshooting — chain Deployment → Pod → Events → Logs with nuance — benefits from larger models. GPT-4o class and Claude Sonnet tend to hold context across ambiguous prompts better than the smallest tiers. Use them for incident explains; use Flash/Mini for routine mutations you already review in the plan anyway.",
      },
      {
        type: "code",
        caption: "Switch provider per command",
        code: `export KPROMPT_ANTHROPIC_API_KEY="..."
kprompt --provider anthropic "explain why api is crashlooping" -n prod

export KPROMPT_OPENAI_API_KEY="..."
kprompt --provider openai --model gpt-4o "explain HPA behavior" -n prod`,
      },
      {
        type: "h3",
        text: "Groq — low-latency iteration",
      },
      {
        type: "p",
        text: "Groq excels when you're iterating on prompts in a tight loop — tuning safety gates, testing intent phrasing, running history reruns. Pair with staging clusters while you learn how plans look before touching production.",
      },
      {
        type: "h3",
        text: "Moonshot / Kimi K3 — long-context reasoning",
      },
      {
        type: "p",
        text: "Kimi K3 is Moonshot's flagship model with a 1M-token context window — useful for dense incident explains that pull many events, logs, and manifests into one prompt. Use --provider moonshot (default model kimi-k3) when you need more reasoning headroom than Flash/Mini tiers.",
      },
      {
        type: "code",
        caption: "Moonshot / Kimi K3 setup",
        code: `export KPROMPT_MOONSHOT_API_KEY="..."
kprompt --provider moonshot "explain why api is crashlooping" -n prod`,
      },
      {
        type: "h3",
        text: "OpenRouter and Together — model shopping",
      },
      {
        type: "p",
        text: "OpenRouter and Together let you route to many underlying models with one key — useful for teams that already centralize LLM spend or want A/B tests on plan quality without changing kprompt config structure.",
      },
      {
        type: "h3",
        text: "Ollama — local and air-gapped Kubernetes ops",
      },
      {
        type: "p",
        text: "Run Ollama on the same machine as kprompt; no cloud API call leaves your network except to your Kubernetes apiserver. Quality varies by local model — llama3.2 works for simple get/list; heavier explains may need larger quantized models. Ideal for regulated environments, offline labs, and kind clusters on laptops.",
      },
      {
        type: "code",
        caption: "Local Ollama",
        code: `ollama serve &
ollama pull llama3.2

kprompt config set provider ollama
kprompt config set model llama3.2
kprompt "list pods" -n default`,
      },
      {
        type: "h2",
        text: "Configuration without leaking secrets",
      },
      {
        type: "p",
        text: "kprompt config persists provider, model, namespace, context, and base_url — never API keys. config view shows api_key: set or unset. That split makes it safe to commit example config snippets in runbooks while keys live in shell profile, 1Password, or CI secrets.",
      },
      {
        type: "code",
        caption: "Config vs secrets",
        code: `kprompt config set provider gemini
kprompt config set namespace staging
kprompt config   # api_key: unset until you export KPROMPT_GEMINI_API_KEY

# Never put this in config.yaml — env only
export KPROMPT_GEMINI_API_KEY="..."`,
      },
      {
        type: "h2",
        text: "Model choice by Kubernetes task",
      },
      {
        type: "ul",
        items: [
          "get / list / describe — fast models (Gemini Flash, gpt-4o-mini, Groq Llama)",
          "scale / deploy / rollback plans — fast models OK; you approve the kubectl line anyway",
          "explain / why-is-it-broken — stronger models when chains get long",
          "CI JSON gates — pick one provider per pipeline for deterministic-ish plans; pin model version",
          "Air-gap — Ollama only; accept lower quality or run bigger local models",
        ],
      },
      {
        type: "h2",
        text: "Security checklist for platform teams",
      },
      {
        type: "ul",
        items: [
          "Use dedicated API keys per team or pipeline — rotate independently of personal keys",
          "Scope kubeconfig in CI to the namespace ServiceAccount you intend — not cluster-admin",
          "Review provider data policies if log snippets may contain PII from application output",
          "Disable history on shared jump hosts if prompts are sensitive (KPROMPT_DISABLE_HISTORY=1)",
          "Treat cloud LLM calls like any third-party SaaS — network egress allowlists if required",
          "Prefer Ollama when policy forbids operational data leaving the VPC",
        ],
      },
      {
        type: "h2",
        text: "OpenAI-compatible endpoints",
      },
      {
        type: "p",
        text: "Enterprise gateways, Azure OpenAI, and internal proxies often speak OpenAI-compatible APIs. Set provider to openai-compatible, configure base_url in config, and use KPROMPT_OPENAI_API_KEY for the gateway token. Same plan → approve loop; different upstream.",
      },
      {
        type: "code",
        caption: "Custom base URL",
        code: `kprompt config set provider openai-compatible
kprompt config set base_url https://llm-gateway.internal/v1
export KPROMPT_OPENAI_API_KEY="gateway-token"
kprompt "list nodes"`,
      },
      {
        type: "h2",
        text: "Cost and rate limits",
      },
      {
        type: "p",
        text: "Read-heavy days (incident explains, log summaries) burn more tokens than a single scale plan. Fast models reduce cost; caching comes from kprompt history replay (rerun prior prompts without rephrasing). For org-wide rollouts, standardize on one cheap provider for mutations and one quality provider for explains — both BYOK, billed to your accounts.",
      },
      {
        type: "h2",
        text: "Try multiple providers on staging",
      },
      {
        type: "p",
        text: "Run the same prompt across Gemini, OpenAI, and Ollama on a kind cluster. Compare plan clarity, not just speed. kprompt makes switching a one-flag experiment — your kubeconfig and safety rules stay constant.",
      },
      {
        type: "code",
        caption: "Same prompt, three providers",
        code: `PROMPT='explain why nginx is not ready'
kprompt --provider gemini "$PROMPT" -n default
kprompt --provider openai "$PROMPT" -n default
kprompt --provider ollama --model llama3.2 "$PROMPT" -n default`,
      },
      {
        type: "p",
        text: "Full provider table and env var reference: kprompt.ai/docs/providers. Install once, swap models as your security and quality bar evolves — no hosted kprompt account required.",
        links: [
          {
            label: "kprompt.ai/docs/providers",
            href: "/docs/providers",
          },
        ],
      },
    ],
  };

export default post;
