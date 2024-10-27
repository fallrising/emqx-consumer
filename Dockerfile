FROM node:20-slim AS builder

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Run linting and tests
RUN npm run lint
RUN npm test

# Production image
FROM node:20-slim

# Create non-root user
RUN groupadd -r mqttuser && useradd -r -g mqttuser mqttuser

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src ./src

# Install only production dependencies
RUN npm ci --only=production

# Use non-root user
USER mqttuser

# Set environment variables
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "const net = require('net'); \
                 const client = net.connect(1883, process.env.MQTT_BROKER_URL.replace('mqtt://', '')); \
                 client.on('connect', () => { client.end(); process.exit(0); }); \
                 client.on('error', () => process.exit(1));"

# Start the application
CMD ["node", "src/index.js"]
