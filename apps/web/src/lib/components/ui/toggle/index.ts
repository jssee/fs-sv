// @ts-nocheck Plain tsc cannot see exports from Svelte module scripts; svelte-check can.
import Root, {
	type ToggleSize,
	type ToggleVariant,
	type ToggleVariants,
	toggleVariants,
} from "./toggle.svelte";

export {
	Root,
	//
	Root as Toggle,
	type ToggleSize,
	type ToggleVariant,
	type ToggleVariants,
	toggleVariants,
};
