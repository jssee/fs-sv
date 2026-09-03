import { implement } from "@orpc/server";
import { evlog } from "evlog/orpc";
import type { Context } from "./context";
import { contract } from "./contract";
import { requireAuth } from "./middleware/require-auth";

export const os = implement(contract).$context<Context>();

export const pub = os.use(evlog());
export const authed = pub.use(requireAuth);
