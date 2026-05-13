# Boundaries

These rules keep feature work from spreading across the wrong layers. They should stay true when we add, enhance, or refactor features.

## Invariants

1. **Web adapts; API decides.** UI code renders state and collects input. Server decisions live behind API procedures.
2. **The API is the gateway for app behavior.** Validation, authorization, and server-side behavior pass through `packages/api`.
3. **Database access stays in the data layer.** Feature code should not create database clients or bypass `packages/db`.
4. **Env access stays typed.** Add env vars to `packages/env` before using them elsewhere.
5. **Auth is mostly a helper surface during feature work.** Use existing helpers for protected pages and auth form messages; do not redesign auth flow while building unrelated features.
6. **The template stays small.** Add libraries, UI components, and abstractions when a feature needs them, not in advance.

## Layer rules

### `apps/web`

Owns SvelteKit concerns:

- routes, pages, layouts, and route handlers
- Svelte components and browser behavior
- load functions and remote functions
- form UX and user-facing messages

Use `createApi(request)` from `$lib/server/api` when a load function or remote function needs server data. Remote functions should create the API client, call one API procedure, and translate UI errors.

For protected pages, use `requireSession(request, url, messageCode)` from `$lib/auth/utils.server`. Add static message codes in `$lib/auth/messages.ts`.

### `packages/api`

Owns the app API boundary:

```txt
src/schema.ts      public input and output schemas
src/contract.ts    oRPC contract definition
src/procedure.ts   public/protected procedure builders
src/router.ts      procedure handlers
src/context.ts     request context
```

Keep payload schemas in `schema.ts`. Keep the contract declarative. Keep router handlers focused on serving procedures, not on UI concerns.

### `packages/db`

Owns Drizzle schema, relations, migrations, and the shared database client. Import from `@fs-sv/db`; do not create database clients in feature code.

### `packages/env`

Owns env validation. Do not read raw `process.env` or `import.meta.env` in feature code unless the env package cannot cover that use.

### `packages/auth`

Owns shared auth schemas and error helpers. Most feature work should only need these indirectly through web helpers. Change core auth setup only for auth-specific work.

## Decision checklist

Before adding code, ask:

1. Which layer owns this concern?
2. Am I duplicating validation, auth checks, or data access?
3. Can this stay as a schema, procedure, load function, or remote function?
4. Would a new app built from this template need this by default?

If the answer is unclear, keep the code closer to the layer that already owns the concern.
