"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Optional section — not on the lean homepage. Demo media intentionally omitted. */
export function Drift() {
  return (
    <section
      id="drift"
      className="relative scroll-mt-20 border-y border-border bg-muted/30 py-20 sm:py-28"
    >
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
