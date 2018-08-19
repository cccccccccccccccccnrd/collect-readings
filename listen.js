require('dotenv').config()
const fs = require('fs')
const mqtt = require('mqtt')

if (!process.argv[2]) throw 'Error: listen expects a duration as first parameter.'

let webSocketIp, webSocketTopic, webSocketOptions, listeningDuration = process.argv[2]

if (!process.argv[3]) {
  webSocketIp = 'static.cnrd.de:3001'
  webSocketTopic = 'utils/iota-mam'
  webSocketOptions = {
    clientId: 'listener-client-' + Math.random().toString(16).substr(2, 8),
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    protocol: 'ws'
  }
} else {
  webSocketIp = String(process.argv[3])
  webSocketTopic = String(process.argv[4])
  webSocketOptions = {
    clientId: 'listener-client-' + Math.random().toString(16).substr(2, 8),
    username: String(process.argv[5]),
    password: String(process.argv[6]),
    protocol: 'ws'
  }
}

listen(webSocketIp, webSocketTopic, webSocketOptions, listeningDuration)

function listen (ip, topic, options, duration) {
  const client = mqtt.connect('mqtt://' + ip, options)
  console.log(`connecting to ${ip}...`)

  client.on('connect', () => {
    console.log(`successfully connected and collecting readings for ${duration} minute(s)...`)
    client.subscribe(topic)
  })

  let collectedData = []

  client.on('message', (topic, message) => {
    collectedData.push(message.toString())
  })

  setTimeout(() => {
    writeJson(collectedData, 'readings')
    console.log(`successfully saved collected readings as 'readings.json'`)
    process.exit()
  }, duration * 60000)
}

async function writeJson (data, filename) {
  const dataJson = '[' + data + ']'
  return await fs.writeFileSync(filename + '.json', dataJson)
}