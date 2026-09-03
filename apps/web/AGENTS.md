# Web App Rules

## Server boundaries

- Keep SvelteKit routing, form handling, and UI error translation in this app. Product decisions and authorization stay behind API procedures.
- Product remote functions are thin adapters: obtain `locals` with `getRequestEvent()`, call one procedure through `createApi(locals)`, and translate expected failures into SvelteKit or UI outcomes.
- Auth remote forms are the protocol adapter for Better Auth. Keep them under `$lib/auth`, call the shared `auth` instance, and reuse schemas and error helpers from `@fs-sv/auth`, following `$lib/auth/forms.remote.ts`.

## Sessions

- Read the session resolved by `hooks.server.ts` from `locals.session`; do not call `auth.api.getSession` in feature code.
- Use `requireSession(event, messageCode)` from `$lib/auth/utils.server` for protected pages; define user-facing message codes statically, as in `$lib/auth/messages.ts`.

## UI

- Use shadcn-svelte for reusable primitives. Add them through the shadcn-svelte CLI under `$lib/components/ui`; keep feature-specific composition in `$lib/components` rather than hand-editing managed primitives.
- Use design-system tokens for Tailwind styling; introduce a named token when the design needs a new value.
