import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { minLength, optional, picklist, pipe, string, url } from "valibot";

// On Vercel, BETTER_AUTH_URL and CORS_ORIGIN default to the deployment's own
// origin so preview deployments trust their dynamic *.vercel.app URL without
// per-deploy configuration. Explicitly set vars always win.
function getVercelOrigin() {
	const vercelUrl =
		process.env.VERCEL_ENV === "production"
			? (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL)
			: (process.env.VERCEL_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL);
	if (!vercelUrl) {
		return;
	}
	return vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`;
}

const vercelOrigin = getVercelOrigin();

export const env = createEnv({
	server: {
		DATABASE_URL: pipe(string(), minLength(1)),
		BETTER_AUTH_SECRET: pipe(string(), minLength(32)),
		BETTER_AUTH_URL: pipe(string(), url()),
		CORS_ORIGIN: pipe(string(), url()),
		NODE_ENV: optional(
			picklist(["development", "production", "test"]),
			"development"
		),
	},
	runtimeEnv: {
		...process.env,
		BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ?? vercelOrigin,
		CORS_ORIGIN: process.env.CORS_ORIGIN ?? vercelOrigin,
	},
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	emptyStringAsUndefined: true,
});
