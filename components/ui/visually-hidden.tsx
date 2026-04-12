import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type VisuallyHiddenProps = {
  children: ReactNode;
  /** When true, remove from a11y tree (use for decorative labels). */
  "aria-hidden"?: boolean | "true" | "false";
  className?: string;
};

/** Hides content visually while keeping it available to screen readers. */
export function VisuallyHidden({
  children,
  className,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span className={cn("sr-only", className)} {...props}>
      {children}
    </span>
  );
}
