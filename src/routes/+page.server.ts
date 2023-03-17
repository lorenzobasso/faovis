import type { Dataset } from '$lib/dataset'

import { readFile } from 'fs/promises'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const datasetString = await readFile('graph-data/co2eq-by-year.json', { encoding: 'utf-8' })
	const dataset = JSON.parse(datasetString) as Dataset[]

	const UKdatasetString = await readFile('graph-data/uk-co2eq-by-year.json', { encoding: 'utf-8' })
	const UKdataset = JSON.parse(UKdatasetString) as Dataset[]

	return {
		co2eqByYear: dataset,
		UKCO2EqByYear: UKdataset,
	}
}
