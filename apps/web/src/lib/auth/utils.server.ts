import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/auth";
import type { AuthMessageCode } from "./messages";

export async function requireSession(
	request: Request,
	url: URL,
	messageCode?: AuthMessageCode
) {
	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		const params = new URLSearchParams({
			redirectTo: `${url.pathname}${url.search}`,
		});

		if (messageCode) {
			params.set("message", messageCode);
		}

		redirect(303, `/signin?${params}`);
	}

	return session;
}
