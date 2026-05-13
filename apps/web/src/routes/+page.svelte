<script lang="ts">
	import { getApiHealth } from "$lib/api.remote";
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";

	const apiHealth = getApiHealth();
</script>

<div class="container mx-auto max-w-3xl px-4 py-2">
	<div class="grid gap-6">
		<Card>
			<CardHeader> <CardTitle>API Status</CardTitle> </CardHeader>
			<CardContent>
				<svelte:boundary>
					<div class="flex items-center gap-2">
						<div class="h-2 w-2 rounded-full bg-green-500"></div>
						<span class="text-muted-foreground text-sm">
							Remote function connected: {await apiHealth}
						</span>
					</div>
					{#snippet pending()}
						<div class="flex items-center gap-2">
							<div class="h-2 w-2 rounded-full bg-yellow-500"></div>
							<span class="text-muted-foreground text-sm">Checking...</span>
						</div>
					{/snippet}
					{#snippet failed()}
						<div class="flex items-center gap-2">
							<div class="h-2 w-2 rounded-full bg-red-500"></div>
							<span class="text-muted-foreground text-sm">Disconnected</span>
						</div>
					{/snippet}
				</svelte:boundary>
			</CardContent>
		</Card>
	</div>
</div>
