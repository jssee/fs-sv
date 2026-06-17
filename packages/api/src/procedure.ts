import { implement, ORPCError } from "@orpc/server";
import { evlog as evlogMiddleware } from "evlog/orpc";
import type { Context } from "./context";
import { contract } from "./contract";

const baseProcedure = implement(contract).$context<Context>();

const requireAuth = baseProcedure.middleware(({ context, next }) => {
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

export const publicProcedure = baseProcedure.use(evlogMiddleware());
export const protectedProcedure = publicProcedure.use(requireAuth);
