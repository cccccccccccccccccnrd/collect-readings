## collect-readings
Collects readings from MQTT stream and cleans them accordingly to settings.

## Configuration
Modify the `package.json` `collect` script to your preferences.
```
"collect": "node listen {duration in minutes} && node extract {types to extract}"
```

For example here the script is listening for 10 minutes extracting the readings with the type of water-temperature and electrical-conductivity
```
"collect": "node listen 10 && node extract water-temperature electrical-conductivity"
```

Available types for static.cnrd.de
`water-temperature`
`electrical-conductivity`
`temperature`
`humidity`
`light-intensity`
