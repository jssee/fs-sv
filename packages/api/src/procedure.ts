import { implement } from "@orpc/server";
import { evlog as evlogMiddleware } from "evlog/orpc";
import type { Context } from "./context";
import { contract } from "./contract";
import { requireAuthMiddleware } from "./middleware/require-auth";

const baseProcedure = implement(contract).$context<Context>();

export const publicProcedure = baseProcedure.use(evlogMiddleware());
export const protectedProcedure = publicProcedure.use(requireAuthMiddleware);
