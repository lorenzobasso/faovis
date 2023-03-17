<script>
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'
	import Navbar from '$lib/navbar.svelte'
</script>

<div>
	<Navbar />
</div>
<main class="max-w-4xl mx-auto my-8 overflow-auto flex-1 w-full">
	<slot />
</main>
