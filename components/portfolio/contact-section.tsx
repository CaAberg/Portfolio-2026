import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/portfolio/contact-form";

const headingId = "contact-heading";

export function ContactSection() {
  return (
    <Section id="contact" aria-labelledby={headingId}>
      <Container>
        <h2
          id={headingId}
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Contact
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Looking for a developer that cares about accessibility, clarity and
          performance?
        </p>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Let&apos;s have a chat! I typically reply within 48 hours.
        </p>
        <ContactForm />
      </Container>
    </Section>
  );
}
