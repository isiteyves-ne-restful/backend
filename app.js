const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
require('./src/utils/dbconnection')
const routeHandler = require('./src/routes');
const swaggerFile = require('./swagger-output.json');

const app = express();

const { PORT, HOST, ENV_MODE } = process.env;
const { sequelize } = require('./src/utils/database')

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Sync the models with the database (create tables if they don't exist)
sequelize.sync();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use('/api/v1', routeHandler);

app.use((req, res) => res.status(404).json({ error: 'Resource not found!' }));

app.listen(PORT, () => {
  const SERVER_URL = ENV_MODE === 'dev' ? `${HOST}:${PORT}` : `${HOST}`;
  console.log(`APP RUNNING ON ${SERVER_URL}`);
});
