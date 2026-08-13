import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CopyCommand } from "@/components/ui/copy-command";
import { GithubIcon } from "@/components/ui/github-icon";
import { LazyDemoVideo } from "@/components/ui/lazy-demo-video";
import { Logo } from "@/components/ui/logo";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 bg-glow" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="max-w-3xl">
          <Logo
            size={40}
            priority
            className="gap-2.5 [&_span]:text-xl sm:[&_span]:text-2xl"
          />
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="text-brand">{SITE.maturityLabel}</span>
            <span className="mx-2 text-border">·</span>
            Plan before apply
            <span className="mx-2 text-border">·</span>
            {SITE.tagline}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl md:leading-[1.05]">
            Tell Kubernetes what to do.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            kprompt is an AI-powered runtime that understands your Kubernetes
            environment — turning intent into context-aware operations,
            investigations, and recommendations. Apply only after your yes.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={SITE.getStarted}
              className={cn(buttonVariants({ size: "lg" }))}
            >
              {SITE.ctaPrimary}
              <ArrowRight className="size-4" />
            </a>
            <a
              href={SITE.levelUp}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Sparkles className="size-4" />
              {SITE.ctaSecondary}
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
              aria-label="GitHub repository"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
            <a
              href={SITE.docs}
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
              aria-label="Documentation"
            >
              <BookOpen className="size-4" />
              Docs
            </a>
          </div>

          <p className="mt-3 font-mono text-xs text-muted-foreground">
            {SITE.walkthroughHint}
          </p>

          <CopyCommand className="mt-5 w-full max-w-xl" size="sm" />
        </div>

        <div className="mt-14 sm:mt-16">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-navy/20 bg-navy shadow-sm terminal-glow">
            <LazyDemoVideo
              eager
              webm={SITE.planDenyWebm}
              mp4={SITE.planDenyMp4}
              poster={SITE.planDenyPoster}
              aria-label="kprompt hard-denies wipe prompts, then shows a scale plan waiting for Apply this plan? y/N"
              transcript="Wipe prompt hard-denied. Scale plan shown with Apply this plan? y/N — nothing applies without approval."
            />
          </div>
          <p className="mx-auto mt-3 max-w-3xl text-center font-mono text-xs text-muted-foreground sm:text-sm">
            Deny the wipe · scale with a plan · nothing applies without you
          </p>
        </div>
      </div>
    </section>
  );
}
