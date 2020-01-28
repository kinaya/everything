const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const User = mongoose.model('users');
const Item = mongoose.model('items');

module.exports = (app) => {

  /*
  * Get a users profile page
  */
  app.get('/api/user/:userId', requireLogin, async (req, res, next) => {
    try {
      const item = await User.findOne({_id: req.params.userId})
      res.status(201).send(item)
    } catch (err) { next(err) }
  })


  /*
  * Get all users
  */
  app.get('/api/users', requireLogin, async (req, res, next) => {
    // Restrict what we get in this object!
    try {
      const users = await User.find();
      res.status(201).send(users);
    } catch (err) { next (err) }

  })

  /*
  * Delete a user and their items
  */
  app.delete('/api/user/:userId/', requireLogin, async (req, res, next) => {

    try {
      if(req.params.userId != req.user._id) {
        throw new Error('Not correct user')
      }
      await Item.deleteMany({_user: req.user._id});
      const user = await User.findOneAndDelete({_id: req.params.userId});
      req.logout();
      res.send(user);
    } catch (err) {
      next(err)
    }

  })
}
