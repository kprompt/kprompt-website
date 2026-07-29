import { Reveal } from "@/components/ui/reveal";

const WHY = [
  {
    instead: "Instead of dozens of YAML files,",
    then: "describe your intent.",
  },
  {
    instead: "Instead of manually correlating logs,",
    then: "ask one question.",
  },
  {
    instead: "Instead of reacting,",
    then: "reason continuously.",
  },
] as const;

const PHILOSOPHY = [
  {
    notOnly: "Infrastructure should not only reconcile.",
    should: "It should reason.",
  },
  {
    notOnly: "Infrastructure should not only execute.",
    should: "It should understand.",
  },
  {
    notOnly: "Infrastructure should not only recover.",
    should: "It should improve.",
  },
] as const;

export function WhyKprompt() {
  return (
    <section id="why" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Why KPrompt
          </h2>
          <p className="mt-3 text-muted-foreground">
            A new infrastructure layer — not another AI wrapper.
          </p>
        </Reveal>

        <div className="mt-12 space-y-6">
          {WHY.map((item, i) => (
            <Reveal key={item.then} delay={i * 0.05}>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {item.instead}{" "}
                <span className="font-heading font-semibold text-foreground">
                  {item.then}
                </span>
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-20 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-brand">
            Philosophy
          </p>
          <div className="mt-6 space-y-8">
            {PHILOSOPHY.map((item) => (
              <div key={item.should}>
                <p className="text-muted-foreground">{item.notOnly}</p>
                <p className="mt-1 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                  {item.should}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
