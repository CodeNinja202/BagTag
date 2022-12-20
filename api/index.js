const express = require('express');
const jwt = require('jsonwebtoken');
const apiRouter = express.Router();

//PRODUCTS ROUTE
const playersRouter = require('./bagtag');
apiRouter.use('/bagtag', playersRouter);

//USERS ROUTE
// const usersRouter = require('./users');
// apiRouter.use('/users', usersRouter);

// GET /api/health
apiRouter.get('/health', async (req, res, next) => {
    res.status(200).json({
        uptime: process.uptime(),
        message: 'All is well',
        timestamp: Date.now()
    });
    next()
});

apiRouter.use((error, req, res, next) => {
    res.send({
      error: error.error,
      name: error.name,
      message: error.message
    });
  });

module.exports = apiRouter;