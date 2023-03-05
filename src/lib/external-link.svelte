<script lang="ts">
	import { ArrowTopRightOnSquare, Icon } from 'svelte-hero-icons'

	import LinkBase from './link-base.svelte'

	export let href: string
	export let additionalClass = ''
</script>

<LinkBase
	{href}
	additionalClass="flex items-center gap-[1px] brightness-75 hover:brightness-75 {additionalClass}"
	target="_blank"
>
	<slot />
	<Icon src={ArrowTopRightOnSquare} size="1.1rem" />
</LinkBase>
