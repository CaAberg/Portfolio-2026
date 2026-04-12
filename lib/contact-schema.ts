import { z } from "zod";

/** Validates contact form fields submitted via Server Action / tests. */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(120, "Name must be at most 40 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Please enter a few more details (at least 10 characters)")
    .max(400, "Message must be at most 400 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
