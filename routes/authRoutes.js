const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const aws = require('aws-sdk');
aws.config.region = 'eu-north-1';

module.exports = (app) => {

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }))

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect(`/user/${req.user._id}`);
  })

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  })

}
