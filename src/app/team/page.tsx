import { TeamMemberCard } from "@/components/team/team-member-card";
import { ContributeSection } from "@/components/team/contribute-section";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { teamMetadata } from "@/lib/team-meta";
import { TEAM_MEMBERS, TEAM_PAGE } from "@/lib/team";

export const metadata = teamMetadata();

export default function TeamPage() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ]}
      />
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {TEAM_PAGE.title}
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          People behind kprompt
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {TEAM_PAGE.intro}
        </p>
      </header>

      <section className="mt-12 space-y-6" aria-labelledby="team-members">
        <h2 id="team-members" className="sr-only">
          Team members
        </h2>
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </section>

      <ContributeSection />
    </div>
  );
}
