// CommonJS modules. "Import express from 'express'" not supported in node!
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
// We just want the file to run. So we don't need
//const passportConfig = require('./services/passport');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// Generate a running express app
const app = express();

// Tell express to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// The last does the same as the two firs lines!
//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
//The authRoutes file returns a function, we imediatly call that function with the app object
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells node to listen to port 5000
