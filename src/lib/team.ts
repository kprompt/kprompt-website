export type TeamMember = {
  name: string;
  role?: string;
  bio?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  avatar?: string;
};

/** Blog posts reuse the same person shape. */
export type BlogAuthor = TeamMember;

export const MUHTALIP_DEDE: TeamMember = {
  name: "Muhtalip Dede",
  role: "Founder of kprompt",
  bio: "Senior backend engineer building kprompt — a natural-language CLI for Kubernetes. Background in platform engineering, microservices, and LLM-powered developer tools.",
  email: "muhtalipdede@gmail.com",
  github: "https://github.com/muhtalipdede",
  linkedin: "https://www.linkedin.com/in/muhtalipdede",
  avatar: "/muhtalip-dede.png",
};

export const TEAM_MEMBERS: TeamMember[] = [MUHTALIP_DEDE];

export const TEAM_PAGE = {
  title: "Team",
  description:
    "The people building kprompt — an open-source CLI that turns natural language into reviewable Kubernetes plans.",
  intro:
    "kprompt is early-stage and open source. We ship in public, keep safety honest, and welcome contributors who care about operator workflows.",
} as const;
