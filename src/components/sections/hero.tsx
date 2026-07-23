"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { AnimatedTerminal } from "@/components/ui/animated-terminal";
import { buttonVariants } from "@/components/ui/button";
import { CopyCommand } from "@/components/ui/copy-command";
import { GithubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <Logo
            size={40}
            priority
            className="gap-2.5 [&_span]:text-xl sm:[&_span]:text-2xl"
          />
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="text-brand">{SITE.maturityLabel}</span>
            <span className="mx-2 text-border">·</span>
            Review every plan before apply
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl md:leading-[1.05]">
            Talk to Your Cluster.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Natural language becomes a reviewable plan — then you approve before
            anything touches Kubernetes. Early software: prefer non-production
            clusters until you trust the workflow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={SITE.getStarted}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started
              <ArrowRight className="size-4" />
            </a>
            <a
              href={SITE.docs}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <BookOpen className="size-4" />
              Docs
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>

          <CopyCommand className="mt-5 w-full max-w-xl" size="sm" />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-14 sm:mt-16"
        >
          <AnimatedTerminal className="mx-auto max-w-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
