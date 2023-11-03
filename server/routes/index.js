const express = require('express');
const swaggerUI = require('swagger-ui-express');

const swaggerSpec = require('../swagger.js'); // Import the generated Swagger specification

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
