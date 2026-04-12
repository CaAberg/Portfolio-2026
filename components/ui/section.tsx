import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
  className?: string;
};

/** Landmark section with optional id for in-page navigation. */
export function Section({
  id,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("py-16 sm:py-20", className)}
    >
      {children}
    </section>
  );
}
