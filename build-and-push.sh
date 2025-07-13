#!/bin/bash

# Docker build and push script for OAS3.1-validator
# This script builds a Docker image and pushes it to a registry

# Configuration
IMAGE_NAME="oas31-validator"
REGISTRY="asia-south1-docker.pkg.dev/gen-lang-client-0091398941/oas-validator"  # Change this to your actual registry
FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:latest"

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

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if we're in the correct directory
if [ ! -f "Dockerfile" ]; then
    print_error "Dockerfile not found in current directory. Please run this script from the project root."
    exit 1
fi

print_status "Starting Docker build process..."

# Build the Docker image for AMD64 architecture
print_status "Building Docker image for AMD64 architecture: ${FULL_IMAGE_NAME}"
if docker build --platform=linux/amd64 -t "${FULL_IMAGE_NAME}" .; then
    print_status "Docker image built successfully!"
else
    print_error "Failed to build Docker image"
    exit 1
fi

# Ask user if they want to push the image
echo
read -p "Do you want to push the image to the registry? (y/n): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Pushing image to registry..."
    
    if docker push "${FULL_IMAGE_NAME}"; then
        print_status "Image pushed successfully to ${FULL_IMAGE_NAME}"
    else
        print_error "Failed to push image to registry"
        print_warning "Make sure you are logged in to the registry: docker login ${REGISTRY}"
        exit 1
    fi
else
    print_status "Image built successfully but not pushed."
    print_status "To push later, run: docker push ${FULL_IMAGE_NAME}"
fi

print_status "Build and push process completed!" 