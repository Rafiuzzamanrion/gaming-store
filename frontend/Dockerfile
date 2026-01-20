# syntax=docker/dockerfile:1

# ================================
# Base Stage
# ================================
FROM node:22-alpine AS base

# Install libc6-compat for native dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# ================================
# Dependencies Stage
# ================================
FROM base AS deps

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with clean npm cache
RUN npm ci --legacy-peer-deps

# ================================
# Builder Stage
# ================================
FROM base AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN npm run build

# ================================
# Runner Stage (Production)
# ================================
FROM base AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set proper permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built application
# Leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the application port
EXPOSE 3000

# Set hostname for container networking
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Health check for Kubernetes readiness/liveness probes
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start the application
CMD ["node", "server.js"]
