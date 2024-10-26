const mqtt = require('mqtt');
const mqttConfig = require('../config/mqtt.config');

class MQTTService {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  connect() {
    this.client = mqtt.connect(mqttConfig.brokerUrl, {
      ...mqttConfig.options,
      clientId: mqttConfig.clientId,
    });

    this.client.on('connect', () => {
      this.isConnected = true;
      console.log('Connected to MQTT broker');
      this.subscribe();
    });

    this.client.on('error', (err) => {
      console.error('Connection error:', err);
    });

    this.client.on('close', () => {
      this.isConnected = false;
      console.log('Disconnected from MQTT broker');
    });

    this.client.on('message', (topic, message) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });

    return this.client; // Return client for testing purposes
  }

  subscribe() {
    if (!this.isConnected) {
      throw new Error('Not connected to MQTT broker');
    }

    this.client.subscribe(mqttConfig.topic, (err) => {
      if (!err) {
        console.log(`Subscribed to ${mqttConfig.topic}`);
      } else {
        console.error(`Failed to subscribe to ${mqttConfig.topic}:`, err);
      }
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.client && this.isConnected) {
        this.client.end(true, {}, () => {
          this.isConnected = false;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

module.exports = new MQTTService();