<script lang="ts">
	import { getPrivateData } from "$lib/api.remote";
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";

	const { data } = $props();
	const privateData = getPrivateData();
</script>

<div class="container mx-auto max-w-3xl px-4 py-8">
	<Card>
		<CardHeader> <CardTitle>Dashboard</CardTitle> </CardHeader>
		<CardContent class="space-y-2">
			<p>Welcome {data.user.name}</p>
			<svelte:boundary>
				<p class="text-muted-foreground text-sm">
					API: {(await privateData).message}
				</p>
				{#snippet pending()}
					<p class="text-muted-foreground text-sm">API: Loading...</p>
				{/snippet}
			</svelte:boundary>
		</CardContent>
	</Card>
</div>
