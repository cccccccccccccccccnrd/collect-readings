const fs = require('fs')

const types = process.argv.filter((type, index) => {
  if (index > 1) return type
})

readJson('./readings.json')
  .catch(error => console.log(`Error: ${error}`))
  .then(readings => extract(JSON.parse(readings)))
  .then(() => {
    console.log(`successfully saved ${types} readings as 'cleaned-readings.json'`)
    process.exit()
  })

async function extract (readings, settings = { filename: 'cleaned-readings', types: ['water-temperature', 'electrical-conductivity', 'temperature', 'humidity', 'light-intensity'] }) {
  const filename = settings.filename
  const types = settings.types

  const bundledTypes = []
  
  types.forEach(type => {
    const types = getType(readings, type)
    bundledTypes.push(...types)
  })

  if (!bundledTypes.length) throw 'Error: No valid type in readings.'

  return await writeJson(bundledTypes, filename)
}

function getType (readings, type) {
  const cleanedType = []

  readings.forEach(log => {
    log.readings.forEach(reading => {
      if (reading.type === type) cleanedType.push(reading)
    })
  })

  return cleanedType
}

async function writeJson (data, filename) {
  const dataJson = JSON.stringify(data, null, 2)
  return await fs.writeFileSync(filename + '.json', dataJson)
}

async function readJson (path) {
  return await fs.readFileSync(path)
}