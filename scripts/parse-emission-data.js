import { readdir, writeFile } from 'fs/promises'
import * as R from 'ramda'

import { readCsvFile } from './fs-utils.js'

const emissionDataset = 'prisma/datasets/Climate Change: Emissions Totals'

const byYear = R.groupBy(it => it.year)

const parseValues = row => ({ country: row[2], year: row[8], unit: row[11], value: row[12] })

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

	const filterByType = type =>
		allEmissions.filter(row => row.some(item => item === type)).map(parseValues)

	const groupByYear = type => {
		const allValues = Object.entries(byYear(filterByType(type)))
			.map(([year, values]) => ({
				year,
				value: R.sum(values.map(val => val.value)),
				unit: values[0].unit,
			}))
			.filter(({ year }) => Number(year) <= 2023)

		const years = allValues.map(val => val.year)
		const values = allValues.map(val => val.value)
		const [unit] = [...new Set(allValues.map(val => val.unit))]

		return { name: type, years, values, unit }
	}

	const valueTypes = [
		'Emissions (CO2eq) (AR5)',
		'Emissions (CO2)',
		'Emissions (CO2eq) from CH4 (AR5)',
		'Emissions (CO2eq) from N2O (AR5)',
	]
	const groupedValues = valueTypes.map(type => groupByYear(type))

	await writeFile('graph-data/co2eq-by-year.json', JSON.stringify(groupedValues))
}

await extractEmissionData()
