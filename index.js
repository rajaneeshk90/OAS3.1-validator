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
    select: retailApi.select,
    init: retailApi.init,
    confirm: retailApi.confirm,
    status: retailApi.status,
    track: retailApi.track,
    cancel: retailApi.cancel,
    update: retailApi.update,
    rating: retailApi.rating,
    support: retailApi.support,
    on_search: retailApi.on_search,
    on_select: retailApi.on_select,
    on_init: retailApi.on_init,
    on_confirm: retailApi.on_confirm,
    on_status: retailApi.on_status,
    on_track: retailApi.on_track,
    on_cancel: retailApi.on_cancel,
    on_update: retailApi.on_update,
    on_rating: retailApi.on_rating,
    on_support: retailApi.on_support,
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
    select: mobilityApi.select,
    init: mobilityApi.init,
    confirm: mobilityApi.confirm,
    status: mobilityApi.status,
    track: mobilityApi.track,
    cancel: mobilityApi.cancel,
    update: mobilityApi.update,
    rating: mobilityApi.rating,
    support: mobilityApi.support,
    on_search: mobilityApi.on_search,
    on_select: mobilityApi.on_select,
    on_init: mobilityApi.on_init,
    on_confirm: mobilityApi.on_confirm,
    on_status: mobilityApi.on_status,
    on_track: mobilityApi.on_track,
    on_cancel: mobilityApi.on_cancel,
    on_update: mobilityApi.on_update,
    on_rating: mobilityApi.on_rating,
    on_support: mobilityApi.on_support,
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
app.use('/retail', (req, res, next) => {
  apiBackendRetail.handleRequest(req, req, res).catch(next);
});
app.use('/mobility', (req, res, next) => {
  apiBackendMobility.handleRequest(req, req, res).catch(next);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});