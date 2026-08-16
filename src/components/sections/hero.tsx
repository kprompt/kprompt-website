"use client";

import { ArrowRight } from "lucide-react";
import { AnimatedTerminal } from "@/components/ui/animated-terminal";
import { buttonVariants } from "@/components/ui/button";
import { CopyCommand } from "@/components/ui/copy-command";
import { GithubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";
import { HERO_RUNTIME_DEMOS } from "@/lib/demo-commands";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-60"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="max-w-3xl">
          <Logo
            size={40}
            priority
            className="gap-2.5 [&_span]:text-xl sm:[&_span]:text-2xl"
          />
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="text-brand">{SITE.maturityLabel}</span>
            <span className="mx-2 text-border">·</span>
            {SITE.tagline}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl md:leading-[1.05]">
            Tell Kubernetes what to do.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            An AI-powered runtime that understands your cluster — operate on
            intent, investigate with evidence, and keep an always-on{" "}
            <a
              href="#agent"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Observe agent
            </a>{" "}
            watching namespaces without silent mutate. Plan before apply.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={SITE.getStarted}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {SITE.ctaPrimary}
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#agent"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Observe agent
            </a>
            <a
              href="/docs/agent"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              Agent docs
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
              aria-label="GitHub repository"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>

          <p className="mt-3 font-mono text-xs text-muted-foreground">
            {SITE.walkthroughHint}
          </p>

          <CopyCommand className="mt-5 w-full max-w-xl" size="sm" />
        </div>

        <div className="mt-14 sm:mt-16">
          <AnimatedTerminal
            demos={HERO_RUNTIME_DEMOS}
            className="mx-auto max-w-3xl shadow-none"
          />
          <p className="mx-auto mt-3 max-w-3xl text-center font-mono text-xs text-muted-foreground sm:text-sm">
            Intent in · context out · approve before apply
          </p>
        </div>
      </div>
    </section>
  );
}
