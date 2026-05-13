// @ts-nocheck Plain tsc cannot see exports from Svelte module scripts; svelte-check can.
import Root, { type BadgeVariant, badgeVariants } from "./badge.svelte";

export { type BadgeVariant, badgeVariants, Root as Badge };
