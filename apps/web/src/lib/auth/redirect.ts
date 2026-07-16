// Open-redirect guard for the redirectTo query param, shared by the auth page
// and the sign-in/sign-up remote functions so the policy cannot drift.
// Returns the normalized same-origin path, or null when the value is missing
// or unsafe so callers choose their own fallback.
export function sanitizeRedirect(redirectTo: string | null, baseUrl: URL) {
	if (!redirectTo) {
		return null;
	}

	if (
		!redirectTo.startsWith("/") ||
		redirectTo.startsWith("//") ||
		redirectTo.startsWith("\\")
	) {
		return null;
	}

	try {
		const target = new URL(redirectTo, baseUrl);

		if (target.origin !== baseUrl.origin) {
			return null;
		}

		return `${target.pathname}${target.search}${target.hash}`;
	} catch {
		return null;
	}
}
