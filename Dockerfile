# Stage 1: Build the TypeScript code
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies (including devDependencies)
COPY package*.json ./
RUN npm install

# Optionally ensure TypeScript is available globally
RUN npm install -g typescript

# Copy source code and tsconfig
COPY tsconfig.json ./
COPY src ./src

# Run the build using the local tsc (preferred)
RUN npm run build

# Stage 2: Run the built app
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/index.js"]