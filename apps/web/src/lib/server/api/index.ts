import { router } from "@fs-sv/api/router";
import { createRouterClient } from "@orpc/server";

export const createApi = (locals: App.Locals) =>
	createRouterClient(router, {
		context: { log: locals.log, session: locals.session },
	});
