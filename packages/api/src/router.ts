import type { RouterClient } from "@orpc/server";

import { authed, os, pub } from "./procedure";

export const router = os.router({
	healthCheck: pub.healthCheck.handler(() => "OK"),
	privateData: authed.privateData.handler(({ context }) => ({
		message: "This is private",
		user: {
			id: context.session.user.id,
			name: context.session.user.name,
			email: context.session.user.email,
		},
	})),
});

export type AppRouter = typeof router;
export type AppRouterClient = RouterClient<typeof router>;
