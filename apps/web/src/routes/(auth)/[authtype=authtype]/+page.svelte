<script lang="ts">
	import type { Attachment } from "svelte/attachments";
	import { toast } from "svelte-sonner";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { getAuthMessage } from "$lib/auth/messages";
	import SignInForm from "$lib/components/sign-in-form.svelte";
	import SignUpForm from "$lib/components/sign-up-form.svelte";

	const isSignUp = $derived(page.params.authtype === "signup");

	const redirectTo = $derived.by(() => {
		const raw = page.url.searchParams.get("redirectTo");
		return raw?.startsWith("/") &&
			!raw.startsWith("//") &&
			!raw.startsWith("\\")
			? raw
			: null;
	});

	const message = $derived.by(() =>
		getAuthMessage(page.url.searchParams.get("message"))
	);

	const authSearch = $derived(
		redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
	);

	const showToast =
		(text: string): Attachment =>
		() => {
			toast.info(text);
		};
</script>

{#if message}
	<span hidden {@attach showToast(message)}></span>
{/if}

{#if isSignUp}
	<SignUpForm switchToSignIn={() => goto(`/signin${authSearch}`)} />
{:else}
	<SignInForm switchToSignUp={() => goto(`/signup${authSearch}`)} />
{/if}
