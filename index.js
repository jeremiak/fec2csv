#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const parser = require('fec-parse')
const ora = require('ora')

const inputFileArg = process.argv[2]
const outputDirArg = process.argv[3]

if (!inputFileArg) {
  console.error('Whoops, make sure you supply the input filename as the first argument')
  process.exit(1)
  return
}

const inputPath = path.resolve(inputFileArg)
const outputDirPath = path.resolve(outputDirArg || '.')
const outputStreams = {}

/**
 * Create an output path using the execPath and the filename
 * @param {string} base 
 * @param {string} type 
 */
const createOutputPath = (base, type) => {
  const outputFile = `${base}-${type}.csv`
  return path.resolve(outputDirPath, outputFile)
}

/**
 * Given an output path and columns, return a function that
 * can write chunks to the file
 * @param {string} outputPath 
 * @param {array} columns 
 * @returns {Function}
 */
const createStreamWriter = (outputPath, columns) => {
  const writer = fs.createWriteStream(outputPath)
  writer.write(`${columns.join(',')}\n`)

  return data => {
    var values = []

    columns.forEach(col => {
      values.push(data[col])
    })

    writer.write(`${values.join(',')}\n`)
  }
}

/**
 * Normalize form type strings so we can
 * use it for the file name
 * @param {string} formType
 * @returns {string} normalizedFormType 
 */
const normalizeFormType = formType => {
  const normalized = formType.replace(/\//g, '-')

  return normalized
}

const spinner = ora(`Reading ${inputPath}, will create CSVs from it`).start()

fs.createReadStream(inputPath)
  .pipe(parser())
  .on('data', chunk => {
    const { form_type, filer_committee_id_number } = chunk

    if (!form_type) return

    const normalizedFormType = normalizeFormType(form_type)
    if (!outputStreams[normalizedFormType]) {
      const columns = Object.keys(chunk)
      const outputPath = createOutputPath(filer_committee_id_number, normalizedFormType)
      const writer = createStreamWriter(outputPath, columns)
      outputStreams[normalizedFormType] = writer
    }

    outputStreams[normalizedFormType](chunk)
  })
  .on('end', () => {
    const fileCount = Object.keys(outputStreams).length
    spinner.succeed(`All done, created ${fileCount} CSVs`)
  })
