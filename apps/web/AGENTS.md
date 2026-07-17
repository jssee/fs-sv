# Web App Rules

## Boundaries

- Render API state and collect input; keep server decisions behind API procedures.
- Keep SvelteKit concepts and UI error translation in this app.

## Conventions

- Use `createApi(locals)` from `$lib/server/api`; remote functions should call one procedure and translate errors for the UI.
- Read the session resolved by `hooks.server.ts` from `locals.session`; do not call `auth.api.getSession` in feature code.
- Use `requireSession(event, messageCode)` from `$lib/auth/utils.server` for protected pages; add static message codes in `$lib/auth/messages.ts`.
- Prefer shadcn-svelte (src/lib/components/ui) components over custom UI
- Avoid tailwind arbitrary values, adhere to design system tokens.

## Verification

- Run `bun run --cwd apps/web check` for Svelte or TypeScript changes.
