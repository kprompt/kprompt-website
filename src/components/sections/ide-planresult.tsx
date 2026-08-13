"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Optional section — not on the lean homepage. Demo media intentionally omitted. */
export function IdePlanResult() {
  return (
    <section id="ide" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            PlanResult artifact
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Reasoning you can refuse
          </h2>
          <p className="mt-3 text-muted-foreground">
            The runtime emits a typed PlanResult — risk, diffs, blast radius —
            not a chat transcript. Review in the IDE; approve still runs the
            local CLI.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`${SITE.github}/tree/main/ide/vscode`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
          >
            Extension source
            <ArrowRight className="size-4" />
          </a>
          <Link
            href="/docs"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex"
            )}
          >
            Docs
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
