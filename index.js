require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Item');
require('./models/Image');
require('./services/passport');

// Connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Generate a running express app
const app = express();

// Get request body on incoming requests
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

// Return route function and immediatly call it
require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/itemRoutes')(app);
require('./routes/imageRoutes')(app);
require('./routes/messageRoutes')(app);

// Set up https and public folder for production
if(process.env.NODE_ENV === 'production') {

  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
  });

  // Production assets
  app.use(express.static('client/build'));

  // Serve index.html if no other route found
  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  });

}

// Error handling
app.use(function (err, req, res, next) {
  console.log('The error handler!')
  console.log(err)
  res.status(err.status || 500).json(err);
});

// Tell node to listen to the port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
