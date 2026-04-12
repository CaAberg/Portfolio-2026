import { submitContactAction } from "@/app/actions/contact";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("submitContactAction", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    process.env = { ...originalEnv, NODE_ENV: "test" };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns field errors when validation fails", async () => {
    const fd = new FormData();
    fd.set("name", "");
    fd.set("email", "bad");
    fd.set("message", "short");

    const result = await submitContactAction({ ok: false }, fd);

    expect(result.ok).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.statusMessage).toBeDefined();
  });

  it("short-circuits when honeypot is filled", async () => {
    const fd = new FormData();
    fd.set("name", "Alex");
    fd.set("email", "alex@example.com");
    fd.set("message", "A long enough message for validation.");
    fd.set("company", "spam inc");

    const result = await submitContactAction({ ok: false }, fd);

    expect(result.ok).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("sends email when Resend is configured", async () => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_TO = "you@example.com";
    process.env.RESEND_FROM = "Portfolio <onboarding@example.com>";
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ id: "1" }), { status: 200 }),
    );

    const fd = new FormData();
    fd.set("name", "Alex");
    fd.set("email", "alex@example.com");
    fd.set("message", "A long enough message for validation.");

    const result = await submitContactAction({ ok: false }, fd);

    expect(result.ok).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
