const mqttService = require('../src/services/mqtt.service');

describe('MQTT Service', () => {
  // Increase timeout for async operations
  jest.setTimeout(10000);

  // Cleanup after each test
  afterEach((done) => {
    if (mqttService.client && mqttService.isConnected) {
      mqttService.client.end(true, {}, () => {
        mqttService.isConnected = false;
        done();
      });
    } else {
      done();
    }
  });

  // Cleanup after all tests
  afterAll((done) => {
    if (mqttService.client) {
      mqttService.client.end(true, {}, () => {
        done();
      });
    } else {
      done();
    }
  });

  test('should connect to MQTT broker', (done) => {
    mqttService.connect();

    mqttService.client.on('connect', () => {
      expect(mqttService.isConnected).toBe(true);
      done();
    });
  });

  test('should disconnect from MQTT broker', (done) => {
    mqttService.connect();

    mqttService.client.on('connect', () => {
      mqttService.disconnect();
      expect(mqttService.isConnected).toBe(false);
      done();
    });
  });

  test('should throw error when subscribing without connection', () => {
    expect(() => {
      mqttService.subscribe();
    }).toThrow('Not connected to MQTT broker');
  });
});