import { createDb } from "@fs-sv/db";
import * as schema from "@fs-sv/db/schema/auth";
import { env } from "@fs-sv/env/server";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

type CreateAuthOptions = Pick<BetterAuthOptions, "plugins">;

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"];

export function createAuth({ plugins = [] }: CreateAuthOptions = {}) {
	const db = createDb();

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg",
			schema,
		}),
		trustedOrigins: [env.CORS_ORIGIN],
		emailAndPassword: {
			enabled: true,
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		plugins,
	});
}
