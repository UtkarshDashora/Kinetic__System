# Stage 1: Build the React frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build the Node Express backend and final image
FROM node:20-slim
WORKDIR /app

# Install backend dependencies
COPY server/package.json server/package-lock.json* ./server/
WORKDIR /app/server
RUN npm install --omit=dev

# Copy backend source and artifacts
COPY server/ ./

# Copy the built frontend from Stage 1
COPY --from=frontend-builder /app/dist /app/dist

# Cloud Run expects the service to listen on the port defined by the PORT env var
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
