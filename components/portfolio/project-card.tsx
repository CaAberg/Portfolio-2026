import { TextLink } from "@/components/ui/text-link";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

/** Summary card linking to the project detail route and optional external URL. */
export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-foreground">
        <Link
          className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-link-underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          href={`/projects/${project.slug}`}
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-muted-foreground">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
        <TextLink href={`/projects/${project.slug}`}>View project</TextLink>
        {project.href ? (
          <TextLink
            href={project.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {project.hrefLabel ?? "External link"}
          </TextLink>
        ) : null}
      </div>
    </article>
  );
}
