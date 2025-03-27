# syntax = docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY bookmark-frontend/package.json bookmark-frontend/package-lock.json ./
RUN npm ci

# Copy application code
COPY bookmark-frontend .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["npm", "start"] 