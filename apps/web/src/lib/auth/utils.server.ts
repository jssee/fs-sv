import { type RequestEvent, redirect } from "@sveltejs/kit";
import type { AuthMessageCode } from "./messages";

export function requireSession(
	{ locals, url }: Pick<RequestEvent, "locals" | "url">,
	messageCode?: AuthMessageCode
) {
	if (!locals.session) {
		const params = new URLSearchParams({
			redirectTo: `${url.pathname}${url.search}`,
		});

		if (messageCode) {
			params.set("message", messageCode);
		}

		redirect(303, `/signin?${params}`);
	}

	return locals.session;
}
