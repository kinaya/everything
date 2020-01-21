// CommonJS modules. "Import express from 'express'" not supported in node!
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
// We just want the file to run. So we don't need
//const passportConfig = require('./services/passport');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

// Generate a running express app
const app = express();

// Used so the request body is availible on the incoming request!
app.use(bodyParser.json());
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
// The order decides which is used!!!
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production') {
  // express will serve production assets, like main.js
  // Loog into this file and find it!
  app.use(express.static('client/build'));
  // express will server index.html if it doesnt recognise the route
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT); // Express tells node to listen to port 5000
