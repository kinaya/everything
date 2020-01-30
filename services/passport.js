const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

// serializeUser from passport
passport.serializeUser((user, done) => {
  done(null, user.id); // The _id fron mongoDb!
});

// deserializeUser from passport
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
})

// Create new instance of Google strategy with config
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({googleId: profile.id})
    if(existingUser) {
      return done(null, existingUser); // Tell passport that we are done by calling done(). no error by null
    } else {
      const user = await new User({googleId: profile.id, email: profile.emails[0].value, name: profile.displayName, image: profile.photos[0].value}).save() // Create a new user instance
      done(null, user); // call done with no error
    }
  })
);
