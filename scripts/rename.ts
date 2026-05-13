#!/usr/bin/env bun
/**
 * One-shot rename for the template's placeholder name `fs-sv`.
 *
 * Usage: bun scripts/rename.ts <new-name>
 *
 * Replaces every occurrence of `fs-sv` in tracked source/config files with
 * <new-name>. Intended to be run once after creating a repo from this
 * template, then deleted along with this script.
 */
import {
	readdirSync,
	readFileSync,
	statSync,
	unlinkSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";

const PLACEHOLDER = "fs-sv";
const SKIP_DIRS = new Set([
	"node_modules",
	".git",
	".turbo",
	".svelte-kit",
	"dist",
	"build",
]);
const FILE_RE = /\.(json|jsonc|toml|md|ts|tsx|js|mjs|cjs|svelte|yml|yaml|env)$/;
const EXTRA_FILES = new Set([".env", ".env.example", "docker-compose.yml"]);

const newName = process.argv[2];
if (!(newName && /^[a-z][a-z0-9-]*$/.test(newName))) {
	console.error("Usage: bun scripts/rename.ts <kebab-name>");
	console.error("  name must match /^[a-z][a-z0-9-]*$/");
	process.exit(1);
}

let changed = 0;

function visit(dir: string) {
	for (const entry of readdirSync(dir)) {
		if (SKIP_DIRS.has(entry)) {
			continue;
		}
		const p = join(dir, entry);
		const s = statSync(p);
		if (s.isDirectory()) {
			visit(p);
			continue;
		}
		if (!(FILE_RE.test(entry) || EXTRA_FILES.has(entry))) {
			continue;
		}
		const before = readFileSync(p, "utf8");
		if (!before.includes(PLACEHOLDER)) {
			continue;
		}
		writeFileSync(p, before.replaceAll(PLACEHOLDER, newName));
		changed++;
		console.log(`  ${p}`);
	}
}

visit(".");
console.log(`\nRewrote ${changed} file(s): ${PLACEHOLDER} → ${newName}`);

const rl = createInterface({ input: process.stdin, output: process.stdout });
const answer = (await rl.question("Remove rename script? [Y/n] "))
	.trim()
	.toLowerCase();
rl.close();

if (answer === "" || answer === "y" || answer === "yes") {
	unlinkSync(import.meta.path);
	console.log("Removed scripts/rename.ts");
} else {
	console.log(
		"Left scripts/rename.ts in place — delete it manually when ready."
	);
}
console.log("Next: bun install");
