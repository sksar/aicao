<script>
	import ChevronRight from "svelte-radix/ChevronRight.svelte";
	import { cn } from "$lib/utils.js";
	export let el = undefined;
	let className = undefined;
	export { className as class };
</script>

<li
	role="presentation"
	aria-hidden="true"
	class={cn("[&>svg]:size-3.5", className)}
	bind:this={el}
	{...$$restProps}
>
	<slot>
		<ChevronRight tabindex="-1" />
	</slot>
</li>
