import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { CopyCommand } from "@/components/ui/copy-command";
import { GithubIcon } from "@/components/ui/github-icon";
import { INSTALL_STEPS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section
      id="get-started"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Run the runtime where your cluster is
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Install the CLI, try a zero-LLM kind walkthrough, then operate,
            investigate, and improve with plan-before-apply. Prefer
            non-production first — {SITE.maturityLabel.toLowerCase()} software.
          </p>

          <CopyCommand className="mx-auto mt-8 w-full max-w-xl text-left" size="lg" />

          <ol className="mx-auto mt-8 flex max-w-lg flex-col gap-2.5 text-left sm:flex-row sm:justify-center sm:gap-6 sm:text-center">
            {INSTALL_STEPS.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2.5 text-sm text-muted-foreground sm:flex-col sm:gap-1.5"
              >
                <span className="font-mono text-xs text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={SITE.getStarted}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {SITE.ctaPrimary}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={SITE.levelUp}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Sparkles className="size-4" />
              {SITE.ctaSecondary}
            </Link>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
            <Link
              href={SITE.docs}
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              <BookOpen className="size-4" />
              Docs
            </Link>
          </div>

          <p className="mt-8 font-mono text-xs text-muted-foreground">
            Apache-2.0 · open source ·{" "}
            <a
              href={SITE.examples}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              kind Observe demo
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
