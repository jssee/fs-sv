import { email, minLength, object, pipe, string } from "valibot";

const emailSchema = pipe(string(), email("Invalid email address"));
const passwordSchema = pipe(
	string(),
	minLength(8, "Password must be at least 8 characters")
);

export const signInSchema = object({
	email: emailSchema,
	password: pipe(string(), minLength(1, "Password is required")),
});

export const signUpSchema = object({
	name: pipe(string(), minLength(2, "Name must be at least 2 characters")),
	email: emailSchema,
	password: passwordSchema,
});
