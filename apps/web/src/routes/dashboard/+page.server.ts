import { requireSession } from "$lib/auth/utils.server";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (event) => {
	const session = requireSession(event, "sign-in-dashboard");

	return {
		user: session.user,
	};
};
