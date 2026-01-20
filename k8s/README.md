# Kubernetes Manifests for Gaming Store
# These files provide a starting point for deploying to Kubernetes

This directory contains Kubernetes manifests that mirror the Docker Compose setup.
The manifests are designed to work with:
- Any Kubernetes cluster (GKE, EKS, AKS, minikube, etc.)
- NGINX Ingress Controller
- External MongoDB and Redis (recommended) or in-cluster deployments

## Directory Structure

```
k8s/
├── README.md           # This file
├── namespace.yaml      # Kubernetes namespace
├── configmap.yaml      # Non-sensitive configuration
├── secrets.yaml        # Sensitive configuration (template)
├── frontend/
│   ├── deployment.yaml
│   └── service.yaml
├── backend/
│   ├── deployment.yaml
│   └── service.yaml
└── ingress.yaml        # NGINX Ingress configuration
```

## Prerequisites

1. Kubernetes cluster (1.25+)
2. kubectl configured
3. NGINX Ingress Controller installed
4. Container registry access (for your Docker images)

## Deployment Steps

### 1. Create namespace
```bash
kubectl apply -f namespace.yaml
```

### 2. Create ConfigMap and Secrets
```bash
# Edit secrets.yaml with your actual values (base64 encoded)
kubectl apply -f configmap.yaml
kubectl apply -f secrets.yaml
```

### 3. Deploy services
```bash
kubectl apply -f frontend/
kubectl apply -f backend/
```

### 4. Configure Ingress
```bash
# Update ingress.yaml with your domain
kubectl apply -f ingress.yaml
```

## Scaling

Scale deployments as needed:
```bash
kubectl scale deployment frontend --replicas=3 -n gaming-store
kubectl scale deployment backend --replicas=3 -n gaming-store
```

## Monitoring

Check deployment status:
```bash
kubectl get pods -n gaming-store
kubectl get services -n gaming-store
kubectl describe ingress -n gaming-store
```

## Notes

- These manifests are templates. Customize them for your specific environment.
- For production, consider using Helm charts for better management.
- External databases (managed MongoDB, Redis) are recommended for production.
- Set up proper TLS certificates using cert-manager.
