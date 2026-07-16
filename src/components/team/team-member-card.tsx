import Image from "next/image";
import { GithubIcon } from "@/components/ui/github-icon";
import type { TeamMember } from "@/lib/team";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const profileUrl = member.github ?? member.linkedin;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 sm:flex-row">
      <div className="flex items-center justify-center bg-muted/30 p-8 sm:w-56 sm:shrink-0 sm:p-6">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={`${member.name} profile photo`}
            width={160}
            height={160}
            className="size-32 rounded-2xl border border-border object-cover shadow-sm sm:size-36"
          />
        ) : (
          <div
            aria-hidden
            className="flex size-32 items-center justify-center rounded-2xl border border-border bg-muted font-heading text-3xl font-semibold text-muted-foreground sm:size-36"
          >
            {member.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
        {profileUrl ? (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-xl font-semibold tracking-tight transition-colors hover:text-brand sm:text-2xl"
          >
            {member.name}
          </a>
        ) : (
          <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            {member.name}
          </h2>
        )}

        {member.role ? (
          <p className="mt-1 text-sm font-medium text-brand">{member.role}</p>
        ) : null}

        {member.bio ? (
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {member.bio}
          </p>
        ) : null}

        <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {member.email ? (
            <li>
              <a
                href={`mailto:${member.email}`}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {member.email}
              </a>
            </li>
          ) : null}
          {member.github ? (
            <li>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon className="size-3.5" />
                GitHub
              </a>
            </li>
          ) : null}
          {member.linkedin ? (
            <li>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <LinkedInIcon className="size-3.5" />
                LinkedIn
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </article>
  );
}
