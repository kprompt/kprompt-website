import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";
import { SITE } from "@/lib/constants";
import {
  CONTRIBUTE_CLI_E2E,
  CONTRIBUTE_CLI_SETUP,
  CONTRIBUTE_FOCUS_AREAS,
  CONTRIBUTE_LINKS,
  CONTRIBUTE_PAGE,
  CONTRIBUTE_PR_CHECKLIST,
  CONTRIBUTE_REPOS,
  CONTRIBUTE_STEPS,
  CONTRIBUTE_WEBSITE_SETUP,
} from "@/lib/team-contributing";
import { cn } from "@/lib/utils";

function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <div className="mt-4">
      {caption ? (
        <p className="mb-2 font-mono text-xs text-muted-foreground">{caption}</p>
      ) : null}
      <pre className="overflow-x-auto rounded-lg border border-border bg-navy p-4 font-mono text-[12px] leading-relaxed text-white/90 sm:text-[13px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function SectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <h2
        id={id}
        className="font-heading text-xl font-semibold tracking-tight sm:text-2xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function ContributeSection() {
  return (
    <section
      className="mt-16 border-t border-border pt-14"
      aria-labelledby="contribute-heading"
    >
      <div className="rounded-2xl border border-border bg-muted/20 p-6 sm:p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-brand">
          Open source
        </p>
        <h2
          id="contribute-heading"
          className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {CONTRIBUTE_PAGE.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {CONTRIBUTE_PAGE.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={CONTRIBUTE_LINKS.cliIssues}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants())}
          >
            <GithubIcon className="size-4" />
            CLI issues
          </a>
          <a
            href={CONTRIBUTE_LINKS.websiteIssues}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <GithubIcon className="size-4" />
            Website issues
          </a>
          <a
            href={CONTRIBUTE_LINKS.contributingGuide}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Contribution guide
            <ExternalLink className="size-3.5" />
          </a>
          <Link
            href="/docs"
            className={cn(buttonVariants({ variant: "ghost" }), "gap-1.5")}
          >
            Read docs
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="mt-12 space-y-12">
        <div>
          <SectionHeading
            id="where-to-contribute"
            title="Where to contribute"
            description="Pick the repo that matches your change. Both are Apache-2.0 licensed."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CONTRIBUTE_REPOS.map((repo) => (
              <a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-border bg-card/50 p-5 transition-colors hover:border-brand/30 hover:bg-card"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-heading text-lg font-semibold tracking-tight group-hover:text-brand">
                      {repo.name}
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {repo.stack}
                    </p>
                  </div>
                  <ExternalLink
                    className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {repo.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading
            id="help-needed"
            title="Areas we need help with"
            description="No formal roadmap lock-in — these are high-value places to start."
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {CONTRIBUTE_FOCUS_AREAS.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border/70 bg-muted/15 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading
            id="how-to-start"
            title="How to contribute"
            description="A typical flow from idea to merged PR."
          />
          <ol className="mt-6 space-y-4">
            {CONTRIBUTE_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-xl border border-border/70 bg-card/30 p-4 sm:p-5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-xs font-semibold text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="cli-dev" title="CLI development" />
            <CodeBlock code={CONTRIBUTE_CLI_SETUP} caption="Clone and verify" />
            <CodeBlock code={CONTRIBUTE_CLI_E2E} caption="Optional E2E" />
          </div>

          <div>
            <SectionHeading id="website-dev" title="Website development" />
            <CodeBlock
              code={CONTRIBUTE_WEBSITE_SETUP}
              caption="Local preview at localhost:3000"
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Before opening a PR, run{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                npm run build
              </code>{" "}
              and{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                npm run lint
              </code>
              .
            </p>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="pr-checklist" title="Pull request checklist" />
            <ul className="mt-6 space-y-2">
              {CONTRIBUTE_PR_CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              id="security-conduct"
              title="Security & conduct"
            />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                kprompt runs against real clusters with real credentials. Treat
                safety regressions seriously — call them out in PRs and add tests
                when you touch planner, safety, or executor paths.
              </p>
              <p>
                Do not report security vulnerabilities in public issues. Use{" "}
                <a
                  href={CONTRIBUTE_LINKS.cliSecurity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline-offset-4 hover:text-brand hover:underline"
                >
                  GitHub Security
                </a>{" "}
                for responsible disclosure.
              </p>
              <p>
                Participation should stay respectful and constructive. The project
                follows standard open-source community expectations — be direct,
                be kind, review plans before apply in your own testing too.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-muted/10 px-6 py-8 text-center sm:px-8">
          <p className="font-heading text-lg font-semibold tracking-tight">
            Ready to pick something up?
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Browse open issues, comment to claim a task, or open a draft PR early
            if you want feedback on direction.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={CONTRIBUTE_LINKS.cliIssues}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants())}
            >
              Browse CLI issues
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <GithubIcon className="size-4" />
              kprompt on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
