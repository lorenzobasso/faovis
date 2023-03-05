<script lang="ts">
	export let href: string
	export let additionalClass = ''
	export let target: '_self' | '_blank' = '_self'
</script>

<a
	{href}
	class="!text-white !no-underline {additionalClass}"
	{target}
	rel={target === '_blank' ? 'noopener noreferrer' : ''}
>
	<slot />
</a>
