#!/bin/bash

# Kubernetes deployment script for OAS3.1 Validator
# This script deploys the application to Kubernetes

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Check if we're connected to a cluster
if ! kubectl cluster-info &> /dev/null; then
    print_error "Not connected to a Kubernetes cluster. Please configure kubectl."
    exit 1
fi

print_status "Starting Kubernetes deployment..."

# Create namespace
print_status "Creating namespace..."
kubectl apply -f namespace.yaml

# Create ConfigMap
#print_status "Creating ConfigMap..."
#kubectl apply -f configmap.yaml

# Create deployment
print_status "Creating deployment..."
kubectl apply -f deployment.yaml

# Create service
print_status "Creating service..."
kubectl apply -f service.yaml

print_status "Deployment completed!"
print_status "To check the status, run: kubectl get all -n beckn-spec"
print_status "To view logs, run: kubectl logs -f deployment/oas31-validator -n beckn-spec" 