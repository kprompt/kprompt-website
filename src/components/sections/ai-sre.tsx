"use client";

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

/** Optional section — not on the lean homepage. Demo media intentionally omitted. */
export function AiSre() {
  return (
    <section id="investigation" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Investigation
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Investigate when something breaks
          </h2>
          <p className="mt-3 text-muted-foreground">
            One runtime capability among many: investigate → why → timeline →
            impact. Propose a fix only after you approve — never silent
            auto-heal.
          </p>
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
            Try walkthrough
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
