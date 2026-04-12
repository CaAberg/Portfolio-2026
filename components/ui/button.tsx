import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

/** Accessible button with visible focus styles from global `:focus-visible`. */
export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-primary text-primary-foreground shadow-sm hover:opacity-90 active:opacity-100",
    secondary:
      "border border-border bg-muted text-foreground hover:bg-background",
    ghost: "text-foreground underline-offset-4 hover:underline",
  } as const;

  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-opacity disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
