import { readFile } from 'fs/promises'

import type { PageServerLoad } from './$types'

type Dataset = {
	years: string[]
	values: number[]
	unit: string
	name: string
}

export const load: PageServerLoad = async () => {
	const datasetString = await readFile('graph-data/co2eq-by-year.json', { encoding: 'utf-8' })
	const dataset = JSON.parse(datasetString) as Dataset[]

	return {
		co2eqByYear: dataset,
	}
}
