<script lang="ts" context="module">
	import * as echarts from 'echarts'

	export { echarts }

	type ChartOptions = {
		theme?: string | object
		renderer?: 'canvas' | 'svg'
		options: echarts.EChartsOption
	}

	const DEFAULT_OPTIONS: Partial<ChartOptions> = {
		theme: undefined,
		renderer: 'canvas',
	}

	const chartable = (element: HTMLElement, echartOptions: ChartOptions) => {
		const { theme, renderer, options } = {
			...DEFAULT_OPTIONS,
			...echartOptions,
		}

		const instance = echarts.init(element, theme, { renderer })
		instance.setOption(options)

		const handleResize = () => instance.resize()

		window.addEventListener('resize', handleResize)

		return {
			destroy() {
				instance.dispose()
				window.removeEventListener('resize', handleResize)
			},
			update(newOptions: ChartOptions) {
				instance.setOption({ ...echartOptions.options, ...newOptions.options })
			},
		}
	}
</script>

<script lang="ts">
	export let options: echarts.EChartsOption
	export let { theme, renderer } = DEFAULT_OPTIONS
</script>

<div use:chartable={{ renderer, theme, options }} />

<style>
	div {
		width: 100%;
		height: 500px;
	}
</style>
