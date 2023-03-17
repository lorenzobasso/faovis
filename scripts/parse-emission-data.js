import { readdir, writeFile } from 'fs/promises'
import * as R from 'ramda'

import { readCsvFile } from './fs-utils.js'

const emissionDataset = 'prisma/datasets/Climate Change: Emissions Totals'

const byYear = R.groupBy(it => it.year)

const parseValues = row => ({ country: row[2], year: row[8], unit: row[11], value: row[12] })

const getAllEmissions = async () => {
	const files = (await readdir(emissionDataset)).map(file => `${emissionDataset}/${file}`)
	const dataFile = files.find(file => file.includes('All_Data'))

	if (!dataFile) {
		return []
	}

	const [, ...data] = await readCsvFile(dataFile)

	return data
		.filter(row => row.length)
		.filter(row => row.some(item => item === 'All sectors with LULUCF'))
}

const makeGroupByYear = allValues => type => {
	const filterByType = type =>
		allValues.filter(row => row.some(item => item === type)).map(parseValues)

	const filteredValues = Object.entries(byYear(filterByType(type)))
		.map(([year, values]) => ({
			year,
			value: R.sum(values.map(val => val.value)),
			unit: values[0].unit,
		}))
		.filter(({ year }) => Number(year) <= 2023)

	const years = filteredValues.map(val => val.year)
	const values = filteredValues.map(val => val.value)
	const [unit] = [...new Set(filteredValues.map(val => val.unit))]

	return { name: type, years, values, unit }
}

const extractEmissionData = async () => {
	const allEmissions = await getAllEmissions()
	const groupByYear = makeGroupByYear(allEmissions)

	const valueTypes = [
		'Emissions (CO2eq) (AR5)',
		'Emissions (CO2)',
		'Emissions (CO2eq) from CH4 (AR5)',
		'Emissions (CO2eq) from N2O (AR5)',
	]
	const groupedValues = valueTypes.map(type => groupByYear(type))

	await writeFile('graph-data/co2eq-by-year.json', JSON.stringify(groupedValues))
}

const extractUKEmissionData = async () => {
	const allEmissions = await getAllEmissions()
	const UKEmissions = allEmissions.filter(
		row => row[2] === 'United Kingdom of Great Britain and Northern Ireland',
	)
	const groupByYear = makeGroupByYear(UKEmissions)

	const valueTypes = [...new Set(UKEmissions.map(row => row[6]))].sort()

	const groupedValues = valueTypes.map(type => groupByYear(type))

	await writeFile('graph-data/uk-co2eq-by-year.json', JSON.stringify(groupedValues))
}

await extractEmissionData()
await extractUKEmissionData()
