import type { RequestHandler } from "@sveltejs/kit";
import { handleRpc } from "$lib/server/api/handler";

const handle: RequestHandler = async ({ request }) => {
	const result = await handleRpc(request);

	if (!result.matched) {
		return new Response("Not found", { status: 404 });
	}

	return result.response;
};

export const HEAD = handle;
export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
