const express = require('express');
const OpenAPIBackend = require('openapi-backend').default;
const bodyParser = require('body-parser');
const path = require('path');
const retailApi = require('./controllers/retail');
const mobilityApi = require('./controllers/mobility');

// Initialize retail OpenAPI Backend
const apiBackendRetail = new OpenAPIBackend({
  definition: path.join(__dirname, 'api', 'openapiRetail.yaml'),
  handlers: {
    search: retailApi.search,
    notFound: (c, req, res) => res.status(404).json({ error: 'Not Found' }),
    validationFail: (c, req, res) => res.status(400).json({ error: c.validation.errors }),
  },
  quick:true,
});

// Initialize mobility OpenAPI Backend
const apiBackendMobility = new OpenAPIBackend({
  definition: path.join(__dirname, 'api', 'openapiMobility.yaml'),
  handlers: {
    search: mobilityApi.search,
    notFound: (c, req, res) => res.status(404).json({ error: 'Not Found' }),
    validationFail: (c, req, res) => res.status(400).json({ error: c.validation.errors }),
  },
  quick:true,
});

// Initialize the backends
apiBackendRetail.init();
apiBackendMobility.init();

// Create Express app
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Route handler
app.use('retail', (req, res, next) => {
  apiBackendRetail.handleRequest(req, req, res).catch(next);
});
app.use('mobility', (req, res, next) => {
  apiBackendMobility.handleRequest(req, req, res).catch(next);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});