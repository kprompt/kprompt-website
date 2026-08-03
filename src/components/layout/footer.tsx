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

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Home" },
      { href: SITE.getStarted, label: SITE.ctaPrimary },
      { href: "/docs/install", label: "Install" },
      { href: "/docs", label: "Docs" },
      { href: "/blog", label: "Blog" },
      { href: SITE.app, label: "App", external: true },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/blog/kubectl-vs-k9s", label: "kubectl vs K9s" },
      {
        href: "/blog/kubernetes-pods-vs-deployments",
        label: "Pods vs Deployments",
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
        href: "/blog/kubectl-alternatives",
        label: "Kubectl alternatives",
      },
      {
        href: "/blog/kubernetes-ai-tools-comparison",
        label: "Kubernetes AI tools",
      },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/team", label: "Team" },
      { href: SITE.github, label: "GitHub", external: true },
      { href: SITE.twitter, label: `X ${SITE.twitterHandle}`, external: true },
      { href: SITE.linkedin, label: "LinkedIn", external: true },
      { href: `mailto:${SITE.email}`, label: "Contact", external: true },
    ],
  },
];

function FooterNavLink({
  link,
  context,
}: {
  link: FooterLink;
  context: string;
}) {
  const className = "hover:text-foreground";
  const ariaLabel = `${link.label} (${context})`;

  if (link.external) {
    const isMail = link.href.startsWith("mailto:");
    return (
      <a
        href={link.href}
        className={className}
        aria-label={ariaLabel}
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
    <Link href={link.href} className={className} aria-label={ariaLabel}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
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
          </div>

          <nav
            aria-label="Footer"
            className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="space-y-3 text-sm">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {column.title}
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <FooterNavLink link={link} context={column.title} />
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
