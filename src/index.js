// src/index.js
const mqttService = require('./services/mqtt.service');

process.on('SIGINT', () => {
  mqttService.disconnect();
  process.exit(0);
});

mqttService.connect();
