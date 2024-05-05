<script>
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import {onMount} from "svelte";

    let open = false;
	let src = "";

    onMount(() => {
        window['preview'] = (url) => {
			open = true;
			src = url;
		}
	})
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[800px]">
		<Dialog.Header>
			<Dialog.Title>Preview</Dialog.Title>
		</Dialog.Header>
		<div class="min-h-[70vh]">
			<iframe src={src} class="w-full h-full rounded-md" title="Preview"/>
		</div>
	</Dialog.Content>
</Dialog.Root>
