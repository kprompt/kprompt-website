"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { LazyDemoVideo } from "@/components/ui/lazy-demo-video";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Drift() {
  return (
    <section
      id="drift"
      className="relative scroll-mt-20 border-y border-border bg-muted/30 py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow opacity-30" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            GitOps
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Drift vs Git
          </h2>
          <p className="mt-3 text-muted-foreground">
            Flux and Argo out-of-sync, as an Investigation — then an
            approve-gated sync plan. Report first. Nothing reconciles silently.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-navy/20 bg-navy shadow-sm terminal-glow">
            <LazyDemoVideo
              webm={SITE.driftDemoWebm}
              mp4={SITE.driftDemoMp4}
              poster={SITE.driftDemoPoster}
              aria-label="kprompt checks cluster drift, finds OutOfSync Argo and Flux apps, then offers an approve-gated sync plan"
              transcript="check drift → OutOfSync → sync plan [y/N]"
            />
          </div>
          <p className="mx-auto mt-3 max-w-4xl text-center font-mono text-xs text-muted-foreground sm:text-sm">
            check drift → OutOfSync → sync plan [y/N]
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`${SITE.github}/blob/main/docs/drift.md`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
          >
            Drift docs
            <ArrowRight className="size-4" />
          </a>
          <Link
            href={SITE.getStarted}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex"
            )}
          >
            Try walkthrough
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
