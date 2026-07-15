import { SITE } from "@/lib/constants";

/** Prefer jsDelivr — raw.githubusercontent.com can lag behind main for minutes. */
const UPSTREAMS = [
  "https://cdn.jsdelivr.net/gh/kprompt/kprompt@main/install/install.sh",
  "https://raw.githubusercontent.com/kprompt/kprompt/main/install/install.sh",
] as const;

/** Serves the install script for curl | bash (Vercel today; kprompt.ai later). */
export async function GET() {
  let lastStatus = 502;
  for (const url of UPSTREAMS) {
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": `${SITE.name}-website` },
    });
    if (res.ok) {
      const body = await res.text();
      return new Response(body, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=60",
          "X-Install-Upstream": url,
        },
      });
    }
    lastStatus = res.status;
  }

  return new Response(`# failed to fetch install script (${lastStatus})\n`, {
    status: 502,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
