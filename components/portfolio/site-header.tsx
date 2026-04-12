import { TextLink } from "@/components/ui/text-link";
import { mainNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SiteHeaderProps = {
  className?: string;
};

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-border bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          className="text-base font-semibold text-foreground underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-link-underline focus-visible:rounded-sm"
          href="/"
        >
          Portfolio
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-4 sm:gap-6">
            {mainNavItems.map((item) => (
              <li key={item.href}>
                <TextLink href={item.href}>{item.label}</TextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
