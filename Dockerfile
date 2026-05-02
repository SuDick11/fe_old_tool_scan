# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build with production settings
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app/dist ./dist

# Copy server script
COPY server.js .

EXPOSE 3000

# Start server
CMD ["node", "server.js"]
