# OAS3.1-validator

A lightweight Node.js application for validating Beckn protocol requests and responses against OpenAPI Specification version 3.1. This service provides validation endpoints for both retail and mobility domains, ensuring API compliance with the Beckn protocol specifications.

## Features

- **Dual Domain Support**: Validates both retail and mobility domain APIs
- **OpenAPI 3.1 Compliance**: Uses the latest OpenAPI specification for validation
- **Beckn Protocol Support**: Implements all standard Beckn protocol endpoints
- **Containerized**: Ready for Docker deployment
- **Kubernetes Ready**: Includes K8s deployment configurations
- **Real-time Validation**: Validates request/response payloads in real-time

## Architecture

The application uses:
- **Express.js** - Web framework
- **openapi-backend** - OpenAPI validation and routing
- **Node.js 18** - Runtime environment

### Domain Structure

```
/retail  - Retail domain API endpoints
/mobility - Mobility domain API endpoints
```

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Docker (for containerized deployment)
- Kubernetes cluster (for K8s deployment)

## Installation

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OAS3.1-validator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   node index.js
   ```

4. **Access the application**
   - Server runs on: `http://localhost:3000`
   - Retail endpoints: `http://localhost:3000/retail/*`
   - Mobility endpoints: `http://localhost:3000/mobility/*`

### Docker Deployment

1. **Build the Docker image**
   ```bash
   ./build-and-push.sh
   ```

2. **Or build manually**
   ```bash
   docker build -t oas31-validator .
   docker run -p 3000:3000 oas31-validator
   ```

## API Endpoints

### Retail Domain (`/retail`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/search` | Search for products/services |
| POST | `/select` | Select items from search results |
| POST | `/init` | Initialize order |
| POST | `/confirm` | Confirm order |
| POST | `/status` | Check order status |
| POST | `/track` | Track order |
| POST | `/cancel` | Cancel order |
| POST | `/update` | Update order |
| POST | `/rating` | Submit rating |
| POST | `/support` | Request support |
| POST | `/on_search` | Search response callback |
| POST | `/on_select` | Select response callback |
| POST | `/on_init` | Init response callback |
| POST | `/on_confirm` | Confirm response callback |
| POST | `/on_status` | Status response callback |
| POST | `/on_track` | Track response callback |
| POST | `/on_cancel` | Cancel response callback |
| POST | `/on_update` | Update response callback |
| POST | `/on_rating` | Rating response callback |
| POST | `/on_support` | Support response callback |

### Mobility Domain (`/mobility`)

The mobility domain supports the same endpoints as retail, but with mobility-specific OpenAPI specifications.

## OpenAPI Specifications

The application uses two main OpenAPI specification files:

- `api/openapiRetail.yaml` - Retail domain specification (172KB)
- `api/openapiMobility.yaml` - Mobility domain specification (435KB)

These files define the schema validation rules for all Beckn protocol endpoints.

## Validation Process

1. **Request Validation**: Incoming requests are validated against the OpenAPI 3.1 specification
2. **Schema Compliance**: Ensures request payloads match defined schemas
3. **Response Generation**: Returns validation status with appropriate HTTP status codes
4. **Error Handling**: Provides detailed validation error messages for non-compliant requests

## Deployment

### Kubernetes Deployment

1. **Deploy to Kubernetes**
   ```bash
   cd k8s
   ./deploy.sh
   ```

2. **Manual K8s deployment**
   ```bash
   kubectl apply -f namespace.yaml
   kubectl apply -f configmap.yaml
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml
   ```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |

## Development

### Project Structure

```
OAS3.1-validator/
├── api/                    # OpenAPI specification files
│   ├── openapiRetail.yaml
│   └── openapiMobility.yaml
├── controllers/            # Request handlers
│   ├── retail/
│   │   └── index.js
│   └── mobility/
│       └── index.js
├── k8s/                   # Kubernetes configurations
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   └── deploy.sh
├── deployment-em-style/   # Additional deployment files
├── index.js              # Main application file
├── package.json          # Dependencies
├── Dockerfile           # Container configuration
└── build-and-push.sh    # Build and deployment script
```

### Adding New Endpoints

1. Update the OpenAPI specification file
2. Add handler function in the appropriate controller
3. Register the handler in `index.js`

## Testing

### Manual Testing

Test endpoints using curl or any HTTP client:

```bash
# Test retail search endpoint
curl -X POST http://localhost:3000/retail/search \
  -H "Content-Type: application/json" \
  -d '{"your": "payload"}'

# Test mobility search endpoint
curl -X POST http://localhost:3000/mobility/search \
  -H "Content-Type: application/json" \
  -d '{"your": "payload"}'
```

## Monitoring and Logs

The application logs validation results and errors to the console. For production deployments, consider:

- Implementing structured logging
- Adding health check endpoints
- Setting up monitoring and alerting
- Configuring log aggregation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License

## Support

For issues and questions:
- Check the OpenAPI specification files for schema details
- Review the controller implementations for endpoint behavior
- Ensure request payloads match the defined schemas
