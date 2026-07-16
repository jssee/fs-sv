<script lang="ts">
	import type { Session } from "@fs-sv/auth";
	import { getAuthErrorCode } from "@fs-sv/auth/errors";
	import { log } from "evlog/client";
	import { goto } from "$app/navigation";
	import { authClient } from "$lib/auth/client";
	import { Button } from "$lib/components/ui/button";

	const { user }: { user: Session["user"] | null } = $props();

	async function handleSignOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					// The header renders the server session, so reload load
					// functions to pick up the cleared session.
					goto("/", { invalidateAll: true });
				},
				onError: (error) => {
					log.error({
						client: {
							action: "auth.sign_out",
							outcome: "failure",
							reasonCode: getAuthErrorCode(error) ?? "unknown",
						},
					});
				},
			},
		});
	}

	function goToLogin() {
		goto("/signin");
	}
</script>

<div class="relative">
	{#if user}
		<div class="flex items-center gap-3">
			<span
				class="hidden text-muted-foreground text-sm sm:inline"
				title={user.email}
			>
				{user.name || user.email?.split("@")[0] || "User"}
			</span>
			<Button variant="destructive" size="sm" onclick={handleSignOut}
				>Sign Out</Button
			>
		</div>
	{:else}
		<Button size="sm" onclick={goToLogin}>Sign In</Button>
	{/if}
</div>
