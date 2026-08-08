import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { HowToJsonLd } from "@/components/seo/howto-json-ld";
import { TechArticleJsonLd } from "@/components/seo/tech-article-json-ld";
import type { DocsBlock, DocsPage } from "@/lib/docs-content";
import { DOCS_NAV } from "@/lib/docs-nav";
import { DOCS_HOWTOS } from "@/lib/howto";
import { slugify } from "@/lib/utils";

function LinkedText({
  text,
  links = [],
}: {
  text: string;
  links?: { label: string; href: string }[];
}) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const link of links) {
    const index = text.indexOf(link.label, cursor);
    if (index === -1) continue;

    nodes.push(text.slice(cursor, index));
    const className =
      "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand";

    const isHash = link.href.startsWith("#");
    const isInternal = link.href.startsWith("/");

    if (isHash) {
      nodes.push(
        <a key={`${link.href}-${index}`} href={link.href} className={className}>
          {link.label}
        </a>
      );
    } else if (isInternal) {
      nodes.push(
        <Link key={`${link.href}-${index}`} href={link.href} className={className}>
          {link.label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={`${link.href}-${index}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {link.label}
        </a>
      );
    }
    cursor = index + link.label.length;
  }

  nodes.push(text.slice(cursor));
  return nodes;
}

export function DocsBlocks({ blocks }: { blocks: DocsBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: DocsBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base leading-relaxed text-muted-foreground">
          <LinkedText text={block.text} links={block.links} />
        </p>
      );
    case "h2":
      return (
        <h2
          id={block.id ?? slugify(block.text)}
          className="mt-10 scroll-mt-24 font-heading text-xl font-semibold tracking-tight first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={block.id ?? slugify(block.text)}
          className="mt-6 scroll-mt-24 font-heading text-base font-semibold tracking-tight"
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="mt-4">
          {block.caption ? (
            <p className="mb-2 font-mono text-xs text-muted-foreground">
              {block.caption}
            </p>
          ) : null}
          <pre className="max-w-full overflow-x-auto rounded-lg border border-border bg-navy p-3 font-mono text-[12px] leading-relaxed text-white/90 sm:p-4 sm:text-[13px]">
            <code>{block.code}</code>
          </pre>
        </div>
      );
    case "table":
      return (
        <div className="-mx-4 mt-4 overflow-x-auto overscroll-x-contain px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-md border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="py-2 pr-4 font-heading text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-border/70 align-top">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="py-2.5 pr-4 font-mono text-[12px] text-foreground sm:text-[13px]"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function DocsArticle({
  page,
  path,
}: {
  page: DocsPage;
  path: string;
}) {
  const navIndex = DOCS_NAV.findIndex((item) => item.href === path);
  const navLabel = navIndex >= 0 ? DOCS_NAV[navIndex].label : undefined;
  const prev = navIndex > 0 ? DOCS_NAV[navIndex - 1] : undefined;
  const next =
    navIndex >= 0 && navIndex < DOCS_NAV.length - 1
      ? DOCS_NAV[navIndex + 1]
      : undefined;
  const howto = DOCS_HOWTOS[path];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          ...(path === "/docs"
            ? []
            : [{ name: navLabel ?? page.title, path }]),
        ]}
      />
      {howto ? <HowToJsonLd howto={howto} path={path} /> : null}
      <TechArticleJsonLd
        title={page.title}
        description={page.description}
        path={path}
      />
      <article className="max-w-3xl min-w-0">
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          {page.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {page.description}
        </p>
        <div className="mt-8 sm:mt-10">
          <DocsBlocks blocks={page.blocks} />
        </div>

        {prev || next ? (
          <nav
            aria-label="Docs pagination"
            className="mt-12 grid gap-3 border-t border-border pt-8 sm:grid-cols-2"
          >
            {prev ? (
              <Link
                href={prev.href}
                className="group flex flex-col gap-1 rounded-xl border border-border bg-card/40 px-4 py-3 transition-colors hover:border-brand/30 hover:bg-card"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <ArrowLeft className="size-3" aria-hidden />
                  Previous
                </span>
                <span className="font-heading text-sm font-semibold tracking-tight group-hover:text-brand">
                  {prev.label}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next ? (
              <Link
                href={next.href}
                className="group flex flex-col gap-1 rounded-xl border border-border bg-card/40 px-4 py-3 text-right transition-colors hover:border-brand/30 hover:bg-card"
              >
                <span className="inline-flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Next
                  <ArrowRight className="size-3" aria-hidden />
                </span>
                <span className="font-heading text-sm font-semibold tracking-tight group-hover:text-brand">
                  {next.label}
                </span>
              </Link>
            ) : null}
          </nav>
        ) : null}
      </article>
    </>
  );
}
