const passport = require('passport');

module.exports = (app) => {
  // User gets kicked into passport flow when user goes to auth/google
  // Passport has an internal identifier of 'google' so it knows which strategy to use
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

  // This gets us up to passport.use second parameter function!
  app.get(
    '/auth/google/callback', // Comes back from google
    passport.authenticate('google'), // Passport does its thing and sets a cookie
    (req, res) => { // Redirect user to /surveys
      res.redirect('/surveys');
    }
  )

  app.get('/api/logout', (req, res) => {
    req.logout(); // passport does this!
    res.redirect('/');
  })

  // Get the current logged in user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // passport does this!
  })
}
