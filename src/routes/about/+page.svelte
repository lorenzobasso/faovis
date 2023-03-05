<script lang="ts">
	import { aboutParagraphs, datasetLink } from '$lib/constants'
	import ExternalLink from '$lib/external-link.svelte'
</script>

<article class="space-y-2 text-white/80">
	{#each aboutParagraphs as paragraph}
		<p>{paragraph}</p>
	{/each}
	<div class="flex">
		You can download the full dataset at the
		<ExternalLink href={datasetLink} additionalClass="ml-1">FAOSTAT website</ExternalLink>
	</div>
</article>
