import { readdir, writeFile } from 'fs/promises'
import * as R from 'ramda'

import { readCsvFile } from './fs-utils.js'

const emissionDataset = 'prisma/datasets/Climate Change: Emissions Totals'

const extractEmissionData = async () => {
	const files = (await readdir(emissionDataset)).map(file => `${emissionDataset}/${file}`)
	const dataFile = files.find(file => file.includes('All_Data'))

	if (!dataFile) {
		return []
	}

	const [, ...data] = await readCsvFile(dataFile)

	const allEmissions = data
		.filter(row => row.length)
		.filter(row => row.some(item => item === 'All sectors with LULUCF'))

	const co2EqData = allEmissions
		.filter(row => row.some(item => item === 'Emissions (CO2eq) (AR5)'))
		.map(row => ({ country: row[2], year: row[8], unit: row[11], value: row[12] }))

	const byYear = R.groupBy(it => it.year)

	const emissionsByYear = Object.entries(byYear(co2EqData)).map(([year, values]) => [
		year,
		[R.sum(values.map(val => val.value)), values[0].unit],
	])

	await writeFile('graph-data/co2eq-by-year.json', JSON.stringify(emissionsByYear))
}

await extractEmissionData()
