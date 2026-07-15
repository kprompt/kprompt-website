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
            Install, save defaults with{" "}
            <code className="rounded bg-background px-1.5 py-0.5 font-mono text-[13px] text-foreground">
              kprompt config
            </code>
            , set an API key, then prompt. Keys never go in the config file —
            only whether they are set or unset.
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
                  {step.id === "config" ? (
                    <pre className="mt-4 max-w-2xl overflow-x-auto rounded-lg border border-border bg-background/80 p-4 font-mono text-[12px] leading-relaxed text-foreground sm:text-[13px]">
                      {`Config file: ~/.kprompt/config.yaml
provider:    gemini
model:       gemini-2.0-flash
base_url:    -
namespace:   default
context:     (default kube context)
api_key:     unset  (env: KPROMPT_GEMINI_API_KEY | …)
Secrets are never stored in the config file.`}
                    </pre>
                  ) : null}
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
                kubeconfig / context / RBAC errors
              </dt>
              <dd className="mt-1 text-muted-foreground">
                kprompt rewrites common client-go failures into one-liners: missing{" "}
                <code className="font-mono text-[13px] text-foreground">
                  ~/.kube/config
                </code>
                , unknown{" "}
                <code className="font-mono text-[13px] text-foreground">
                  --context
                </code>
                , Unauthorized, Forbidden (with{" "}
                <code className="font-mono text-[13px] text-foreground">
                  kubectl auth can-i …
                </code>{" "}
                hints), and unreachable API. Confirm{" "}
                <code className="font-mono text-[13px] text-foreground">
                  kubectl get ns
                </code>{" "}
                works with your current context first.
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">
            Deep dive:{" "}
            <a href={SITE.docs} className="text-brand underline-offset-4 hover:underline">
              Docs
            </a>
            {" · "}
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline-offset-4 hover:underline"
            >
              GitHub
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
