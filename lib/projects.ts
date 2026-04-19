import type { Project } from "@/types/project";

const projects: Project[] = [
  {
    slug: "tackleboxed",
    title: "Tackleboxed: an online store for fishing equipment",
    summary: "E-commerce website for a fishing store.",
    description:
      "I designed and developed the website for a fishing store. The website is built with Next.js and Tailwind CSS. This project was made to learn about supabase and how to use it to handle data.",
    highlights: [
      "Based on nextjs and tailwindcss.",
      "Supabase Database & Storage",
      "Responsive Design",
      "Shopping Cart Functionality",
      "SEO Optimized",
    ],
    href: "https://tackleboxed2-0.vercel.app",
    hrefLabel: "View website",
  },
  {
    slug: "fisherDB",
    title: "FisherDB: a 'reddit clone' project",
    summary:
      "A reddit clone project that lets people create, post and comment on posts.",
    description:
      "A reddit clone project that lets people create, post and comment on posts. This project was made to learn about authentication, comments and posts.",
    highlights: [
      "Based on nextjs and tailwindcss.",
      "Supabase Database & Storage",
      "Responsive Design",
      "Authentication",
      "Comment and post",
    ],
    href: "https://fisherdb.vercel.app",
    hrefLabel: "View website",
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
