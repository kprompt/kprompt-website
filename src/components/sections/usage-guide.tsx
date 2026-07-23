"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { CopyCommand } from "@/components/ui/copy-command";
import { ExperimentalNotice } from "@/components/ui/experimental-notice";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Install",
    command: SITE.installCommandBrew,
  },
  {
    n: "02",
    title: "Set a key",
    command: 'export KPROMPT_GEMINI_API_KEY="..."',
  },
  {
    n: "03",
    title: "Prompt",
    command: 'kprompt "list deployments"',
  },
] as const;

export function UsageGuide() {
  return (
    <section
      id="usage"
      className="relative scroll-mt-20 border-y border-border bg-muted/50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            From zero to first prompt
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three moves. Full PATH, config, providers, and error playbooks are
            in Quickstart.
          </p>
          <ExperimentalNotice className="mt-5" />
        </Reveal>

        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.05}>
              <li>
                <p className="font-mono text-xs text-brand">
                  {step.n} · {step.title}
                </p>
                <CopyCommand
                  command={step.command}
                  className="mt-3 w-full"
                  size="sm"
                />
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.15} className="mt-10">
          <Link
            href="/docs/quickstart"
            className={cn(buttonVariants({ variant: "outline" }), "inline-flex")}
          >
            Full quickstart
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
