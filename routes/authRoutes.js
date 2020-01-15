const passport = require('passport');

module.exports = (app) => {
  // User gets kicked into passport flow when user goes to auth/google
  // Passport has an internal identifier of 'google' so it knows which strategy to use
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

  // This gets us up to passport.use second parameter function!
  app.get('/auth/google/callback', passport.authenticate('google'))

  app.get('/api/logout', (req, res) => {
    req.logout(); // passport does this!
    res.send(req.user);
  })

  // Get the current logged in user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // passport does this!
  })
}
