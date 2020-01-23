const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireOwnership = require('../middlewares/requireOwnership')
const Item = mongoose.model('items');

module.exports = app => {

  // Get a list of all items
  app.get('/api/items', requireLogin, async (req, res) => {
    const items = await Item.find();
    res.send(items);
  })

  app.get('/api/items/:userId', requireLogin, async (req, res) => {
    const items = await Item.find({_user: req.user.id});
    res.send(items)
  })


  // Get a specific item
  app.get('/api/item/:itemId', requireLogin, async (req, res) => {
    const item = await Item.findOne({_id: req.params.itemId})
    res.send(item);
  })

  // Create an item
  app.post('/api/items', requireLogin, async (req, res) => {

    const {title, body, visibility } = req.body;

    const item = new Item({
      title,
      body,
      _user: req.user.id,
      datePosted: Date.now(),
      visibility
    });

    // Är det här ok?
    try {
      await item.save();
      const items = await Item.find();
      res.send(items); // Skicka tillbaka ett ok istället? Så jag kan kolla på frontend att jag fick ett ok, och då visa ett tack! Din sak är upplagd?
    } catch (err) {
      res.status(422).send(err);
    }

  });


  // Delete an item
  app.delete('/api/item/:itemId', requireLogin, async (req, res) => {

    try {
      await Item.findOneAndDelete ({_id: req.params.itemId, _user: req.user._id});
      const items = await Item.find();
      res.send(items);
    } catch (err) {
      res.status(422).send(err)
    }
  })

  // Update an item
  app.put('/api/item/:itemId', requireLogin, async (req, res) => {

    // Returns the updated item!
    // Detta BORDE fungera för att kolla så rätt användare uppdaterar.
    // Om det är fel användare så borde inte objektet hittas...
    try {
      await Item.findOneAndUpdate (
        {_id: req.params.itemId, _user: req.user._id},
        {$set: req.body},
        {new: true, useFindAndModify: false}
      );
      const items = await Item.find();
      res.send(items);
    } catch (err) {
      res.status(422).send(err)
    }
  })

};
