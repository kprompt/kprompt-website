import Link from "next/link";
import { GithubIcon } from "@/components/ui/github-icon";
import { Logo } from "@/components/ui/logo";
import { SITE } from "@/lib/constants";

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

/** Curated sitemap for crawl paths — GSC demand first, not every docs page. */
const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Home" },
      { href: SITE.getStarted, label: SITE.ctaPrimary },
      { href: "/docs/install", label: "Install" },
      { href: "/docs/safety", label: "Safety" },
      { href: "/docs/roadmap", label: "Roadmap" },
      { href: SITE.app, label: "App", external: true },
    ],
  },
  {
    title: "Compare",
    links: [
      { href: "/blog/kubectl-vs-k9s", label: "kubectl vs K9s" },
      { href: "/blog/kubectl-alternatives", label: "Kubectl alternatives" },
      { href: "/blog/k9s-alternatives", label: "K9s alternatives" },
      {
        href: "/blog/kubernetes-ai-tools-comparison",
        label: "Kubernetes AI tools",
      },
      {
        href: "/blog/kubectl-ai-alternatives",
        label: "kubectl-ai alternatives",
      },
      { href: "/blog/kprompt-vs-kubectl-ai", label: "kprompt vs kubectl-ai" },
      { href: "/blog/kubegpt-vs-k8sgpt", label: "Kubegpt vs K8sGPT" },
    ],
  },
  {
    title: "Guides",
    links: [
      {
        href: "/blog/best-ai-tools-kubernetes-troubleshooting",
        label: "AI troubleshooting tools",
      },
      {
        href: "/blog/chat-with-kubernetes-cluster",
        label: "Chat with your cluster",
      },
      {
        href: "/blog/ai-kubernetes-pod-diagnose",
        label: "AI for Kubernetes Pods",
      },
      {
        href: "/blog/what-is-a-kubernetes-deployment",
        label: "What is a Deployment?",
      },
      {
        href: "/blog/kubectl-get-pods-explained",
        label: "kubectl get pods explained",
      },
      {
        href: "/blog/kubernetes-pods-vs-deployments",
        label: "Pods vs Deployments",
      },
      {
        href: "/blog/kubernetes-service-vs-deployment",
        label: "Service vs Deployment",
      },
      { href: "/blog", label: "All blog posts" },
    ],
  },
  {
    title: "Docs",
    links: [
      { href: "/docs", label: "Overview" },
      { href: "/docs/quickstart", label: "Quickstart" },
      { href: "/docs/commands", label: "Commands" },
      { href: "/docs/providers", label: "Providers (BYOK)" },
      { href: "/docs/ci", label: "CI / PlanResult JSON" },
      { href: "/docs/agent", label: "Observe agent" },
      { href: "/docs/architecture", label: "Architecture" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/team", label: "Team" },
      { href: SITE.github, label: "GitHub", external: true },
      { href: SITE.twitter, label: `X ${SITE.twitterHandle}`, external: true },
      { href: SITE.linkedin, label: "LinkedIn", external: true },
      { href: SITE.bluesky, label: "Bluesky", external: true },
      { href: `mailto:${SITE.email}`, label: "Contact", external: true },
      {
        href: SITE.licenseUrl,
        label: "License",
        external: true,
      },
    ],
  },
];

function FooterNavLink({ link }: { link: FooterLink }) {
  const className = "hover:text-foreground";

  if (link.external) {
    const isMail = link.href.startsWith("mailto:");
    return (
      <a
        href={link.href}
        className={className}
        {...(isMail
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
      >
        {link.label === "GitHub" ? (
          <span className="inline-flex items-center gap-1.5">
            <GithubIcon className="size-3.5" />
            GitHub
          </span>
        ) : (
          link.label
        )}
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="max-w-sm shrink-0">
            <Logo size={28} />
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline}. Open-source CLI for operators — plan before apply.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground/90">
              <span className="font-medium text-foreground/80">
                {SITE.maturityLabel}.
              </span>{" "}
              Review plans before apply · prefer non-production first.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/90">
              OSS CLI today ·{" "}
              <a
                href={SITE.app}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:text-foreground hover:underline"
              >
                app.kprompt.ai
              </a>{" "}
              is early (CLI stays free).
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="space-y-3 text-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {column.title}
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <FooterNavLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} kprompt. {SITE.license} licensed.
          </p>
          <p>Kubernetes is a trademark of The Linux Foundation.</p>
        </div>
      </div>
    </footer>
  );
}
