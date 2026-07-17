# Project Rules

## Boundaries

- Web adapts; API decides. `apps/web` owns SvelteKit and UI concerns; `packages/api` owns validation, authorization, and server behavior.
- `packages/db` owns Drizzle schema, migrations, and the shared database client. Import database schema and clients from `@fs-sv/db`; do not access the database directly from `apps/web`.
- `packages/env` owns environment validation. Add variables there before reading them elsewhere.
- `packages/auth` owns shared authentication setup, schemas, and error helpers.

## Conventions

- When ownership is unclear, keep code in the layer that already owns the concern.
- Do not add tests for things that should be handled by the type system.
- Follow `docs/OBSERVABILITY.md` for request logging, sensitive data, and audit events.

## Verification

Biome's linter will catch most issues automatically. Focus your attention on:

- **Business logic correctness** - Biome can't validate your algorithms
- **Meaningful naming** - Use descriptive names for functions, variables, and types
- **Architecture decisions** - Component structure, data flow, and API design
- **Edge cases** - Handle boundary conditions and error states
- **User experience** - Accessibility, performance, and usability considerations

Skipping pre-commit hooks is forbidden unless explicitly given permission.
