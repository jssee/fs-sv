import { createContext } from "@fs-sv/api/context";
import { appRouter } from "@fs-sv/api/router";
import { createRouterClient } from "@orpc/server";
import { useLogger } from "evlog/sveltekit";

export const createApi = (request: Request) => {
	const log = useLogger();

	return createRouterClient(appRouter, {
		context: () =>
			createContext({
				headers: request.headers,
				log,
			}),
	});
};
