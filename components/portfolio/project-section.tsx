import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getAllProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/portfolio/project-card";

const headingId = "projects-heading";

export function ProjectSection() {
  const projects = getAllProjects();

  return (
    <Section id="projects" aria-labelledby={headingId}>
      <Container>
        <h2
          id={headingId}
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Past projects
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Here are some of the projects I&apos;ve worked on.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
