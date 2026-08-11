import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoItem = {
  name: string;
  src: string;
  /** Black/currentColor marks — invert in dark mode. */
  invertInDark?: boolean;
};

const STACK: LogoItem[] = [
  { name: "Kubernetes", src: "/logos/stack/kubernetes.svg" },
  { name: "Helm", src: "/logos/stack/helm.svg" },
  { name: "Argo", src: "/logos/stack/argo.svg" },
  { name: "Prometheus", src: "/logos/stack/prometheus.svg" },
  { name: "OpenTelemetry", src: "/logos/stack/opentelemetry.svg" },
  { name: "Grafana", src: "/logos/stack/grafana.svg" },
  { name: "Tekton", src: "/logos/stack/tekton.svg" },
  { name: "KEDA", src: "/logos/stack/keda.svg" },
  { name: "Istio", src: "/logos/stack/istio.svg" },
  { name: "Crossplane", src: "/logos/stack/crossplane.svg" },
  { name: "Flux", src: "/logos/stack/flux.svg" },
];

const PROVIDERS: LogoItem[] = [
  { name: "Ollama", src: "/logos/providers/ollama.svg", invertInDark: true },
  { name: "OpenAI", src: "/logos/providers/openai.svg", invertInDark: true },
  { name: "Anthropic", src: "/logos/providers/anthropic.svg", invertInDark: true },
  { name: "Gemini", src: "/logos/providers/gemini.svg" },
  { name: "Groq", src: "/logos/providers/groq.svg" },
  { name: "xAI", src: "/logos/providers/xai.svg", invertInDark: true },
  { name: "Mistral", src: "/logos/providers/mistral.svg" },
  { name: "DeepSeek", src: "/logos/providers/deepseek.svg" },
  { name: "Moonshot", src: "/logos/providers/moonshot.svg" },
  { name: "OpenRouter", src: "/logos/providers/openrouter.svg" },
  { name: "Together", src: "/logos/providers/together.svg" },
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
    >
      {items.map((item) => (
        <li key={item.name} className="group/logo flex shrink-0 items-center gap-2.5">
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
        kicker="Integrations"
        title="Works with the stack you already run"
        description="Helm, Argo, Prometheus, GitOps — orchestrated, not replaced."
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
