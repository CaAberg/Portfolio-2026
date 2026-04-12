import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes and resolves conflicts (tailwind-merge + clsx). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
