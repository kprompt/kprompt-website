import type { DocsBlock } from "@/lib/docs-content";

const TRAILING_TITLE_WORD = /^(explained|guide|intro|introduction)$/i;

function wrapWords(words: string[], maxChars: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Split a blog title into editorial lines so type can be larger.
 * Example: "Kubernetes labels and selectors explained (the glue between objects)"
 * → Kubernetes / labels and selectors / explained / (the glue between objects)
 */
export function splitShareTitle(title: string): string[] {
  let rest = title.trim();
  let paren: string | null = null;
  const parenMatch = rest.match(/^(.*?)\s+(\([^)]+\))$/);
  if (parenMatch) {
    rest = parenMatch[1].trim();
    paren = parenMatch[2];
  }

  const dashParts = rest.split(/\s+[—–]\s+/);
  if (
    dashParts.length === 2 &&
    dashParts[0].length > 8 &&
    dashParts[1].length > 8
  ) {
    const lines = [
      ...wrapWords(dashParts[0].split(/\s+/), 28),
      ...wrapWords(dashParts[1].split(/\s+/), 28),
    ];
    if (paren) lines.push(paren);
    return lines;
  }

  const words = rest.split(/\s+/).filter(Boolean);
  let last: string | null = null;
  if (words.length >= 3 && TRAILING_TITLE_WORD.test(words[words.length - 1] ?? "")) {
    last = words.pop() ?? null;
  }

  const lines: string[] = [];
  if (words.length >= 3 && words[0].length <= 14) {
    lines.push(words.shift() as string);
  }
  lines.push(...wrapWords(words, 28));
  if (last) lines.push(last);
  if (paren) lines.push(paren);
  return lines.length > 0 ? lines : [title.trim()];
}

export function shareTitleLineSize(lineCount: number): number {
  if (lineCount >= 4) return 74;
  if (lineCount === 3) return 80;
  if (lineCount === 2) return 88;
  return 96;
}

export function shareExcerptFontSize(excerpt: string): number {
  if (excerpt.length <= 140) return 36;
  if (excerpt.length <= 240) return 32;
  return 30;
}

export function truncateShareExcerpt(text: string, maxChars: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) return trimmed;
  const slice = trimmed.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(" ");
  const cut =
    lastSpace > Math.floor(maxChars * 0.55)
      ? slice.slice(0, lastSpace)
      : slice.trimEnd();
  return `${cut.trimEnd()}…`;
}

export function authorInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function shareTagLabel(tag: string): string {
  const t = tag.trim();
  if (!t) return "";
  return `#${t.charAt(0).toUpperCase()}${t.slice(1)}`;
}

export function shareCardUrl(slug: string): string {
  return `kprompt.ai/blog/${slug}`;
}

export function extractShareExcerpt(
  description: string,
  blocks: DocsBlock[]
): string {
  const firstP = blocks.find((b) => b.type === "p" && b.text.trim())?.text;
  const source = description.trim() || firstP?.trim() || "";
  return truncateShareExcerpt(source, 320);
}
