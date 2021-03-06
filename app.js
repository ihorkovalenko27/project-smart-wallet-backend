const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const {
  userRouter,
  transactionRouter,
  googleRouter,
} = require('./routers/api');

const { errorHandler } = require('./helpers');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/auth', googleRouter);

app.use(errorHandler);

module.exports = app;
