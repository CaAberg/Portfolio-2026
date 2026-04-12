# ContactForm

Client form wired to `submitContactAction` via `useActionState`.

- **Honeypot**: Hidden `company` field; if populated, the server action returns success without sending mail (spam bots).
- **Errors**: Field-level messages use `aria-invalid` and `aria-describedby` pointing to `FieldError` paragraphs with `role="alert"`.
- **Status**: Global status string is exposed in a `role="status"` region with `aria-live="polite"` for successes and non-field failures.

Configure delivery with `RESEND_API_KEY`, `CONTACT_TO`, and `RESEND_FROM` (see `.env.example`).
