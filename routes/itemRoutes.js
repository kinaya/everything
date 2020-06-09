const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const {itemValidator,idValidator, validateInput, validateId} = require('../middlewares/validateRequests')
const requireOwnership = require('../middlewares/requireOwnership')
const Item = mongoose.model('items');
const User = mongoose.model('users');
const { check, validationResult, sanitizeParam } = require('express-validator');

module.exports = app => {

  /*
  * Get all items
  */
  app.get('/api/items', requireLogin, async (req, res, next) => {

    Item.find()
      .sort({'datePosted': -1})
      .populate([{path:'_user', select:'_id name'}, {path:'_image'}])
      .exec((err, items) => {
        if(err) { next (err)}
        res.status(201).send(items);
      })

  })

  /*
  * Get featured items
  */
  app.get('/api/items/featured', async (req, res, next) => {

    Item.find()
      .sort({'datePosted': -1})
      .limit(6)
      .populate([{path:'_user', select:'_id name'}, {path:'_image'}])
      .exec((err, items) => {
        if(err) { next (err)}
        res.status(201).send(items);
      })

  })

  /*
  * Get a specific users items
  */
  app.get('/api/items/:id', requireLogin, idValidator(), validateId, async (req, res, next) => {

    Item.find({_user: req.params.id})
      .sort({'datePosted': -1})
      .populate([{path:'_user', select:'_id name'}, {path:'_image'}])
      .exec((err, items) => {
        if(err) { next (err)}
        res.send(items);
      })

  })

  /*
  * Get a specific item
  */
  app.get('/api/item/:id', requireLogin, idValidator(), validateId, async (req, res, next) => {

    Item.findOne({_id: req.params.id})
      .populate([{path:'_user', select:'_id name image email'}, {path:'_image'}])
      .exec((err, item) => {
        if(err) { next (err)}
        res.send(item);
      })

  })


  /*
  * Create a new item
  */
  app.post('/api/items', requireLogin, itemValidator(), validateInput, async (req, res, next) => {

    const item = new Item({
      ...req.body,
      _user: req.user.id,
      datePosted: Date.now()
    });

    await item.save(function (err, item) {
      if(err) {next(err)}
      res.send(item)
    });

  });


  /*
  * Delete an item
  */
  app.delete('/api/item/:id', requireLogin, requireOwnership, idValidator(), validateId, async (req, res) => {
    try {
      const item = await Item.findOneAndDelete({_id: req.params.id, _user: req.user._id});
      res.send(item);
    } catch (err) {
      next(err)
    }
  })

  /*
  * Update an item
  */
  app.put('/api/item/:id', requireLogin, requireOwnership, idValidator(), validateId, itemValidator(), validateInput, async (req, res) => {

    const data = {...req.body}
    const unset = {}
    if(!req.body._image) { unset._image = 1 }
    if(!req.body.coordinates) {unset.coordinates = 1}

    try {
      const item = await Item.findOneAndUpdate (
        {_id: req.params.id, _user: req.user._id},
        {$set: data, $unset: unset},
        {new: true, useFindAndModify: false}
      );
      res.send(item);
    } catch (err) {
      res.status(422).send(err)
    }
  })

};
