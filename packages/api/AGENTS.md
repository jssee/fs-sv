# API Package Rules

## Boundaries

- `protectedProcedure` establishes authentication; feature code enforces resource authorization.
- Pass an actor ID into feature behavior instead of the full session.
- Scope owner-controlled resources by actor ID in the database query.
- Return `NOT_FOUND` for both missing and inaccessible owner-scoped resources unless the product explicitly requires otherwise.
- Never accept authoritative owner or user IDs from clients.
- Model public API payloads explicitly; do not expose Drizzle row types as API types.

## Conventions

- Define public schemas, declare the contract, then implement and compose the procedure handler.
- Keep `schema.ts`, `contract.ts`, and `router.ts` at the root while they remain easy to scan.
- When multiple domains make those files unwieldy, split them into shallow domain files under `src/schemas/`, `src/contracts/`, and `src/routers/`; keep the root contract and router as explicit composition points.
- Put reusable procedure middleware in `src/middleware/`.
- Keep behavior with its procedure implementation until shared business or persistence logic earns a separate service.
- Do not create empty layers or change the public contract merely to mirror the filesystem.
- Let contract validation handle malformed input and middleware handle missing authentication.
- Use stable oRPC error codes for expected domain outcomes; allow unexpected infrastructure errors to propagate.
- Enrich the request through `context.log`; do not import framework-specific log accessors.
- Follow `docs/OBSERVABILITY.md` for logging and sensitive-data rules.

## Verification

- Run `bun run --cwd packages/api check` after changing schemas, contracts, middleware, or handlers.
