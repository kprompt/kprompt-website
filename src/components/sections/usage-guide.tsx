"use client";

import { Reveal } from "@/components/ui/reveal";
import { CopyCommand } from "@/components/ui/copy-command";
import { SETUP_STEPS, SITE } from "@/lib/constants";

export function UsageGuide() {
  return (
    <section
      id="usage"
      className="relative scroll-mt-20 border-y border-border bg-muted/50 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            From zero to first prompt
          </h2>
          <p className="mt-3 text-muted-foreground">
            Five steps. If you skip the API key, kprompt cannot plan anything —
            you will see{" "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-[13px] text-foreground">
              missing API key for openai
            </code>
            .
          </p>
        </Reveal>

        <ol className="mt-12 space-y-10">
          {SETUP_STEPS.map((step, i) => (
            <Reveal key={step.id} delay={i * 0.05}>
              <li className="grid gap-4 lg:grid-cols-[7rem_1fr] lg:gap-8">
                <p className="font-mono text-xs text-brand">
                  {String(i + 1).padStart(2, "0")} · {step.id}
                </p>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  {step.commands.map((command) => (
                    <CopyCommand
                      key={command}
                      command={command}
                      className="mt-4 max-w-2xl"
                      size="lg"
                    />
                  ))}
                  {step.note ? (
                    <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                      {step.note}
                    </p>
                  ) : null}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.2} className="mt-14 max-w-2xl">
          <h3 className="font-heading text-base font-semibold tracking-tight">
            Common errors
          </h3>
          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[13px] text-foreground">
                missing API key for …
              </dt>
              <dd className="mt-1 text-muted-foreground">
                Export the env var for your provider (
                <code className="font-mono text-[13px] text-foreground">
                  KPROMPT_OPENAI_API_KEY
                </code>
                ,{" "}
                <code className="font-mono text-[13px] text-foreground">
                  KPROMPT_ANTHROPIC_API_KEY
                </code>
                ,{" "}
                <code className="font-mono text-[13px] text-foreground">
                  KPROMPT_GEMINI_API_KEY
                </code>
                ,{" "}
                <code className="font-mono text-[13px] text-foreground">
                  KPROMPT_GROQ_API_KEY
                </code>
                , …) and pass{" "}
                <code className="font-mono text-[13px] text-foreground">
                  --provider …
                </code>
                . Restart the terminal after editing{" "}
                <code className="font-mono text-[13px] text-foreground">
                  ~/.zshrc
                </code>
                .
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[13px] text-foreground">
                command not found: kprompt
              </dt>
              <dd className="mt-1 text-muted-foreground">
                Add{" "}
                <code className="font-mono text-[13px] text-foreground">
                  ~/.local/bin
                </code>{" "}
                to your{" "}
                <code className="font-mono text-[13px] text-foreground">PATH</code>{" "}
                (see step 02).
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[13px] text-foreground">
                kube client config / unauthorized
              </dt>
              <dd className="mt-1 text-muted-foreground">
                Confirm{" "}
                <code className="font-mono text-[13px] text-foreground">
                  kubectl get ns
                </code>{" "}
                works with your current context before prompting again.
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">
            Full reference:{" "}
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline-offset-4 hover:underline"
            >
              github.com/kprompt/kprompt
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
