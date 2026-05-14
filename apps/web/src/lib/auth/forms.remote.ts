import { getAuthErrorMessage } from "@fs-sv/auth/errors";
import { signInSchema, signUpSchema } from "@fs-sv/auth/schema";
import { invalid, redirect } from "@sveltejs/kit";
import { form, getRequestEvent } from "$app/server";
import { auth } from "$lib/auth";

export const signIn = form(signInSchema, async ({ email, password }) => {
	const { url } = getRequestEvent();

	try {
		await auth.api.signInEmail({
			body: { email, password },
		});
	} catch (error) {
		console.error(error);
		invalid(getAuthErrorMessage(error, "Sign in failed. Please try again."));
	}

	redirect(
		303,
		sanitizeRedirect(url.searchParams.get("redirectTo"), url, "/dashboard")
	);
});

export const signUp = form(signUpSchema, async ({ name, email, password }) => {
	const { url } = getRequestEvent();

	try {
		await auth.api.signUpEmail({
			body: { name, email, password },
		});
	} catch (error) {
		console.error(error);
		invalid(getAuthErrorMessage(error, "Sign up failed. Please try again."));
	}

	redirect(
		303,
		sanitizeRedirect(url.searchParams.get("redirectTo"), url, "/dashboard")
	);
});

const sanitizeRedirect = (
	redirectTo: string | null,
	baseUrl: URL,
	fallback: string
) => {
	if (!redirectTo) {
		return fallback;
	}

	if (
		!redirectTo.startsWith("/") ||
		redirectTo.startsWith("//") ||
		redirectTo.startsWith("\\")
	) {
		return fallback;
	}

	try {
		const target = new URL(redirectTo, baseUrl);

		if (target.origin !== baseUrl.origin) {
			return fallback;
		}

		if (!target.pathname.startsWith("/")) {
			return fallback;
		}

		return `${target.pathname}${target.search}${target.hash}`;
	} catch {
		return fallback;
	}
};
