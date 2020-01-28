const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireOwnership = require('../middlewares/requireOwnership')
const Item = mongoose.model('items');
const User = mongoose.model('users');
const { check, validationResult, sanitizeParam } = require('express-validator');

module.exports = app => {

  /*
  * Get all items
  */
  app.get('/api/items', requireLogin, async (req, res, next) => {
    try {
      const items = await Item.find().populate('_user', '_id, name');
      res.status(201).send(items);
    } catch (err) { next (err) }
  })

  /*
  * Get a specific users items
  */
  app.get('/api/items/:userId', [
    check('userId').isMongoId()
  ], requireLogin, async (req, res, next) => {

    // Validations errors in this request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error('Not a valid user id in url')
      error.status = 500
      next(error)
    }

    // Get items and respond
    try {
      const items = await Item.find({_user: req.params.userId}).populate('_user', '_id, name');
      res.status(201).send(items)
    } catch (err) { next (err) }

  })

  /*
  * Get a specific item
  */
  app.get('/api/item/:itemId', [
    check('itemId').isMongoId()
  ], requireLogin, async (req, res, next) => {

    // Validations errors in this request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error('Not a valid item id in url')
      error.status = 500
      next(error)
    }

    // Get item and respond
    try {
      const item = await Item.findOne({_id: req.params.itemId}).populate('_user', '_id, name')
      res.send(item)
    } catch (err) { next(err) }

  })


  /*
  * Create a new item
  */
  app.post('/api/items', [
    check('title').not().isEmpty().trim().escape().withMessage('Title is required'),
    check('body').not().isEmpty().trim().escape().withMessage('Body is required'),
    check('visibility').isBoolean().withMessage('Visibility can only be true or false')
  ], requireLogin, async (req, res, next) => {

    // Send error if validation failed
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error()
      error.status = 400
      error.name = 'BadRequestError'
      error.message = 'There where bad input in the request sent'
      error.errors = errors.errors;
      return next(error)
    }

    // Create a new item instance
    const {title, body, visibility, fileUrl } = req.body;
    const item = new Item({
      title,
      body,
      _user: req.user.id,
      datePosted: Date.now(),
      visibility,
      image: fileUrl
    });

    // Save new item and send the created item as response. Todo: why await?
    await item.save(function (err, item) {
      if(err) {next(err)}
      res.send(item)
    });

  });


  /*
  * Delete an item
  */
  app.delete('/api/item/:itemId', [
    check('itemId').isMongoId()
  ], requireLogin, async (req, res) => {

    // Validations errors in this request
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error('Not a valid item id in url')
      error.status = 500
      next(error)
    }

    try {
      const item = await Item.findOneAndDelete ({_id: req.params.itemId, _user: req.user._id});
      res.send(item);
    } catch (err) {
      next(err)
    }
  })

  // Update an item
  app.put('/api/item/:itemId', requireLogin, async (req, res) => {

    // Returns the updated item!
    // Detta BORDE fungera för att kolla så rätt användare uppdaterar.
    // Om det är fel användare så borde inte objektet hittas...
    try {
      const item = await Item.findOneAndUpdate (
        {_id: req.params.itemId, _user: req.user._id},
        {$set: req.body},
        {new: true, useFindAndModify: false}
      );
      res.send(item);
    } catch (err) {
      res.status(422).send(err)
    }
  })

};
