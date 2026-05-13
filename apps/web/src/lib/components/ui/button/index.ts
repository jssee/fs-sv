// @ts-nocheck Plain tsc cannot see exports from Svelte module scripts; svelte-check can.
import Root, {
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	buttonVariants,
} from "./button.svelte";

export {
	type ButtonProps as Props,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant,
	buttonVariants,
	Root,
	//
	Root as Button,
};
