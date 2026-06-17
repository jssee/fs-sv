import { auth } from "@fs-sv/auth";
import type { RequestLogger } from "evlog";

export interface CreateContextOptions {
	headers: Headers;
	log: RequestLogger;
}

export async function createContext({ headers, log }: CreateContextOptions) {
	const session = await auth.api.getSession({ headers });
	return { log, session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
