'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./auth/error-handlers/500.js');
const notFound = require('./auth/error-handlers/404.js');
const authRouter = require('./auth/routes/routes.js');
const router = require('./auth/routes/V2.js');
const logger = require('./auth/middleware/logger.js');
const { db } = require('./auth/models/index.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(logger);

// Routes
app.use(authRouter);
app.use('/api/v2', router);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: async (port) => {
    await db.sync();
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
