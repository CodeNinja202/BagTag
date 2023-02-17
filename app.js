require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { client } = require('./db/client');

client.connect();//Make sure to connect to client

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
  console.log('Hitting server')
  next();
})

server.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message:` Authorization token must start with ${ prefix }`
    });
  }
});

const apiRouter = require('./api');
server.use('/api', apiRouter);



server.use('*', (req, res,) => {
    res.status(404).send({
      error: 'unknownpage',
      name: 'badURL',
      message: 'wrong route'
    });
   
  })
  
  server.use((error, req, res) => {
      
      res.send({
        error: error.error,
        name: error.name,
        message: error.message
      });
    });

module.exports = server;