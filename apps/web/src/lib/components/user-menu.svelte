<script lang="ts">
	import type { Session } from "@fs-sv/auth";
	import { signOut } from "$lib/auth/forms.remote";
	import { Button } from "$lib/components/ui/button";

	const { user }: { user: Session["user"] | null } = $props();
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
			<form {...signOut}>
				<Button
					type="submit"
					variant="destructive"
					size="sm"
					disabled={signOut.pending > 0}
				>
					Sign Out
				</Button>
			</form>
		</div>
	{:else}
		<Button size="sm" href="/signin">Sign In</Button>
	{/if}
</div>
