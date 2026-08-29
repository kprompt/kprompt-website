import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";

function avatarMime(ext: string): string {
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "image/png";
}

export async function loadAvatarDataUrl(avatarPath?: string) {
  if (!avatarPath?.startsWith("/")) return undefined;
  try {
    const file = await readFile(
      join(process.cwd(), "public", avatarPath.slice(1))
    );
    const mime = avatarMime(extname(avatarPath).toLowerCase());
    return `data:${mime};base64,${file.toString("base64")}`;
  } catch {
    return undefined;
  }
}
