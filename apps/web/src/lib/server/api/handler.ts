import { createContext } from "@fs-sv/api/context";
import { appRouter } from "@fs-sv/api/router";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { experimental_ValibotToJsonSchemaConverter as ValibotToJsonSchemaConverter } from "@orpc/valibot";

const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ValibotToJsonSchemaConverter()],
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

export const handleRpc = async (request: Request) => {
	const context = await createContext({
		headers: request.headers,
	});

	return rpcHandler.handle(request, {
		prefix: "/rpc",
		context,
	});
};

export const handleApiReference = async (request: Request) => {
	const context = await createContext({
		headers: request.headers,
	});

	return apiHandler.handle(request, {
		prefix: "/api-reference",
		context,
	});
};
