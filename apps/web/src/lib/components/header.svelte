<script lang="ts">
	import type { Session } from "@fs-sv/auth";
	import { mode, toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button";
	import UserMenu from "./user-menu.svelte";

	const { user }: { user: Session["user"] | null } = $props();
</script>

<header class="border-b">
	<div class="flex flex-row items-center justify-between px-4 py-2 md:px-6">
		<nav class="flex gap-2">
			<Button href="/" variant="ghost">Home</Button>
			<Button href="/dashboard" variant="ghost">Dashboard</Button>
		</nav>
		<div class="flex items-center gap-2">
			<Button variant="outline" size="sm" onclick={toggleMode}>
				{mode.current === "dark" ? "Light" : "Dark"}
			</Button>
			<UserMenu {user} />
		</div>
	</div>
</header>
