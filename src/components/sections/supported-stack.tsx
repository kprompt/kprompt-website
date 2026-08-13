import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoItem = {
  name: string;
  src: string;
  href: string;
  /** Black/currentColor marks — invert in dark mode. */
  invertInDark?: boolean;
};

const STACK: LogoItem[] = [
  {
    name: "Kubernetes",
    src: "/logos/stack/kubernetes.svg",
    href: "/docs/integrations#generic-kubernetes-reads",
  },
  { name: "Helm", src: "/logos/stack/helm.svg", href: "/docs/integrations#helm" },
  {
    name: "Argo",
    src: "/logos/stack/argo.svg",
    href: "/docs/integrations#argo-workflows",
  },
  {
    name: "Prometheus",
    src: "/logos/stack/prometheus.svg",
    href: "/docs/integrations#prometheus",
  },
  {
    name: "OpenTelemetry",
    src: "/logos/stack/opentelemetry.svg",
    href: "/docs/integrations#opentelemetry-jaeger-tempo",
  },
  {
    name: "Grafana",
    src: "/logos/stack/grafana.svg",
    href: "/docs/integrations#grafana",
  },
  {
    name: "Tekton",
    src: "/logos/stack/tekton.svg",
    href: "/docs/integrations#tekton",
  },
  { name: "KEDA", src: "/logos/stack/keda.svg", href: "/docs/integrations#keda" },
  {
    name: "Istio",
    src: "/logos/stack/istio.svg",
    href: "/docs/integrations#istio",
  },
  {
    name: "Crossplane",
    src: "/logos/stack/crossplane.svg",
    href: "/docs/integrations#crossplane",
  },
  {
    name: "Flux",
    src: "/logos/stack/flux.svg",
    href: "/docs/integrations#gitops-flux-argo-cd",
  },
];

const PROVIDERS: LogoItem[] = [
  {
    name: "Ollama",
    src: "/logos/providers/ollama.svg",
    href: "/docs/providers#supported-providers",
    invertInDark: true,
  },
  {
    name: "OpenAI",
    src: "/logos/providers/openai.svg",
    href: "/docs/providers#supported-providers",
    invertInDark: true,
  },
  {
    name: "Anthropic",
    src: "/logos/providers/anthropic.svg",
    href: "/docs/providers#supported-providers",
    invertInDark: true,
  },
  {
    name: "Gemini",
    src: "/logos/providers/gemini.svg",
    href: "/docs/providers#gemini-free-tier-honest",
  },
  {
    name: "Groq",
    src: "/logos/providers/groq.svg",
    href: "/docs/providers#supported-providers",
  },
  {
    name: "xAI",
    src: "/logos/providers/xai.svg",
    href: "/docs/providers#supported-providers",
    invertInDark: true,
  },
  {
    name: "Mistral",
    src: "/logos/providers/mistral.svg",
    href: "/docs/providers#supported-providers",
  },
  {
    name: "DeepSeek",
    src: "/logos/providers/deepseek.svg",
    href: "/docs/providers#supported-providers",
  },
  {
    name: "Moonshot",
    src: "/logos/providers/moonshot.svg",
    href: "/docs/providers#supported-providers",
  },
  {
    name: "OpenRouter",
    src: "/logos/providers/openrouter.svg",
    href: "/docs/providers#supported-providers",
  },
  {
    name: "Together",
    src: "/logos/providers/together.svg",
    href: "/docs/providers#supported-providers",
  },
];

function LogoRow({
  items,
  hidden,
}: {
  items: readonly LogoItem[];
  hidden?: boolean;
}) {
  return (
    <ul
      className={cn(
        "flex shrink-0 items-center gap-10 pr-10 sm:gap-12 sm:pr-12",
        hidden && "logo-marquee-duplicate"
      )}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      {items.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className="group/logo flex shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            tabIndex={hidden ? -1 : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt=""
              width={32}
              height={32}
              className={cn(
                "size-7 shrink-0 object-contain sm:size-8",
                item.invertInDark && "dark:invert"
              )}
            />
            <span className="font-heading text-sm font-semibold tracking-tight text-muted-foreground transition-colors duration-200 group-hover/logo:text-foreground sm:text-[15px]">
              {item.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LogoMarquee({
  items,
  reverse,
}: {
  items: readonly LogoItem[];
  reverse?: boolean;
}) {
  return (
    <div className="logo-marquee">
      <div
        className={cn(
          "logo-marquee-track",
          reverse && "logo-marquee-track-reverse"
        )}
      >
        <LogoRow items={items} />
        <LogoRow items={items} hidden />
      </div>
    </div>
  );
}

function RowIntro({
  kicker,
  title,
  description,
  href,
  linkLabel,
}: {
  kicker: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 sm:flex-row sm:items-end sm:px-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {kicker}
        </p>
        <h2 className="mt-1 font-heading text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-1 font-mono text-xs text-muted-foreground",
          "transition-colors hover:text-foreground"
        )}
      >
        {linkLabel}
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

export function SupportedStack() {
  const stackNames = STACK.map((item) => item.name).join(", ");
  const providerNames = PROVIDERS.map((item) => item.name).join(", ");

  return (
    <section
      id="integrations"
      aria-label="Supported integrations and LLM providers"
      className="relative border-y border-border bg-muted/35 py-10 sm:py-12"
    >
      <RowIntro
        kicker="Signals &amp; stack"
        title="Connect the dots — not fifty connectors"
        description="Kubernetes plus the logs, metrics, and traces you already run enrich the runtime. Orchestrated, not replaced. No bespoke Redis/MySQL product connectors."
        href="/docs/integrations"
        linkLabel="Docs"
      />

      <div className="mt-7 sm:mt-8">
        <LogoMarquee items={STACK} />
      </div>

      <div id="providers" className="mt-10 scroll-mt-20 sm:mt-12">
        <RowIntro
          kicker="Providers"
          title="Your LLM, your key"
          description="Local Ollama ($0) or BYOK — kprompt does not sell API keys."
          href="/docs/providers"
          linkLabel="Docs"
        />
      </div>

      <div className="mt-7 sm:mt-8">
        <LogoMarquee items={PROVIDERS} reverse />
      </div>

      <p className="sr-only">
        kprompt orchestrates {stackNames}. Natural-language plans use {providerNames},
        or any OpenAI-compatible gateway. It does not replace these tools or sell
        inference.
      </p>
    </section>
  );
}
