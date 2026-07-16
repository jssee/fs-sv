# API Package Rules

## Core invariant

- Contracts describe public behavior. Procedure handlers implement it without depending on SvelteKit or UI concerns.

## Structure

- Keep small infrastructure procedures in the root `schema.ts`, `contract.ts`, and `router.ts` files.
- Put persisted product features in `src/features/<feature>/`; each feature normally owns `schema.ts`, `contract.ts`, and `router.ts`.
- Add `service.ts` only when shared business or persistence behavior would otherwise obscure procedure handlers.
- Root `contract.ts` and `router.ts` explicitly compose feature contracts and routers.
- Do not create empty layers or change the public contract merely to mirror the filesystem.

## Contract-first workflow

1. Define public input and output schemas.
2. Declare the procedure in the contract.
3. Implement and compose the procedure handler.
4. Expose it through a thin web adapter when needed.

## Authorization

- `protectedProcedure` establishes authentication; feature code enforces resource authorization.
- Pass an actor ID into feature behavior instead of the full session.
- Scope owner-controlled resources by actor ID in the database query.
- Return `NOT_FOUND` for both missing and inaccessible owner-scoped resources unless the product explicitly requires otherwise.
- Never accept authoritative owner or user IDs from clients.

## Payloads and errors

- Model public API payloads explicitly; do not expose Drizzle row types as API types.
- Let contract validation handle malformed input and middleware handle missing authentication.
- Use stable oRPC error codes for expected domain outcomes; allow unexpected infrastructure errors to propagate.

## Observability

- Enrich the request through `context.log`; do not import framework-specific log accessors.
- Follow `docs/OBSERVABILITY.md` for logging and sensitive-data rules.
