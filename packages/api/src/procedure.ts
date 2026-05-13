import { implement, ORPCError } from "@orpc/server";
import type { Context } from "./context";
import { contract } from "./contract";

export const publicProcedure = implement(contract).$context<Context>();

const requireAuth = publicProcedure.middleware(({ context, next }) => {
	if (!context.session?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}

	return next({
		context: {
			session: context.session,
		},
	});
});

export const protectedProcedure = publicProcedure.use(requireAuth);
