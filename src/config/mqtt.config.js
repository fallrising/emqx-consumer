require('dotenv').config();

const mqttConfig = {
  brokerUrl: process.env.MQTT_BROKER_URL || 'mqtt://broker.emqx.io',
  topic: process.env.MQTT_TOPIC || 'jsstg_demo/messages',
  clientId: process.env.MQTT_CLIENT_ID || `mqtt_consumer_${Math.random().toString(16).slice(2, 8)}`,
  options: {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000,
  },
};

module.exports = mqttConfig;
