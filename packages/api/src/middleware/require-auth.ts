import { ORPCError, os } from "@orpc/server";

import type { Context } from "../context";

export const requireAuthMiddleware = os
	.$context<Context>()
	.middleware(({ context, next }) => {
		if (!context.session?.user) {
			context.log.setLevel("warn");
			context.log.set({
				auth: {
					action: "api.require_auth",
					outcome: "denied",
					reasonCode: "missing_session",
				},
			});

			throw new ORPCError("UNAUTHORIZED");
		}

		return next({
			context: {
				log: context.log,
				session: context.session,
			},
		});
	});
