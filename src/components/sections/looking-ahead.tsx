import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { ROADMAP_PHASES, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LookingAhead() {
  return (
    <section id="roadmap" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Looking ahead
          </h2>
          <p className="mt-3 text-muted-foreground">
            The CLI stays open source and free — and still experimental.
            Day-2 integrations (Helm through GitOps), north-star reports
            (optimize, service graph), Homebrew install, and optional Team
            login/policy/audit ship in the binary. A fuller Team control plane
            and web app continue to evolve — not a public signup product today,
            and nothing to buy.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {ROADMAP_PHASES.map((phase, i) => (
            <Reveal key={phase.id} delay={i * 0.06}>
              <div className="relative h-full border-t border-border pt-5">
                <p
                  className={cn(
                    "font-mono text-xs uppercase tracking-wider",
                    phase.id === "now" ? "text-brand" : "text-muted-foreground"
                  )}
                >
                  {phase.label}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold tracking-tight">
                  {phase.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {phase.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.18} className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            <Star className="size-4" />
            Shape priorities on GitHub
          </a>
          <p className="text-sm text-muted-foreground">
            OSS CLI today ·{" "}
            <a
              href={SITE.app}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              app.kprompt.ai
            </a>{" "}
            is early (nothing to buy).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
