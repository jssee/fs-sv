import { env } from "@fs-sv/env/server";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

// Memoize the client so a serverless instance opens a single pg pool, shared by
// every createDb() caller (e.g. the auth adapter). DATABASE_URL must point at a
// transaction-mode pooler in production, or concurrent instances exhaust the
// database's connection limit.
let client: NodePgDatabase<typeof schema> | undefined;

export function createDb() {
	client ??= drizzle(env.DATABASE_URL, { schema });
	return client;
}

export const db = createDb();
