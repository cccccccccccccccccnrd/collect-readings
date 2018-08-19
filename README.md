## Configuration
Modify the `package.json` `collect` script to your preferences.
```
"collect": "node listen <listening duration in minutes> && node extract <types to extract>"
```

For example here the script is listening for `10` minutes extracting the readings with the type of `water-temperature` and `electrical-conductivity`.
```
"collect": "node listen 10 && node extract water-temperature electrical-conductivity"
```

> listen listens by default to static.cnrd.de:3001. Available types are: 
`water-temperature`
`electrical-conductivity`
`temperature`
`humidity`
`light-intensity`

To listen to a custom MQTT server and topic use parameters like this:
```
node listen <listening duration in minutes> <ip> <topic> <username> <password>
```

To run, just
```
npm run collect
```
