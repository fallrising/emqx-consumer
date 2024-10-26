# EMQX Consumer

A Node.js MQTT consumer application that connects to EMQX broker.

## Features

- MQTT message consumption
- Configurable connection settings
- Error handling and reconnection
- Clean architecture
- Test coverage

## Prerequisites

- Node.js >= 16.x
- npm >= 8.x

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd emqx-consumer
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

## Usage

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## Configuration

Configuration is handled through environment variables:

- `MQTT_BROKER_URL`: MQTT broker URL (default: mqtt://broker.emqx.io)
- `MQTT_TOPIC`: Topic to subscribe to (default: jsstg_demo/messages)
- `MQTT_CLIENT_ID`: Client ID for MQTT connection
- `MQTT_USERNAME`: Username for MQTT authentication (optional)
- `MQTT_PASSWORD`: Password for MQTT authentication (optional)

## Project Structure

```
emqx-consumer/
├── src/                      # Source files
│   ├── config/              # Configuration files
│   │   └── mqtt.config.js   # MQTT configuration
│   ├── services/            # Business logic
│   │   └── mqtt.service.js  # MQTT service
│   └── index.js            # Application entry point
├── tests/                   # Test files
│   └── mqtt.service.test.js # MQTT service tests
└── [configuration files]    # Various config files
```

## License

ISC
