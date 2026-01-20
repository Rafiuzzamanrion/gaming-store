# Kubernetes Manifests for Gaming Store

This directory contains production-ready Kubernetes manifests for deploying the Gaming Store application.

## Architecture Overview

```
                    ┌─────────────────┐
                    │  NGINX Ingress  │
                    │   Controller    │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
       ┌───────────┐  ┌───────────┐  ┌───────────┐
       │ Frontend  │  │  Backend  │  │ WebSocket │
       │ (Next.js) │  │ (Express) │  │(Socket.IO)│
       │ 2-10 pods │  │ 2-10 pods │  │           │
       └───────────┘  └─────┬─────┘  └───────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             │
       ┌───────────┐  ┌───────────┐       │
       │  MongoDB  │  │   Redis   │◄──────┘
       │(StatefulSet)│ │(Deployment)│
       └───────────┘  └───────────┘
```

## Directory Structure

```
k8s/
├── namespace.yaml           # Kubernetes namespace
├── configmap.yaml           # Non-sensitive configuration
├── secrets.yaml             # Sensitive configuration (template)
├── rbac.yaml               # ServiceAccount and RBAC rules
├── network-policy.yaml      # Network security policies
├── ingress.yaml             # NGINX Ingress configuration
├── frontend/
│   ├── deployment.yaml      # Frontend Deployment
│   ├── service.yaml         # Frontend Service
│   ├── hpa.yaml            # Horizontal Pod Autoscaler
│   └── pdb.yaml            # Pod Disruption Budget
├── backend/
│   ├── deployment.yaml      # Backend Deployment
│   ├── service.yaml         # Backend Service
│   ├── hpa.yaml            # Horizontal Pod Autoscaler
│   └── pdb.yaml            # Pod Disruption Budget
├── redis/
│   └── deployment.yaml      # Redis (dev/staging only)
├── mongodb/
│   └── statefulset.yaml     # MongoDB (dev/staging only)
├── base/
│   └── kustomization.yaml   # Kustomize base config
└── overlays/
    ├── development/
    │   └── kustomization.yaml
    └── production/
        └── kustomization.yaml
```

## Prerequisites

1. **Kubernetes cluster** (1.25+) - GKE, EKS, AKS, or minikube
2. **kubectl** configured with cluster access
3. **NGINX Ingress Controller** installed:
   ```bash
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.4/deploy/static/provider/cloud/deploy.yaml
   ```
4. **Container registry** access for Docker images
5. **(Optional) cert-manager** for TLS certificates

## Quick Start

### Option 1: Using Kustomize (Recommended)

```bash
# Development environment (includes Redis & MongoDB)
kubectl apply -k k8s/overlays/development

# Production environment (with HPA, PDB, NetworkPolicy)
kubectl apply -k k8s/overlays/production
```

### Option 2: Manual Deployment

```bash
# 1. Create namespace
kubectl apply -f k8s/namespace.yaml

# 2. Create RBAC (ServiceAccount)
kubectl apply -f k8s/rbac.yaml

# 3. Create ConfigMap and Secrets
# IMPORTANT: Edit secrets.yaml with your actual base64-encoded values first!
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml

# 4. Deploy databases (dev/staging only - use managed services in production)
kubectl apply -f k8s/redis/
kubectl apply -f k8s/mongodb/

# 5. Deploy applications
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/backend/

# 6. Apply network policies (production)
kubectl apply -f k8s/network-policy.yaml

# 7. Configure Ingress (update domain first)
kubectl apply -f k8s/ingress.yaml
```

## Building Docker Images

```bash
# Build and push frontend
docker build -t your-registry/gaming-store-frontend:latest ./frontend
docker push your-registry/gaming-store-frontend:latest

# Build and push backend
docker build -t your-registry/gaming-store-backend:latest ./backend
docker push your-registry/gaming-store-backend:latest
```

## Configuration

### Environment Variables

Edit `configmap.yaml` for non-sensitive config:
- `NEXT_PUBLIC_APP_URL` - Your domain URL
- `NEXT_PUBLIC_API_URL` - API endpoint URL
- Other frontend/backend settings

Edit `secrets.yaml` for sensitive config (base64 encoded):
```bash
# Generate base64 values
echo -n 'your-secret-value' | base64
```

### Scaling

**Manual scaling:**
```bash
kubectl scale deployment frontend --replicas=5 -n gaming-store
kubectl scale deployment backend --replicas=5 -n gaming-store
```

**Auto-scaling (HPA):**
The HPA is configured in `frontend/hpa.yaml` and `backend/hpa.yaml`:
- Min replicas: 2
- Max replicas: 10
- Target CPU: 70%
- Target Memory: 80%

### TLS/HTTPS

1. Install cert-manager:
   ```bash
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml
   ```

2. Uncomment TLS section in `ingress.yaml`

3. Create a ClusterIssuer for Let's Encrypt

## Monitoring

```bash
# Check pod status
kubectl get pods -n gaming-store

# Check services
kubectl get services -n gaming-store

# Check ingress
kubectl get ingress -n gaming-store
kubectl describe ingress gaming-store-ingress -n gaming-store

# View logs
kubectl logs -f deployment/frontend -n gaming-store
kubectl logs -f deployment/backend -n gaming-store

# Check HPA status
kubectl get hpa -n gaming-store

# Check resource usage
kubectl top pods -n gaming-store
```

## Troubleshooting

### Pods not starting
```bash
kubectl describe pod <pod-name> -n gaming-store
kubectl logs <pod-name> -n gaming-store
```

### Database connection issues
```bash
# Check if MongoDB is running
kubectl get pods -l app.kubernetes.io/component=mongodb -n gaming-store

# Check MongoDB logs
kubectl logs -f statefulset/mongodb -n gaming-store
```

### Ingress not working
```bash
# Check ingress controller
kubectl get pods -n ingress-nginx

# Check ingress events
kubectl describe ingress gaming-store-ingress -n gaming-store
```

## Production Recommendations

1. **Use managed databases** - MongoDB Atlas, AWS DocumentDB, or Cloud Memorystore for Redis
2. **Enable TLS** - Use cert-manager with Let's Encrypt
3. **Set up monitoring** - Prometheus + Grafana or cloud-native monitoring
4. **Configure alerts** - PagerDuty, Opsgenie, or Slack integration
5. **Enable logging** - ELK stack, Loki, or cloud logging services
6. **Use GitOps** - ArgoCD or Flux for continuous deployment
7. **Implement backup strategy** - Regular database backups with retention policy
