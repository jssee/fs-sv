# Observability

This template uses evlog as a first-class app boundary. Keep one simple rule in mind:

> One SvelteKit request event, enriched everywhere, emitted once.

## Request events

SvelteKit owns request lifecycle logging through `createEvlogHooks()` in `apps/web/src/hooks.server.ts`.

Do not wrap this app's oRPC handlers with `withEvlog()`. The SvelteKit hook already emits the request event; wrapping `/rpc` handlers would create duplicate events for the same request.

## API logging

`packages/api` receives the request logger through `context.log`. Procedure handlers and middleware should enrich the current request event with business context:

```ts
context.log.set({
	order: {
		id: order.id,
		status: order.status,
	},
});
```

Use `context.log` in API code. Do not import framework-specific log accessors such as `useLogger()` into `packages/api`; those belong to app adapters like SvelteKit. If the API is later deployed as a standalone service, that deployment can choose its own emitting boundary.

## Auth events

Auth attempts are business events. Log outcomes with sanitized fields:

```ts
auth: {
	action: "sign_in",
	outcome: "failure",
	reasonCode: "invalid_credentials",
	emailMasked: maskEmail(email),
}
```

Never log raw passwords, request bodies, raw emails, auth tokens, session payloads, or raw Better Auth errors for expected auth failures.

Better Auth request enrichment should keep `maskEmail: true` enabled.

## Client logs

Browser logs are untrusted input. Client code may send narrow diagnostic events through `/api/logs`, but the server route must whitelist fields and nest them under `client`.

Do not trust client-provided identity, user, session, service, audit, or status fields. Server-side request enrichment decides identity from cookies/session.

## Audit events

Use normal business fields for routine app outcomes. Reserve `log.audit()` for security/compliance actions such as:

- role or permission changes
- MFA/password changes
- account deletion
- admin impersonation
- data export
- authorization denials that need a compliance trail

## PII and secrets

Do not log raw request bodies, passwords, tokens, API keys, full emails, payment data, or full third-party error payloads. Prefer stable IDs, reason codes, statuses, counts, and masked values.

## Production drains

External drains are intentionally not configured in this template yet. The app should run locally without Axiom, OTLP, Better Stack, or another paid service. Add drain configuration later without changing application logging call sites.
