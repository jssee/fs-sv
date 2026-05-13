// @ts-nocheck Plain tsc cannot see exports from Svelte module scripts; svelte-check can.
import Root, { type AlertVariant, alertVariants } from "./alert.svelte";
import Action from "./alert-action.svelte";
import Description from "./alert-description.svelte";
import Title from "./alert-title.svelte";

export {
	Action,
	Action as AlertAction,
	type AlertVariant,
	alertVariants,
	Description,
	Description as AlertDescription,
	Root,
	//
	Root as Alert,
	Title,
	Title as AlertTitle,
};
