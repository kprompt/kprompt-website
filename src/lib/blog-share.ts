import { SITE } from "@/lib/constants";

/** Bump when share-card artwork changes (local preview cache). */
export const SHARE_IMAGE_CACHE_BUST = "18";

export function blogPostUrl(slug: string): string {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/blog/${slug}`;
  }
  return `${SITE.url}/blog/${slug}`;
}

export function shareImagePath(slug: string): string {
  return `/blog/${slug}/share-image?v=${SHARE_IMAGE_CACHE_BUST}`;
}

/** Caption sent with Share via (image + tappable link). */
export function shareViaCaption(title: string, url: string): string {
  return `Read "${title}" from\n${url}`;
}

export async function fetchShareImageFile(slug: string): Promise<File> {
  const res = await fetch(shareImagePath(slug));
  if (!res.ok) {
    throw new Error(`Share image failed: ${res.status}`);
  }
  const blob = await res.blob();
  return new File([blob], `kprompt-${slug}.png`, { type: "image/png" });
}
