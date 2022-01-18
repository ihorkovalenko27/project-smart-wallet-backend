const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const { userRouter, transactionRouter } = require('./routers/api');

const { errorHandler } = require('./helpers');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/transactions', transactionRouter);


app.use(errorHandler);

module.exports = app;
