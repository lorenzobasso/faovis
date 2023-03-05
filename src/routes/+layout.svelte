<script>
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css'
	import '../theme.postcss'
	import '@skeletonlabs/skeleton/styles/all.css'
	import '../app.postcss'
	import Navbar from '$lib/Navbar.svelte'
</script>

<div>
	<Navbar />
	<main>
		<slot />
	</main>
</div>
