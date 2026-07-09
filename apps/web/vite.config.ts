import adapter from "@sveltejs/adapter-vercel";
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
