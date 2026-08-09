import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Infinity as InfinityIcon,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { CopyCommand } from "@/components/ui/copy-command";
import { GithubIcon } from "@/components/ui/github-icon";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const BILLING = {
  title: "Pricing",
  description:
    "The kprompt CLI is free forever — open source, no seat limits, no credit card. Bring your own LLM key, run locally, own your data. Optional Team plan for shared clusters.",
} as const;

export const metadata: Metadata = {
  title: BILLING.title,
  description: BILLING.description,
  alternates: { canonical: `${SITE.url}/billing` },
  openGraph: {
    title: `${BILLING.title} · kprompt.ai`,
    description: BILLING.description,
    url: `${SITE.url}/billing`,
  },
};

const CLI_FREE_FEATURES = [
  "Full CLI — every command, no feature gates",
  "Unlimited clusters, contexts, and runs",
  "Bring your own LLM key (BYOK) or run local Ollama",
  "Plan → approve → apply safety on every action",
  "AI SRE: investigate, why, timeline, impact",
  "Observe agent for continuous correlation",
  "Works offline for the zero-LLM walkthrough",
  "Apache-2.0 licensed — audit, fork, self-host",
] as const;

const TEAM_FEATURES = [
  "Everything in the free CLI",
  "Shared team console at app.kprompt.ai",
  "Run history and audit trail across the team",
  "Role-based approvals for apply gates",
  "SSO and centralized policy (coming soon)",
] as const;

type Tier = {
  name: string;
  price: string;
  cadence?: string;
  tagline: string;
  features: readonly string[];
  cta: { label: string; href: string; external?: boolean };
  highlight?: boolean;
  badge?: string;
};

const TIERS: Tier[] = [
  {
    name: "CLI",
    price: "$0",
    cadence: "free forever",
    tagline: "The open-source runtime. Yours to keep, always.",
    features: CLI_FREE_FEATURES,
    cta: { label: SITE.ctaPrimary, href: SITE.getStarted },
    highlight: true,
    badge: "Free forever",
  },
  {
    name: "Team",
    price: "Custom",
    tagline: "Shared clusters, shared history, shared guardrails.",
    features: TEAM_FEATURES,
    cta: { label: "Talk to us", href: `mailto:${SITE.email}`, external: true },
  },
];

const FAQ = [
  {
    q: "Is the CLI really free forever?",
    a: "Yes. The kprompt CLI is open source under Apache-2.0 and free forever — no seat limits, no usage meters, no credit card. We will never paywall the core CLI.",
  },
  {
    q: "What does the LLM cost, then?",
    a: "kprompt is bring-your-own-key. You pay your provider directly (or $0 with local Ollama and the zero-LLM walkthrough). We never mark up tokens or sit between you and your model.",
  },
  {
    q: "Do you see my clusters or data?",
    a: "No. The CLI runs on your machine against your kubeconfig. Your cluster data and prompts go to the LLM provider you choose — not to us.",
  },
  {
    q: "What is the Team plan for?",
    a: "The optional Team console adds shared run history, audit trails, and role-based approvals for organizations. The CLI stays free regardless.",
  },
] as const;

export default function BillingPage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/billing" },
        ]}
      />

      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {BILLING.title}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
          Free where it counts
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          The kprompt CLI is open source and{" "}
          <span className="font-medium text-foreground">free forever</span>. No
          seat limits, no usage meters, no credit card. Bring your own LLM key or
          run locally — you own the runtime and your data.
        </p>
      </header>

      <Reveal className="mt-10">
        <section
          aria-labelledby="free-forever"
          className="relative overflow-hidden rounded-3xl border border-brand/25 bg-brand/5 p-6 sm:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-background/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-brand">
                <InfinityIcon className="size-3.5" aria-hidden />
                Free forever
              </span>
              <h2
                id="free-forever"
                className="mt-4 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
              >
                The CLI stays free. Forever. No asterisk.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                We build kprompt for operators, in the open. The core CLI — every
                command, every cluster, every run — is Apache-2.0 and will never
                sit behind a paywall. Install it, self-host it, fork it. It is
                yours.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={SITE.getStarted}
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  {SITE.ctaPrimary}
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  <GithubIcon className="size-4" />
                  Star on GitHub
                </a>
              </div>
            </div>

            <div className="w-full max-w-sm shrink-0">
              <p className="mb-2 font-mono text-xs text-muted-foreground">
                Install in one line
              </p>
              <CopyCommand size="lg" className="text-left" />
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {SITE.walkthroughHint}
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      <section className="mt-16" aria-labelledby="plans">
        <h2 id="plans" className="sr-only">
          Plans
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.05}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-2xl border p-6 sm:p-8",
                  tier.highlight
                    ? "border-brand/30 bg-brand/5"
                    : "border-border bg-muted/30"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {tier.name}
                  </h3>
                  {tier.badge ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-background/60 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-brand">
                      <InfinityIcon className="size-3" aria-hidden />
                      {tier.badge}
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-semibold tracking-tight">
                    {tier.price}
                  </span>
                  {tier.cadence ? (
                    <span className="text-sm text-muted-foreground">
                      {tier.cadence}
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.tagline}
                </p>

                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  {tier.cta.external ? (
                    <a
                      href={tier.cta.href}
                      className={cn(
                        buttonVariants({
                          variant: tier.highlight ? "default" : "outline",
                        }),
                        "w-full justify-center"
                      )}
                    >
                      {tier.cta.label}
                      <ArrowRight className="size-4" />
                    </a>
                  ) : (
                    <Link
                      href={tier.cta.href}
                      className={cn(
                        buttonVariants({
                          variant: tier.highlight ? "default" : "outline",
                        }),
                        "w-full justify-center"
                      )}
                    >
                      {tier.cta.label}
                      <ArrowRight className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-16" aria-labelledby="faq">
        <h2
          id="faq"
          className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Pricing FAQ
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FAQ.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-border bg-muted/30 p-5"
            >
              <h3 className="font-heading text-base font-semibold tracking-tight">
                {item.q}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Nothing to buy. Just install and run.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Start with the zero-LLM walkthrough on a kind cluster — $0, no key.
          Level up with your own model whenever you want.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={SITE.getStarted}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            {SITE.ctaPrimary}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={SITE.levelUp}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            <Sparkles className="size-4" />
            {SITE.ctaSecondary}
          </Link>
          <Link
            href={SITE.docs}
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
          >
            <BookOpen className="size-4" />
            Docs
          </Link>
        </div>
      </section>
    </div>
  );
}
