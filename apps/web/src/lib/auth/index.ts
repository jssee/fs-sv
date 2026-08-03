import { createAuth } from "@fs-sv/auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { ENV } from "varlock/env";
import { getRequestEvent } from "$app/server";

export const auth = createAuth({
	baseURL: ENV.BETTER_AUTH_URL,
	databaseUrl: ENV.DATABASE_URL,
	plugins: [sveltekitCookies(getRequestEvent)],
	secret: ENV.BETTER_AUTH_SECRET,
	trustedOrigins: [ENV.CORS_ORIGIN],
});
