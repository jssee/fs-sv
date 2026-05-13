<script lang="ts">
	import { signIn } from "$lib/auth.remote";
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

	let { switchToSignUp } = $props<{ switchToSignUp: () => void }>();
</script>

<Card class="mx-auto mt-10 w-full max-w-md">
	<CardHeader>
		<CardTitle class="text-center text-3xl">Welcome Back</CardTitle>
	</CardHeader>
	<CardContent>
		<form {...signIn} class="space-y-4">
			<Group>
				<Field data-invalid={(signIn.fields.email.issues()?.length ?? 0) > 0}>
					<Label for="email">Email</Label>
					<Input
						id="email"
						autocomplete="email"
						{...signIn.fields.email.as("email")}
					/>
					<FieldError errors={signIn.fields.email.issues()} />
				</Field>

				<Field
					data-invalid={(signIn.fields.password.issues()?.length ?? 0) > 0}
				>
					<Label for="password">Password</Label>
					<Input
						id="password"
						autocomplete="current-password"
						{...signIn.fields.password.as("password")}
					/>
					<FieldError errors={signIn.fields.password.issues()} />
				</Field>

				<FieldError errors={signIn.fields.allIssues()} />

				<Button type="submit" class="w-full" disabled={signIn.pending > 0}>
					{signIn.pending > 0 ? "Submitting..." : "Sign In"}
				</Button>
			</Group>
		</form>

		<div class="mt-4 text-center">
			<Button type="button" variant="link" onclick={switchToSignUp}>
				Need an account? Sign Up
			</Button>
		</div>
	</CardContent>
</Card>
