import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import evlog from "evlog/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
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
