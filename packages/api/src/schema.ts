import type { InferOutput } from "valibot";
import { literal, object, string } from "valibot";

export const healthCheckOutputSchema = literal("OK");
export type HealthCheckOutput = InferOutput<typeof healthCheckOutputSchema>;

export const privateDataOutputSchema = object({
	message: string(),
	user: object({
		id: string(),
		name: string(),
		email: string(),
	}),
});
export type PrivateDataOutput = InferOutput<typeof privateDataOutputSchema>;
