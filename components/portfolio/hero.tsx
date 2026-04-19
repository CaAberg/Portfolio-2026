import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type HeroProps = {
  className?: string;
};

export function Hero({ className }: HeroProps) {
  return (
    <div className={cn(" border-b border-border bg-muted/30", className)}>
      <Container className="py-10 max-w-5xl sm:py-28">
        <p className="text-4xl font-bold text-white">Carl Åberg</p>
        <p className="text-sm my-4 font-medium uppercase tracking-wide text-muted-foreground">
          Full-Stack Developer - Accessibility engineer
        </p>
        <h1 className="my-2 max-w-2xl text-4xl font-semibold tracking-normal text-foreground">
          I create websites with a focus on accessibility and ease of use
        </h1>
        <p className="mt-4 lg:mt-8 mr-4 max-w-lg text-l leading-relaxed text-muted-foreground">
          I design and develop websites that look good and are simple to use, no
          matter who you are.
        </p>
        <p className="mt-4 lg:mt-8 mr-4 max-w-lg text-l leading-relaxed text-muted-foreground">
          keep scrolling to see what I can do for you!
        </p>
      </Container>
    </div>
  );
}
