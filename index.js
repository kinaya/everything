// CommonJS modules. "Import express from 'express'" not supported in node!
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// We just want the file to run. So we don't need
//const passportConfig = require('./services/passport');
require('./models/User');
require('./models/Item');
require('./models/Image');
require('./services/passport');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Generate a running express app
const app = express();

// Used so the request body is availible on the incoming request!
app.use(bodyParser.json());
// Tell express to use cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 day
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());




// The last does the same as the two firs lines!
//const authRoutes = require('./routes/authRoutes');
//authRoutes(app);
//The authRoutes file returns a function, we imediatly call that function with the app object
// The order decides which is used!!!
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/itemRoutes')(app);
require('./routes/imageRoutes')(app);


if(process.env.NODE_ENV === 'production') {


  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
  });
  
  // express will serve production assets, like main.js
  // Loog into this file and find it!
  app.use(express.static('client/build'));
  // express will server index.html if it doesnt recognise the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  });
}


// Error handling middleware
app.use(function (err, req, res, next) {

  /*let errors = [];
  let status = 500;

  // Transform into plain object, and then into errors object
  if(err instanceof Error) {
    const errorObject = {};
    Object.getOwnPropertyNames(err).forEach(function(key) {
      errorObject[key] = err[key];
    });
    errors = [{message: errorObject.message, status: errorObject.status}]
    status = errorObject.status
  } else { // Validation error
    errors = err.errors.map(error => ({
      message: error.msg,
      type: 400
    }))
    status = 400;
  }

  res.status(status).json(errors)*/
  console.log(err)
  res.status(err.status || 500).json(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells node to listen to port 5000
