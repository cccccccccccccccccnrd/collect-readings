const fs = require('fs')

if (!process.argv[2]) throw 'Error: extract expects at least one type to extract as parameter.'

const types = process.argv.filter((type, index) => {
  if (index > 1) return type
})

readJson('./readings.json')
  .catch(error => {
    throw 'Error' + error
  })
  .then(readings => {
    extract(JSON.parse(readings), {
      filename: 'cleaned-readings',
      types: types
    })

    console.log(`successfully saved ${types} readings as 'cleaned-readings.json'`)
    process.exit()
  })

function extract (readings, settings) {
  const filename = settings.filename
  const types = settings.types

  const bundledTypes = types.map(type => {
    return getType(readings, type)
  })

  const bundledTypesFlat = [].concat.apply([], bundledTypes)
  if (!bundledTypesFlat.length) throw 'Error: No valid type in readings.'

  writeJson(bundledTypesFlat, filename)
    .catch(error => {
      throw 'Error:' + error
    })
}

function getType (readings, type) {
  const cleanedReadings = readings.map(entry => {
    return Object.values(entry)
  })

  const data = cleanedReadings.map(readings => {
    return readings.filter(reading => {
      return reading.type === type
    })
  })

  return [].concat.apply([], data)
}

async function writeJson (data, filename) {
  const dataJson = JSON.stringify(data)
  return await fs.writeFileSync(filename + '.json', dataJson)
}

async function readJson (path) {
  return await fs.readFileSync(path)
}