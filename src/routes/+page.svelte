<script lang="ts">
	import Chart from '$lib/chart.svelte'

	import type { PageServerData } from './$types'

	export let data: PageServerData

	const co2EqByYear: echarts.EChartsOption = {
		xAxis: {
			type: 'category',
			data: data.co2eqByYear.years,
		},
		yAxis: {
			type: 'value',
			name: `Emissions (CO2eq) \n(${data.co2eqByYear.unit})`,
		},
		series: [
			{
				data: data.co2eqByYear.values.slice(0, -2),
				type: 'line',
				name: 'Emissions (CO2eq) (AR5)',
				smooth: true,
			},
		],
		legend: {
			data: ['Emissions (CO2eq) (AR5)'],
		},
	}
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center space-y-4">
	<h3>Total CO2 equivalent emissions from all agricultural sectors</h3>
	<Chart options={co2EqByYear} />
</div>
