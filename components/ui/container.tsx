import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Max-width content column with responsive horizontal padding. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
}
