<script>
    import * as Select from "$lib/components/ui/select/index.js";
    import {Button} from "$lib/components/ui/button";
    import Download from "svelte-radix/Download.svelte";
    import File from "svelte-radix/File.svelte";
    import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
    import ChevronRight from "svelte-radix/ChevronRight.svelte";
    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    import {Input} from "$lib/components/ui/input/index.js";
    import pb from "$lib/pb"
    import {formatDate} from "$lib";

    const MENU = [
        {label: "Transfer Orders", type: "transfer-order"},
        {label: "Promotion Orders", type: "promotion-order"}
    ]

    let selectedType = null;
    let searchTerm = "";
    let perPage = 2;
    let page = 1;
    let totalPages = 0;
    let totalItems = 0;
    let PDFs = [];

    $: getPDFs(selectedType, searchTerm, page, perPage);

    async function getPDFs() {
        if (!selectedType) return;
        const type = selectedType.value;
        const result = await pb.collection('documents').getList(page, perPage, {
            sort: '-year',
            filter: `doctype = '${type}' && (year ?~ '${searchTerm}' || title ?~ '${searchTerm}')`
        });
        PDFs = result.items;
        totalPages = result.totalPages;
        totalItems = result.totalItems;
        console.log(result);
    }

    function previewFile(PDF) {
		const url = pb.files.getUrl(PDF, PDF.file)
		window['preview'](url);
	}

    function downloadFile(PDF) {
        const url = pb.files.getUrl(PDF, PDF.file)
        const a = document.createElement('a');
        a.href = url + '?download=1';
        a.download = PDF.file;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
	}
</script>


<div class="mt-8 flex gap-2">
	<Select.Root bind:selected={selectedType}>
		<Select.Trigger class="w-[250px]">
			<Select.Value placeholder="Select type"/>
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				<Select.Label>Document Type</Select.Label>
				{#each MENU as item}
					<Select.Item value={item.type} label={item.label}>{item.label}</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="favoriteFruit"/>
	</Select.Root>
	<Input type="search" placeholder="Filter" class="max-w-full" bind:value={searchTerm}/>
</div>

<div class="results mt-4">
	{#if PDFs.length}
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Year</Table.Head>
					<Table.Head>Title</Table.Head>
					<Table.Head>Doc No.</Table.Head>
					<Table.Head>Date</Table.Head>
					<Table.Head class="text-center">View / Download</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each PDFs as PDF}
					<Table.Row>
						<Table.Cell class="font-mono">{PDF.year}</Table.Cell>
						<Table.Cell>{PDF.title}</Table.Cell>
						<Table.Cell class="font-mono">{PDF['docno'] || "-"}</Table.Cell>
						<Table.Cell>{formatDate(PDF['docdate'])}</Table.Cell>
						<Table.Cell class="text-center">
							<Button variant="outline" size="sm" on:click={() => previewFile(PDF)}>
								<File class="h-4 w-4" />
							</Button>
							<Button variant="outline" size="sm" on:click={() => downloadFile(PDF)}>
								<Download class="h-4 w-4" />
							</Button>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
		<Pagination.Root count={totalItems} {perPage} bind:page={page} let:pages let:currentPage>
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton>
						<ChevronLeft class="h-4 w-4" />
						<span class="hidden sm:block">Previous</span>
					</Pagination.PrevButton>
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === "ellipsis"}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link {page} isActive={currentPage === page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton>
						<span class="hidden sm:block">Next</span>
						<ChevronRight class="h-4 w-4" />
					</Pagination.NextButton>
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	{/if}
</div>

