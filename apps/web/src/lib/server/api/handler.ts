import type { Context } from "@fs-sv/api/context";
import { router } from "@fs-sv/api/router";
import { OpenAPIGenerator } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferenceHandlerPlugin } from "@orpc/openapi/plugins";
import { type FetchHandler, RPCHandler } from "@orpc/server/fetch";
import { ValibotToJsonSchemaConverter } from "@orpc/valibot";
import type { RequestHandler } from "@sveltejs/kit";

type ApiRouteHandlers = Record<
	"HEAD" | "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS",
	RequestHandler
>;

const createRouteHandlers = (
	fetchHandler: FetchHandler<Context>,
	prefix: `/${string}`
): ApiRouteHandlers => {
	const handle: RequestHandler = async ({ locals, request }) => {
		const result = await fetchHandler.handle(request, {
			prefix,
			context: { log: locals.log, session: locals.session },
		});

		if (!result.matched) {
			return new Response("Not found", { status: 404 });
		}

		return result.response;
	};

	return {
		HEAD: handle,
		GET: handle,
		POST: handle,
		PUT: handle,
		PATCH: handle,
		DELETE: handle,
		OPTIONS: handle,
	};
};

const rpcHandler = new RPCHandler(router);
const generator = new OpenAPIGenerator({
	converters: [new ValibotToJsonSchemaConverter()],
});

const openAPIHandler = new OpenAPIHandler(router, {
	plugins: [
		new OpenAPIReferenceHandlerPlugin({
			spec: () => generator.generate(router),
		}),
	],
});

export const rpcRouteHandlers = createRouteHandlers(rpcHandler, "/rpc");
export const apiReferenceRouteHandlers = createRouteHandlers(
	openAPIHandler,
	"/api-reference"
);
