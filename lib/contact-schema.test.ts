import { contactFormSchema } from "@/lib/contact-schema";
import { describe, expect, it } from "vitest";

describe("contactFormSchema", () => {
  it("accepts valid input", () => {
    const result = contactFormSchema.safeParse({
      name: "Alex Doe",
      email: "alex@example.com",
      message: "Hello — I would love to collaborate.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = contactFormSchema.safeParse({
      name: "",
      email: "alex@example.com",
      message: "Enough characters here",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name?.[0]).toBeDefined();
    }
  });

  it("rejects invalid email", () => {
    const result = contactFormSchema.safeParse({
      name: "Alex",
      email: "not-an-email",
      message: "Enough characters here",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short message", () => {
    const result = contactFormSchema.safeParse({
      name: "Alex",
      email: "alex@example.com",
      message: "short",
    });
    expect(result.success).toBe(false);
  });
});
