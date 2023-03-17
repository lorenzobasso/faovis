<script lang="ts">
	import Chart from '$lib/chart.svelte'
	import type { Dataset } from '$lib/dataset'

	import { SlideToggle } from '@skeletonlabs/skeleton'

	import type { PageServerData } from './$types'

	export let data: PageServerData

	let smoothSeries = true

	$: makeChartOptions = (datasets: Dataset[]) =>
		({
			xAxis: {
				type: 'category',
				data: datasets[0].years,
			},
			yAxis: {
				type: 'value',
				name: `Emissions (CO2eq) \n(${datasets[0].unit})`,
				nameLocation: 'start',
				nameGap: 30,
			},
			series: datasets.map(dataset => ({
				data: dataset.values,
				type: 'line',
				name: dataset.name,
				smooth: smoothSeries,
			})),
			legend: {
				data: datasets.map(dataset => dataset.name),
				textStyle: {
					color: '#b2b2b2',
				},
			},
		} as echarts.EChartsOption)
	$: co2EqByYear = makeChartOptions(data.co2eqByYear)
	$: UKCO2EqByYear = makeChartOptions(data.UKCO2EqByYear)
</script>

<div class="container mx-auto flex flex-col justify-center items-center gap-8">
	<div class="flex flex-col flex-1 w-full justify-center items-center">
		<h3 class="mb-2">Total CO2 equivalent emissions from all agricultural sectors</h3>
		<div class="self-end">
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
		<p class="!text-md text-white/75">
			The graph shows the CO2 emissions from agricultural activities between 1990 and 2022. As can
			be seen, there has been a steady increase in emissions over the past three decades, with a
			significant spike in the early 2000s. This increase is likely due to the expansion of the
			agricultural industry to meet growing demand for food and other agricultural products. While
			efforts have been made to reduce emissions through more sustainable practices, such as crop
			rotation and reduced tillage, these measures have not yet been enough to offset the overall
			growth in agricultural emissions. As we move forward, it will be crucial to continue
			developing and implementing innovative solutions to reduce these emissions and mitigate their
			impact on the environment.
		</p>
	</div>
	<div class="flex flex-col flex-1 w-full justify-center items-center">
		<h3 class="mb-2">Total CO2 equivalent emissions in the UK</h3>
		<Chart options={UKCO2EqByYear} />
		<p class="!text-md text-white/75">
			The graph displays the CO2 emissions from agricultural activities in the UK between 1990 and
			2022. Over this period, there has been a gradual decline in emissions, with occasional
			fluctuations due to various factors such as weather patterns and changes in land use. This
			reduction can be attributed to the implementation of various policies and initiatives aimed at
			promoting more sustainable and environmentally friendly practices in agriculture, such as the
			use of renewable energy sources and better management of fertilizers and manure. While the UK
			still faces significant challenges in reducing emissions from agriculture, the positive trend
			in recent years provides some hope for future progress. Continued efforts to promote
			sustainable agriculture practices, along with increased public awareness and education, will
			be crucial in achieving long-term reductions in agricultural emissions and mitigating their
			impact on the environment.
		</p>
	</div>
</div>
