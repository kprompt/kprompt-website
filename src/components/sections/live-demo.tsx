import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

const SHOTS = [
  {
    src: "/kprompt-ollama-redis-error.png",
    alt: "Terminal: kprompt explains redis ImagePullBackOff for truncated image 7-alpine",
    caption: "Explain — redis stuck on ImagePullBackOff (bad image 7-alpine).",
  },
  {
    src: "/kprompt-ollama-redis-fix.png",
    alt: "Terminal: kprompt redeploys redis with redis:7-alpine and lists healthy deployments",
    caption: "Fix + verify — redis:7-alpine applied; nginx and redis both 1/1.",
  },
] as const;

const STEPS = [
  {
    cmd: 'kprompt "deploy redis"',
    note: "Local Ollama planned the deploy; a weak model truncated the image to 7-alpine.",
  },
  {
    cmd: 'kprompt "why redis unavailable"',
    note: "Explain pulled status + events and named ImagePullBackOff.",
  },
  {
    cmd: 'kprompt "redis fix please"',
    note: "New plan used redis:7-alpine; approved with y — then both workloads ready.",
  },
] as const;

export function LiveDemo() {
  return (
    <section
      id="live-demo"
      className="relative scroll-mt-20 border-y border-border bg-muted/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Live session
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Real run: Ollama + kind
          </h2>
          <p className="mt-3 text-muted-foreground">
            Captured locally with{" "}
            <span className="font-mono text-sm text-foreground">provider ollama</span>
            {" / "}
            <span className="font-mono text-sm text-foreground">llama3.2</span>
            — no cloud LLM. Plan → explain a broken pull → fix → list. Experimental:
            always review the plan; local models can truncate image names.
          </p>
        </Reveal>

        <ol className="mt-10 max-w-2xl space-y-5">
          {STEPS.map((step, i) => (
            <Reveal key={step.cmd} delay={i * 0.05}>
              <li className="grid gap-1 sm:grid-cols-[2.5rem_1fr] sm:gap-4">
                <span className="font-mono text-xs text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[13px] text-foreground sm:text-sm">
                    {step.cmd}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.note}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>

        <div className="mt-12 space-y-10">
          {SHOTS.map((shot, i) => (
            <Reveal key={shot.src} delay={0.08 + i * 0.06}>
              <figure>
                <div className="overflow-hidden rounded-lg border border-border/80 bg-navy shadow-[0_24px_48px_-28px_rgb(15_23_42_/_.45)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1742}
                    height={1554}
                    className="h-auto w-full"
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    priority={i === 0}
                  />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">
                  {shot.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
