import type { Session } from "@fs-sv/auth";
import type { RequestLogger } from "evlog";

// The session is resolved once per request by the app hosting the API (see
// apps/web/src/hooks.server.ts); procedures never look it up themselves.
export interface Context {
	log: RequestLogger;
	session: Session | null;
}
