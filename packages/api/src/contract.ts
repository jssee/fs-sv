import { oc } from "@orpc/contract";

import { healthCheckOutputSchema, privateDataOutputSchema } from "./schema";

export const contract = {
	healthCheck: oc.output(healthCheckOutputSchema),
	privateData: oc.output(privateDataOutputSchema),
};
