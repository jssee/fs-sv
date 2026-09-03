# Observability

> One wide event per SvelteKit request: enrich it everywhere, emit it once.

## Event ownership

`createEvlogHooks()` in `apps/web/src/hooks.server.ts` creates `locals.log` and emits the event when the response completes. The web API adapter passes that same logger into `packages/api` as `context.log`; the oRPC `evlog()` middleware enriches it with procedure context and errors.

Keep this app's oRPC handlers unwrapped. Adding `withEvlog()` would create a second lifecycle owner and duplicate the `/rpc` request event.

## Request enrichment

Enrich the current event with nested business context instead of emitting a separate log for each step. Use `locals.log` in SvelteKit request code and `context.log` in API procedures and middleware:

```ts
context.log.set({
	order: {
		id: order.id,
		status: order.status,
	},
});
```

Keep framework-specific log accessors such as `useLogger()` in app adapters; pass the logger explicitly into shared packages.

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

Map expected Better Auth failures to stable `reasonCode` values before logging them. Keep `maskEmail: true` enabled when `identifyUser()` enriches a request.

## Client logs

Browser logs are untrusted input. The client transport sends warning and error events to `/api/logs`; keep that route origin-checked and schema-validated. Select accepted fields explicitly and nest them under `client` rather than spreading the request body onto the server event.

Server-side request enrichment decides identity and request status. Ignore client-provided identity, user, session, service, audit, and status fields.

## Audit events

Use normal business fields for routine app outcomes. Reserve `log.audit()` for security/compliance actions such as:

- role or permission changes
- MFA/password changes
- account deletion
- admin impersonation
- data export
- authorization denials that need a compliance trail

## Data policy

Log stable IDs, reason codes, statuses, counts, and masked values. Keep raw request bodies, passwords, tokens, API keys, full emails, payment data, session payloads, and full third-party error payloads out of events.

## Production drains

External drains are intentionally not configured. Keep the app usable locally without Axiom, OTLP, Better Stack, or another paid service. Add drains at the configuration boundary without changing application logging call sites.
