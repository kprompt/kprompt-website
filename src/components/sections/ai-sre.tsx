"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CAPABILITIES = [
  {
    title: "On demand",
    description: (
      <>
        <code className="font-mono text-[12px] text-brand">investigate</code>
        {" / "}
        <code className="font-mono text-[12px] text-brand">why</code>
        {" / "}
        <code className="font-mono text-[12px] text-brand">timeline</code>
        {" / "}
        <code className="font-mono text-[12px] text-brand">impact</code>
        {" — typed evidence, not chat guesses."}
      </>
    ),
  },
  {
    title: "Always on",
    description:
      "Observe agent watches the namespace, correlates Incidents, and sends gated alerts.",
  },
  {
    title: "Human gate",
    description:
      "Suggested fix becomes a PlanResult. Nothing mutates until you approve.",
  },
] as const;

const DEMOS = [
  {
    id: "investigate",
    label: "Investigate",
    caption: "investigate → evidence → plan · apply only after your yes",
    ariaLabel:
      "kprompt investigate finds OOMKilled on checkout-api, then shows a memory patch plan waiting for approval",
    webm: SITE.investigateDemoWebm,
    mp4: SITE.investigateDemoMp4,
    poster: SITE.investigateDemoPoster,
  },
  {
    id: "why",
    label: "Why",
    caption: "why → named cause · evidence attached · no mutate yet",
    ariaLabel:
      "kprompt why finds ImagePullBackOff on payment-api with missing pull secret evidence",
    webm: SITE.whyDemoWebm,
    mp4: SITE.whyDemoMp4,
    poster: SITE.whyDemoPoster,
  },
  {
    id: "timeline",
    label: "Timeline",
    caption: "timeline → ordered events · story before you change anything",
    ariaLabel:
      "kprompt timeline shows scale spike then OOMKilled then HPA backlog in payments",
    webm: SITE.timelineDemoWebm,
    mp4: SITE.timelineDemoMp4,
    poster: SITE.timelineDemoPoster,
  },
  {
    id: "impact",
    label: "Impact",
    caption: "impact → blast radius · who gets hurt before you approve",
    ariaLabel:
      "kprompt impact shows direct dependents and downstream Ingress for payment-api",
    webm: SITE.impactDemoWebm,
    mp4: SITE.impactDemoMp4,
    poster: SITE.impactDemoPoster,
  },
  {
    id: "verify",
    label: "Verify",
    caption: "approve → apply → verify · never silent auto-heal",
    ariaLabel:
      "kprompt waits for y approval, applies the memory patch, then verifies CrashLoopBackOff cleared",
    webm: SITE.verifyDemoWebm,
    mp4: SITE.verifyDemoMp4,
    poster: SITE.verifyDemoPoster,
  },
  {
    id: "observe",
    label: "Observe",
    caption: "Watch → Incident → gated alert · $0 kind walkthrough",
    ariaLabel:
      "kprompt Observe agent correlates failures on a kind cluster and notifies with confidence",
    webm: SITE.observeDemoWebm,
    mp4: SITE.observeDemoMp4,
    poster: SITE.observeDemoPoster,
  },
] as const;

export function AiSre() {
  const [active, setActive] = useState<(typeof DEMOS)[number]["id"]>("investigate");
  const demo = DEMOS.find((d) => d.id === active) ?? DEMOS[0];

  return (
    <section
      id="ai-sre"
      className="relative scroll-mt-20 border-y border-border bg-muted/30 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-40" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            AI SRE agent
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            AI SRE for your cluster
          </h2>
          <p className="mt-3 text-muted-foreground">
            Investigate → why → timeline → impact. Propose a fix only after you
            approve — never silent auto-heal.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="AI SRE demos"
          >
            {DEMOS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active === item.id}
                id={`ai-sre-tab-${item.id}`}
                aria-controls={`ai-sre-panel-${item.id}`}
                onClick={() => setActive(item.id)}
                className={cn(
                  "rounded-lg border px-3.5 py-2 font-mono text-xs transition-colors sm:text-sm",
                  active === item.id
                    ? "border-brand/35 bg-brand/10 text-brand"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-5">
          <div
            role="tabpanel"
            id={`ai-sre-panel-${demo.id}`}
            aria-labelledby={`ai-sre-tab-${demo.id}`}
            className="mx-auto max-w-4xl"
          >
            <div className="overflow-hidden rounded-xl border border-navy/20 bg-navy shadow-sm terminal-glow">
              <video
                key={demo.id}
                className="mx-auto h-auto w-full"
                width={1280}
                height={720}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={demo.poster}
                aria-label={demo.ariaLabel}
              >
                <source src={demo.webm} type="video/webm" />
                <source src={demo.mp4} type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-center font-mono text-xs text-muted-foreground sm:text-sm">
              {demo.caption}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={0.1 + i * 0.06}>
              <div className="border-t border-border/80 pt-5">
                <h3 className="font-heading text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.28} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/docs/agent"
            className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
          >
            Agent docs
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={SITE.getStarted}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex"
            )}
          >
            Try Observe walkthrough
          </Link>
        </Reveal>

        <Reveal delay={0.32} className="mt-6">
          <p className="text-xs text-muted-foreground">
            Two surfaces, one contract —{" "}
            <Link
              href="/docs/architecture"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              architecture
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
