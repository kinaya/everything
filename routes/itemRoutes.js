const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); // "free" in node!
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits');
const Item = mongoose.model('items');

module.exports = app => {

  // Get a list of the users items
  app.get('/api/items', requireLogin, async (req, res) => {
    const items = await Item.find({_user: req.user.id});
    res.send(items);
  })

  // Create an item
  app.post('/api/items/new', requireLogin, requireCredits, async (req, res) => {
    const {title, body } = req.body;

    const item = new Item({
      title,
      body,
      _user: req.user.id,
      datePosted: Date.now()
    });

    // Är det här ok?
    try {
      await survey.save();
      res.send({});
    } catch (err) {
      res.status(422).send(err);
    }

  });
};
