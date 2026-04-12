import { TextLink } from "@/components/ui/text-link";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
      <article className="m-auto w-full max-w-5xl shrink-0 border-border px-6 py-24 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm text-muted-foreground">
            <TextLink href="/#projects">Back to projects</TextLink>
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {project.description}
          </p>
          <h2 className="mt-10 text-lg font-semibold text-foreground">
            Highlights
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {project.href ? (
            <p className="mt-8">
              <TextLink
                href={project.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {project.hrefLabel ?? "External link"}
              </TextLink>
            </p>
          ) : null}
        </div>
      </article>
    </div>
  );
}
