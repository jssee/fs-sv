<script lang="ts">
	import { ModeWatcher } from "mode-watcher";
	import "../app.css";
	import Header from "$lib/components/header.svelte";
	import { Toaster } from "$lib/components/ui/sonner";

	const { children } = $props();
</script>

<ModeWatcher />
<Toaster />
<div class="grid h-svh grid-rows-[auto_1fr]">
	<Header />
	<main class="overflow-y-auto">
		{@render children()}
	</main>
</div>
