export const AUTH_MESSAGES = {
	"sign-in-dashboard": "Sign in to view your dashboard",
} as const;

export type AuthMessageCode = keyof typeof AUTH_MESSAGES;

export function getAuthMessage(code: string | null) {
	if (!code) {
		return null;
	}

	return code in AUTH_MESSAGES ? AUTH_MESSAGES[code as AuthMessageCode] : null;
}
