import { PrismaClient } from '@prisma/client'

import axios from 'axios'
import extract from 'extract-zip'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { get } from 'https'
import { join, resolve } from 'path'
import { finished } from 'stream/promises'

export const faostatDatasetMetadata =
	'https://fenixservices.fao.org/faostat/static/bulkdownloads/datasets_E.json'

const prisma = new PrismaClient()

const createDirIfNotExist = dirname => {
	const fullName = resolve(dirname)

	if (!existsSync(fullName)) {
		mkdirSync(fullName)
	}

	return fullName
}

const downloadDataset = async (base, dataset) => {
	const baseDir = createDirIfNotExist(base)
	const zipFilename = join(baseDir, `${dataset.datasetName}.zip`)
	const zipFile = createWriteStream(zipFilename)

	const downlaod = get(dataset.fileLocation, response => {
		response.pipe(zipFile)
		zipFile.on('finish', () => {
			zipFile.close()
		})
	})

	await finished(downlaod)

	const datasetDir = createDirIfNotExist(join(baseDir, dataset.datasetName))
	await extract(zipFilename, { dir: datasetDir })

	return datasetDir
}

const main = async () => {
	console.log('⌛ downloading FAOSTAT datasets')

	const response = await axios.get(faostatDatasetMetadata)
	if (response.status !== 200) {
		throw new Error('Could not fetch metadata')
	}

	const datasets = response.data.Datasets.Dataset.map(dataset => ({
		datasetCode: dataset.DatasetCode,
		datasetName: dataset.DatasetName,
		topic: dataset.Topic,
		datasetDescription: dataset.DatasetDescription,
		contact: dataset.Contact,
		email: dataset.Email,
		dateUpdate: new Date(dataset.DateUpdate),
		compressionFormat: dataset.CompressionFormat,
		fileType: dataset.FileType,
		fileSize: dataset.FileSize,
		fileRows: dataset.FileRows,
		fileLocation: dataset.FileLocation,
	}))

	for (const dataset of datasets) {
		await prisma.dataset.upsert({
			where: { datasetCode: dataset.datasetCode },
			create: dataset,
			update: dataset,
		})
	}

	console.log('💾 Saved all metadata')

	for (const dataset of datasets) {
		await downloadDataset('prisma/datasets', dataset)
		console.log(`Downloaded dataset ${dataset.datasetName}`)
	}
}

main()
	.then(() => console.log('🏁 download complete'))
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(() => prisma.$disconnect())
