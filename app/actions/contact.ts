"use server";

import { contactFormSchema } from "@/lib/contact-schema";

export type ContactActionState = {
  ok: boolean;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  statusMessage?: string;
};

function formValuesFromFormData(formData: FormData) {
  return {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
  };
}

/**
 * Validates and sends the contact message via Resend when configured.
 * Honeypot field `company` triggers a silent success without sending mail.
 */
export async function submitContactAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const honeypot = formData.get("company")?.toString() ?? "";
  if (honeypot.length > 0) {
    return {
      ok: true,
      statusMessage: "Thanks — your message has been received.",
    };
  }

  const parsed = contactFormSchema.safeParse(formValuesFromFormData(formData));
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
      statusMessage: "Please fix the errors below and try again.",
    };
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "development") {
      return {
        ok: true,
        statusMessage:
          "Thanks — in development, email is not sent. Set RESEND_API_KEY, CONTACT_TO, and RESEND_FROM to enable delivery.",
      };
    }
    return {
      ok: false,
      statusMessage:
        "Messaging is temporarily unavailable. Please try again later.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Portfolio contact from ${name}`,
      reply_to: email,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      statusMessage:
        "We could not send your message. Please try again shortly.",
    };
  }

  return {
    ok: true,
    statusMessage: "Thanks — your message has been sent.",
  };
}
