import adapter from "@sveltejs/adapter-auto";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import evlog from "evlog/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			experimental: {
				remoteFunctions: true,
			},
			compilerOptions: {
				experimental: {
					async: true,
				},
			},
		}),
		evlog({
			client: {
				minLevel: "warn",
				service: "fs-sv-web-client",
				transport: {
					enabled: true,
					endpoint: "/api/logs",
				},
			},
			service: "fs-sv-web",
		}),
	],
});
