import {
  MessageSquare,
  ListChecks,
  ShieldCheck,
  ScrollText,
  KeyRound,
  Radar,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Natural language",
    description:
      "Ask for workload changes, troubleshooting, charts, workflows, and performance in plain English.",
  },
  {
    icon: ListChecks,
    title: "Plan before apply",
    description:
      "Intent becomes a concrete execution plan with live before/after diffs when the resource already exists.",
  },
  {
    icon: ShieldCheck,
    title: "Safety + approval",
    description:
      "Risk evaluation and hard denies for wipe-class prompts. Mutating plans need TTY y/N or --approve.",
  },
  {
    icon: Radar,
    title: "Grounded investigation",
    description:
      "Deep Kubernetes explain plus Prometheus-backed CPU, memory, latency, replica, and HPA findings — building toward multi-hop RCA.",
  },
  {
    icon: ScrollText,
    title: "Operator-friendly output",
    description:
      "Local history, CI-stable JSON, tool discovery, and auto, Dracula, Nord, Gruvbox, mono, or plain themes.",
  },
  {
    icon: KeyRound,
    title: "BYOK models",
    description:
      "OpenAI, Anthropic, Gemini, Groq, Ollama, and more. Keys stay in env vars — never in config.yaml.",
  },
] as const;

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for real cluster work.
          </h2>
          <p className="mt-3 text-muted-foreground">
            What ships today in the Apache-2.0 CLI — not a wishlist.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.05}>
              <div className="group">
                <feature.icon
                  className="mb-4 size-5 text-brand transition-colors group-hover:text-bright"
                  strokeWidth={1.75}
                />
                <h3 className="font-heading text-base font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
