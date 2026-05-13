import type { RouterClient } from "@orpc/server";

import { protectedProcedure, publicProcedure } from "./procedure";

export const appRouter = publicProcedure.router({
	healthCheck: publicProcedure.healthCheck.handler(() => "OK"),
	privateData: protectedProcedure.privateData.handler(({ context }) => ({
		message: "This is private",
		user: {
			id: context.session.user.id,
			name: context.session.user.name,
			email: context.session.user.email,
		},
	})),
});

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
