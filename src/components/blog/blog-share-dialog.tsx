"use client";

import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Copy, Download, Share2, X } from "lucide-react";
import { track } from "@/lib/analytics";
import {
  blogPostUrl,
  fetchShareImageFile,
  shareImagePath,
  shareViaCaption,
} from "@/lib/blog-share";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BlogShareDialogProps = {
  slug: string;
  title: string;
  description: string;
};

export function BlogShareDialog({
  slug,
  title,
}: BlogShareDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const url = blogPostUrl(slug);
  const imageSrc = shareImagePath(slug);
  const caption = shareViaCaption(title, url);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setStatus("Link copied");
      track("share_copy", { slug });
    } catch {
      setStatus("Could not copy link");
    }
  }, [slug, url]);

  const shareNative = useCallback(async () => {
    const linkOnly: ShareData = {
      title,
      text: shareViaCaption(title, url),
      url,
    };

    try {
      if (!navigator.share) {
        await copyLink();
        setStatus("Link copied — paste it in the app you want");
        return;
      }

      const file = await fetchShareImageFile(slug);
      const candidates: ShareData[] = [
        { files: [file], text: caption },
        { files: [file], url },
        { files: [file] },
      ];
      const payload =
        candidates.find((data) => navigator.canShare?.(data)) ?? linkOnly;

      await navigator.share(payload);
      track("share_native", { slug, with_image: Boolean(payload.files) });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      try {
        await navigator.share(linkOnly);
        track("share_native", { slug, with_image: false });
        return;
      } catch (inner) {
        if (inner instanceof DOMException && inner.name === "AbortError") return;
      }
      setStatus("Share is not available here — copy the link or save the image");
    }
  }, [caption, copyLink, slug, title, url]);

  const saveImage = useCallback(async () => {
    try {
      const file = await fetchShareImageFile(slug);
      const href = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = href;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(href);
      track("share_save", { slug });
      setStatus("Image saved");
    } catch {
      setStatus("Could not save image");
    }
  }, [slug]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Share this post"
      >
        <Share2 className="size-3.5" aria-hidden />
        Share
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-60 bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-70 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2",
            "grid max-h-[90dvh] overflow-hidden",
            "rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          )}
          style={{ gridTemplateRows: "auto minmax(0, 1fr) auto auto" }}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <Dialog.Title className="font-heading text-base font-semibold">
              Share
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Share this article with its preview card and link.
            </Dialog.Description>
            <Dialog.Close
              className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close share"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <div className="min-h-0 px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              width={1080}
              height={1350}
              className="mx-auto h-full max-h-[calc(90dvh-12.75rem)] w-full rounded-xl border border-border object-contain"
            />
          </div>
          <p className="px-4 pb-3 font-mono text-[11px] leading-5 break-all text-muted-foreground">
            {url}
            <span className="sr-only" aria-live="polite">
              {status ?? (copied ? "Link copied" : "")}
            </span>
          </p>

          <div className="grid grid-cols-3 gap-2 border-t border-border px-4 py-2.5">
            <Button
              type="button"
              variant="ghost"
              className="h-auto flex-col gap-1 py-2 text-xs"
              onClick={copyLink}
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="size-4 text-brand" aria-hidden />
              ) : (
                <Copy className="size-4" aria-hidden />
              )}
              {copied ? "Copied" : "Copy link"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-auto flex-col gap-1 py-2 text-xs"
              onClick={shareNative}
              aria-label="Share via another app"
            >
              <Share2 className="size-4" aria-hidden />
              Share via
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-auto flex-col gap-1 py-2 text-xs"
              onClick={saveImage}
              aria-label="Save image"
            >
              <Download className="size-4" aria-hidden />
              Save image
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
