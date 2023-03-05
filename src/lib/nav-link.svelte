<script lang="ts">
	import { page } from '$app/stores'

	import LinkBase from './link-base.svelte'

	export let href: string
	export let additionalClass = ''

	$: active = href === $page.url.pathname
	$: brightnessClass = active ? 'brightness-110' : 'brightness-75'
</script>

<LinkBase {href} additionalClass="{brightnessClass} {additionalClass} hover:brightness-90">
	<slot />
</LinkBase>
