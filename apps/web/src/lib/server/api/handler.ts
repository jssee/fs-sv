import { createContext } from "@fs-sv/api/context";
import { appRouter } from "@fs-sv/api/router";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { RPCHandler } from "@orpc/server/fetch";
import { experimental_ValibotToJsonSchemaConverter as ValibotToJsonSchemaConverter } from "@orpc/valibot";
import type { RequestLogger } from "evlog";

const rpcHandler = new RPCHandler(appRouter);

const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ValibotToJsonSchemaConverter()],
		}),
	],
});

export const handleRpc = async (request: Request, log: RequestLogger) => {
	const context = await createContext({
		headers: request.headers,
		log,
	});

	return rpcHandler.handle(request, {
		prefix: "/rpc",
		context,
	});
};

export const handleApiReference = async (
	request: Request,
	log: RequestLogger
) => {
	const context = await createContext({
		headers: request.headers,
		log,
	});

	return apiHandler.handle(request, {
		prefix: "/api-reference",
		context,
	});
};
