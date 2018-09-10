// importing dependencies
const express = require('express');

// importing routers

// setting up the server
const port = process.env.PORT || 3001; // uses the port provided by the server & defaults to 3001 if none is provided
const server = express();

// setting up middleware
server.use(express.json());

// test route
server.use('/', (req, res) => res.send(`The server is up and running!`));

// setting up routers


// initializing the server
server.listen(port, () => console.log(`The server is listening on port ${port}`));