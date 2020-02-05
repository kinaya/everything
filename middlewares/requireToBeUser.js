module.exports = (req, res, next) => {

  if(req.params.id !== req.user._id) {
    var error = new Error('Not correct user')
    error.status = 401;
    next(error)
  }

  next();
};
