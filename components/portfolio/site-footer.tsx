import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";

type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border bg-muted/40", className)}>
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} Portfolio. Built with accessibility in mind.
        </p>
        <p className="text-sm text-muted-foreground">
          <TextLink href="/#contact">Contact</TextLink>
        </p>
      </Container>
    </footer>
  );
}
