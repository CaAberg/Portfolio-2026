import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project not found",
};

export default function ProjectNotFound() {
  return (
    <Container className="py-20">
      <h1 className="text-2xl font-semibold text-foreground">
        Project not found
      </h1>
      <p className="mt-3 text-muted-foreground">
        That project does not exist or may have been moved.
      </p>
      <p className="mt-6">
        <TextLink href="/#work">Return to work</TextLink>
      </p>
    </Container>
  );
}
