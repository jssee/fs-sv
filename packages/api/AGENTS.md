# API Package Rules

## Contract and composition

- For each procedure, define public input and output schemas, declare the contract, then implement and compose the handler.
- Model public API payloads explicitly; do not expose Drizzle row types as API types.
- Keep `schema.ts`, `contract.ts`, and `router.ts` at the root while they remain easy to scan.
- When multiple domains make those files unwieldy, split them into shallow domain files under `src/schemas/`, `src/contracts/`, and `src/routers/`; keep the root contract and router as explicit composition points.
- Put reusable procedure middleware in `src/middleware/`.
- Keep behavior with its procedure implementation until shared business or persistence logic earns a separate service.
- Let the public contract follow product behavior, not the filesystem.

## Authentication and authorization

- `authed` establishes authentication, not resource authorization. Handlers that access resources enforce authorization themselves.
- Derive the actor ID from `context.session` and pass that ID into feature behavior; client input is never authoritative for owner or user identity.
- Scope owner-controlled resources by actor ID in the database query.
- Return `NOT_FOUND` for both missing and inaccessible owner-scoped resources unless the product explicitly requires otherwise.

## Handler behavior

- Let contract validation handle malformed input and middleware handle missing authentication.
- Use stable oRPC error codes for expected domain outcomes; allow unexpected infrastructure errors to propagate.
