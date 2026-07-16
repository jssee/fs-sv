import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { identifyUser } from "evlog/better-auth";
import { createEvlogHooks } from "evlog/sveltekit";
import { building } from "$app/environment";
import { auth } from "$lib/auth";

const { handle: evlogHandle, handleError } = createEvlogHooks();

// Resolve the Better Auth session once per request. Everything downstream —
// requireSession, createApi, log enrichment — reads locals.session instead of
// hitting the database again. Better Auth's own endpoints are skipped; they
// manage sessions themselves.
const sessionHandle: Handle = async ({ event, resolve }) => {
	event.locals.session = event.url.pathname.startsWith("/api/auth/")
		? null
		: await auth.api.getSession({ headers: event.request.headers });

	if (event.locals.session) {
		identifyUser(event.locals.log, event.locals.session, { maskEmail: true });
	}

	return resolve(event);
};

const authHandle: Handle = ({ event, resolve }) =>
	svelteKitHandler({ event, resolve, auth, building });

export const handle = sequence(
	evlogHandle as Handle,
	sessionHandle,
	authHandle
);
export { handleError };
