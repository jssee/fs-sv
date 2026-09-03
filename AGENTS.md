# Repository Rules

## Architecture

- Web adapts; API decides. `apps/web` owns SvelteKit routing, rendering, form UX, and transport adapters. `packages/api` owns public contracts, authorization, and product server behavior.
- `packages/db` owns the Drizzle schema, migrations, and shared database client. Import them through `@fs-sv/db`; database access stays out of `apps/web`.
- `packages/auth` owns framework-neutral authentication setup, shared auth schemas, and error helpers. App-specific auth integration stays in `apps/web`.
- `apps/web/.env.schema` is the runtime configuration source of truth. Read generated values through `varlock/env` in the web app and pass configuration into shared packages explicitly.

## Conventions

- Extend the layer that already owns a concern before introducing a cross-package helper or new layer.
- Do not add tests for properties that TypeScript already guarantees.
- Logging: before changing request, API, auth, browser, or audit logging, read `docs/OBSERVABILITY.md`; preserve its event-ownership and data-policy invariants.

## Verification

- The pre-commit hook runs Biome (lint/format) only; it never type-checks. Run `bun run check` after code changes.
- Skipping pre-commit hooks is forbidden unless explicitly given permission.
