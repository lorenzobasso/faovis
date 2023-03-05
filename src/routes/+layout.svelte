<script>
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'
	import Navbar from '$lib/navbar.svelte'
</script>

<div>
	<Navbar />
	<main class="max-w-4xl mx-auto">
		<slot />
	</main>
</div>
