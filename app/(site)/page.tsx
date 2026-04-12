import { AboutSection } from "@/components/portfolio/about-section";
import { ContactSection } from "@/components/portfolio/contact-section";
import { Hero } from "@/components/portfolio/hero";
import { ProjectSection } from "@/components/portfolio/project-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Selected projects and background for a Full-Stack Developer focused on accessibility, clarity and performance.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
