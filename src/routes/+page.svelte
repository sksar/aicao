<script>
	import PDF_Search from "./PDF-Search.svelte";
</script>

<div
	class="rounded-lg bg-zinc-300 w-full h-60 border border-dashed border-black flex items-center justify-center text-3xl"
	style="background-image: url('/pictures/sun1.jpg'); background-size: cover; background-position: center; color:white"
>
	ALL INDIA CUSTOMS, CGST & DIRECTORATES CHIEF ACCOUNTS OFFICERS' ASSOCIATION
</div>
<h2 class="flex justify-left text-2xl">List of Documents</h2>
<PDF_Search />

<style lang="postcss">
	h2 {
		@apply border-b-2 border-blue-300;
	}
</style>
