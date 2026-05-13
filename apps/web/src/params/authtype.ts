import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string): param is "signin" | "signup" =>
	param === "signin" || param === "signup") satisfies ParamMatcher;
