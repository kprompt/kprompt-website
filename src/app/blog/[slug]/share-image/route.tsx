import { ImageResponse } from "next/og";
import { getPostBySlug, readingMinutes } from "@/lib/blog-posts";
import { loadLogoDataUrl, ogLogoSize } from "@/lib/og-brand";
import { ShareBlogGraphic } from "@/lib/share-blog-graphic";
import { loadAvatarDataUrl } from "@/lib/share-graphic-assets";
import { loadShareGraphicFonts } from "@/lib/share-graphic-fonts";
import { extractShareExcerpt } from "@/lib/share-graphic-text";

export const runtime = "nodejs";

export const size = { width: 1080, height: 1350 };

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "kprompt blog";
  const description =
    post?.description ??
    "Kubernetes, AI, and practical operator notes from kprompt.";
  const excerpt = extractShareExcerpt(description, post?.blocks ?? []);
  const authorName = post?.author.name ?? "kprompt team";
  const tags = post?.tags ?? ["kubernetes"];
  const minutes = post ? readingMinutes(post.blocks) : 5;

  const [logo, avatar, fonts] = await Promise.all([
    loadLogoDataUrl(),
    loadAvatarDataUrl(post?.author.avatar),
    loadShareGraphicFonts(),
  ]);
  const logoSize = ogLogoSize(48);

  return new ImageResponse(
    (
      <ShareBlogGraphic
        title={title}
        excerpt={excerpt}
        authorName={authorName}
        avatarDataUrl={avatar}
        tags={tags}
        readingMinutes={minutes}
        slug={slug}
        logoDataUrl={logo}
        logoWidth={logoSize.width}
        logoHeight={logoSize.height}
      />
    ),
    {
      ...size,
      fonts,
    }
  );
}
