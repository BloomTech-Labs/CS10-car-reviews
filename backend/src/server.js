// importing dependencies
const express = require('express');
const mongoose = require('mongoose');

// importing routers

// setting up the server
const port = process.env.PORT || 3001; // uses the port provided by the server & defaults to 3001 if none is provided
const server = express();

// configuring the database
mongoose.Promise = global.Promise; // mongoose's promise library is depreciated, so we sub in the general ES6 promises here
const databaseOptions = {
    useNewUrlParser: true // mongoose's URL parser is also depreciated, so we pass this in as a option to use the new one
};

// connecting to the database
mongoose.connect('mongodb://localhost:27017/store', databaseOptions);
mongoose.connection
    .once('open', () => console.log(`The database is connected`))
    .on('error', (err) => console.warn(err));

// setting up middleware
server.use(express.json());

// test route
server.use('/', (req, res) => res.send(`The server is up and running!`));

// setting up routers


// initializing the server
server.listen(port, () => console.log(`The server is listening on port ${port}`));