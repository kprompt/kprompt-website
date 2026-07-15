import { Star } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function OpenSource() {
  return (
    <section
      id="open-source"
      className="relative scroll-mt-20 border-y border-border bg-muted/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Open source by design
          </h2>
          <p className="mt-3 text-muted-foreground">
            Star the repo. Read the code. Shape the roadmap.
          </p>

          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "mt-8")}
          >
            <Star className="size-4" />
            Star us on GitHub
          </a>

          <p className="mt-6 text-sm text-muted-foreground">
            MIT · Open source · Contributions welcome
          </p>
        </Reveal>
      </div>
    </section>
  );
}
