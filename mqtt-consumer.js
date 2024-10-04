const mqtt = require('mqtt');
require('dotenv').config(); // Add this line to use dotenv for loading environment variables

// Get the topic name from an environment variable, with a fallback value
const MQTT_TOPIC = process.env.MQTT_TOPIC || 'jsstg_demo/messages';

// Connect to the EMQX broker
const client = mqtt.connect('mqtt://broker.emqx.io');

// When connected, subscribe to a topic and publish a message
client.on('connect', () => {
    console.log('Connected to EMQX broker');
    // Subscribe to the topic from the environment variable
    client.subscribe(MQTT_TOPIC, (err) => {
        if (!err) {
            console.log(`Subscribed to ${MQTT_TOPIC}`);
        } else {
            console.error(`Failed to subscribe to ${MQTT_TOPIC}: ${err}`);
        }
    });
});

// Listen for messages on subscribed topics
client.on('message', (topic, message) => {
    // message is Buffer
    console.log(`Received message: ${message.toString()} on topic: ${topic}`);
});

// Handle errors
client.on('error', (err) => {
    console.error(`Connection error: ${err}`);
});
