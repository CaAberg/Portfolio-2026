<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ
from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before
writing any code. If that path doesn't exist, refer to https://nextjs.org/docs. Heed all
deprecation notices.

---

## Architecture

- **App Router only** — no Pages Router, no `getServerSideProps`, no `getStaticProps`
- **Server Components by default** — add `"use client"` only when you need interactivity,
  browser APIs, or React hooks
- **Server Actions** for all form submissions and mutations — not client-side fetch calls
  to internal endpoints
- **Route Handlers** (`app/api/**/route.ts`) for external-facing API endpoints only
- **Middleware** lives in `middleware.ts` at the root — do not create alternatives elsewhere

---

## File Structure

app/
(routes)/ # Route groups for layout sharing
api/ # Route Handlers only
actions/ # Server Actions (e.g. actions/user.ts)
components/
ui/ # Primitive/reusable components
<feature>/ # Feature-scoped components
types/ # Shared TypeScript types and interfaces
lib/ # Utilities, helpers, third-party wrappers
middleware.ts # Root only

- Co-locate tests next to source: `foo.test.ts` beside `foo.ts`
- Do not create barrel files (`index.ts`) unless asked

---

## Styling

- **Tailwind only** — no inline styles, no CSS Modules, no styled-components
- Use `cn()` (from `lib/utils.ts`) for conditional class merging
- Responsive classes mobile-first: `sm:` `md:` `lg:`
- Do not add arbitrary values (e.g. `w-[337px]`) without a good reason — prefer
  Tailwind's design scale

---

## Never (without asking first)

- Install or remove any npm package
- Modify `next.config.*`, `tailwind.config.*`, or `tsconfig.json`
- Change anything in `middleware.ts`
- Add a new Route Handler if a Server Action would do the job
- Add `"use client"` to a component that doesn't strictly need it
- Rename or move existing files or directories

---

## Check in before

- Creating a new top-level directory
- Introducing a new pattern not already present in the codebase
- Any change that touches more than 3 files at once
- Anything that affects auth, session, or middleware logic

---

## General rules

- Prefer `async/await` over `.then()` chains
- All Server Actions must validate input — use `zod` if it's already in the project
- TypeScript strict mode is on — no `any`, no `@ts-ignore` without a comment explaining why
- Do not leave `console.log` statements in committed code
- If something is unclear, ask — don't guess and generate
<!-- END:nextjs-agent-rules -->
