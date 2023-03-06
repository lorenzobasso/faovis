/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/* eslint-disable @typescript-eslint/no-var-requires */
import { parse } from 'csv-parse'
import extract from 'extract-zip'
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs'
import { get } from 'https'
import { join, resolve } from 'path'
import { finished } from 'stream/promises'

// const extract = require('extract-zip')

export const joinPath = (parent, child) => join(resolve(parent), child)

const createDirIfNotExist = dirname => {
	const fullName = resolve(dirname)

	if (!existsSync(fullName)) {
		mkdirSync(fullName)
	}

	return fullName
}

export const downloadDataset = async (base, dataset) => {
	const zipFilename = joinPath(base, `${dataset.datasetName}.zip`)
	const zipFile = createWriteStream(zipFilename)

	const downlaod = get(dataset.fileLocation, response => {
		response.pipe(zipFile)
		zipFile.on('finish', () => {
			zipFile.close()
		})
	})

	await finished(downlaod)

	const datasetDir = createDirIfNotExist(joinPath(base, dataset.datasetName))
	await extract(zipFilename, { dir: datasetDir })

	return datasetDir
}

export const readCsvFile = async filename => {
	const records = []

	const parser = createReadStream(resolve(filename))
		.pipe(parse({ delimiter: ',' }))
		.on('data', row => records.push(row))

	await finished(parser)
	return records
}
