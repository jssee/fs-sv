import { createDb } from "@fs-sv/db";
import * as schema from "@fs-sv/db/schema/auth";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

interface CreateAuthOptions {
	baseURL: string;
	databaseUrl: string;
	plugins?: BetterAuthOptions["plugins"];
	secret: string;
	trustedOrigins: string[];
}

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"];

export function createAuth({
	baseURL,
	databaseUrl,
	plugins = [],
	secret,
	trustedOrigins,
}: CreateAuthOptions) {
	const db = createDb(databaseUrl);

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg",
			schema,
		}),
		trustedOrigins,
		emailAndPassword: {
			enabled: true,
		},
		secret,
		baseURL,
		plugins,
	});
}
