# Web App Rules

## Boundaries

- Own routes, pages, layouts, route handlers, Svelte components, browser behavior, form UX, and user-facing messages.
- Render API state and collect input; keep server decisions behind API procedures.
- Keep SvelteKit concepts and UI error translation in this app.

## Server data

- Use `createApi(locals)` from `$lib/server/api` in load functions and remote functions.
- Keep remote functions thin: create the API client, call one procedure, and translate errors for the UI.
- Do not duplicate contract validation unless immediate client feedback requires it.

## Sessions

- Read the session resolved by `hooks.server.ts` from `locals.session`; do not call `auth.api.getSession` in feature code.
- Use `requireSession(event, messageCode)` from `$lib/auth/utils.server` for protected pages.
- Add static authentication message codes in `$lib/auth/messages.ts`.

## UI

- Common components live in `src/lib/components/ui`.
- Add shadcn-svelte components only when a current feature needs them.
