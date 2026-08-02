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

export const EMIRE_BARIS: TeamMember = {
  name: "Emire Barış",
  role: "Member",
  bio: "Mathematical Engineering student learning and writing Kubernetes fundamentals for the kprompt community.",
  github: "https://github.com/emirebariiss",
  linkedin: "https://www.linkedin.com/in/emire-barış-948252250/",
  avatar: "/emire-baris.png",
};

export const YUSUF_TALHA_ATAS: TeamMember = {
  name: "Yusuf Talha Ataş",
  role: "Member",
  bio: "Junior software engineer at Yıldız Tech. Computer Engineering graduate from Yıldız Technical University; previously interned at Yapı Kredi Teknoloji, Baykar, and Datapad.",
  github: "https://github.com/yusuftalhaatas",
  linkedin: "https://www.linkedin.com/in/yusuftalhaatas/",
  avatar: "/yusuf-talha-atas.png",
};

export const HARUN_TEMEL: TeamMember = {
  name: "Harun Temel",
  role: "Member",
  bio: "Software engineer at Technoly Istanbul. Backend experience on distributed travel and commerce platforms, microservices, and Kubernetes on GCP and Azure. Computer Engineering graduate from Çukurova University.",
  github: "https://github.com/Nekre",
  linkedin: "https://www.linkedin.com/in/harun-temel-628a3b1b3/",
  avatar: "/harun-temel.png",
};

export const TEAM_MEMBERS: TeamMember[] = [
  MUHTALIP_DEDE,
  EMIRE_BARIS,
  YUSUF_TALHA_ATAS,
  HARUN_TEMEL,
];

export const TEAM_PAGE = {
  title: "Team",
  description:
    "The people building kprompt — an open-source CLI that turns natural language into reviewable Kubernetes plans.",
  intro:
    "kprompt is early-stage and open source. We ship in public, keep safety honest, and welcome contributors who care about operator workflows.",
} as const;
