<script lang="ts">
	import { signUp } from "$lib/auth/forms.remote";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import {
		Field,
		Error as FieldError,
		Group,
		Label,
	} from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";

	let { switchToSignIn } = $props<{ switchToSignIn: () => void }>();
</script>

<Card class="mx-auto mt-10 w-full max-w-md">
	<CardHeader>
		<CardTitle class="text-center text-3xl">Create Account</CardTitle>
	</CardHeader>
	<CardContent>
		<form {...signUp} class="space-y-4">
			<Group>
				<Field data-invalid={(signUp.fields.name.issues()?.length ?? 0) > 0}>
					<Label for="name">Name</Label>
					<Input
						id="name"
						autocomplete="name"
						{...signUp.fields.name.as("text")}
					/>
					<FieldError errors={signUp.fields.name.issues()} />
				</Field>

				<Field data-invalid={(signUp.fields.email.issues()?.length ?? 0) > 0}>
					<Label for="email">Email</Label>
					<Input
						id="email"
						autocomplete="email"
						{...signUp.fields.email.as("email")}
					/>
					<FieldError errors={signUp.fields.email.issues()} />
				</Field>

				<Field
					data-invalid={(signUp.fields.password.issues()?.length ?? 0) > 0}
				>
					<Label for="password">Password</Label>
					<Input
						id="password"
						autocomplete="new-password"
						{...signUp.fields.password.as("password")}
					/>
					<FieldError errors={signUp.fields.password.issues()} />
				</Field>

				<FieldError errors={signUp.fields.allIssues()} />

				<Button type="submit" class="w-full" disabled={signUp.pending > 0}>
					{signUp.pending > 0 ? "Submitting..." : "Sign Up"}
				</Button>
			</Group>
		</form>

		<div class="mt-4 text-center">
			<Button type="button" variant="link" onclick={switchToSignIn}>
				Already have an account? Sign In
			</Button>
		</div>
	</CardContent>
</Card>
