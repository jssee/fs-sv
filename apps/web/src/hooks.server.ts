import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";
import {
	type BetterAuthInstance,
	createAuthMiddleware,
} from "evlog/better-auth";
import { createEvlogHooks } from "evlog/sveltekit";
import { building } from "$app/environment";
import { auth } from "$lib/auth";

const { handle: evlogHandle, handleError } = createEvlogHooks();

const identifyUser = createAuthMiddleware(auth as BetterAuthInstance, {
	exclude: ["/api/auth/**"],
	maskEmail: true,
});

const evlogAuthHandle: Handle = async ({ event, resolve }) => {
	await identifyUser(
		event.locals.log,
		event.request.headers,
		event.url.pathname
	);
	return resolve(event);
};

const authHandle: Handle = ({ event, resolve }) => {
	const authInstance = auth;

	return svelteKitHandler({
		event,
		resolve,
		auth: authInstance,
		building,
	});
};

export const handle = sequence(
	evlogHandle as Handle,
	evlogAuthHandle,
	authHandle
);
export { handleError };
