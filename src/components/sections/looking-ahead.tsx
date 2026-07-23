import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { ROADMAP_TEASER } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LookingAhead() {
  return (
    <section id="roadmap" className="relative scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Looking ahead
          </h2>
          <p className="mt-3 text-muted-foreground">
            {ROADMAP_TEASER.lead}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {ROADMAP_TEASER.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.05}>
              <div className="border-t border-border pt-5">
                <p className="font-mono text-xs uppercase tracking-wider text-brand">
                  {pillar.label}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/docs/roadmap"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Roadmap & vision
            <ArrowRight className="size-4" />
          </Link>
          <p className="text-sm text-muted-foreground">
            No ship dates · CLI stays free · review every plan
          </p>
        </Reveal>
      </div>
    </section>
  );
}
