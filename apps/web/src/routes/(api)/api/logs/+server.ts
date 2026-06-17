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
const clientLogMessage = optional(pipe(string(), maxLength(500)));

const clientLogSchema = object({
	client: optional(
		object({
			action: clientLogField,
			outcome: clientLogField,
			path: clientLogField,
			reasonCode: clientLogField,
		}),
		{}
	),
	level: picklist(["warn", "error"]),
	message: clientLogMessage,
	tag: clientLogField,
	timestamp: clientLogField,
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
		locals.log.setLevel("warn");
		locals.log.set({
			client: {
				action: "log_ingest",
				outcome: "rejected",
				reasonCode: "invalid_payload",
				source: "browser",
			},
		});

		return new Response("Invalid payload", { status: 400 });
	}

	locals.log.setLevel(clientLog.level);
	locals.log.set({
		client: {
			action: clientLog.client.action,
			level: clientLog.level,
			message: clientLog.message,
			outcome: clientLog.client.outcome,
			path: clientLog.client.path,
			reasonCode: clientLog.client.reasonCode,
			source: "browser",
			tag: clientLog.tag,
			timestamp: clientLog.timestamp,
		},
	});

	return new Response(null, { status: 204 });
};
