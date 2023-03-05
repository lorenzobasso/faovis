<script lang="ts">
	import ExternalLink from './ExternalLink.svelte'
	import NavLink from './NavLink.svelte'
</script>

<header class="flex justify-center my-4">
	<nav class="flex gap-4 items-center justify-center border-white/10 border-b-2 pb-1 px-2">
		<NavLink href="/">Visualisations</NavLink>
		<NavLink href="/about">About</NavLink>
		<ExternalLink href="https://www.fao.org/faostat/en/#data/GT">View dataset</ExternalLink>
	</nav>
</header>
