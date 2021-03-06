// import the express package
const express = require('express');
// import helmet middleware
const helmet = require('helmet');


const usersRouter = require('./users/users-router.js');
const postsRouter = require('./posts/post-router.js');


// creates the server / creates an express application using the express module
const server = express();

// global middleware
server.use(helmet());
server.use(express.json());


// this only runs if the url has /api/users in it
server.use('/api/users', usersRouter);

// this only runs if the url has /api/posts in it
server.use('/api/posts', postsRouter);


// initial server test
server.get('/', async (req, res) => {
    res.send(`
      <h2>TEST Posts API</h2>
      <p>Welcome to the TEST Posts API</p>
    `);
  });



// export default server; Notice the "s" on exports
module.exports = server;