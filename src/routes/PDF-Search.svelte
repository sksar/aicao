<script>
    import * as Tabs from "$lib/components/ui/tabs";
    import * as Resizable from "$lib/components/ui/resizable";
    import {Button} from "$lib/components/ui/button";

    import {PaperPlane, DoubleArrowUp} from "svelte-radix";

    const MENU = [
        { label: "Transfer Orders", collection: "transfer-orders", icon: PaperPlane },
        { label: "Promotion Orders", collection: "promotion-orders", icon: DoubleArrowUp },
        { label: "MACP Orders", collection: "macp-orders"}
    ]

	let selectedMenuItem = MENU[0].collection;
    let selectedYearItem = new Date().getFullYear();

    let PDFS = [];
</script>


<Resizable.PaneGroup direction="horizontal" class="min-h-[500px] rounded-lg border mt-8">

	<!--	MENU	-->
	<Resizable.Pane defaultSize={20} minSize={20} maxSize={20}>
		<div class="h-10 flex items-center justify-center px-4 border-b text-xs font-medium">
			Circulars
		</div>
		<div class="px-4 py-6 flex flex-col gap-2">
			{#each MENU as item}
				<Button href="#" variant={selectedMenuItem === item.collection ? 'default':'ghost'}
						on:click={() => selectedMenuItem = item.collection} size="sm"
						class="w-full justify-start">
					{#if item.icon}
						<svelte:component this={item.icon} class="!w-4 !h-4 mr-2"/>
					{:else}
						<PaperPlane class="!w-4 !h-4 mr-2"/>
					{/if}
					{item.label}
				</Button>
			{/each}
		</div>
	</Resizable.Pane>

	<Resizable.Handle/>

	<!--	CONTENT	  	-->
	<Resizable.Pane>
		<div class="h-10 flex gap-1 items-center px-4 border-b font-medium">
			<div>
				{MENU.find(item => item.collection === selectedMenuItem).label}
			</div>
			of Year
			<div>
				2015
			</div>
		</div>
		<div class="flex items-center justify-center p-6">
			<span class="font-semibold">Content</span>
		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>
