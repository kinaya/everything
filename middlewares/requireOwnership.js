const mongoose = require('mongoose')
const Item = mongoose.model('items');

module.exports = async (req, res, next) => {

  const item = await Item.findOne({_id: req.params.id});
  if(!item._user.equals(req.user._id)) {
    var error = new Error("Not correct user")
    error.status = 401;
    next(error)
  }

  next();
};
