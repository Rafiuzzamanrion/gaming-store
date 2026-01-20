# syntax=docker/dockerfile:1

# ================================
# Base Stage
# ================================
FROM node:22-alpine AS base

# Install security updates and required packages
RUN apk add --no-cache libc6-compat dumb-init

WORKDIR /app

# ================================
# Dependencies Stage
# ================================
FROM base AS deps

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# ================================
# Builder Stage
# ================================
FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# ================================
# Production Dependencies Stage
# ================================
FROM base AS prod-deps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --omit=dev

# ================================
# Runner Stage (Production)
# ================================
FROM base AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs

# Copy production dependencies
COPY --from=prod-deps --chown=expressjs:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=builder --chown=expressjs:nodejs /app/dist ./dist

# Copy package.json for version info
COPY --from=builder --chown=expressjs:nodejs /app/package.json ./package.json

# Switch to non-root user
USER expressjs

# Expose the application port
EXPOSE 5000

# Health check for Kubernetes readiness/liveness probes
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Use dumb-init to handle signals properly (important for Kubernetes)
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/server.js"]
