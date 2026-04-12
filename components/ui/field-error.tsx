import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FieldErrorProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/** Associates server/client validation text with inputs via `aria-describedby`. */
export function FieldError({ id, children, className }: FieldErrorProps) {
  return (
    <p
      id={id}
      className={cn("mt-1 text-sm text-danger", className)}
      role="alert"
    >
      {children}
    </p>
  );
}
