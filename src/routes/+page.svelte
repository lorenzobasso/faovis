<script lang="ts">
	import Chart from '$lib/chart.svelte'

	import { SlideToggle } from '@skeletonlabs/skeleton'

	import type { PageServerData } from './$types'

	export let data: PageServerData

	let smoothSeries = true

	$: co2EqByYear = {
		xAxis: {
			type: 'category',
			data: data.co2eqByYear[0].years,
		},
		yAxis: {
			type: 'value',
			name: `Emissions (CO2eq) \n(${data.co2eqByYear[0].unit})`,
		},
		series: data.co2eqByYear.map(dataset => ({
			data: dataset.values,
			type: 'line',
			name: dataset.name,
			smooth: smoothSeries,
		})),
		legend: {
			data: data.co2eqByYear.map(dataset => dataset.name),
		},
	} as echarts.EChartsOption
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<h3 class="mb-2">Total CO2 equivalent emissions from all agricultural sectors</h3>
	<div class="self-start my-2">
		<SlideToggle
			size="sm"
			name="smooth-series"
			bind:checked={smoothSeries}
			active="bg-primary-900 dark:bg-primary-700"
		>
			Smooth interpolation line
		</SlideToggle>
	</div>
	<Chart options={co2EqByYear} />
</div>
