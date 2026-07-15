import { SITE } from "@/lib/constants";

const UPSTREAM =
  "https://raw.githubusercontent.com/kprompt/kprompt/main/install/install.sh";

/** Serves the install script for curl | bash (currently on Vercel; later kprompt.ai). */
export async function GET() {
  const res = await fetch(UPSTREAM, {
    next: { revalidate: 300 },
    headers: { "User-Agent": `${SITE.name}-website` },
  });

  if (!res.ok) {
    return new Response(`# failed to fetch install script (${res.status})\n`, {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const body = await res.text();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
