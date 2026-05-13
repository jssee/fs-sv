export function getAuthErrorCode(error: unknown) {
	if (typeof error !== "object" || error === null) {
		return null;
	}

	if ("body" in error && typeof error.body === "object" && error.body) {
		const code = "code" in error.body ? error.body.code : null;

		if (typeof code === "string") {
			return code;
		}
	}

	const code = "code" in error ? error.code : null;
	return typeof code === "string" ? code : null;
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
	if (error instanceof Error && error.message) {
		return error.message;
	}

	if (typeof error === "object" && error !== null) {
		const bodyMessage =
			"body" in error &&
			typeof error.body === "object" &&
			error.body !== null &&
			"message" in error.body &&
			typeof error.body.message === "string"
				? error.body.message
				: null;

		if (bodyMessage) {
			return bodyMessage;
		}

		const message = "message" in error ? error.message : null;
		if (typeof message === "string" && message) {
			return message;
		}
	}

	return fallback;
}
