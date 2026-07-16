import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { TEAM_PAGE } from "@/lib/team";

export function teamMetadata(): Metadata {
  const url = `${SITE.url}/team`;
  return {
    title: TEAM_PAGE.title,
    description: TEAM_PAGE.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${TEAM_PAGE.title} · kprompt.ai`,
      description: TEAM_PAGE.description,
      url,
    },
  };
}
