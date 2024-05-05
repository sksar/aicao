<script>
	import "../app.pcss";
</script>


<header class="py-3 border-b">
	<div class="container flex gap-2 items-center justify-between">
		<h1 class="text-2xl font-medium">AICAO</h1>
		<nav>
			<ul class="flex gap-2">
				<li><a href="/">Home</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/contact">Contact</a></li>
			</ul>
		</nav>
	</div>
</header>

<div class="container pt-4">
	<slot />
</div>