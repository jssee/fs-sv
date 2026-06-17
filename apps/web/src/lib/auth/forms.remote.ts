import { getAuthErrorCode, getAuthErrorMessage } from "@fs-sv/auth/errors";
import { signInSchema, signUpSchema } from "@fs-sv/auth/schema";
import { invalid, redirect } from "@sveltejs/kit";
import { maskEmail } from "evlog/better-auth";
import { form, getRequestEvent } from "$app/server";
import { auth } from "$lib/auth";

export const signIn = form(signInSchema, async ({ email, password }) => {
	const { locals, url } = getRequestEvent();

	try {
		await auth.api.signInEmail({
			body: { email, password },
		});

		locals.log.set({
			auth: {
				action: "sign_in",
				emailMasked: maskEmail(email),
				outcome: "success",
			},
		});
	} catch (error) {
		locals.log.setLevel("warn");
		locals.log.set({
			auth: {
				action: "sign_in",
				emailMasked: maskEmail(email),
				outcome: "failure",
				reasonCode: getAuthErrorCode(error) ?? "unknown",
			},
		});

		invalid(getAuthErrorMessage(error, "Sign in failed. Please try again."));
	}

	redirect(
		303,
		sanitizeRedirect(url.searchParams.get("redirectTo"), url, "/dashboard")
	);
});

export const signUp = form(signUpSchema, async ({ name, email, password }) => {
	const { locals, url } = getRequestEvent();

	try {
		await auth.api.signUpEmail({
			body: { name, email, password },
		});

		locals.log.set({
			auth: {
				action: "sign_up",
				emailMasked: maskEmail(email),
				outcome: "success",
			},
		});
	} catch (error) {
		locals.log.setLevel("warn");
		locals.log.set({
			auth: {
				action: "sign_up",
				emailMasked: maskEmail(email),
				outcome: "failure",
				reasonCode: getAuthErrorCode(error) ?? "unknown",
			},
		});

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
