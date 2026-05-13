import { createContext } from "@fs-sv/api/context";
import { appRouter } from "@fs-sv/api/router";
import { createRouterClient } from "@orpc/server";

export const createApi = (request: Request) =>
	createRouterClient(appRouter, {
		context: () =>
			createContext({
				headers: request.headers,
			}),
	});
