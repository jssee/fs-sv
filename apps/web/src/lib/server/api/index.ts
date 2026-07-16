import { appRouter } from "@fs-sv/api/router";
import { createRouterClient } from "@orpc/server";

export const createApi = (locals: App.Locals) =>
	createRouterClient(appRouter, {
		context: { log: locals.log, session: locals.session },
	});
