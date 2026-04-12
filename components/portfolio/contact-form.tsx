"use client";

import { submitContactAction } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";

const initialState = {
  ok: false,
} satisfies Awaited<ReturnType<typeof submitContactAction>>;

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-6" noValidate>
      <div aria-live="polite" className="min-h-6" role="status">
        {state.statusMessage ? (
          <p className={state.ok ? "text-foreground" : "text-danger"}>
            {state.statusMessage}
          </p>
        ) : null}
      </div>

      <div className="hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          autoComplete="off"
          id="contact-company"
          name="company"
          tabIndex={-1}
          type="text"
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium text-foreground"
          htmlFor="contact-name"
        >
          Name
        </label>
        <Input
          aria-describedby={
            state.errors?.name ? "contact-name-error" : undefined
          }
          aria-invalid={Boolean(state.errors?.name)}
          autoComplete="name"
          className="mt-2"
          id="contact-name"
          name="name"
          required
          type="text"
        />
        {state.errors?.name ? (
          <FieldError id="contact-name-error">{state.errors.name}</FieldError>
        ) : null}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-foreground"
          htmlFor="contact-email"
        >
          Email
        </label>
        <Input
          aria-describedby={
            state.errors?.email ? "contact-email-error" : undefined
          }
          aria-invalid={Boolean(state.errors?.email)}
          autoComplete="email"
          className="mt-2"
          id="contact-email"
          name="email"
          required
          type="email"
        />
        {state.errors?.email ? (
          <FieldError id="contact-email-error">{state.errors.email}</FieldError>
        ) : null}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-foreground"
          htmlFor="contact-message"
        >
          Message
        </label>
        <Textarea
          aria-describedby={
            state.errors?.message ? "contact-message-error" : undefined
          }
          aria-invalid={Boolean(state.errors?.message)}
          className="mt-2"
          id="contact-message"
          name="message"
          required
        />
        {state.errors?.message ? (
          <FieldError id="contact-message-error">
            {state.errors.message}
          </FieldError>
        ) : null}
      </div>

      <Button disabled={pending} type="submit" variant="primary">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
