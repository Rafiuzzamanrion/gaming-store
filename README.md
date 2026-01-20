# Gaming Store 🎮

A modern gaming store web application built with Next.js and Express.js.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript, MongoDB, Redis
- **Infrastructure**: Docker, NGINX, Kubernetes-ready

## Quick Start

### Prerequisites

- Node.js 22+
- npm or yarn
- Docker and Docker Compose (for containerized development)

### Local Development (without Docker)

```bash
# Install dependencies
npm install
npm run install:all

# Start development servers
npm run dev
```

Frontend runs on http://localhost:3000
Backend runs on http://localhost:5000

---

## Docker Development

### Prerequisites

- Docker 24+
- Docker Compose 2.20+

### Getting Started

1. **Copy environment file:**
   ```bash
   cp .env.docker.example .env
   ```

2. **Start development environment:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - MongoDB: localhost:27017
   - Redis: localhost:6379

### Development Commands

```bash
# Start services
docker-compose up

# Start services in background
docker-compose up -d

# Rebuild and start
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

---

## Production Deployment

### Using Docker Compose

1. **Configure environment:**
   ```bash
   cp .env.docker.example .env
   # Edit .env with production values
   ```

2. **Build and deploy:**
   ```bash
   docker-compose -f docker-compose.prod.yml up --build -d
   ```

3. **Access via NGINX:**
   - Application: http://localhost (port 80)

### Architecture

```
                    ┌─────────────┐
                    │   NGINX     │
                    │  (Port 80)  │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │  Frontend   │ │   Backend   │ │  WebSocket  │
    │ (Port 3000) │ │ (Port 5000) │ │ (socket.io) │
    └─────────────┘ └──────┬──────┘ └─────────────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               │
    ┌─────────────┐ ┌─────────────┐        │
    │   MongoDB   │ │    Redis    │◄───────┘
    │ (Port 27017)│ │ (Port 6379) │
    └─────────────┘ └─────────────┘
```

### NGINX Reverse Proxy

The production setup includes an NGINX reverse proxy that:
- Routes `/api/*` requests to the backend
- Routes `/socket.io/*` for WebSocket connections
- Serves the Next.js frontend for all other routes
- Provides rate limiting and security headers
- Ready for SSL/TLS termination

---

## Kubernetes Deployment

The application is fully Kubernetes-ready with comprehensive manifests. See the `k8s/` directory for details.

### Features

- **HorizontalPodAutoscaler (HPA)** - Auto-scaling based on CPU/memory (2-10 pods)
- **PodDisruptionBudget (PDB)** - High availability during maintenance
- **NetworkPolicy** - Secure pod-to-pod communication
- **RBAC** - ServiceAccount with proper permissions
- **Kustomize** - Environment-based configuration (dev/prod)

### Quick Deploy with Kustomize (Recommended)

```bash
# Development environment (includes Redis & MongoDB)
kubectl apply -k k8s/overlays/development

# Production environment (with HPA, PDB, NetworkPolicy)
kubectl apply -k k8s/overlays/production
```

### Manual Deployment

```bash
# 1. Create namespace and RBAC
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/rbac.yaml

# 2. Apply configuration
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml  # Edit with your secrets first!

# 3. Deploy databases (dev/staging only)
kubectl apply -f k8s/redis/
kubectl apply -f k8s/mongodb/

# 4. Deploy applications
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/backend/

# 5. Apply network policies (production)
kubectl apply -f k8s/network-policy.yaml

# 6. Configure ingress
kubectl apply -f k8s/ingress.yaml  # Edit with your domain first!
```

### Building Images for Kubernetes

```bash
# Build and tag images
docker build -t your-registry/gaming-store-frontend:latest ./frontend
docker build -t your-registry/gaming-store-backend:latest ./backend

# Push to registry
docker push your-registry/gaming-store-frontend:latest
docker push your-registry/gaming-store-backend:latest
```

---

## Project Structure

```
gaming-store/
├── frontend/                 # Next.js frontend
│   ├── Dockerfile           # Frontend Docker configuration
│   ├── src/
│   │   ├── app/            # Next.js App Router
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom hooks
│   │   └── store/          # Redux store
│   └── package.json
├── backend/                  # Express.js backend
│   ├── Dockerfile           # Backend Docker configuration
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   ├── middleware/     # Express middleware
│   │   └── config/         # Configuration
│   └── package.json
├── nginx/                    # NGINX configuration
│   ├── nginx.conf          # Main config
│   └── conf.d/
│       └── default.conf    # Server configuration
├── k8s/                      # Kubernetes manifests
│   ├── namespace.yaml       # Namespace definition
│   ├── configmap.yaml       # ConfigMap
│   ├── secrets.yaml         # Secrets (template)
│   ├── rbac.yaml           # ServiceAccount & RBAC
│   ├── network-policy.yaml  # NetworkPolicy rules
│   ├── ingress.yaml         # NGINX Ingress
│   ├── frontend/            # Frontend Deployment, Service, HPA, PDB
│   ├── backend/             # Backend Deployment, Service, HPA, PDB
│   ├── redis/               # Redis Deployment (dev/staging)
│   ├── mongodb/             # MongoDB StatefulSet (dev/staging)
│   ├── base/                # Kustomize base
│   └── overlays/            # Kustomize overlays (dev/prod)
├── docker-compose.yml        # Development environment
├── docker-compose.prod.yml   # Production environment
└── .env.docker.example       # Environment template
```

---

## Environment Variables

See `.env.docker.example` for all available environment variables.

### Required for Production

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_SECRET` | Secret for NextAuth.js session |
| `JWT_ACCESS_SECRET` | Secret for JWT access tokens |
| `JWT_REFRESH_SECRET` | Secret for JWT refresh tokens |
| `MONGODB_URI` | MongoDB connection string |

---

## License

MIT

