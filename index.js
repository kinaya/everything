// CommonJS modules. "Import express from 'express'" not supported in node!
const express = require('express');

// Generate a running express app
const app = express();

// calling .get creates a route handler. Express calls the function
app.get('/', (req, res) => {
  res.send({bye: 'buddy'}); // Close request and send body
});

const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells node to listen to port 5000
