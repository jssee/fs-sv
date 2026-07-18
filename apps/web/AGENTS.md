# Web App Rules

## Boundaries

- Keep SvelteKit concepts and UI error translation in this app; server decisions stay behind API procedures.
- `$lib/components/ui` is shadcn-managed; add components via the shadcn-svelte CLI, do not hand-edit them.

## Conventions

- Remote functions call one procedure through `createApi(locals)` and translate errors for the UI; group them per feature domain, following `$lib/auth/forms.remote.ts`.
- Read the session resolved by `hooks.server.ts` from `locals.session`; do not call `auth.api.getSession` in feature code.
- Use `requireSession(event, messageCode)` from `$lib/auth/utils.server` for protected pages; define user-facing message codes statically, as in `$lib/auth/messages.ts`.
- Prefer shadcn-svelte components over custom UI; feature-specific components live in `$lib/components`.
- Avoid tailwind arbitrary values, adhere to design system tokens.
