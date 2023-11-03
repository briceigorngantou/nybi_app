/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } = require('url');
const swaggerUi = require('swagger-ui-express');

const usersRoutes = require('./routes/users.js');
const filesRoutes = require('./routes/files.js');
// eslint-disable-next-line no-unused-vars
const db = require('./models/index.js');
const logger = require('./utils/logger.js');
const swaggerSpec = require('./swagger.js');

/** CONFIGURATIONS */
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(
  '/assets',
  express.static(
    path.join(
      path.dirname(fileURLToPath(`file:///${require.resolve('.')}`)),
      'public/assets'
    )
  )
);

/** DATA BASE SYNC */
// db.sequelize.sync().then((req) => {
// listening to server connection
app.listen(process.env.PORT, () => {
  logger.info('Connection has been established successfully.');
  console.log('Connection has been established successfully.');
});
// });

// routes for the user API
app.use('/api/users', usersRoutes);
app.use('/api/upload_files', filesRoutes);

// SWAGGER DOCUMENTATION CONFIGS
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: 'NYBI SWAGGER API'
  })
);
