const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireToBeUser = require('../middlewares/requireToBeUser')
const {idValidator, validateId} = require('../middlewares/validateRequests')
const User = mongoose.model('users');
const Item = mongoose.model('items');

module.exports = (app) => {

  /*
  * Get a users profile page
  */
  app.get('/api/user/:id', requireLogin, idValidator(), validateId, async (req, res, next) => {
    try {
      const item = await User.findOne({_id: req.params.id})
      res.status(201).send(item)
    } catch (err) { next(err) }
  })


  /*
  * Get all users
  */
  app.get('/api/users', requireLogin, async (req, res, next) => {
    try {
      const users = await User.find({},{googleId: 0});
      res.status(201).send(users);
    } catch (err) { next (err) }

  })

  /*
  * Delete a user and their items
  */
  app.delete('/api/user/:id/', requireLogin, requireToBeUser, idValidator(), validateId, async (req, res, next) => {

    try {
      await Item.deleteMany({_user: req.user._id});
      const user = await User.findOneAndDelete({_id: req.params.userId});
      req.logout();
      res.send(user);
    } catch (err) {
      next(err)
    }

  })
}
