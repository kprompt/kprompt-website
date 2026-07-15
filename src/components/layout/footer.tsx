import { GithubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo size={28} />
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Natural language interface for Kubernetes. Open source. Built for
            operators and platform teams.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-6 text-sm">
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Product
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="#usage" className="hover:text-foreground">
                  Usage
                </a>
              </li>
              <li>
                <a href="#cli" className="hover:text-foreground">
                  CLI
                </a>
              </li>
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a href="#open-source" className="hover:text-foreground">
                  Open Source
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Community
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-foreground"
                >
                  <GithubIcon className="size-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={`${SITE.github}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} kprompt. MIT licensed.</p>
          <p>Kubernetes is a trademark of The Linux Foundation.</p>
        </div>
      </div>
    </footer>
  );
}
