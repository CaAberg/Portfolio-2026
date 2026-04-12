import { AboutFishingJourney } from "@/components/portfolio/about-fishing-journey";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

const headingId = "about-heading";

export function AboutSection() {
  return (
    <Section id="about" aria-labelledby={headingId} className="bg-muted/30">
      <Container>
        <h2
          id={headingId}
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          About me
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Reel through a few chapters of how I got here — or use the step
          buttons for a direct jump.
        </p>
        <AboutFishingJourney />
      </Container>
    </Section>
  );
}
