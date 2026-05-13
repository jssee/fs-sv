# Project Rules

## Landmarks

- Read `docs/BOUNDARIES.md` before changes that cross `apps/web` and `packages/*`.
- UI components live in `apps/web/src/lib/components/ui`. Add shadcn-svelte components only when a feature needs them.

## Feature patterns

- Web adapts; API decides. UI code renders state and collects input. Server behavior belongs behind API procedures.
- Remote functions stay thin: create the API client, call one API procedure, and translate UI errors.
- Use `createApi(request)` from `$lib/server/api` in load functions and remote functions.
- For protected pages, use `requireSession(request, url, messageCode)` from `$lib/auth/utils.server`; add message codes in `$lib/auth/messages.ts`.
- Add API payload shapes in `packages/api/src/schema.ts`, expose them through `contract.ts`, and wire handlers in `router.ts`.
- Import database schema/client from `@fs-sv/db`; do not create feature-local database clients.
- Add env vars to `packages/env` before reading them elsewhere.
- Do not add tests for things that should be handled by the type system.

---

## Use Biome

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations

---

Most formatting and common issues are automatically fixed by Biome. Run `bun x ultracite fix` before committing to ensure compliance.
