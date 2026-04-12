import type { Project } from "@/types/project";

const projects: Project[] = [
  {
    slug: "project-1",
    title: "Project 1",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    slug: "project-2",
    title: "Project 2",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
  {
    slug: "project-3",
    title: "Project 3",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    highlights: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
];

/** All projects for static generation and listings. */
export function getAllProjects(): Project[] {
  return projects;
}

/** Project by slug or undefined when missing. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Ordered slugs for `generateStaticParams`. */
export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
