import Image from "next/image";
import { cn } from "@/lib/utils";

/** Native logo aspect (trimmed transparent PNG) */
const LOGO_ASPECT = 846 / 955;

type LogoProps = {
  className?: string;
  /** Mark height in pixels */
  size?: number;
  showWordmark?: boolean;
  priority?: boolean;
};

export function Logo({
  className,
  size = 28,
  showWordmark = true,
  priority = false,
}: LogoProps) {
  const height = size;
  const width = Math.round(size * LOGO_ASPECT);

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <Image
        src="/kprompt-logo.png"
        alt={showWordmark ? "" : "kprompt"}
        width={width}
        height={height}
        className="shrink-0 object-contain"
        priority={priority}
      />
      {showWordmark && (
        <span className="truncate font-heading text-lg font-semibold tracking-tight text-foreground">
          kprompt
          <span className="text-brand">.ai</span>
        </span>
      )}
    </span>
  );
}
