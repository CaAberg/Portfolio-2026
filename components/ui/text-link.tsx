import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps } from "react";

type TextLinkProps = ComponentProps<typeof Link> & {
  className?: string;
};

/**
 * Body-style link with non-color cue (underline) for WCAG use of color.
 * Use `rel` and `target` for external targets.
 */
export function TextLink({ className, ...props }: TextLinkProps) {
  return (
    <Link
      className={cn(
        "font-medium text-link underline decoration-link-underline decoration-2 underline-offset-4 transition-colors hover:text-foreground focus-visible:rounded-sm",
        className,
      )}
      {...props}
    />
  );
}
