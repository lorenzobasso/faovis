import { readFile } from 'fs/promises'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const datasetString = await readFile('graph-data/co2eq-by-year.json', { encoding: 'utf-8' })
	const dataset = JSON.parse(datasetString) as [string, [number, string]][]

	const years = dataset.map(([year]) => year)
	const values = dataset.map(([, [value]]) => value)
	const [unit] = [...new Set(dataset.map(([, [, unit]]) => unit))]

	return {
		co2eqByYear: { years, values, unit },
	}
}
