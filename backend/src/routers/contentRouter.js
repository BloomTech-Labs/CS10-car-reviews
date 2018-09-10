// import dependencies
const express = require('express');

// initializing the server
const router = express.Router();

// creating the routes
router.get('/', (req, res) => res.send(`The content router is working!`));

module.exports = router;