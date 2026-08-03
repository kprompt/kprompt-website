"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { LazyDemoVideo } from "@/components/ui/lazy-demo-video";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function IdePlanResult() {
  return (
    <section
      id="ide"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            VS Code extension
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            PlanResult in the IDE
          </h2>
          <p className="mt-3 text-muted-foreground">
            Review risk and diffs beside your editor. Approve still runs the
            local CLI — not a chat REPL, not an in-IDE apiserver.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-navy/20 bg-navy shadow-sm terminal-glow">
            <LazyDemoVideo
              webm={SITE.ideDemoWebm}
              mp4={SITE.ideDemoMp4}
              poster={SITE.ideDemoPoster}
              aria-label="VS Code PlanResult panel shows scale diffs, confirm Approve via CLI, then terminal runs kprompt --approve"
            />
          </div>
          <p className="mx-auto mt-3 max-w-4xl text-center font-mono text-xs text-muted-foreground sm:text-sm">
            Open PlanResult → review diffs → Approve via CLI
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
