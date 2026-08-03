"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { LazyDemoVideo } from "@/components/ui/lazy-demo-video";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MultiCluster() {
  return (
    <section
      id="multi-cluster"
      className="relative scroll-mt-20 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Multi-cluster
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            One intent. Each context owns its yes.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Read fan-out over kubeconfig contexts. Plain{" "}
            <code className="font-mono text-[13px] text-foreground">--approve</code>{" "}
            across clusters is refused — confirm per plan. Credentials stay on
            the laptop.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-navy/20 bg-navy shadow-sm terminal-glow">
            <LazyDemoVideo
              webm={SITE.multiClusterDemoWebm}
              mp4={SITE.multiClusterDemoMp4}
              poster={SITE.multiClusterDemoPoster}
              aria-label="kprompt lists deployments across staging and prod, then refuses a blanket --approve for a multi-context scale"
              transcript="--contexts staging,prod · read OK · blanket --approve refused"
            />
          </div>
          <p className="mx-auto mt-3 max-w-4xl text-center font-mono text-xs text-muted-foreground sm:text-sm">
            --contexts staging,prod · read OK · blanket --approve refused
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/docs/multi-cluster"
            className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
          >
            Multi-cluster docs
            <ArrowRight className="size-4" />
          </Link>
          <a
            href={`${SITE.github}/blob/main/docs/multi-cluster.md`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex"
            )}
          >
            GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
