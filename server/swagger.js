const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NYBI APP API',
      version: '1.0.0',
      description: 'API documentation for my NYBI app',
      contact: {
        name: process.env.AUTHOR_NAME,
        email: process.env.AUTHOR_MAIL,
        url: process.env.AUTHOR_LINKEDIN
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    }
  },
  server: [
    {
      url: `${process.env.DNS}:${process.env.PORT}`
    }
  ],
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
