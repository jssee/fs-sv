import type { RequestHandler } from "@sveltejs/kit";
import type { InferOutput } from "valibot";
import {
	maxLength,
	object,
	optional,
	parse,
	picklist,
	pipe,
	string,
} from "valibot";

const clientLogField = optional(pipe(string(), maxLength(256)));

const clientLogSchema = object({
	client: object({
		action: clientLogField,
		outcome: clientLogField,
		path: clientLogField,
		reasonCode: clientLogField,
	}),
	level: picklist(["warn", "error"]),
});

type ClientLog = InferOutput<typeof clientLogSchema>;

export const POST: RequestHandler = async ({ locals, request, url }) => {
	const origin = request.headers.get("origin");

	if (origin && origin !== url.origin) {
		return new Response("Forbidden", { status: 403 });
	}

	let clientLog: ClientLog;

	try {
		clientLog = parse(clientLogSchema, await request.json());
	} catch {
		return new Response("Invalid payload", { status: 400 });
	}

	locals.log.setLevel(clientLog.level);

	locals.log.set({
		client: {
			...clientLog.client,
			level: clientLog.level,
			source: "browser",
		},
	});

	return new Response(null, { status: 204 });
};
